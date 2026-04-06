import crypto from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../../db";
import { DraftSessionService } from "../draftSessionService";
import { LocalStubAiProvider } from "./providers/localStubProvider";
import { extractionCandidateSchema, explainResponseSchema, summarizeResponseSchema } from "./schemas";
import { AiProvider } from "./types";

const DEFAULT_CONFIDENCE_THRESHOLD = 0.6;

function readAiConfig() {
  return {
    enabled: process.env.AI_ASSIST_ENABLED === "true",
    allowStub: process.env.AI_ALLOW_LOCAL_STUB === "true",
    confidenceThreshold: Number(process.env.AI_CONFIDENCE_THRESHOLD ?? DEFAULT_CONFIDENCE_THRESHOLD)
  };
}

function hashInput(input: unknown) {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

function buildPreview(value: string) {
  if (!value) return null;
  return value.length > 240 ? `${value.slice(0, 237)}...` : value;
}

export class AiService {
  private readonly draftSessionService = new DraftSessionService();
  private readonly provider: AiProvider;

  constructor(provider?: AiProvider) {
    this.provider = provider ?? new LocalStubAiProvider();
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
    if (!config.allowStub) {
      return { unavailable: true as const };
    }

    const sessionAccess = await this.ensureSessionAccess(input.draftSessionId, input.resumeToken);
    if ("notFound" in sessionAccess || "forbidden" in sessionAccess) {
      return sessionAccess;
    }

    const response = await this.provider.extract({
      freeText: input.freeText,
      context: input.inputSnapshot
    });

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
    if (!config.allowStub) {
      return { unavailable: true as const };
    }

    const sessionAccess = await this.ensureSessionAccess(input.draftSessionId, input.resumeToken);
    if ("notFound" in sessionAccess || "forbidden" in sessionAccess) {
      return sessionAccess;
    }

    const response = await this.provider.explain({ topic: input.topic, context: input.context });
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
    if (!config.allowStub) {
      return { unavailable: true as const };
    }

    const sessionAccess = await this.ensureSessionAccess(input.draftSessionId, input.resumeToken);
    if ("notFound" in sessionAccess || "forbidden" in sessionAccess) {
      return sessionAccess;
    }

    const response = await this.provider.summarize({ freeText: input.freeText });
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