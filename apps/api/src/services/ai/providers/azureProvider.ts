import { PROMPT_REGISTRY } from "../promptRegistry";
import { AiProvider, AiProviderResult } from "../types";
import { AiProviderUnavailableError } from "../providerErrors";

export type AzureModelConfig = {
  endpoint?: string;
  deployment?: string;
  apiVersion?: string;
  apiKey: string;
  model?: string;
  chatCompletionsUrl?: string;
  timeoutMs?: number;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json_object";
};

type AzureChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

const DEFAULT_TIMEOUT_MS = 20000;

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

function normalizeEndpoint(baseUrl: string) {
  const trimmed = baseUrl.replace(/\/+$/, "");
  if (trimmed.endsWith("/openai/v1")) {
    return trimmed.slice(0, -"/openai/v1".length);
  }
  if (trimmed.endsWith("/openai")) {
    return trimmed.slice(0, -"/openai".length);
  }
  return trimmed;
}

function buildChatCompletionsUrl(config: AzureModelConfig) {
  if (config.chatCompletionsUrl) return config.chatCompletionsUrl;
  if (!config.endpoint || !config.deployment || !config.apiVersion) {
    throw new AiProviderUnavailableError("Azure config missing endpoint, deployment, or apiVersion.");
  }
  const base = normalizeEndpoint(config.endpoint);
  return `${base}/openai/deployments/${encodeURIComponent(config.deployment)}/chat/completions?api-version=${encodeURIComponent(
    config.apiVersion
  )}`;
}

function safeJsonParse(content: string) {
  try {
    return { ok: true as const, value: JSON.parse(content) };
  } catch (error) {
    return { ok: false as const, error };
  }
}

function extractAzureError(text: string) {
  if (!text) return null;
  try {
    const parsed = JSON.parse(text) as { error?: { message?: string } };
    return parsed.error?.message ?? null;
  } catch {
    return text.slice(0, 200);
  }
}

async function callAzure(config: AzureModelConfig, payload: object): Promise<string> {
  const controller = new AbortController();
  const timeoutMs = Number.isFinite(config.timeoutMs) ? Number(config.timeoutMs) : DEFAULT_TIMEOUT_MS;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(buildChatCompletionsUrl(config), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      const text = await response.text();
      const detail = extractAzureError(text);
      if (response.status === 401 || response.status === 403) {
        throw new AiProviderUnavailableError("Azure auth failed. Check API key and permissions.");
      }
      throw new AiProviderUnavailableError(
        `Azure responded with status ${response.status}${detail ? `: ${detail}` : ""}`
      );
    }

    const body = (await response.json()) as AzureChatResponse;
    if (body.error?.message) {
      throw new AiProviderUnavailableError(`Azure error: ${body.error.message}`);
    }

    const content = body.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new AiProviderUnavailableError("Azure returned an empty response");
    }

    return content;
  } catch (error) {
    if (error instanceof AiProviderUnavailableError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new AiProviderUnavailableError("Azure request timed out");
    }
    throw new AiProviderUnavailableError("Azure request failed");
  } finally {
    clearTimeout(timeout);
  }
}

export class AzureOpenAiProvider implements AiProvider {
  private readonly providerIdentifier = "azure-openai";
  private readonly modelIdentifier: string;
  private readonly config: AzureModelConfig;

  constructor(config: AzureModelConfig) {
    this.config = config;
    this.modelIdentifier = config.model ?? config.deployment ?? "azure-openai";
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
    const contextSnippet = contextRaw.length > 2000 ? `${contextRaw.slice(0, 2000)}...` : contextRaw;
    const userPrompt = [
      "User notes:",
      input.freeText,
      "",
      "Optional context snapshot (do NOT add new facts from this unless also stated in notes):",
      contextSnippet
    ].join("\n");

    const payload: Record<string, unknown> = {
      messages: [
        { role: "system", content: EXTRACTION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ]
    };

    if (Number.isFinite(this.config.maxTokens)) {
      payload.max_tokens = this.config.maxTokens;
    }
    if (Number.isFinite(this.config.temperature)) {
      payload.temperature = this.config.temperature;
    }
    if (this.config.responseFormat === "json_object") {
      payload.response_format = { type: "json_object" };
    }

    const content = await callAzure(this.config, payload);

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

    const payload: Record<string, unknown> = {
      messages: [
        { role: "system", content: EXPLAIN_SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ]
    };

    if (Number.isFinite(this.config.maxTokens)) {
      payload.max_tokens = this.config.maxTokens;
    }
    if (Number.isFinite(this.config.temperature)) {
      payload.temperature = this.config.temperature;
    }
    if (this.config.responseFormat === "json_object") {
      payload.response_format = { type: "json_object" };
    }

    const content = await callAzure(this.config, payload);
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
    const payload: Record<string, unknown> = {
      messages: [
        { role: "system", content: SUMMARIZE_SYSTEM_PROMPT },
        { role: "user", content: input.freeText }
      ]
    };

    if (Number.isFinite(this.config.maxTokens)) {
      payload.max_tokens = this.config.maxTokens;
    }
    if (Number.isFinite(this.config.temperature)) {
      payload.temperature = this.config.temperature;
    }
    if (this.config.responseFormat === "json_object") {
      payload.response_format = { type: "json_object" };
    }

    const content = await callAzure(this.config, payload);
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
