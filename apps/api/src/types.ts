// file: apps/api/src/types.ts
export type WillInstructions = {
  notes?: string;
  funeralWishes?: string;
};

export type PersonRole = {
  name: string;
  relationship?: string;
  contact?: string;
  notes?: string;
};

export type AssetDetail = {
  label: string;
  details?: string;
  type?: "REAL_ESTATE" | "BANKING" | "VEHICLE" | "BUSINESS" | "DIGITAL" | "OTHER";
  isForeign?: boolean;
  isBusinessInterest?: boolean;
  isDigitalAsset?: boolean;
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
    type: "will" | "codicil" | "none" | "unsure";
    notes: string;
  };
  aiDraftSession?: {
    summary: string;
    updatedAt: string;
    confidence: string;
  };
  remainderClause?: string;
  executors?: PersonRole[];
  guardians?: PersonRole[];
  minorChildren?: string[];
  beneficiariesDetailed?: Array<{
    name: string;
    relationship?: string;
    share?: string;
    notes?: string;
    isPotentialConflict?: boolean;
  }>;
  assetDetails?: AssetDetail[];
  disinheritanceSignals?: string[];
  specialWishes?: string[];
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
  factors: Array<{
    flag: string;
    weight: number;
    reason: string;
  }>;
};

export type ValidityItemSeverity = "INFO" | "WARNING" | "CRITICAL";

export type ValidityResult = {
  checklist: Array<{
    code: string;
    message: string;
    severity: ValidityItemSeverity;
  }>;
  warnings: string[];
  executionGuidance: string[];
  storageGuidance: string[];
  advocateReviewRecommended: boolean;
  advocateReviewReasons: string[];
};

export type DraftConsistencyReport = {
  blockingIssues: string[];
  warnings: string[];
};

export type DraftResult = {
  draft: string;
};
