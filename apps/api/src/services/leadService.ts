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
}
