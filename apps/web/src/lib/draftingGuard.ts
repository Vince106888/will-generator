import { DraftingData, loadDraftingData, saveDraftingData } from "./drafting";

const DRAFTING_ROUTE_MODES: Record<string, DraftingData["draftingMode"]> = {
  "/drafting/ai/personal-details": "ai",
  "/drafting/ai/input": "ai",
  "/drafting/ai/processing": "ai",
  "/drafting/ai/summary": "ai",
  "/drafting/ai/corrections": "ai",
  "/drafting/ai/review": "ai",
  "/drafting/ai-workspace": "ai",
  "/drafting/ai-summary": "ai",
  "/drafting/structured-flow": "structured",
  "/drafting/structured/personal-details": "structured",
  "/drafting/structured/family": "structured",
  "/drafting/structured/executors": "structured",
  "/drafting/structured/guardians": "structured",
  "/drafting/structured/assets": "structured",
  "/drafting/structured/beneficiaries": "structured",
  "/drafting/structured/wishes": "structured",
  "/drafting/mapping": "structured",
  "/drafting/structured-executors": "structured",
  "/drafting/guardianship": "structured"
};
export const DRAFTING_GUARDED_ROUTES = Object.freeze(Object.keys(DRAFTING_ROUTE_MODES));
export const DRAFTING_GUARDED_PREFIXES = Object.freeze([
  { prefix: "/drafting/ai/", mode: "ai" as const },
  { prefix: "/drafting/structured/", mode: "structured" as const }
]);

const RETURN_PATH_KEY = "esheriaDraftingReturnPath";

function getTargetPathname(target: string) {
  if (typeof window === "undefined") return target;
  try {
    return new URL(target, window.location.origin).pathname;
  } catch {
    return target;
  }
}

function getTargetLocation(target: string) {
  if (typeof window === "undefined") return target;
  try {
    const url = new URL(target, window.location.origin);
    return `${url.pathname}${url.search}`;
  } catch {
    return target;
  }
}

export function getDraftingRouteMode(target: string) {
  const pathname = getTargetPathname(target);
  if (DRAFTING_ROUTE_MODES[pathname]) return DRAFTING_ROUTE_MODES[pathname];
  const match = DRAFTING_GUARDED_PREFIXES.find(({ prefix }) =>
    pathname.startsWith(prefix)
  );
  return match?.mode ?? null;
}

export function setDraftingReturnPath(target: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(RETURN_PATH_KEY, getTargetLocation(target));
}

export function getDraftingReturnPath() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(RETURN_PATH_KEY);
}

export function clearDraftingReturnPath() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(RETURN_PATH_KEY);
}

export function resolveDraftingEntryPath(
  mode: DraftingData["draftingMode"],
  fallback: string
) {
  const pending = getDraftingReturnPath();
  if (!pending) return fallback;
  const pendingMode = getDraftingRouteMode(pending);
  clearDraftingReturnPath();
  if (pendingMode === mode) return pending;
  return fallback;
}

export function getDraftingGuardRedirect(target: string, data?: DraftingData) {
  const routeMode = getDraftingRouteMode(target);
  if (!routeMode) return null;
  const currentData = data ?? loadDraftingData();
  if (
    currentData.draftingModeConfirmed === true &&
    currentData.draftingMode === routeMode
  ) {
    return null;
  }
  if (currentData.draftingModeConfirmed !== false) {
    saveDraftingData({ ...currentData, draftingModeConfirmed: false });
  }
  setDraftingReturnPath(target);
  return "/entry-choice";
}
