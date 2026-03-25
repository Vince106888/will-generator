import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import { STORAGE_KEYS } from "../../lib/storage";
import { api } from "../../lib/api";
import { useMemo, useState } from "react";

const exportOptions = [
  {
    title: "PDF draft",
    body: "Printable document with signing checklist and witness page.",
    badge: "Most common"
  },
  {
    title: "Editable Word file",
    body: "For advocates who need to add clauses or annotations.",
    badge: "Advocate-ready"
  },
  {
    title: "Summary snapshot",
    body: "A shorter summary for family discussions and review.",
    badge: "Quick review"
  }
];

export default function ExportOptions() {
  const { data, update } = useDraftingData();
  const [status, setStatus] = useState<string | null>(null);
  const willId = useMemo(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(STORAGE_KEYS.willResult);
    if (!stored) return null;
    try {
      return (JSON.parse(stored) as { id?: string }).id ?? null;
    } catch {
      return null;
    }
  }, []);

  const handleExport = async (format: string) => {
    setStatus(null);
    update({
      exportPreferences: {
        ...data.exportPreferences,
        format
      }
    });
    if (!willId) {
      navigate("/drafting/review");
      return;
    }
    if (format === "pdf") {
      window.location.href = `${api.defaults.baseURL}/api/v1/wills/${willId}/pdf`;
      return;
    }
    if (data.email) {
      try {
        await api.post(`/api/v1/wills/${willId}/lead`, {
          email: data.email,
          metadata: { action: "export", format }
        });
        setStatus("We notified our team. Your export will be prepared shortly.");
      } catch {
        setStatus("We could not submit the export request. Please try again.");
      }
    } else {
      setStatus("Add your email in Personal Details so we can deliver this export.");
    }
  };

  return (
    <div className="pb-24 pt-12">
      <Container className="max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Export options</p>
          <p className="max-w-[900px] text-[15px] text-muted">
            Choose how you want to save or share your draft. Each format includes the latest updates and a signing
            checklist.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {exportOptions.map((option) => (
            <Card key={option.title} size="lg" className="space-y-3">
              <Badge tone="info">{option.badge}</Badge>
              <p className="text-sm font-semibold text-ink">{option.title}</p>
              <p className="text-xs text-muted">{option.body}</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  handleExport(
                    option.title === "PDF draft" ? "pdf" : option.title === "Editable Word file" ? "docx" : "summary"
                  )
                }
              >
                {option.title === "PDF draft" ? "Download" : "Request export"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card size="lg" className="space-y-3">
            <p className="text-sm font-semibold text-ink">Export notes</p>
            <p className="text-xs text-muted">
              We keep a secure version in your account so you can return and update the draft later. Exporting does not
              finalize your will.
            </p>
            {status && <p className="text-xs text-muted">{status}</p>}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/advocate-review")}>
                Request advocate review
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate("/drafting/signing-guide")}>
                Continue to signing
              </Button>
            </div>
          </Card>

          <Callout tone="warning">
            If you make changes after exporting, re-download the latest version before signing.
          </Callout>
        </div>
      </Container>
    </div>
  );
}
