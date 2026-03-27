// file: apps/api/src/types.ts
export type WillInstructions = {
  notes?: string;
  funeralWishes?: string;
};

export type WillMetadata = {
  assetAllocations?: Array<{
    assetLabel: string;
    allocations: Array<{ beneficiary: string; share: string; notes: string }>;
  }>;
  exportPreferences?: {
    format: string;
    includeChecklist: boolean;
    advocateReview: boolean;
    storage: string;
  };
  existingWill?: {
    hasExisting: boolean;
    type: "will" | "codicil" | "unsure";
    notes: string;
  };
  aiDraftSession?: {
    summary: string;
    updatedAt: string;
    confidence: string;
  };
  remainderClause?: string;
};

export type WillInput = {
  name: string;
  executor: string;
  assets: string[];
  beneficiaries: string[];
  hasMinors: boolean;
  multipleHouseholds: boolean;
  instructions?: WillInstructions;
  metadata?: WillMetadata;
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
