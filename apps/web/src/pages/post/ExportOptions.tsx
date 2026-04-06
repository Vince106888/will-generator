// Frame: Export Options (xUIiv)
import { useEffect, useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { HelperCallout, SectionCard } from "../../components/ui/PencilPanels";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import { STORAGE_KEYS } from "../../lib/storage";
import { api } from "../../lib/api";

export default function ExportOptions() {
  const { data, update, session } = useDraftingData();
  const [resultError, setResultError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const sessionId = session?.sessionId ?? null;

  const latestResult = useMemo(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(STORAGE_KEYS.willResult);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as { sessionId?: string; version?: number };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setResultError("No active draft session found.");
      return;
    }
    setLoading(true);
    api
      .get(`/api/v1/wills/session/${sessionId}`)
      .then((response) => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEYS.willResult, JSON.stringify(response.data));
        }
        setResultError(null);
      })
      .catch(() => {
        setResultError("We could not find a generated draft for this session.");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleExport = async (format: string) => {
    update({
      exportPreferences: {
        ...data.exportPreferences,
        format
      }
    });
    if (!sessionId) {
      setResultError("No active draft session found.");
      return;
    }
    if (format === "pdf") {
      window.location.href = `${api.defaults.baseURL}/api/v1/wills/session/${sessionId}/pdf`;
      return;
    }
    setResultError("Paid export tiers are not yet available.");
  };

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: "Download",
        ctaPath: "/drafting/export-options",
        ctaClassName: "px-5 py-3 text-[13px]"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Choose your export option
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Download a PDF immediately, or choose a tier that removes the
              watermark and adds extra signing support. All tiers follow the
              same legal signing rules.
            </p>
            {loading ? (
              <p className="text-xs text-muted">Checking latest draft output...</p>
            ) : null}
            {resultError ? (
              <p className="text-xs text-warning">{resultError}</p>
            ) : null}
            {latestResult?.version ? (
              <p className="text-xs text-muted">Latest version: v{latestResult.version}</p>
            ) : null}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <SectionCard title="Free" subtitle="KES 0 - watermarked draft">
              <div className="space-y-2 text-[13px]">
                <p className="text-ink">&bull; PDF download</p>
                <p className="text-muted">&bull; Watermarked for draft use</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="px-5 py-3 text-[13px]"
                onClick={() => handleExport("pdf")}
              >
                Download watermarked PDF
              </Button>
            </SectionCard>

            <SectionCard title="Basic" subtitle="KES 250 - clean PDF + Word">
              <div className="space-y-2 text-[13px]">
                <p className="text-ink">&bull; Clean PDF (no watermark)</p>
                <p className="text-ink">&bull; Word (.docx) download</p>
                <p className="text-muted">&bull; Editable for later updates</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="px-5 py-3 text-[13px]"
                onClick={() => handleExport("basic")}
                disabled
              >
                Coming soon
              </Button>
            </SectionCard>

            <SectionCard
              title="Premium"
              subtitle="KES 4,000–5,000 - witness service"
            >
              <div className="space-y-2 text-[13px]">
                <p className="text-ink">&bull; Printed glossy copy</p>
                <p className="text-ink">&bull; Two vetted witnesses dispatched</p>
                <p className="text-muted">
                  &bull; ID verification + time/location proof
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="px-5 py-3 text-[13px]"
                onClick={() => handleExport("premium")}
                disabled
              >
                Coming soon
              </Button>
            </SectionCard>
          </div>

          <HelperCallout
            title="How to choose a tier"
            body="All tiers use the same legal content. Choose based on whether you want a clean PDF, Word editing, or witness support."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <HelperCallout
              title="Watermark note"
              body="The free tier includes a visible watermark to indicate this is a draft. Your legal signing is the same regardless of tier."
            />
            <HelperCallout
              title="Premium witness service"
              body="Two vetted witnesses can travel to your location, verify your ID, and record time/location metadata for added evidentiary strength."
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="px-5 py-3 text-[13px]"
              onClick={() => navigate("/drafting/review-result")}
            >
              Back to review
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="px-5 py-3 text-[13px]"
              onClick={() => navigate("/drafting/signing-guide")}
            >
              Continue to signing guide
            </Button>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
