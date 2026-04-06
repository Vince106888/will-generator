import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import {
  normalizeDraftingData,
  persistDraftingSession,
  type DraftSessionMeta
} from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { trackEvent } from "../../lib/analytics";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

type ResumeState = {
  loading: boolean;
  error?: string;
};

export default function ResumeDraft() {
  const [state, setState] = useState<ResumeState>({ loading: true });

  useEffect(() => {
    const resume = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session") || params.get("sessionId");
      const token = params.get("token") || params.get("resumeToken");

      if (!sessionId || !token) {
        setState({ loading: false, error: "Missing resume link information." });
        return;
      }

      try {
        const response = await api.get(`/api/v1/draft-sessions/${sessionId}`, {
          headers: { "x-draft-token": token }
        });
        const meta: DraftSessionMeta = {
          sessionId,
          resumeToken: token,
          sourceMode: response.data.sourceMode
        };
        const snapshot = normalizeDraftingData(response.data.inputSnapshot);
        const resumedSnapshot = { ...snapshot, draftingModeConfirmed: true };
        persistDraftingSession(meta, resumedSnapshot);
        trackEvent({ event: "draft_session_resumed", payload: { sessionId } });
        const mode = resumedSnapshot.draftingMode === "ai" ? "ai" : "structured";
        const destination =
          mode === "ai" ? "/drafting/ai/summary" : "/drafting/structured/personal-details";
        navigate(destination);
      } catch (error) {
        setState({
          loading: false,
          error: "We could not resume that draft. Please start a new draft."
        });
      }
    };

    resume();
  }, []);

  return (
    <div className="pb-24 pt-12">
      <Container>
        <Card size="lg" className="space-y-4">
          <div className="space-y-2">
            <p className="font-display text-2xl text-ink">Resuming your draft</p>
            <p className="text-sm text-muted">
              {state.loading
                ? "Checking your resume link and loading the latest saved state."
                : "We could not resume this draft."}
            </p>
          </div>
          {state.error ? (
            <Card size="md" variant="warning" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Resume failed</p>
              <p className="text-xs text-muted">{state.error}</p>
            </Card>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" onClick={() => navigate("/entry-choice")}>
              Start a new draft
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/")}>
              Return home
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
