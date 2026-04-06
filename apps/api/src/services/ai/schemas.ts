import { z } from "zod";

export const extractionCandidateSchema = z.object({
  assets: z
    .array(
      z.object({
        label: z.string().min(1),
        details: z.string().optional(),
        confidence: z.number().min(0).max(1).optional()
      })
    )
    .default([]),
  beneficiaries: z
    .array(
      z.object({
        name: z.string().min(1),
        relationship: z.string().optional(),
        confidence: z.number().min(0).max(1).optional()
      })
    )
    .default([]),
  executors: z
    .array(
      z.object({
        name: z.string().min(1),
        relationship: z.string().optional(),
        confidence: z.number().min(0).max(1).optional()
      })
    )
    .default([]),
  guardians: z
    .array(
      z.object({
        name: z.string().min(1),
        relationship: z.string().optional(),
        confidence: z.number().min(0).max(1).optional()
      })
    )
    .default([]),
  specialWishes: z
    .array(
      z.object({
        text: z.string().min(1),
        confidence: z.number().min(0).max(1).optional()
      })
    )
    .default([]),
  notes: z.array(z.string().min(1)).default([])
});

export const explainResponseSchema = z.object({
  explanation: z.string().min(1),
  uncertainty: z.string().optional(),
  confidence: z.number().min(0).max(1)
});

export const summarizeResponseSchema = z.object({
  summary: z.string().min(1),
  advocateHandoffSummary: z.string().min(1),
  confidence: z.number().min(0).max(1)
});

export type ExtractionCandidateOutput = z.infer<typeof extractionCandidateSchema>;
export type ExplainOutput = z.infer<typeof explainResponseSchema>;
export type SummarizeOutput = z.infer<typeof summarizeResponseSchema>;