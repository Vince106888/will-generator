// Frame: Export Options (xUIiv)
import { useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import { STORAGE_KEYS } from "../../lib/storage";
import { api } from "../../lib/api";

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
      navigate("/drafting/review-result");
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
      setStatus("Add your email in your details so we can deliver this export.");
    }
  };

  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="Export"
          title="Export options"
          description="Choose how you want to save or share your draft. Each format includes the latest updates and a signing checklist."
        />

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

          <div className="space-y-4">
            <TrustPanel
              title="Your draft stays secure"
              items={[
                "Exports are generated on request and never emailed without consent.",
                "Your latest version stays encrypted in your account.",
                "You can delete exported drafts if you change your mind."
              ]}
            />
            <Callout tone="warning">
              If you make changes after exporting, re-download the latest version before signing.
            </Callout>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
