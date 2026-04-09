import { PROMPT_REGISTRY } from "../promptRegistry";
import { AiProvider, AiProviderResult } from "../types";
import { AiProviderUnavailableError } from "../providerErrors";

type OllamaProviderConfig = {
  baseUrl: string;
  model: string;
};

type OllamaChatResponse = {
  message?: {
    content?: string;
  };
  error?: string;
};

const REQUEST_TIMEOUT_MS = 20000;

const EXTRACTION_SYSTEM_PROMPT = [
  "You are a bounded AI extraction assistant for will drafting.",
  "Only extract facts explicitly stated in the user's notes. Never invent or assume.",
  "If a detail is missing or unclear, leave it unknown and list it under missingInformation or ambiguityWarnings.",
  "Never claim the will is legally valid. Never provide legal advice. Never present yourself as a lawyer.",
  "Return ONLY a JSON object that follows this schema:",
  "{",
  '  "summary": string,',
  '  "extracted": {',
  '    "personalDetails": { "fullName"?: string, "maritalStatus"?: string, "spouseName"?: string, "domicile"?: string, "notes"?: string },',
  '    "familyStructure": {',
  '      "hasMinors"?: boolean,',
  '      "children": [ { "name": string, "relationship"?: string, "age"?: string, "notes"?: string, "confidence"?: number } ],',
  '      "dependants": [ { "name": string, "relationship"?: string, "notes"?: string, "confidence"?: number } ]',
  "    },",
  '    "executors": [ { "name": string, "relationship"?: string, "notes"?: string, "confidence"?: number } ],',
  '    "guardians": [ { "name": string, "relationship"?: string, "notes"?: string, "confidence"?: number } ],',
  '    "assets": [ { "label": string, "details"?: string, "category"?: string, "isForeign"?: boolean, "confidence"?: number } ],',
  '    "beneficiaries": [ { "name": string, "relationship"?: string, "share"?: string, "notes"?: string, "confidence"?: number } ],',
  '    "residue": { "notes"?: string, "beneficiaries": [ { "name": string, "relationship"?: string, "share"?: string, "notes"?: string, "confidence"?: number } ] },',
  '    "specialWishes": [ { "text": string, "confidence"?: number } ]',
  "  },",
  '  "missingInformation": string[],',
  '  "ambiguityWarnings": string[],',
  '  "complexitySignals": string[],',
  '  "confidence": number,',
  '  "recommendedNextQuestions": string[]',
  "}",
  "Keep arrays empty if no data is present. Use confidence values between 0 and 1."
].join("\n");

const EXPLAIN_SYSTEM_PROMPT = [
  "You explain drafting fields in plain language, without legal advice.",
  "Never claim to be a lawyer. Never validate a will.",
  "Return ONLY JSON with keys: explanation, uncertainty (optional), confidence (0-1)."
].join("\n");

const SUMMARIZE_SYSTEM_PROMPT = [
  "Summarize the user's notes for review by the user and an advocate if needed.",
  "Do not add new facts. Do not give legal advice.",
  "Return ONLY JSON with keys: summary, advocateHandoffSummary, confidence (0-1)."
].join("\n");

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

function safeJsonParse(content: string) {
  try {
    return { ok: true as const, value: JSON.parse(content) };
  } catch (error) {
    return { ok: false as const, error };
  }
}

async function callOllama(config: OllamaProviderConfig, payload: object): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${normalizeBaseUrl(config.baseUrl)}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new AiProviderUnavailableError(`Ollama responded with status ${response.status}`);
    }

    const body = (await response.json()) as OllamaChatResponse;
    if (body.error) {
      throw new AiProviderUnavailableError(`Ollama error: ${body.error}`);
    }

    const content = body.message?.content?.trim();
    if (!content) {
      throw new AiProviderUnavailableError("Ollama returned an empty response");
    }

    return content;
  } catch (error) {
    if (error instanceof AiProviderUnavailableError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new AiProviderUnavailableError("Ollama request timed out");
    }
    throw new AiProviderUnavailableError("Ollama request failed");
  } finally {
    clearTimeout(timeout);
  }
}

export class OllamaAiProvider implements AiProvider {
  private readonly providerIdentifier = "ollama-local";
  private readonly modelIdentifier: string;
  private readonly baseUrl: string;

  constructor(config: OllamaProviderConfig) {
    this.modelIdentifier = config.model;
    this.baseUrl = config.baseUrl;
  }

  private buildResult<TOutput>(params: {
    output: TOutput | null;
    confidence: number;
    abstained: boolean;
    uncertainty?: string;
    promptType: "extract" | "explain" | "summarize";
  }): AiProviderResult<TOutput> {
    const normalizedConfidence = Math.min(1, Math.max(0, params.confidence));
    return {
      modelIdentifier: this.modelIdentifier,
      providerIdentifier: this.providerIdentifier,
      promptType: params.promptType,
      promptVersion: PROMPT_REGISTRY[params.promptType].version,
      output: params.output,
      confidence: normalizedConfidence,
      abstained: params.abstained,
      uncertainty: params.uncertainty
    };
  }

  async extract(input: { freeText: string; context?: Record<string, unknown> }): Promise<AiProviderResult<unknown>> {
    const contextRaw = input.context ? JSON.stringify(input.context) : "none";
    const contextSnippet =
      contextRaw.length > 2000 ? `${contextRaw.slice(0, 2000)}...` : contextRaw;
    const userPrompt = [
      "User notes:",
      input.freeText,
      "",
      "Optional context snapshot (do NOT add new facts from this unless also stated in notes):",
      contextSnippet
    ].join("\n");

    const content = await callOllama(
      { baseUrl: this.baseUrl, model: this.modelIdentifier },
      {
        model: this.modelIdentifier,
        messages: [
          { role: "system", content: EXTRACTION_SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        format: "json",
        options: { temperature: 0.2 }
      }
    );

    const parsed = safeJsonParse(content);
    if (!parsed.ok) {
      return this.buildResult({
        output: null,
        confidence: 0.2,
        abstained: true,
        uncertainty: "Model output could not be parsed as structured JSON.",
        promptType: "extract"
      });
    }

    const output = parsed.value;
    const confidence =
      typeof output === "object" &&
      output !== null &&
      "confidence" in output &&
      typeof (output as { confidence?: number }).confidence === "number"
        ? (output as { confidence: number }).confidence
        : 0.6;
    return this.buildResult({
      output,
      confidence,
      abstained: false,
      promptType: "extract"
    });
  }

  async explain(input: { topic: string; context?: string }): Promise<AiProviderResult<unknown>> {
    const userPrompt = [
      `Topic: ${input.topic}`,
      input.context ? `Context: ${input.context}` : "Context: none"
    ].join("\n");

    const content = await callOllama(
      { baseUrl: this.baseUrl, model: this.modelIdentifier },
      {
        model: this.modelIdentifier,
        messages: [
          { role: "system", content: EXPLAIN_SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        format: "json",
        options: { temperature: 0.2 }
      }
    );

    const parsed = safeJsonParse(content);
    if (!parsed.ok) {
      return this.buildResult({
        output: null,
        confidence: 0.2,
        abstained: true,
        uncertainty: "Model output could not be parsed as structured JSON.",
        promptType: "explain"
      });
    }

    const output = parsed.value;
    const confidence =
      typeof output === "object" &&
      output !== null &&
      "confidence" in output &&
      typeof (output as { confidence?: number }).confidence === "number"
        ? (output as { confidence: number }).confidence
        : 0.6;
    return this.buildResult({
      output,
      confidence,
      abstained: false,
      promptType: "explain"
    });
  }

  async summarize(input: { freeText: string }): Promise<AiProviderResult<unknown>> {
    const content = await callOllama(
      { baseUrl: this.baseUrl, model: this.modelIdentifier },
      {
        model: this.modelIdentifier,
        messages: [
          { role: "system", content: SUMMARIZE_SYSTEM_PROMPT },
          { role: "user", content: input.freeText }
        ],
        format: "json",
        options: { temperature: 0.2 }
      }
    );

    const parsed = safeJsonParse(content);
    if (!parsed.ok) {
      return this.buildResult({
        output: null,
        confidence: 0.2,
        abstained: true,
        uncertainty: "Model output could not be parsed as structured JSON.",
        promptType: "summarize"
      });
    }

    const output = parsed.value;
    const confidence =
      typeof output === "object" &&
      output !== null &&
      "confidence" in output &&
      typeof (output as { confidence?: number }).confidence === "number"
        ? (output as { confidence: number }).confidence
        : 0.6;
    return this.buildResult({
      output,
      confidence,
      abstained: false,
      promptType: "summarize"
    });
  }
}
