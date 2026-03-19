import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { navigate } from "../lib/navigation";
import { STORAGE_KEYS } from "../lib/storage";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

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
};

export default function Result() {
  const [data, setData] = useState<WillResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.willResult);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WillResult;
        setData(parsed);
        if (parsed.id) {
          setLoading(true);
          api
            .get(`/api/v1/wills/${parsed.id}`)
            .then((response) => {
              const merged = {
                id: response.data.id ?? parsed.id,
                draft: response.data.draft ?? parsed.draft,
                complexity: response.data.complexity ?? parsed.complexity,
                validity: response.data.validity ?? parsed.validity
              } as WillResult;
              setData(merged);
              localStorage.setItem(STORAGE_KEYS.willResult, JSON.stringify(merged));
            })
            .catch(() => null)
            .finally(() => setLoading(false));
        }
      } catch {
        setData(null);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="py-20">
        <Container className="text-center">
          <h2 className="font-display text-2xl text-ink">No draft found</h2>
          <p className="mt-2 text-sm text-muted">
            Start your will to generate a new draft and checklist.
          </p>
          <Button onClick={() => navigate("/drafting/personal-details")} className="mt-6">
            Start drafting
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-12">
      <Container>
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Your draft is ready</p>
          <p className="text-[15px] text-muted">
            Review your draft and follow the signing steps to make it legally valid.
          </p>
          {loading && <p className="text-xs text-muted">Refreshing your draft...</p>}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card size="lg" className="space-y-3">
            <p className="text-xs font-semibold text-muted">Draft preview</p>
            <div className="flex h-[260px] items-center justify-center rounded-xl border border-border bg-card p-6 text-xs text-muted">
              Draft preview
            </div>
          </Card>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Next steps</p>
              <p className="text-xs text-muted">
                • Print the draft
                <br />
                • Sign with two eligible witnesses
                <br />
                • Store the signed copy safely
                <br />
                • Inform your executor
              </p>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Need advocate review?</p>
              <p className="text-xs text-muted">
                For complex estates, request a professional review before signing.
              </p>
            </Card>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/review")}>
                Back
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate("/drafting/signing-guide")}>
                Go to signing guide
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
