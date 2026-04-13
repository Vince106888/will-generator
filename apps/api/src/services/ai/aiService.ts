import crypto from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../../db";
import { DraftSessionService } from "../draftSessionService";
import { AzureModelConfig, AzureOpenAiProvider } from "./providers/azureProvider";
import { LocalStubAiProvider } from "./providers/localStubProvider";
import { OllamaAiProvider } from "./providers/ollamaProvider";
import { AiProviderUnavailableError } from "./providerErrors";
import { extractionCandidateSchema, explainResponseSchema, summarizeResponseSchema } from "./schemas";
import { AiProvider } from "./types";

const DEFAULT_CONFIDENCE_THRESHOLD = 0.6;

function readAiConfig() {
  return {
    enabled: process.env.AI_ASSIST_ENABLED === "true",
    allowStub: process.env.AI_ALLOW_LOCAL_STUB === "true",
    confidenceThreshold: Number(process.env.AI_CONFIDENCE_THRESHOLD ?? DEFAULT_CONFIDENCE_THRESHOLD),
    provider: (process.env.AI_PROVIDER ?? "").trim().toLowerCase(),
    azureModelConfigRaw: process.env.AZURE_MODEL_CONFIG,
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
    ollamaModel: process.env.OLLAMA_MODEL ?? "qwen3:8b"
  };
}

function hashInput(input: unknown) {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

function buildPreview(value: string) {
  if (!value) return null;
  return value.length > 240 ? `${value.slice(0, 237)}...` : value;
}

function parseAzureModelConfig(raw: string | undefined): { config?: AzureModelConfig; error?: string } {
  if (!raw) {
    return { error: "AZURE_MODEL_CONFIG is not set." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "AZURE_MODEL_CONFIG must be valid JSON." };
  }

  if (!parsed || typeof parsed !== "object") {
    return { error: "AZURE_MODEL_CONFIG must be a JSON object." };
  }

  const record = parsed as Record<string, unknown>;
  const readString = (...keys: string[]) => {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
    return undefined;
  };

  const urlCandidate =
    readString("chatCompletionsUrl", "chatCompletionsURL", "completionsUrl", "url") ?? undefined;
  const looksLikeFullUrl = urlCandidate?.includes("/openai/") || urlCandidate?.includes("/chat/completions");

  const endpoint = looksLikeFullUrl
    ? undefined
    : readString("endpoint", "baseUrl", "resourceEndpoint", "resourceEndpointUrl") ?? urlCandidate;
  const deployment = readString("deployment", "deploymentName", "deploymentId", "modelDeployment");
  const apiVersion = readString("apiVersion", "api_version", "version");
  const apiKey = readString("apiKey", "api_key", "key", "token");
  const model = readString("model", "modelName");

  if (!apiKey) {
    return { error: "AZURE_MODEL_CONFIG is missing an apiKey." };
  }

  const chatCompletionsUrl = looksLikeFullUrl ? urlCandidate : undefined;
  if (!chatCompletionsUrl && (!endpoint || !deployment || !apiVersion)) {
    return {
      error:
        "AZURE_MODEL_CONFIG requires endpoint, deployment, and apiVersion (or a full chatCompletionsUrl)."
    };
  }

  const toNumber = (value: unknown) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsedNumber = Number(value);
      return Number.isFinite(parsedNumber) ? parsedNumber : undefined;
    }
    return undefined;
  };

  const timeoutRaw = record.timeoutMs ?? record.timeout_ms;
  const maxTokensRaw = record.maxTokens ?? record.max_tokens;
  const temperatureRaw = record.temperature;
  const responseFormat = readString("responseFormat", "response_format");

  const config: AzureModelConfig = {
    apiKey,
    endpoint,
    deployment,
    apiVersion,
    model,
    chatCompletionsUrl,
    timeoutMs: toNumber(timeoutRaw),
    maxTokens: toNumber(maxTokensRaw),
    temperature: toNumber(temperatureRaw),
    responseFormat: responseFormat === "json_object" ? "json_object" : undefined
  };

  return { config };
}

function resolveAiProvider(config: ReturnType<typeof readAiConfig>): {
  provider?: AiProvider;
  unavailableReason?: string;
} {
  if (config.provider === "azure") {
    const parsed = parseAzureModelConfig(config.azureModelConfigRaw);
    if (!parsed.config) {
      return { unavailableReason: parsed.error ?? "Azure model config is invalid." };
    }
    return { provider: new AzureOpenAiProvider(parsed.config) };
  }

  if (config.provider === "ollama") {
    if (!config.ollamaBaseUrl || !config.ollamaModel) {
      return { unavailableReason: "Ollama base URL or model is not configured." };
    }
    return {
      provider: new OllamaAiProvider({ baseUrl: config.ollamaBaseUrl, model: config.ollamaModel })
    };
  }

  if (config.provider === "local_stub") {
    if (!config.allowStub) {
      return { unavailableReason: "Local stub provider is disabled by configuration." };
    }
    return { provider: new LocalStubAiProvider() };
  }

  if (!config.provider) {
    return { unavailableReason: "No AI provider configured." };
  }

  return { unavailableReason: `Unknown AI_PROVIDER value: ${config.provider}` };
}

export class AiService {
  private readonly draftSessionService = new DraftSessionService();
  private readonly provider?: AiProvider;
  private readonly providerUnavailableReason?: string;

  constructor(provider?: AiProvider) {
    if (provider) {
      this.provider = provider;
      return;
    }

    const config = readAiConfig();
    const resolved = resolveAiProvider(config);
    this.provider = resolved.provider;
    this.providerUnavailableReason = resolved.unavailableReason;
  }

  private async ensureSessionAccess(draftSessionId: string, resumeToken?: string) {
    const session = await this.draftSessionService.getSession(draftSessionId, resumeToken);
    if (!session) return { notFound: true as const };
    if ("forbidden" in session) return { forbidden: true as const };
    return { session: session.session, currentVersion: session.currentVersion };
  }

  private async persistInteraction(params: {
    draftSessionId: string;
    willDraftVersionId?: string | null;
    interactionType: "EXTRACT" | "EXPLAIN" | "SUMMARIZE";
    modelIdentifier: string;
    providerIdentifier: string;
    promptVersion: string;
    inputPayload: unknown;
    inputPreview?: string | null;
    structuredOutput?: unknown;
    confidence?: number;
    abstained?: boolean;
    status: "ACCEPTED" | "EDITED" | "REJECTED" | "ABSTAINED" | "FAILED_SCHEMA";
    userDecision?: string | null;
  }) {
    return prisma.aiInteraction.create({
      data: {
        draftSessionId: params.draftSessionId,
        willDraftVersionId: params.willDraftVersionId ?? undefined,
        interactionType: params.interactionType,
        modelIdentifier: params.modelIdentifier,
        providerIdentifier: params.providerIdentifier,
        promptVersion: params.promptVersion,
        inputHash: hashInput(params.inputPayload),
        inputPreview: params.inputPreview ?? undefined,
        structuredOutput: params.structuredOutput as object | undefined,
        confidence: params.confidence,
        abstained: params.abstained ?? false,
        status: params.status,
        userDecision: params.userDecision ?? undefined
      }
    });
  }

  async extract(input: {
    draftSessionId: string;
    freeText: string;
    resumeToken?: string;
    inputSnapshot?: Record<string, unknown>;
  }) {
    const config = readAiConfig();
    if (!config.enabled) {
      return { disabled: true as const };
    }
    if (!this.provider) {
      return { unavailable: true as const, reason: this.providerUnavailableReason };
    }

    const sessionAccess = await this.ensureSessionAccess(input.draftSessionId, input.resumeToken);
    if ("notFound" in sessionAccess || "forbidden" in sessionAccess) {
      return sessionAccess;
    }

    let response;
    try {
      response = await this.provider.extract({
        freeText: input.freeText,
        context: input.inputSnapshot
      });
    } catch (error) {
      if (error instanceof AiProviderUnavailableError) {
        return { providerUnavailable: true as const, reason: error.message };
      }
      throw error;
    }

    const parsed = extractionCandidateSchema.safeParse(response.output);
    const schemaValid = parsed.success;
    const belowThreshold = response.confidence < config.confidenceThreshold;
    const shouldAbstain = response.abstained || belowThreshold || !schemaValid;
    const interaction = await this.persistInteraction({
      draftSessionId: input.draftSessionId,
      willDraftVersionId: sessionAccess.currentVersion?.id,
      interactionType: "EXTRACT",
      modelIdentifier: response.modelIdentifier,
      providerIdentifier: response.providerIdentifier,
      promptVersion: response.promptVersion,
      inputPayload: { freeText: input.freeText, context: input.inputSnapshot ?? null },
      inputPreview: buildPreview(input.freeText),
      structuredOutput: schemaValid ? parsed.data : null,
      confidence: response.confidence,
      abstained: shouldAbstain,
      status: shouldAbstain
        ? !schemaValid
          ? "FAILED_SCHEMA"
          : "ABSTAINED"
        : "ACCEPTED",
      userDecision: shouldAbstain ? "abstain-auto" : undefined
    });

    return {
      interactionId: interaction.id,
      modelIdentifier: response.modelIdentifier,
      promptVersion: response.promptVersion,
      confidence: response.confidence,
      uncertainty:
        shouldAbstain
          ? response.uncertainty ??
            (!schemaValid
              ? "The model output failed schema validation. Please use manual structured entry."
              : "Confidence too low. Please use manual structured entry.")
          : undefined,
      abstained: shouldAbstain,
      structuredOutput: shouldAbstain ? null : parsed.data
    };
  }

  async explain(input: {
    draftSessionId: string;
    topic: string;
    context?: string;
    resumeToken?: string;
  }) {
    const config = readAiConfig();
    if (!config.enabled) {
      return { disabled: true as const };
    }
    if (!this.provider) {
      return { unavailable: true as const, reason: this.providerUnavailableReason };
    }

    const sessionAccess = await this.ensureSessionAccess(input.draftSessionId, input.resumeToken);
    if ("notFound" in sessionAccess || "forbidden" in sessionAccess) {
      return sessionAccess;
    }

    let response;
    try {
      response = await this.provider.explain({ topic: input.topic, context: input.context });
    } catch (error) {
      if (error instanceof AiProviderUnavailableError) {
        return { providerUnavailable: true as const, reason: error.message };
      }
      throw error;
    }
    const parsed = explainResponseSchema.safeParse(response.output);
    const schemaValid = parsed.success;
    const belowThreshold = response.confidence < config.confidenceThreshold;
    const shouldAbstain = response.abstained || belowThreshold || !schemaValid;

    const interaction = await this.persistInteraction({
      draftSessionId: input.draftSessionId,
      willDraftVersionId: sessionAccess.currentVersion?.id,
      interactionType: "EXPLAIN",
      modelIdentifier: response.modelIdentifier,
      providerIdentifier: response.providerIdentifier,
      promptVersion: response.promptVersion,
      inputPayload: { topic: input.topic, context: input.context ?? null },
      inputPreview: buildPreview(`${input.topic} ${input.context ?? ""}`.trim()),
      structuredOutput: schemaValid ? parsed.data : null,
      confidence: response.confidence,
      abstained: shouldAbstain,
      status: shouldAbstain
        ? !schemaValid
          ? "FAILED_SCHEMA"
          : "ABSTAINED"
        : "ACCEPTED",
      userDecision: shouldAbstain ? "abstain-auto" : undefined
    });

    return {
      interactionId: interaction.id,
      modelIdentifier: response.modelIdentifier,
      promptVersion: response.promptVersion,
      confidence: response.confidence,
      abstained: shouldAbstain,
      uncertainty:
        shouldAbstain
          ? response.uncertainty ?? "Explanation confidence too low. Please continue with deterministic guidance."
          : parsed.data.uncertainty,
      explanation: shouldAbstain
        ? "We could not provide a high-confidence explanation. Please use the guided drafting descriptions."
        : parsed.data.explanation
    };
  }

  async summarize(input: { draftSessionId: string; freeText: string; resumeToken?: string }) {
    const config = readAiConfig();
    if (!config.enabled) {
      return { disabled: true as const };
    }
    if (!this.provider) {
      return { unavailable: true as const, reason: this.providerUnavailableReason };
    }

    const sessionAccess = await this.ensureSessionAccess(input.draftSessionId, input.resumeToken);
    if ("notFound" in sessionAccess || "forbidden" in sessionAccess) {
      return sessionAccess;
    }

    let response;
    try {
      response = await this.provider.summarize({ freeText: input.freeText });
    } catch (error) {
      if (error instanceof AiProviderUnavailableError) {
        return { providerUnavailable: true as const, reason: error.message };
      }
      throw error;
    }
    const parsed = summarizeResponseSchema.safeParse(response.output);
    const schemaValid = parsed.success;
    const belowThreshold = response.confidence < config.confidenceThreshold;
    const shouldAbstain = response.abstained || belowThreshold || !schemaValid;

    const interaction = await this.persistInteraction({
      draftSessionId: input.draftSessionId,
      willDraftVersionId: sessionAccess.currentVersion?.id,
      interactionType: "SUMMARIZE",
      modelIdentifier: response.modelIdentifier,
      providerIdentifier: response.providerIdentifier,
      promptVersion: response.promptVersion,
      inputPayload: { freeText: input.freeText },
      inputPreview: buildPreview(input.freeText),
      structuredOutput: schemaValid ? parsed.data : null,
      confidence: response.confidence,
      abstained: shouldAbstain,
      status: shouldAbstain
        ? !schemaValid
          ? "FAILED_SCHEMA"
          : "ABSTAINED"
        : "ACCEPTED",
      userDecision: shouldAbstain ? "abstain-auto" : undefined
    });

    return {
      interactionId: interaction.id,
      modelIdentifier: response.modelIdentifier,
      promptVersion: response.promptVersion,
      confidence: response.confidence,
      abstained: shouldAbstain,
      uncertainty:
        shouldAbstain
          ? response.uncertainty ?? "Summary confidence too low. Please continue with manual review."
          : undefined,
      summary: shouldAbstain ? null : parsed.data.summary,
      advocateHandoffSummary: shouldAbstain ? null : parsed.data.advocateHandoffSummary
    };
  }

  async recordInteractionDecision(input: {
    interactionId: string;
    status: "ACCEPTED" | "EDITED" | "REJECTED";
    userDecision?: string;
    structuredOutput?: Record<string, unknown>;
  }) {
    return prisma.aiInteraction.update({
      where: { id: input.interactionId },
      data: {
        status: input.status,
        userDecision: input.userDecision,
        structuredOutput: (input.structuredOutput as Prisma.InputJsonValue | undefined) ?? undefined
      }
    });
  }
}
