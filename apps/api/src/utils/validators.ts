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
  leadEmail: z.string().email().optional()
});

export const leadSchema = z.object({
  email: z.string().email(),
  metadata: z.record(z.any()).optional()
});

export const willIdParamSchema = z.object({
  id: z.string().uuid()
});
