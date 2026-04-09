// Frame: Structured Flow Shell (fF89o)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { Asterisk, Clock3 } from "lucide-react";

export default function StructuredFlowShell() {
  useDraftingMode("structured", { enforce: true });

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Save</span>
            <span className="hidden sm:inline">Save and exit</span>
          </>
        ),
        ctaPath: "/"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              Guided will drafting — Overview
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Guided will drafting</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Answer a few focused questions. We explain why each section matters and show your progress clearly. You
              can pause and return at any time.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">6 steps total — start with Personal details</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-[6%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Before you continue</p>
                  <p className="text-[13px] text-muted">
                    This flow is designed around two core questions: who should receive what, and who will carry out
                    your wishes.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>1) What do you have?</p>
                  <p>2) Who should receive it?</p>
                  <p className="text-muted">
                    Everything else - executors, guardianship, witnesses - supports those decisions.
                  </p>
                </div>
              </Card>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <Asterisk className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Required vs optional</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    We mark every field as required or optional. A valid will needs your legal name, identification
                    details, assets, beneficiaries, and an executor. Phone number and marital status are optional.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <Clock3 className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">What you will need</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    Have a list of your assets, the people you want to provide for, and a preferred executor. Most
                    people complete this in 15–25 minutes.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured/personal-details")}>
                  Start personal details
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured/executors")}>
                  Skip to executors
                </Button>
              </div>
            </div>

            <Card size="lg" className="space-y-3">
              <p className="text-[14px] font-semibold text-ink">Your progress</p>
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">1</span>
                  <span className="text-muted">Personal details</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted">2</span>
                  <span className="text-muted">Executors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted">3</span>
                  <span className="text-muted">Guardianship</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted">4</span>
                  <span className="text-muted">Assets & beneficiaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted">5</span>
                  <span className="text-muted">Special wishes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted">6</span>
                  <span className="text-muted">Review & signing</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}


