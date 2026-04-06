// file: apps/api/src/utils/validators.ts
import { z } from "zod";

export const willGenerateSchema = z.object({
  name: z.string().min(2),
  executor: z.string().min(2),
  assets: z.array(z.string().min(1)).default([]),
  beneficiaries: z.array(z.string().min(1)).default([]),
  hasMinors: z.boolean().default(false),
  multipleHouseholds: z.boolean().default(false),
  instructions: z
    .object({
      notes: z.string().optional(),
      funeralWishes: z.string().optional()
    })
    .optional(),
  metadata: z
    .object({
      assetAllocations: z
        .array(
          z.object({
            assetLabel: z.string(),
            allocations: z.array(
              z.object({
                beneficiary: z.string(),
                share: z.string(),
                notes: z.string()
              })
            )
          })
        )
        .optional(),
      exportPreferences: z
        .object({
          format: z.string(),
          includeChecklist: z.boolean(),
          advocateReview: z.boolean(),
          storage: z.string()
        })
        .optional(),
      existingWill: z
        .object({
          hasExisting: z.boolean(),
          type: z.enum(["will", "codicil", "unsure"]),
          notes: z.string()
        })
        .optional(),
      aiDraftSession: z
        .object({
          summary: z.string(),
          updatedAt: z.string(),
          confidence: z.string()
        })
        .optional(),
      remainderClause: z.string().optional()
    })
    .optional(),
  leadEmail: z.string().email().optional()
});

export const leadSchema = z.object({
  email: z.string().email(),
  metadata: z.record(z.any()).optional()
});

export const willIdParamSchema = z.object({
  id: z.string().uuid()
});

export const draftSessionIdParamSchema = z.object({
  id: z.string().uuid()
});

export const draftSessionCreateSchema = z.object({
  sourceMode: z.enum(["AI", "STRUCTURED"]),
  inputSnapshot: z.record(z.any())
});

export const draftSessionUpdateSchema = z.object({
  inputSnapshot: z.record(z.any())
});

export const advocateReviewRequestSchema = z.object({
  contactName: z.string().min(2).optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5).optional(),
  notes: z.string().min(2).optional()
});

export const resumeLinkSchema = z.object({
  email: z.string().email()
});

export const analyticsEventSchema = z.object({
  event: z.string().min(2),
  payload: z.record(z.any()).optional()
});
