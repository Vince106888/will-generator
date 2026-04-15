import { z } from "zod";

const confidenceSchema = z.number().min(0).max(1).optional();

const personSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().optional(),
  notes: z.string().optional(),
  confidence: confidenceSchema
}).strict();

const beneficiarySchema = z.object({
  name: z.string().min(1),
  relationship: z.string().optional(),
  share: z.string().optional(),
  notes: z.string().optional(),
  confidence: confidenceSchema
}).strict();

const assetSchema = z.object({
  label: z.string().min(1),
  details: z.string().optional(),
  category: z.string().optional(),
  isForeign: z.boolean().optional(),
  confidence: confidenceSchema
}).strict();

const wishSchema = z.object({
  text: z.string().min(1),
  confidence: confidenceSchema
}).strict();

const personalDetailsSchema = z
  .object({
    fullName: z.string().optional(),
    maritalStatus: z.string().optional(),
    spouseName: z.string().optional(),
    domicile: z.string().optional(),
    notes: z.string().optional()
  })
  .strict();

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
      ),
    dependants: z
      .array(
        z.object({
          name: z.string().min(1),
          relationship: z.string().optional(),
          notes: z.string().optional(),
          confidence: confidenceSchema
        })
      )
  })
  .strict();

const residueSchema = z
  .object({
    notes: z.string().optional(),
    beneficiaries: z.array(beneficiarySchema)
  })
  .strict();

export const extractionCandidateSchema = z.object({
  summary: z.string().min(1),
  extracted: z
    .object({
      personalDetails: personalDetailsSchema,
      familyStructure: familyStructureSchema,
      executors: z.array(personSchema),
      guardians: z.array(personSchema),
      assets: z.array(assetSchema),
      beneficiaries: z.array(beneficiarySchema),
      residue: residueSchema,
      specialWishes: z.array(wishSchema)
    })
    .strict(),
  missingInformation: z.array(z.string().min(1)),
  ambiguityWarnings: z.array(z.string().min(1)),
  complexitySignals: z.array(z.string().min(1)),
  confidence: z.number().min(0).max(1),
  recommendedNextQuestions: z.array(z.string().min(1))
}).strict();

export const explainResponseSchema = z.object({
  explanation: z.string().min(1),
  uncertainty: z.string().optional(),
  confidence: z.number().min(0).max(1)
}).strict();

export const summarizeResponseSchema = z.object({
  summary: z.string().min(1),
  advocateHandoffSummary: z.string().min(1),
  confidence: z.number().min(0).max(1)
}).strict();

export type ExtractionCandidateOutput = z.infer<typeof extractionCandidateSchema>;
export type ExplainOutput = z.infer<typeof explainResponseSchema>;
export type SummarizeOutput = z.infer<typeof summarizeResponseSchema>;
