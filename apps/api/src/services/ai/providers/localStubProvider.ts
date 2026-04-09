import { PROMPT_REGISTRY } from "../promptRegistry";
import { AiProvider, AiProviderResult } from "../types";

function detectConfidence(text: string) {
  if (text.length < 20) return 0.3;
  if (text.length < 60) return 0.55;
  return 0.76;
}

function extractNamesByHints(text: string, hints: string[]) {
  const lowered = text.toLowerCase();
  const entries: string[] = [];
  for (const hint of hints) {
    const index = lowered.indexOf(hint);
    if (index === -1) continue;
    const tail = text.slice(index + hint.length).trim();
    const candidate = tail.split(/[,.;\n]/)[0]?.trim() ?? "";
    if (candidate && !entries.includes(candidate)) {
      entries.push(candidate);
    }
  }
  return entries;
}

export class LocalStubAiProvider implements AiProvider {
  private readonly providerIdentifier = "local-dev-stub";
  private readonly modelIdentifier = "oss-small-instruct-dev-stub-8b-profile";

  async extract(input: { freeText: string; context?: Record<string, unknown> }): Promise<AiProviderResult<unknown>> {
    const text = input.freeText.trim();
    const confidence = detectConfidence(text);
    if (confidence < 0.45) {
      return {
        modelIdentifier: this.modelIdentifier,
        providerIdentifier: this.providerIdentifier,
        promptType: "extract",
        promptVersion: PROMPT_REGISTRY.extract.version,
        output: null,
        confidence,
        abstained: true,
        uncertainty: "Insufficient detail in free text for reliable extraction."
      };
    }

    const assetHints = ["house", "land", "plot", "vehicle", "car", "bank", "mpesa", "business", "shares"];
    const assets = assetHints
      .filter((hint) => text.toLowerCase().includes(hint))
      .map((hint) => ({
        label: hint === "mpesa" ? "M-Pesa account" : hint[0].toUpperCase() + hint.slice(1),
        details: undefined,
        confidence
      }));

    const beneficiaries = extractNamesByHints(text, ["to ", "for ", "beneficiary "]).map((name) => ({
      name,
      confidence
    }));

    const executors = extractNamesByHints(text, ["executor ", "executor is ", "appoint "]).map((name) => ({
      name,
      confidence
    }));

    const guardians = extractNamesByHints(text, ["guardian ", "guardian is "]).map((name) => ({
      name,
      confidence
    }));

    const output = {
      summary: "Stub extraction summary based on provided notes.",
      extracted: {
        personalDetails: {},
        familyStructure: { children: [], dependants: [] },
        executors,
        guardians,
        assets,
        beneficiaries,
        residue: { beneficiaries: [] },
        specialWishes: []
      },
      missingInformation: [
        "Confirm executor contact details and backup executor.",
        "Confirm beneficiaries and specific asset allocations."
      ],
      ambiguityWarnings: [],
      complexitySignals: [],
      confidence,
      recommendedNextQuestions: [
        "Which beneficiaries should receive specific assets?",
        "Are there minors who need guardians?"
      ]
    };

    return {
      modelIdentifier: this.modelIdentifier,
      providerIdentifier: this.providerIdentifier,
      promptType: "extract",
      promptVersion: PROMPT_REGISTRY.extract.version,
      output,
      confidence,
      abstained: false
    };
  }

  async explain(input: { topic: string; context?: string }): Promise<AiProviderResult<unknown>> {
    const topic = input.topic.trim();
    const confidence = topic.length >= 4 ? 0.8 : 0.45;
    if (confidence < 0.5) {
      return {
        modelIdentifier: this.modelIdentifier,
        providerIdentifier: this.providerIdentifier,
        promptType: "explain",
        promptVersion: PROMPT_REGISTRY.explain.version,
        output: null,
        confidence,
        abstained: true,
        uncertainty: "Topic not specific enough for a reliable explanation."
      };
    }

    return {
      modelIdentifier: this.modelIdentifier,
      providerIdentifier: this.providerIdentifier,
      promptType: "explain",
      promptVersion: PROMPT_REGISTRY.explain.version,
      output: {
        explanation: `${topic} means information that helps produce a clearer deterministic will clause. This explanation is guidance only and does not replace legal advice.`,
        uncertainty: "Always review with an advocate for complex estates.",
        confidence
      },
      confidence,
      abstained: false
    };
  }

  async summarize(input: { freeText: string }): Promise<AiProviderResult<unknown>> {
    const text = input.freeText.trim();
    const confidence = detectConfidence(text);
    if (confidence < 0.45) {
      return {
        modelIdentifier: this.modelIdentifier,
        providerIdentifier: this.providerIdentifier,
        promptType: "summarize",
        promptVersion: PROMPT_REGISTRY.summarize.version,
        output: null,
        confidence,
        abstained: true,
        uncertainty: "Not enough details to summarize safely."
      };
    }

    const short = text.length > 240 ? `${text.slice(0, 237)}...` : text;
    return {
      modelIdentifier: this.modelIdentifier,
      providerIdentifier: this.providerIdentifier,
      promptType: "summarize",
      promptVersion: PROMPT_REGISTRY.summarize.version,
      output: {
        summary: short,
        advocateHandoffSummary:
          "User provided free-text wishes. Confirm executor, guardian (if minors), residue clause, and specific allocations before execution.",
        confidence
      },
      confidence,
      abstained: false
    };
  }
}
