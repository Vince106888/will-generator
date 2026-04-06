import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { navigate } from "../lib/navigation";
import { STORAGE_KEYS } from "../lib/storage";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Callout } from "../components/ui/Callout";
import { useDraftingData } from "../lib/drafting";

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

export default function Result() {
  const { data: draftingData, session } = useDraftingData();
  const [data, setData] = useState<WillResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.willResult);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WillResult;
        setData(parsed);
      } catch {
        setData(null);
      }
    }
  }, []);

  useEffect(() => {
    if (!session?.sessionId) {
      return;
    }
    setLoading(true);
    setError(null);
    api
      .get(`/api/v1/wills/session/${session.sessionId}`)
      .then((response) => {
        setData((prev) => {
          const merged = {
            id: response.data.willId ?? response.data.id ?? prev?.id ?? "",
            draft: response.data.draft ?? prev?.draft ?? "",
            complexity: response.data.complexity ?? prev?.complexity,
            validity: response.data.validity ?? prev?.validity,
            metadata: prev?.metadata
          } as WillResult;
          localStorage.setItem(STORAGE_KEYS.willResult, JSON.stringify(merged));
          return merged;
        });
      })
      .catch(() => {
        setError("We could not load the latest generated draft for this session.");
      })
      .finally(() => setLoading(false));
  }, [session?.sessionId]);

  const flags = useMemo(() => data?.complexity?.flags ?? [], [data]);

  if (!data) {
    return (
      <div className="py-20">
        <Container className="text-center">
          <h2 className="font-display text-2xl text-ink">No draft found</h2>
          <p className="mt-2 text-sm text-muted">
            Start your will to generate a new draft and checklist.
          </p>
          <Button onClick={() => navigate("/entry-choice")} className="mt-6">
            Start drafting
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-12">
      <Container className="max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Review + result (Legacy)</p>
          <p className="max-w-[900px] text-[15px] text-muted">
            Legacy page retained for archive reference. Use the active Review + Result screen.
          </p>
          {loading && <p className="text-xs text-muted">Refreshing your draft...</p>}
          {error && <p className="text-xs text-warning">{error}</p>}
        </div>

        <Card size="lg" variant="success" className="mt-6 space-y-2">
          <Badge tone="success">Draft ready for review</Badge>
          <p className="text-sm font-semibold text-ink">Your draft is complete and ready for review.</p>
          <p className="text-sm text-muted">
            You can export a copy, request advocate review, or proceed to signing instructions.
          </p>
        </Card>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">Draft preview</p>
              <div className="flex h-[280px] items-center justify-center rounded-xl border border-border bg-card p-6 text-xs text-muted">
                Draft preview
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
                  Executors: {draftingData.executors.filter((executor) => executor.name).length > 0 ? "Added" : "Missing"}
                </li>
                <li>
                  Guardians:{" "}
                  {draftingData.hasMinors
                    ? draftingData.guardians.filter((guardian) => guardian.name).length > 0
                      ? "Added"
                      : "Missing"
                    : "Not required"}
                </li>
                <li>
                  Assets: {draftingData.assets.some((asset) => asset.location || asset.notes) ? "Listed" : "Missing"}
                </li>
                <li>
                  Beneficiaries:{" "}
                  {draftingData.beneficiaries.some((beneficiary) => beneficiary.name) ? "Listed" : "Missing"}
                </li>
              </ul>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/review-result")}>
                  Go to active review
                </Button>
            </Card>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Complexity check</p>
              <p className="text-sm font-semibold text-ink">{data.complexity.level} complexity</p>
              <p className="text-xs text-muted">Score: {data.complexity.score}</p>
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

            <Callout tone="warning">
              If anything feels incomplete, pause and revise. Signing a draft that does not reflect your full wishes can
              create disputes.
            </Callout>
          </div>
        </div>
      </Container>
    </div>
  );
}

