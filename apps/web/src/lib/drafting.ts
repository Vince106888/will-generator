import { useCallback, useEffect, useRef, useState } from "react";
import { STORAGE_KEYS } from "./storage";
import { api } from "./api";
import { trackEvent } from "./analytics";
import axios from "axios";
import { describeApiError } from "./apiErrors";

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
    interactionId?: string;
    freeTextNotes?: string;
    extractionCandidates?: {
      summary: string;
      extracted: {
        personalDetails: {
          fullName?: string;
          maritalStatus?: string;
          spouseName?: string;
          domicile?: string;
          notes?: string;
        };
        familyStructure: {
          hasMinors?: boolean;
          children: Array<{
            name: string;
            relationship?: string;
            age?: string;
            notes?: string;
            confidence?: number;
          }>;
          dependants: Array<{
            name: string;
            relationship?: string;
            notes?: string;
            confidence?: number;
          }>;
        };
        executors: Array<{ name: string; relationship?: string; notes?: string; confidence?: number }>;
        guardians: Array<{ name: string; relationship?: string; notes?: string; confidence?: number }>;
        assets: Array<{
          label: string;
          details?: string;
          category?: string;
          isForeign?: boolean;
          confidence?: number;
        }>;
        beneficiaries: Array<{
          name: string;
          relationship?: string;
          share?: string;
          notes?: string;
          confidence?: number;
        }>;
        residue: {
          notes?: string;
          beneficiaries: Array<{
            name: string;
            relationship?: string;
            share?: string;
            notes?: string;
            confidence?: number;
          }>;
        };
        specialWishes: Array<{ text: string; confidence?: number }>;
      };
      missingInformation: string[];
      ambiguityWarnings: string[];
      complexitySignals: string[];
      confidence: number;
      recommendedNextQuestions: string[];
    };
    explain?: {
      topic: string;
      explanation: string;
      confidence: number;
      uncertainty?: string;
    };
    abstained?: boolean;
    uncertainty?: string;
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

export type DraftingMode = DraftingData["draftingMode"];

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
    confidence: "medium",
    interactionId: "",
    freeTextNotes: "",
    extractionCandidates: {
      summary: "",
      extracted: {
        personalDetails: {},
        familyStructure: { children: [], dependants: [] },
        executors: [],
        guardians: [],
        assets: [],
        beneficiaries: [],
        residue: { beneficiaries: [] },
        specialWishes: []
      },
      missingInformation: [],
      ambiguityWarnings: [],
      complexitySignals: [],
      confidence: 0,
      recommendedNextQuestions: []
    },
    explain: {
      topic: "",
      explanation: "",
      confidence: 0,
      uncertainty: ""
    },
    abstained: false,
    uncertainty: ""
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
const SESSION_KEY = STORAGE_KEYS.draftingSession;

export type DraftSessionMeta = {
  sessionId: string;
  resumeToken: string;
  sourceMode: "AI" | "STRUCTURED";
};

export type DraftSessionStatus = {
  loading: boolean;
  error?: string;
  lastSyncedAt?: string;
};

export function loadDraftingSessionMeta(): DraftSessionMeta | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as DraftSessionMeta;
  } catch {
    return null;
  }
}

export function saveDraftingSessionMeta(meta: DraftSessionMeta) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(meta));
}

export function clearDraftingSessionMeta() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

async function createDraftSession(sourceMode: DraftSessionMeta["sourceMode"], inputSnapshot: DraftingData) {
  const response = await api.post("/api/v1/draft-sessions", {
    sourceMode,
    inputSnapshot
  });
  return response.data as {
    sessionId: string;
    resumeToken: string;
    sourceMode: DraftSessionMeta["sourceMode"];
    inputSnapshot: DraftingData;
    updatedAt: string;
  };
}

async function getDraftSession(meta: DraftSessionMeta) {
  const response = await api.get(`/api/v1/draft-sessions/${meta.sessionId}`, {
    headers: { "x-draft-token": meta.resumeToken }
  });
  return response.data as {
    sessionId: string;
    sourceMode: DraftSessionMeta["sourceMode"];
    inputSnapshot: DraftingData;
    updatedAt: string;
  };
}

async function updateDraftSession(meta: DraftSessionMeta, inputSnapshot: DraftingData) {
  const response = await api.patch(
    `/api/v1/draft-sessions/${meta.sessionId}`,
    { inputSnapshot },
    { headers: { "x-draft-token": meta.resumeToken } }
  );
  return response.data as {
    sessionId: string;
    sourceMode: DraftSessionMeta["sourceMode"];
    inputSnapshot: DraftingData;
    updatedAt: string;
  };
}

export function normalizeDraftingData(raw: DraftingData): DraftingData {
  const parsed = { ...defaultDraftingData, ...raw } as DraftingData;
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
}

export function loadDraftingData(): DraftingData {
  if (typeof window === "undefined") return defaultDraftingData;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultDraftingData;
  try {
    return normalizeDraftingData(JSON.parse(stored));
  } catch {
    return defaultDraftingData;
  }
}

export function saveDraftingData(data: DraftingData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function persistDraftingSession(meta: DraftSessionMeta, snapshot: DraftingData) {
  saveDraftingSessionMeta(meta);
  saveDraftingData(normalizeDraftingData(snapshot));
}

export function useDraftingData() {
  const [data, setData] = useState<DraftingData>(() => loadDraftingData());
  const [session, setSession] = useState<DraftSessionMeta | null>(null);
  const [status, setStatus] = useState<DraftSessionStatus>({ loading: true });
  const pendingSync = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestSnapshot = useRef<DraftingData>(data);

  useEffect(() => {
    saveDraftingData(data);
    latestSnapshot.current = data;
  }, [data]);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        setStatus({ loading: true });
        const storedSession = loadDraftingSessionMeta();
        if (storedSession) {
          try {
            const remote = await getDraftSession(storedSession);
            if (!isMounted) return;
            const cached = loadDraftingData();
            const remoteSnapshot = remote.inputSnapshot as Partial<DraftingData>;
            const mergedSnapshot: DraftingData = {
              ...cached,
              ...remoteSnapshot,
              draftingMode:
                remoteSnapshot.draftingMode ?? cached.draftingMode,
              draftingModeConfirmed:
                typeof remoteSnapshot.draftingModeConfirmed === "boolean"
                  ? remoteSnapshot.draftingModeConfirmed
                  : cached.draftingModeConfirmed
            };
            setSession(storedSession);
            setData(normalizeDraftingData(mergedSnapshot));
            setStatus({ loading: false, lastSyncedAt: remote.updatedAt });
            return;
          } catch (error) {
            if (!isMounted) return;
            if (axios.isAxiosError(error)) {
              const statusCode = error.response?.status;
              if (statusCode === 403 || statusCode === 404) {
                clearDraftingSessionMeta();
                if (typeof window !== "undefined") {
                  window.localStorage.removeItem(STORAGE_KEYS.willResult);
                }
                const cached = loadDraftingData();
                const sourceMode = cached.draftingMode === "ai" ? "AI" : "STRUCTURED";
                const created = await createDraftSession(sourceMode, cached);
                if (!isMounted) return;
                const meta: DraftSessionMeta = {
                  sessionId: created.sessionId,
                  resumeToken: created.resumeToken,
                  sourceMode: created.sourceMode
                };
                saveDraftingSessionMeta(meta);
                setSession(meta);
                setData(
                  normalizeDraftingData({
                    ...created.inputSnapshot,
                    ...latestSnapshot.current
                  })
                );
                setStatus({
                  loading: false,
                  lastSyncedAt: created.updatedAt,
                  error:
                    "Previous draft session could not be resumed. A new session has been started."
                });
                return;
              }
            }
            throw error;
          }
        }

        const seedSnapshot = latestSnapshot.current ?? defaultDraftingData;
        const sourceMode = seedSnapshot.draftingMode === "ai" ? "AI" : "STRUCTURED";
        const created = await createDraftSession(sourceMode, seedSnapshot);
        if (!isMounted) return;
        const meta: DraftSessionMeta = {
          sessionId: created.sessionId,
          resumeToken: created.resumeToken,
          sourceMode: created.sourceMode
        };
        saveDraftingSessionMeta(meta);
        setSession(meta);
        setData(
          normalizeDraftingData({
            ...created.inputSnapshot,
            ...latestSnapshot.current
          })
        );
        setStatus({ loading: false, lastSyncedAt: created.updatedAt });
        trackEvent({
          event: "draft_session_created",
          payload: { sessionId: created.sessionId, sourceMode: created.sourceMode }
        });
      } catch (error) {
        if (!isMounted) return;
        const cached = loadDraftingData();
        const info = describeApiError(error, "Draft session sync");
        console.error("[draft-session] initial sync failed", info, error);
        setData(cached);
        setStatus({
          loading: false,
          error: `${info.message} Draft generation is blocked until sync succeeds.`
        });
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const scheduleSync = useCallback(
    (nextSnapshot: DraftingData) => {
      if (!session) return;
      if (pendingSync.current) {
        clearTimeout(pendingSync.current);
      }
      pendingSync.current = setTimeout(async () => {
        try {
          const updated = await updateDraftSession(session, nextSnapshot);
          setStatus((prev) => ({
            ...prev,
            error: undefined,
            lastSyncedAt: updated.updatedAt
          }));
          trackEvent({
            event: "draft_session_updated",
            payload: { sessionId: session.sessionId, updatedAt: updated.updatedAt }
          });
        } catch (error) {
          const info = describeApiError(error, "Draft session update");
          console.error("[draft-session] update failed", info, error);
          setStatus((prev) => ({
            ...prev,
            error: info.message
          }));
        }
      }, 400);
    },
    [session]
  );

  useEffect(() => {
    if (!session) return;
    scheduleSync(latestSnapshot.current);
  }, [scheduleSync, session]);

  const update = useCallback(
    (next: Partial<DraftingData>) => {
      setData((prev) => {
        const merged = { ...prev, ...next };
        saveDraftingData(merged);
        scheduleSync(merged);
        return merged;
      });
    },
    [scheduleSync]
  );

  return { data, update, setData, session, status };
}

export function useDraftingMode(
  mode: DraftingData["draftingMode"],
  options?: { enforce?: boolean }
) {
  const { data, update, setData } = useDraftingData();

  useEffect(() => {
    if (options?.enforce !== true) return;
    if (data.draftingMode !== mode || data.draftingModeConfirmed !== true) {
      update({ draftingMode: mode, draftingModeConfirmed: true });
    }
  }, [data.draftingMode, data.draftingModeConfirmed, mode, options?.enforce, update]);

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
