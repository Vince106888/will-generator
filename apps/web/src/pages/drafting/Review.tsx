// Frame: Review + Result (0gbAz)
import { useEffect, useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { api } from "../../lib/api";
import { buildGeneratePayload, useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { STORAGE_KEYS } from "../../lib/storage";

type Complexity = {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH";
  flags: string[];
};

type WillResult = {
  id: string;
  draft: string;
  complexity: Complexity;
  validity: string[];
  metadata?: Record<string, unknown>;
};

export default function Review() {
  const { data } = useDraftingData();
  const [result, setResult] = useState<WillResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.willResult);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WillResult;
        setResult(parsed);
        if (parsed.id) {
          setLoading(true);
          api
            .get(`/api/v1/wills/${parsed.id}`)
            .then((response) => {
              const merged = {
                id: response.data.id ?? parsed.id,
                draft: response.data.draft ?? parsed.draft,
                complexity: response.data.complexity ?? parsed.complexity,
                validity: response.data.validity ?? parsed.validity,
                metadata: response.data.metadata ?? parsed.metadata
              } as WillResult;
              setResult(merged);
              localStorage.setItem(STORAGE_KEYS.willResult, JSON.stringify(merged));
            })
            .catch(() => null)
            .finally(() => setLoading(false));
        }
      } catch {
        setResult(null);
      }
    }
  }, []);

  const flags = useMemo(() => result?.complexity?.flags ?? [], [result]);
  const missingCritical = [
    !data.executors[0]?.name && "Executors",
    !data.beneficiaries[0]?.name && "Beneficiaries",
    !data.assets.some((asset) => asset.location || asset.notes) && "Assets",
    data.hasMinors && !data.guardians[0]?.name && "Guardians"
  ].filter(Boolean) as string[];

  const generateDraft = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = buildGeneratePayload(data);
      const response = await api.post("/api/v1/wills/generate", payload);
      localStorage.setItem(STORAGE_KEYS.willResult, JSON.stringify(response.data));
      setResult(response.data as WillResult);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const draftPreview = result?.draft
    ? result.draft.slice(0, 600)
    : "Generate the draft to preview the content here.";

  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="Review"
          title="Review + result"
          description="Review your details, generate the draft, and confirm the next steps. You can return to earlier sections anytime."
        />

        {loading && <p className="mt-3 text-xs text-muted">Refreshing your draft...</p>}

        {!result ? (
          <Card size="lg" variant="secondary" className="mt-6 space-y-3">
            <Badge tone="info">Draft not generated</Badge>
            <p className="text-sm font-semibold text-ink">Generate your will draft</p>
            <p className="text-sm text-muted">
              We will turn your information into a structured draft. You can review everything before it becomes
              legally valid.
            </p>
            <div className="text-xs text-muted">
              {missingCritical.length === 0
                ? "All key sections are complete."
                : `Missing: ${missingCritical.join(", ")}`}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/mapping")}>
                Review mapping
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={generateDraft}
                disabled={loading || missingCritical.length > 0}
              >
                {loading ? "Generating..." : "Generate draft"}
              </Button>
            </div>
            {error && <p className="text-xs text-error">{error}</p>}
          </Card>
        ) : (
          <Card size="lg" variant="success" className="mt-6 space-y-2">
            <Badge tone="success">Draft ready for review</Badge>
            <p className="text-sm font-semibold text-ink">Your draft is complete and ready for review.</p>
            <p className="text-sm text-muted">
              You can export a copy, request advocate review, or proceed to signing instructions.
            </p>
          </Card>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">Draft preview</p>
              <div className="rounded-xl border border-border bg-card p-5 text-xs text-muted">
                <p className="whitespace-pre-wrap leading-6">{draftPreview}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/export-options")}>
                  Export options
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/signing-guide")}>
                  Go to signing
                </Button>
              </div>
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">Review checklist</p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
                <li>
                  Executors: {data.executors.filter((executor) => executor.name).length > 0 ? "Added" : "Missing"}
                </li>
                <li>
                  Guardians:{" "}
                  {data.hasMinors
                    ? data.guardians.filter((guardian) => guardian.name).length > 0
                      ? "Added"
                      : "Missing"
                    : "Not required"}
                </li>
                <li>
                  Assets: {data.assets.some((asset) => asset.location || asset.notes) ? "Listed" : "Missing"}
                </li>
                <li>
                  Beneficiaries: {data.beneficiaries.some((beneficiary) => beneficiary.name) ? "Listed" : "Missing"}
                </li>
              </ul>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/mapping")}>
                Return to mapping
              </Button>
            </Card>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Complexity check</p>
              <p className="text-sm font-semibold text-ink">
                {result ? `${result.complexity.level} complexity` : "No draft yet"}
              </p>
              {result && <p className="text-xs text-muted">Score: {result.complexity.score}</p>}
              {flags.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-xs text-muted">
                  {flags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted">No issues flagged based on the information provided.</p>
              )}
            </Card>

            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Validity guidance</p>
              <p className="text-xs text-muted">
                A will is only legally valid after signing in front of two eligible witnesses. We will walk you through
                the signing steps next.
              </p>
            </Card>

            <TrustPanel
              title="Next steps"
              items={[
                "Export a copy once you are satisfied with the draft.",
                "Optional advocate review is available for complex estates.",
                "Signing instructions will confirm witness eligibility."
              ]}
            />

            <Callout tone="warning">
              If anything feels incomplete, pause and revise. Signing a draft that does not reflect your full wishes can
              create disputes.
            </Callout>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
