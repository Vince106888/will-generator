// Frame: AI Extraction Summary (9MjGI)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { HelperCallout, ReviewChecklist } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { AlertTriangle, Info } from "lucide-react";

export default function AiExtractionSummary() {
  useDraftingMode("ai");

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to drafting</span>
          </>
        ),
        ctaMode: "ai",
        ctaPath: "/drafting/ai-workspace"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-[34px] font-semibold text-ink">AI extraction summary</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Here is what we understood from your conversation. Review each section, correct anything wrong, and add
              missing details before we generate the formal draft.
            </p>
          </div>

          <Card variant="success" size="md" className="space-y-2">
            <p className="text-[14px] font-semibold text-ink">Draft summary ready</p>
            <p className="text-[13px] leading-[1.5] text-muted">
              We extracted 4 assets and 3 beneficiaries. Please confirm any missing items before you finalize.
            </p>
          </Card>

          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Assets mentioned</p>
                  <p className="text-[13px] text-muted">Review and edit each asset description.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-ink">
                  <p>&bull; House in Kiambu</p>
                  <p>&bull; Rental plots in Machakos (2)</p>
                  <p>&bull; Toyota vehicle</p>
                  <p className="text-muted">&bull; Other personal items (not detailed)</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/mapping")}>
                  Add asset
                </Button>
              </Card>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Beneficiaries mentioned</p>
                  <p className="text-[13px] text-muted">Confirm names and relationships.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-ink">
                  <p>&bull; Wife - receives house</p>
                  <p>&bull; Brian (son) - receives Toyota</p>
                  <p>&bull; Nia (daughter) - receives rental plots</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/mapping")}>
                  Add beneficiary
                </Button>
              </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Executor</p>
                  <p className="text-[13px] text-muted">We did not detect an executor yet.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-ink">
                  <p className="text-warning">&bull; Required to finalize the will</p>
                  <p className="text-muted">&bull; You can add a backup executor</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured-executors")}>
                  Add executor
                </Button>
              </Card>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Guardianship</p>
                  <p className="text-[13px] text-muted">Only relevant if you have minor children.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-muted">
                  <p>&bull; No guardianship details found</p>
                  <p>&bull; We will explain when this applies</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/guardianship")}>
                  Add guardian
                </Button>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <HelperCallout
              title="How to review"
              body="Read each card and confirm names, relationships, and asset descriptions. Use plain language corrections - we translate into legal format later."
            />
            <ReviewChecklist
              title="Review checklist"
              items={[
                { label: "Legal names and ID details match", tone: "success" },
                { label: "Executor and guardian choices confirmed", tone: "warning" }
              ]}
            />
          </div>

          <div className="flex gap-3 rounded-xl border border-warning bg-warning-soft p-4">
            <AlertTriangle className="mt-0.5 text-warning" size={20} strokeWidth={1.6} />
            <div className="space-y-1">
              <p className="text-[13px] font-semibold text-ink">Missing information to confirm</p>
              <p className="text-[13px] leading-[1.5] text-muted">
                Add an executor, confirm any dependants, and specify any remaining assets so the draft is complete.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <p className="font-display text-[26px] font-semibold text-ink">Confirm and generate your will draft</p>
              <p className="text-[14px] leading-[1.6] text-muted">
                Once you confirm these details, we will generate the formal draft and show you the review checklist.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm" onClick={() => navigate("/drafting/review-result")}>
                Generate formal draft
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai-workspace")}>
                Back to drafting
              </Button>
            </div>
            <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
              <Info className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
              <div className="space-y-1">
                <p className="text-[13px] font-semibold text-ink">Need help before you finalize?</p>
                <p className="text-[13px] leading-[1.5] text-muted">
                  You can pause here, ask questions in the help center, or request an advocate review for complex estates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}


