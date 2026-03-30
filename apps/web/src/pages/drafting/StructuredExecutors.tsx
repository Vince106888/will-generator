// Frame: Executors (yb4Yk)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { Info, MessageSquareText, RefreshCcw, UserRound } from "lucide-react";

export default function StructuredExecutors() {
  useDraftingMode("structured");

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
            <h1 className="font-display text-[34px] font-semibold text-ink">Executors</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              An executor is the trusted person who carries out your instructions, pays debts, and distributes assets.
              They have a legal duty to act in the best interest of your beneficiaries.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Primary executor</p>
                  <p className="text-[13px] text-muted">Choose someone responsible and willing to handle paperwork.</p>
                </div>
                <div className="space-y-3">
                  <FieldGroup label="Full legal name">
                    <Input placeholder="e.g. Grace Wanjiku Mwangi" />
                  </FieldGroup>
                  <FieldGroup label="Relationship to you">
                    <Input placeholder="e.g. sister, friend" />
                  </FieldGroup>
                  <FieldGroup label="Phone or email (optional)" hint="Optional">
                    <Input placeholder="So we can contact them if needed" />
                  </FieldGroup>
                </div>
              </Card>

              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Backup executor</p>
                  <p className="text-[13px] text-muted">
                    If the primary executor cannot act, this person takes over.
                  </p>
                </div>
                <div className="space-y-3">
                  <FieldGroup label="Full legal name">
                    <Input placeholder="Optional" />
                  </FieldGroup>
                  <FieldGroup label="Relationship to you">
                    <Input placeholder="Optional" />
                  </FieldGroup>
                  <Button variant="ghost" size="sm">
                    I do not want a backup
                  </Button>
                </div>
              </Card>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <UserRound className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Can an executor be a beneficiary?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    Yes. It is common to choose a trusted family member who will also inherit. Ensure they are willing
                    and organized.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/guardianship")}>
                  Continue to guardianship
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                  Save and return later
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <Info className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">What if I am not sure?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    If you are not sure today, you can proceed and return later. We will remind you before finalizing the
                    draft.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <MessageSquareText className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Do they have to agree?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    It is best to talk to them. If they decline later, the backup executor can step in or a court can
                    appoint someone.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <RefreshCcw className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Can I change this later?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    Yes. You can update your executor or create a new will or codicil if your situation changes.
                  </p>
                </div>
              </div>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Executor duties</p>
                  <p className="text-[13px] text-muted">What they will actually do.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Collect and secure assets</p>
                  <p>&bull; Pay debts, taxes, and funeral costs</p>
                  <p>&bull; Distribute assets per your instructions</p>
                  <p className="text-muted">We recommend choosing someone organized and available.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}


