export function navigate(to: string) {
  if (window.location.pathname === to) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function buildStepUrl(pathname: string, step: number) {
  const params = new URLSearchParams(window.location.search);
  params.set("step", String(step + 1));
  return `${pathname}?${params.toString()}`;
}

export function getStepFromUrl(totalSteps: number) {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("step");
  const parsed = raw ? Number(raw) : 1;
  const safe = Number.isFinite(parsed) ? parsed : 1;
  const index = Math.max(0, Math.min(totalSteps - 1, safe - 1));
  return index;
}
