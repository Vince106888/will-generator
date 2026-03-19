// file: apps/api/src/types.ts
export type WillInstructions = {
  notes?: string;
  funeralWishes?: string;
};

export type WillInput = {
  name: string;
  executor: string;
  assets: string[];
  beneficiaries: string[];
  hasMinors: boolean;
  multipleHouseholds: boolean;
  instructions?: WillInstructions;
  country?: string;
};

export type ComplexityResult = {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH";
  flags: string[];
};

export type ValidityChecklist = string[];

export type DraftResult = {
  draft: string;
};
