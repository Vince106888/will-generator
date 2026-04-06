import { api } from "./api";

type AnalyticsEvent = {
  event: string;
  payload?: Record<string, unknown>;
};

export async function trackEvent(input: AnalyticsEvent) {
  try {
    await api.post("/api/v1/analytics/events", input);
  } catch {
    // Intentionally ignore analytics failures.
  }
}
