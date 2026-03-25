import { useState } from "react";
import { DraftingShell } from "../../components/drafting/DraftingShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../lib/api";
import { buildGeneratePayload, useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { STORAGE_KEYS } from "../../lib/storage";

export default function Review() {
  const { data } = useDraftingData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const missingCritical = [
    !data.legalName && "Personal details",
    !data.executors[0]?.name && "Executors",
    !data.beneficiaries[0]?.name && "Beneficiaries"
  ].filter(Boolean) as string[];

  const generateDraft = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = buildGeneratePayload(data);
      const response = await api.post("/api/v1/wills/generate", payload);
      localStorage.setItem(STORAGE_KEYS.willResult, JSON.stringify(response.data));
      navigate("/drafting/generated");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[390px] bg-paper">
          <div className="flex h-[62px] items-center justify-center text-sm text-ink">9:41</div>
          <div className="space-y-4 px-5 pb-6">
            <div className="space-y-2">
              <p className="font-display text-2xl text-ink">Review</p>
              <p className="text-xs text-muted">Check your details before generating the draft.</p>
            </div>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Completeness checks</p>
              <p className="text-xs text-muted">
                {missingCritical.length === 0
                  ? "All key sections are complete."
                  : `Missing: ${missingCritical.join(", ")}`}
              </p>
            </Card>
            <button
              className="w-full rounded-full bg-primary px-4 py-2 text-xs font-semibold text-paper"
              onClick={generateDraft}
              disabled={loading || missingCritical.length > 0}
            >
              {loading ? "Generating..." : "Generate draft"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <DraftingShell
          stepId="review"
          title="Review and confirm"
          description="Review the summary below. You can edit any section before generating your draft."
          footer={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/special-wishes")}>
                Back
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
          }
          aside={
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Completeness checks</p>
              <p className="text-xs text-muted">
                {missingCritical.length === 0
                  ? "All key sections are complete."
                  : `Missing: ${missingCritical.join(", ")}`}
              </p>
            </Card>
          }
        >
          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Personal details</p>
              <p className="text-xs text-muted">
                {data.legalName || "Name pending"} - {data.idType || "ID"} {data.idNumber || ""}
              </p>
            </Card>
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Family context</p>
              <p className="text-xs text-muted">
                {data.dependantsNotes || "No additional family notes."}
              </p>
            </Card>
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Executors</p>
              <p className="text-xs text-muted">
                {data.executors.map((executor) => executor.name).filter(Boolean).join(", ") || "Not provided"}
              </p>
            </Card>
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Beneficiaries</p>
              <p className="text-xs text-muted">
                {data.beneficiaries.map((beneficiary) => beneficiary.name).filter(Boolean).join(", ") || "Not provided"}
              </p>
            </Card>
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Assets & distribution</p>
              <p className="text-xs text-muted">
                {data.assets.some((asset) => asset.location || asset.notes)
                  ? "Assets listed."
                  : "No assets listed."}
              </p>
            </Card>
            {error && (
              <Card size="md" variant="error" className="space-y-2">
                <p className="text-xs font-semibold text-ink">We couldn't generate your draft</p>
                <p className="text-xs text-muted">{error}</p>
              </Card>
            )}
          </div>
        </DraftingShell>
      </div>
    </>
  );
}
