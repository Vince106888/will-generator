// file: apps/api/src/services/leadService.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../db";

export type LeadInput = {
  email: string;
  willId?: string;
  metadata?: Prisma.InputJsonValue;
};

export class LeadService {
  async captureLead(input: LeadInput) {
    return prisma.lead.create({
      data: {
        email: input.email,
        willId: input.willId,
        metadata: input.metadata
      }
    });
  }

  async captureAdvocateReview(input: {
    draftSessionId: string;
    willDraftVersionId: string | null;
    contactName: string | null;
    contactEmail: string;
    contactPhone: string | null;
    notes: string | null;
  }) {
    return prisma.advocateReviewRequest.create({
      data: {
        draftSessionId: input.draftSessionId,
        willDraftVersionId: input.willDraftVersionId ?? undefined,
        contactName: input.contactName ?? undefined,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone ?? undefined,
        notes: input.notes ?? undefined
      }
    });
  }

  async getAdvocateReviewRequest(requestId: string, draftSessionId: string) {
    return prisma.advocateReviewRequest.findFirst({
      where: { id: requestId, draftSessionId }
    });
  }
}
