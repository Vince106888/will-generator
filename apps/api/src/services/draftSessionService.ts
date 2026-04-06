// file: apps/api/src/services/draftSessionService.ts
import crypto from "crypto";
import { prisma } from "../db";
import { computeComplexity } from "../engines/complexityEngine";
import { generateDraft } from "../engines/draftEngine";
import { getValidityChecklist } from "../engines/validityEngine";
import { WillInput } from "../types";

type DraftSessionCreateInput = {
  sourceMode: "AI" | "STRUCTURED";
  inputSnapshot: Record<string, unknown>;
};

type DraftSessionUpdateInput = {
  inputSnapshot: Record<string, unknown>;
};

type AssetAllocations = NonNullable<WillInput["metadata"]>["assetAllocations"];
type ExportPreferences = NonNullable<WillInput["metadata"]>["exportPreferences"];
type ExistingWill = NonNullable<WillInput["metadata"]>["existingWill"];
type AiDraftSession = NonNullable<WillInput["metadata"]>["aiDraftSession"];

function createResumeToken() {
  return crypto.randomUUID();
}

function hashResumeToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function mergeSnapshot(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return base;
  if (patch === null) return null;
  if (Array.isArray(patch)) return patch;
  if (typeof patch !== "object") return patch;

  const baseObject = typeof base === "object" && base !== null ? (base as Record<string, unknown>) : {};
  const patchObject = patch as Record<string, unknown>;
  const result: Record<string, unknown> = { ...baseObject };

  for (const [key, value] of Object.entries(patchObject)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      result[key] = value;
      continue;
    }
    if (typeof value === "object" && value !== null) {
      result[key] = mergeSnapshot(baseObject[key], value);
      continue;
    }
    result[key] = value;
  }

  return result;
}

function mapDraftingSnapshotToWillInput(snapshot: Record<string, unknown>): WillInput {
  const executors = Array.isArray(snapshot.executors) ? snapshot.executors : [];
  const beneficiaries = Array.isArray(snapshot.beneficiaries) ? snapshot.beneficiaries : [];
  const assets = Array.isArray(snapshot.assets) ? snapshot.assets : [];

  const mappedAssets = assets
    .map((asset) => {
      if (!asset || typeof asset !== "object") return "";
      const item = asset as Record<string, unknown>;
      const label = String(item.label ?? "").trim();
      const location = String(item.location ?? "").trim();
      const notes = String(item.notes ?? "").trim();
      if (!location && !notes) return "";
      if (label && location) return `${label}: ${location}`;
      return label || location || notes;
    })
    .filter(Boolean);

  const mappedBeneficiaries = beneficiaries
    .map((beneficiary) => {
      if (!beneficiary || typeof beneficiary !== "object") return "";
      return String((beneficiary as Record<string, unknown>).name ?? "").trim();
    })
    .filter(Boolean);

  const instructionsNotes = [
    snapshot.dependantsNotes,
    snapshot.distributionNotes,
    snapshot.residuaryWishes,
    snapshot.specialWishes,
    snapshot.digitalWishes,
    snapshot.charitableIntentions,
    snapshot.executorNotes,
    snapshot.guardianNotes,
    snapshot.remainderClause
  ]
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean)
    .join("\n\n");

  const funeralWishes =
    typeof snapshot.funeralWishes === "string" ? snapshot.funeralWishes.trim() : "";

  return {
    name: String(snapshot.legalName ?? "").trim() || "Unknown",
    executor: String((executors[0] as Record<string, unknown>)?.name ?? "").trim(),
    assets: mappedAssets,
    beneficiaries: mappedBeneficiaries,
    hasMinors: Boolean(snapshot.hasMinors),
    multipleHouseholds: Boolean(snapshot.multipleHouseholds),
    instructions: {
      notes: instructionsNotes || undefined,
      funeralWishes: funeralWishes || undefined
    },
    metadata: {
      assetAllocations: (snapshot.assetAllocations as AssetAllocations) ?? [],
      exportPreferences: snapshot.exportPreferences as ExportPreferences,
      existingWill: snapshot.existingWill as ExistingWill,
      aiDraftSession: snapshot.aiDraftSession as AiDraftSession,
      remainderClause: typeof snapshot.remainderClause === "string" ? snapshot.remainderClause : undefined
    },
    country: "Kenya"
  };
}

export class DraftSessionService {
  async createSession(input: DraftSessionCreateInput) {
    const resumeToken = createResumeToken();
    const session = await prisma.draftSession.create({
      data: {
        sourceMode: input.sourceMode,
        inputSnapshot: input.inputSnapshot,
        resumeTokenHash: hashResumeToken(resumeToken),
        status: "IN_PROGRESS"
      }
    });

    return {
      session,
      resumeToken
    };
  }

  async getSession(sessionId: string, resumeToken?: string) {
    const session = await prisma.draftSession.findUnique({
      where: { id: sessionId }
    });
    if (!session) return null;
    if (session.resumeTokenHash && resumeToken) {
      const providedHash = hashResumeToken(resumeToken);
      if (providedHash !== session.resumeTokenHash) {
        return { forbidden: true };
      }
    } else if (session.resumeTokenHash && !resumeToken) {
      return { forbidden: true };
    }

    const currentVersion = await prisma.willDraftVersion.findFirst({
      where: { draftSessionId: sessionId, isCurrent: true },
      orderBy: { version: "desc" }
    });

    return { session, currentVersion };
  }

  async updateSession(sessionId: string, input: DraftSessionUpdateInput, resumeToken?: string) {
    const existing = await prisma.draftSession.findUnique({
      where: { id: sessionId }
    });
    if (!existing) return null;
    if (existing.resumeTokenHash && resumeToken) {
      const providedHash = hashResumeToken(resumeToken);
      if (providedHash !== existing.resumeTokenHash) {
        return { forbidden: true };
      }
    } else if (existing.resumeTokenHash && !resumeToken) {
      return { forbidden: true };
    }

    const mergedSnapshot = mergeSnapshot(existing.inputSnapshot, input.inputSnapshot) as Record<
      string,
      unknown
    >;

    const session = await prisma.draftSession.update({
      where: { id: sessionId },
      data: {
        inputSnapshot: mergedSnapshot
      }
    });

    return { session };
  }

  async finalizeSession(sessionId: string, resumeToken?: string) {
    const existing = await prisma.draftSession.findUnique({
      where: { id: sessionId }
    });
    if (!existing) return null;
    if (existing.resumeTokenHash && resumeToken) {
      const providedHash = hashResumeToken(resumeToken);
      if (providedHash !== existing.resumeTokenHash) {
        return { forbidden: true };
      }
    } else if (existing.resumeTokenHash && !resumeToken) {
      return { forbidden: true };
    }

    const inputSnapshot = existing.inputSnapshot as Record<string, unknown>;
    const willInput = mapDraftingSnapshotToWillInput(inputSnapshot);
    const draft = generateDraft(willInput);
    const complexity = computeComplexity(willInput);
    const validity = getValidityChecklist();

    const latestVersion = await prisma.willDraftVersion.findFirst({
      where: { draftSessionId: sessionId },
      orderBy: { version: "desc" }
    });
    const nextVersion = (latestVersion?.version ?? 0) + 1;

    const created = await prisma.$transaction(async (tx) => {
      await tx.willDraftVersion.updateMany({
        where: { draftSessionId: sessionId, isCurrent: true },
        data: { isCurrent: false }
      });

      const version = await tx.willDraftVersion.create({
        data: {
          draftSessionId: sessionId,
          version: nextVersion,
          inputSnapshot,
          generatedDraft: draft,
          complexityResult: complexity,
          validityResult: validity,
          isCurrent: true
        }
      });

      const session = await tx.draftSession.update({
        where: { id: sessionId },
        data: { status: "FINALIZED" }
      });

      const willProfile = await tx.willProfile.create({
        data: {
          personal: {
            name: willInput.name,
            country: willInput.country ?? "Kenya",
            existingWill: willInput.metadata?.existingWill ?? null
          },
          family: {
            beneficiaries: willInput.beneficiaries,
            hasMinors: willInput.hasMinors,
            multipleHouseholds: willInput.multipleHouseholds
          },
          assets: {
            list: willInput.assets,
            allocations: willInput.metadata?.assetAllocations ?? []
          },
          distribution: {
            beneficiaries: willInput.beneficiaries,
            remainderClause: willInput.metadata?.remainderClause ?? null
          },
          roles: {
            executor: willInput.executor,
            advocateReviewRequested: willInput.metadata?.exportPreferences?.advocateReview ?? false
          },
          instructions: {
            notes: willInput.instructions?.notes ?? null,
            funeralWishes: willInput.instructions?.funeralWishes ?? null,
            metadata: willInput.metadata ?? null
          },
          complexity,
          validity,
          draft
        }
      });

      return { session, version, willProfile };
    });

    return {
      session: created.session,
      version: created.version,
      willProfile: created.willProfile,
      draft,
      complexity,
      validity
    };
  }
}
