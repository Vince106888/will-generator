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
          country: input.country ?? "Kenya"
        },
        family: {
          beneficiaries: input.beneficiaries,
          hasMinors: input.hasMinors,
          multipleHouseholds: input.multipleHouseholds
        },
        assets: {
          list: input.assets
        },
        distribution: {
          beneficiaries: input.beneficiaries
        },
        roles: {
          executor: input.executor
        },
        instructions: {
          notes: input.instructions?.notes ?? null,
          funeralWishes: input.instructions?.funeralWishes ?? null
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
      validity
    };
  }

  async getById(id: string) {
    return prisma.willProfile.findUnique({
      where: { id }
    });
  }
}
