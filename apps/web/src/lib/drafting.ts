import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "./storage";

export type DraftingData = {
  legalName: string;
  idNumber: string;
  idType: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  county: string;
  maritalStatus: string;
  spouseName: string;
  spousePhone: string;
  dependantsNotes: string;
  dependants: Array<{ name: string; relationship: string; age: string; location: string }>;
  hasMinors: boolean;
  multipleHouseholds: boolean;
  executors: Array<{ name: string; relationship: string; phone: string }>;
  beneficiaries: Array<{ name: string; relationship: string; phone: string; idType: string; share: string }>;
  assets: Array<{ label: string; location: string; notes: string }>;
  distributionNotes: string;
  residuaryWishes: string;
  guardians: Array<{ name: string; relationship: string; phone: string; location: string; notes: string }>;
  specialWishes: string;
  funeralWishes: string;
  digitalWishes: string;
  charitableIntentions: string;
  assetAllocations: Array<{
    assetLabel: string;
    allocations: Array<{ beneficiary: string; share: string; notes: string }>;
  }>;
  remainderClause: string;
  executorNotes: string;
  guardianNotes: string;
  aiDraftSession: {
    summary: string;
    updatedAt: string;
    confidence: string;
  };
  exportPreferences: {
    format: string;
    includeChecklist: boolean;
    advocateReview: boolean;
    storage: string;
  };
  existingWill: {
    hasExisting: boolean;
    type: "will" | "codicil" | "none" | "unsure";
    notes: string;
  };
  draftingMode: "ai" | "structured";
  draftingModeConfirmed: boolean;
};

export const defaultDraftingData: DraftingData = {
  legalName: "",
  idNumber: "",
  idType: "National ID",
  dateOfBirth: "",
  email: "",
  phone: "",
  address: "",
  county: "",
  maritalStatus: "",
  spouseName: "",
  spousePhone: "",
  dependantsNotes: "",
  dependants: [{ name: "", relationship: "", age: "", location: "" }],
  hasMinors: false,
  multipleHouseholds: false,
  executors: [
    { name: "", relationship: "", phone: "" },
    { name: "", relationship: "", phone: "" }
  ],
  beneficiaries: [{ name: "", relationship: "", phone: "", idType: "", share: "" }],
  assets: [
    { label: "Land & real property", location: "", notes: "" },
    { label: "Bank, SACCO & M-Pesa", location: "", notes: "" },
    { label: "Vehicles", location: "", notes: "" },
    { label: "Business interests", location: "", notes: "" },
    { label: "Personal property", location: "", notes: "" },
    { label: "Other assets", location: "", notes: "" }
  ],
  distributionNotes: "",
  residuaryWishes: "",
  guardians: [
    { name: "", relationship: "", phone: "", location: "", notes: "" },
    { name: "", relationship: "", phone: "", location: "", notes: "" }
  ],
  specialWishes: "",
  funeralWishes: "",
  digitalWishes: "",
  charitableIntentions: "",
  assetAllocations: [],
  remainderClause: "",
  executorNotes: "",
  guardianNotes: "",
  aiDraftSession: {
    summary: "",
    updatedAt: "",
    confidence: "medium"
  },
  exportPreferences: {
    format: "pdf",
    includeChecklist: true,
    advocateReview: false,
    storage: "secure-vault"
  },
  existingWill: {
    hasExisting: false,
    type: "unsure",
    notes: ""
  },
  draftingMode: "ai",
  draftingModeConfirmed: false
};

const STORAGE_KEY = STORAGE_KEYS.draftingData;

export function loadDraftingData(): DraftingData {
  if (typeof window === "undefined") return defaultDraftingData;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultDraftingData;
  try {
    const parsed = { ...defaultDraftingData, ...JSON.parse(stored) } as DraftingData;
    if (!Array.isArray(parsed.executors) || parsed.executors.length === 0) {
      parsed.executors = defaultDraftingData.executors;
    }
    if (parsed.executors.length < 2) {
      parsed.executors = [
        ...parsed.executors,
        { name: "", relationship: "", phone: "" }
      ];
    }
    if (!Array.isArray(parsed.beneficiaries) || parsed.beneficiaries.length === 0) {
      parsed.beneficiaries = defaultDraftingData.beneficiaries;
    }
    if (!Array.isArray(parsed.assets) || parsed.assets.length === 0) {
      parsed.assets = defaultDraftingData.assets;
    }
    if (!Array.isArray(parsed.guardians) || parsed.guardians.length === 0) {
      parsed.guardians = defaultDraftingData.guardians;
    }
    if (parsed.guardians.length < 2) {
      parsed.guardians = [
        ...parsed.guardians,
        { name: "", relationship: "", phone: "", location: "", notes: "" }
      ];
    }
    if (!Array.isArray(parsed.dependants) || parsed.dependants.length === 0) {
      parsed.dependants = defaultDraftingData.dependants;
    }
    if (!Array.isArray(parsed.assetAllocations)) {
      parsed.assetAllocations = defaultDraftingData.assetAllocations;
    }
    if (!parsed.aiDraftSession) {
      parsed.aiDraftSession = defaultDraftingData.aiDraftSession;
    }
    if (!parsed.exportPreferences) {
      parsed.exportPreferences = defaultDraftingData.exportPreferences;
    }
    if (!parsed.existingWill) {
      parsed.existingWill = defaultDraftingData.existingWill;
    }
    if (!parsed.draftingMode) {
      parsed.draftingMode = defaultDraftingData.draftingMode;
    }
    if (typeof parsed.draftingModeConfirmed !== "boolean") {
      parsed.draftingModeConfirmed = defaultDraftingData.draftingModeConfirmed;
    }
    return parsed;
  } catch {
    return defaultDraftingData;
  }
}

export function saveDraftingData(data: DraftingData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useDraftingData() {
  const [data, setData] = useState<DraftingData>(() => loadDraftingData());

  useEffect(() => {
    saveDraftingData(data);
  }, [data]);

  const update = (next: Partial<DraftingData>) => {
    setData((prev) => ({ ...prev, ...next }));
  };

  return { data, update, setData };
}

export function buildGeneratePayload(data: DraftingData) {
  return {
    name: data.legalName.trim() || "Unknown",
    executor: data.executors[0]?.name?.trim() || "",
    assets: data.assets
      .map((asset) => {
        const label = asset.label.trim();
        const details = asset.location.trim();
        const notes = asset.notes.trim();
        if (!details && !notes) return "";
        if (label && details) return `${label}: ${details}`;
        return label || details || notes;
      })
      .filter(Boolean),
    beneficiaries: data.beneficiaries
      .map((beneficiary) => beneficiary.name.trim())
      .filter(Boolean),
    hasMinors: data.hasMinors,
    multipleHouseholds: data.multipleHouseholds,
    instructions: {
      notes: [
        data.dependantsNotes,
        data.distributionNotes,
        data.residuaryWishes,
        data.specialWishes,
        data.digitalWishes,
        data.charitableIntentions,
        data.executorNotes,
        data.guardianNotes,
        data.remainderClause
      ]
        .map((item) => item.trim())
        .filter(Boolean)
        .join("\n\n") || undefined,
      funeralWishes: data.funeralWishes.trim() || undefined
    },
    metadata: {
      assetAllocations: data.assetAllocations,
      exportPreferences: data.exportPreferences,
      existingWill: data.existingWill,
      aiDraftSession: data.aiDraftSession,
      remainderClause: data.remainderClause
    }
  };
}
