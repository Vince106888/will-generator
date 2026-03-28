// Frame: Executors (yb4Yk)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { navigate } from "../../lib/navigation";

export default function StructuredExecutors() {
  return (
    <WorkspaceShell nav={{ ctaLabel: "Save and exit", ctaPath: "/" }}>
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
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M12 8v4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">What if I am not sure?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    If you are not sure today, you can proceed and return later. We will remind you before finalizing the
                    draft.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <path
                    d="M5 6h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Do they have to agree?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    It is best to talk to them. If they decline later, the backup executor can step in or a court can
                    appoint someone.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <path
                    d="M4 12a8 8 0 0 1 13.7-5.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 4v5h-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 12a8 8 0 0 1-13.7 5.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 20v-5h5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Can I change this later?</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    Yes. You can update your executor or create a new will or codicil if your situation changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
