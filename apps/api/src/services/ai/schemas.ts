import { z } from "zod";

const confidenceSchema = z.number().min(0).max(1).optional();

const personSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().optional(),
  notes: z.string().optional(),
  confidence: confidenceSchema
});

const beneficiarySchema = z.object({
  name: z.string().min(1),
  relationship: z.string().optional(),
  share: z.string().optional(),
  notes: z.string().optional(),
  confidence: confidenceSchema
});

const assetSchema = z.object({
  label: z.string().min(1),
  details: z.string().optional(),
  category: z.string().optional(),
  isForeign: z.boolean().optional(),
  confidence: confidenceSchema
});

const wishSchema = z.object({
  text: z.string().min(1),
  confidence: confidenceSchema
});

const personalDetailsSchema = z
  .object({
    fullName: z.string().optional(),
    maritalStatus: z.string().optional(),
    spouseName: z.string().optional(),
    domicile: z.string().optional(),
    notes: z.string().optional()
  })
  .default({});

const familyStructureSchema = z
  .object({
    hasMinors: z.boolean().optional(),
    children: z
      .array(
        z.object({
          name: z.string().min(1),
          relationship: z.string().optional(),
          age: z.string().optional(),
          notes: z.string().optional(),
          confidence: confidenceSchema
        })
      )
      .default([]),
    dependants: z
      .array(
        z.object({
          name: z.string().min(1),
          relationship: z.string().optional(),
          notes: z.string().optional(),
          confidence: confidenceSchema
        })
      )
      .default([])
  })
  .default({ children: [], dependants: [] });

const residueSchema = z
  .object({
    notes: z.string().optional(),
    beneficiaries: z.array(beneficiarySchema).default([])
  })
  .default({ beneficiaries: [] });

export const extractionCandidateSchema = z.object({
  summary: z.string().min(1),
  extracted: z
    .object({
      personalDetails: personalDetailsSchema,
      familyStructure: familyStructureSchema,
      executors: z.array(personSchema).default([]),
      guardians: z.array(personSchema).default([]),
      assets: z.array(assetSchema).default([]),
      beneficiaries: z.array(beneficiarySchema).default([]),
      residue: residueSchema,
      specialWishes: z.array(wishSchema).default([])
    })
    .default({
      personalDetails: {},
      familyStructure: { children: [], dependants: [] },
      executors: [],
      guardians: [],
      assets: [],
      beneficiaries: [],
      residue: { beneficiaries: [] },
      specialWishes: []
    }),
  missingInformation: z.array(z.string().min(1)).default([]),
  ambiguityWarnings: z.array(z.string().min(1)).default([]),
  complexitySignals: z.array(z.string().min(1)).default([]),
  confidence: z.number().min(0).max(1),
  recommendedNextQuestions: z.array(z.string().min(1)).default([])
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
