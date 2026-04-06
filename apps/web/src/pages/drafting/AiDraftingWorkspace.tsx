import { useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { HelperCallout, WarningBanner } from "../../components/ui/PencilPanels";
import { useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { api } from "../../lib/api";

type AiExtractResponse = {
  interactionId: string;
  confidence: number;
  abstained: boolean;
  uncertainty?: string;
  structuredOutput: {
    assets: Array<{ label: string; details?: string; confidence?: number }>;
    beneficiaries: Array<{ name: string; relationship?: string; confidence?: number }>;
    executors: Array<{ name: string; relationship?: string; confidence?: number }>;
    guardians: Array<{ name: string; relationship?: string; confidence?: number }>;
    specialWishes: Array<{ text: string; confidence?: number }>;
    notes: string[];
  } | null;
};

export default function AiDraftingWorkspace() {
  const { data, update, session, status } = useDraftingData();
  const [freeText, setFreeText] = useState(data.aiDraftSession.freeTextNotes ?? "");
  const [topic, setTopic] = useState("");
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const candidateCount = useMemo(() => {
    const c = data.aiDraftSession.extractionCandidates;
    if (!c) return 0;
    return c.assets.length + c.beneficiaries.length + c.executors.length + c.guardians.length + c.specialWishes.length;
  }, [data.aiDraftSession.extractionCandidates]);

  const handleExtract = async () => {
    setError(null);
    if (!session) {
      setError("Draft session is still loading. Please wait a moment.");
      return;
    }
    if (!freeText.trim()) {
      setError("Please add free-text notes first.");
      return;
    }

    setLoadingExtract(true);
    try {
      const summarize = await api.post(
        "/api/v1/ai/summarize",
        { draftSessionId: session.sessionId, freeText },
        { headers: { "x-draft-token": session.resumeToken } }
      );

      const extract = await api.post<AiExtractResponse>(
        "/api/v1/ai/extract",
        { draftSessionId: session.sessionId, freeText, inputSnapshot: data },
        { headers: { "x-draft-token": session.resumeToken } }
      );

      update({
        aiDraftSession: {
          ...data.aiDraftSession,
          freeTextNotes: freeText,
          summary: summarize.data.summary ?? "",
          updatedAt: new Date().toISOString(),
          confidence: String(extract.data.confidence),
          interactionId: extract.data.interactionId,
          extractionCandidates:
            extract.data.structuredOutput ?? {
              assets: [],
              beneficiaries: [],
              executors: [],
              guardians: [],
              specialWishes: [],
              notes: []
            },
          abstained: extract.data.abstained,
          uncertainty: extract.data.uncertainty ?? ""
        }
      });

      navigate("/drafting/ai/summary");
    } catch {
      setError("AI extraction could not be completed. Continue with manual structured entry.");
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleExplain = async () => {
    setError(null);
    if (!session) {
      setError("Draft session is still loading. Please wait a moment.");
      return;
    }
    if (!topic.trim()) {
      setError("Enter a field or topic to explain.");
      return;
    }

    setLoadingExplain(true);
    try {
      const response = await api.post(
        "/api/v1/ai/explain",
        {
          draftSessionId: session.sessionId,
          topic,
          context: freeText.slice(0, 500)
        },
        { headers: { "x-draft-token": session.resumeToken } }
      );

      update({
        aiDraftSession: {
          ...data.aiDraftSession,
          explain: {
            topic,
            explanation: response.data.explanation,
            confidence: response.data.confidence,
            uncertainty: response.data.uncertainty
          }
        }
      });
    } catch {
      setError("Could not fetch explanation right now.");
    } finally {
      setLoadingExplain(false);
    }
  };

  return (
    <WorkspaceShell nav={{ ctaLabel: "Save", ctaMode: "ai", ctaPath: "/drafting/ai/summary" }}>
      <div className="pb-24 pt-10">
        <Container size="wide" className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting — bounded assist only
            </p>
            <AiStepNav currentPath="/drafting/ai/input" />
            <h1 className="font-display text-3xl text-ink sm:text-4xl">Describe your wishes in plain language</h1>
            <p className="max-w-[760px] text-[16px] leading-7 text-muted">
              AI only suggests structured candidates and explanations. Your final will text is generated deterministically from confirmed structured data.
            </p>
          </div>

          {status.error ? <WarningBanner title="Sync issue" body={status.error} /> : null}
          {error ? <WarningBanner title="AI assist" body={error} /> : null}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card size="lg" className="space-y-4 p-7">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-ink">Free-text notes</p>
                <Textarea
                  className="min-h-[220px]"
                  value={freeText}
                  onChange={(event) => setFreeText(event.target.value)}
                  placeholder="Example: I want my spouse to remain in our home, my brother as executor, and school fees secured for my minor children."
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" onClick={handleExtract} disabled={loadingExtract || !session}>
                  {loadingExtract ? "Analyzing..." : "Analyze notes"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured/assets")}>
                  Switch to manual structured flow
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <p className="font-display text-xl font-semibold text-ink">Need a field explained?</p>
                <Input
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="e.g. remainder clause"
                />
                <Button variant="ghost" size="sm" onClick={handleExplain} disabled={loadingExplain || !session}>
                  {loadingExplain ? "Explaining..." : "Explain"}
                </Button>
                {data.aiDraftSession.explain?.explanation ? (
                  <p className="text-[13px] leading-6 text-muted">{data.aiDraftSession.explain.explanation}</p>
                ) : null}
              </Card>

              <HelperCallout
                title="Safety boundary"
                body="AI suggestions never overwrite your confirmed details. You must accept or edit every structured candidate."
              />

              <Card size="lg" className="space-y-2">
                <p className="text-[13px] text-muted">Current extracted candidate count</p>
                <p className="text-xl font-semibold text-ink">{candidateCount}</p>
                <p className="text-[12px] text-muted">If confidence is low, the system abstains and directs you to manual entry.</p>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </WorkspaceShell>
  );
}