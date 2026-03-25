// file: apps/api/src/services/willService.ts
import { prisma } from "../db";
import { generateDraft } from "../engines/draftEngine";
import { computeComplexity } from "../engines/complexityEngine";
import { getValidityChecklist } from "../engines/validityEngine";
import { WillInput } from "../types";
import { LeadService } from "./leadService";

export class WillService {
  private leadService: LeadService;

  constructor(leadService = new LeadService()) {
    this.leadService = leadService;
  }

  async generate(input: WillInput, leadEmail?: string) {
    const draft = generateDraft(input);
    const complexity = computeComplexity(input);
    const validity = getValidityChecklist();

    const will = await prisma.willProfile.create({
      data: {
        personal: {
          name: input.name,
          country: input.country ?? "Kenya",
          existingWill: input.metadata?.existingWill ?? null
        },
        family: {
          beneficiaries: input.beneficiaries,
          hasMinors: input.hasMinors,
          multipleHouseholds: input.multipleHouseholds
        },
        assets: {
          list: input.assets,
          allocations: input.metadata?.assetAllocations ?? []
        },
        distribution: {
          beneficiaries: input.beneficiaries,
          remainderClause: input.metadata?.remainderClause ?? null
        },
        roles: {
          executor: input.executor,
          advocateReviewRequested: input.metadata?.exportPreferences?.advocateReview ?? false
        },
        instructions: {
          notes: input.instructions?.notes ?? null,
          funeralWishes: input.instructions?.funeralWishes ?? null,
          metadata: input.metadata ?? null
        },
        complexity,
        validity,
        draft
      }
    });

    if (leadEmail) {
      await this.leadService.captureLead({
        email: leadEmail,
        willId: will.id,
        metadata: {
          source: "generate",
          hasMinors: input.hasMinors
        }
      });
    }

    return {
      id: will.id,
      draft,
      complexity,
      validity,
      metadata: input.metadata ?? null
    };
  }

  async getById(id: string) {
    return prisma.willProfile.findUnique({
      where: { id }
    });
  }
}
