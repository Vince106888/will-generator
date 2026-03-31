// Frame: AI Processing (0ianx)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function AiProcessing() {
  useDraftingMode("ai");

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Save</span>
            <span className="hidden sm:inline">Save and exit</span>
          </>
        ),
        ctaMode: "ai",
        ctaPath: "/"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting — Step 3 of 6: Processing
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Processing</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              We analyze your input, extract key details, and prepare a clear summary for you to review.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">Step 3 of 6 — Processing</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-1/2 rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">How we process your input</p>
                  <p className="text-[13px] text-muted">A short explanation of the AI steps.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; We extract assets, beneficiaries, and executor choices</p>
                  <p>&bull; We group notes into legal sections</p>
                  <p className="text-muted">&bull; You confirm everything before drafting</p>
                </div>
              </Card>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">What we need from you</p>
                  <p className="text-[13px] text-muted">
                    Inputs that help the AI give you a better draft.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Assets you want to include</p>
                  <p>&bull; Names of beneficiaries and executors</p>
                  <p>&bull; Any special wishes or guardian details</p>
                </div>
              </Card>

              <HelperCallout
                title="Why you will review"
                body="AI summarizes your input, but you confirm accuracy before anything is final."
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/ai/summary")}>
                  Continue to summary
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai/input")}>
                  Back to drafting
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <HelperCallout
                title="File handling"
                body="Uploaded files are used only for your draft and can be deleted at any time."
              />
              <HelperCallout
                title="Sensitive situations"
                body="If your estate is complex, we may suggest advocate review."
              />
              <HelperCallout
                title="You can pause"
                body="Save and return later without losing progress."
              />
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Safety checks</p>
                  <p className="text-[13px] text-muted">We flag common legal gaps.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Missing executor or guardian</p>
                  <p>&bull; Beneficiary gaps or unclear allocations</p>
                  <p className="text-muted">&bull; Required legal identifiers</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
