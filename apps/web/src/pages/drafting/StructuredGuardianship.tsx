// Frame: Guardianship (aSEwT)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { AlertTriangle, MessageSquareText, ShieldCheck } from "lucide-react";

export default function StructuredGuardianship() {
  const { data, update } = useDraftingMode("structured");
  const primaryGuardian = data.guardians[0];
  const backupGuardian = data.guardians[1];
  const hasMinors = data.hasMinors;

  const updateGuardian = (
    index: number,
    key: "name" | "relationship",
    value: string
  ) => {
    const next = [...data.guardians];
    next[index] = { ...next[index], [key]: value };
    update({ guardians: next });
  };

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
              Step 4 of 8 — Guardians (if needed)
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Guardianship</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              This section applies only if you have minor children. A guardian would care for them if both parents pass
              away, and the court may confirm the appointment.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">Step 4 of 8: Guardianship</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-1/2 rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
              <ShieldCheck className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
              <div className="space-y-1">
                <p className="text-[13px] font-semibold text-ink">Important context</p>
                <p className="text-[13px] leading-[1.5] text-muted">
                  If your spouse survives you, they remain the natural guardian. This section matters when both parents
                  are no longer able to care for a minor child.
                </p>
              </div>
            </div>

            <Card size="lg" className="space-y-4">
              <div className="space-y-1.5">
                <p className="font-display text-xl font-semibold text-ink">Do you have minor children?</p>
                <p className="text-[13px] text-muted">This decides whether guardianship applies to you.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant={hasMinors ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => update({ hasMinors: false })}
                >
                  No
                </Button>
                <Button
                  variant={hasMinors ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => update({ hasMinors: true })}
                >
                  Yes
                </Button>
              </div>
            </Card>

            <Card
              size="lg"
              className={`space-y-4 ${hasMinors ? "" : "opacity-60"}`}
            >
              <div className="space-y-1.5">
                <p className="font-display text-xl font-semibold text-ink">Preferred guardian</p>
                <p className="text-[13px] text-muted">
                  Who should care for your minor children if both parents pass away?
                </p>
              </div>
              <div className="space-y-3">
                <FieldGroup label="Full legal name">
                  <Input
                    placeholder="e.g. Esther Achieng Odhiambo"
                    value={primaryGuardian?.name ?? ""}
                    onChange={(event) =>
                      updateGuardian(0, "name", event.target.value)
                    }
                    disabled={!hasMinors}
                  />
                </FieldGroup>
                <FieldGroup label="Relationship to child">
                  <Input
                    placeholder="e.g. aunt, uncle"
                    value={primaryGuardian?.relationship ?? ""}
                    onChange={(event) =>
                      updateGuardian(0, "relationship", event.target.value)
                    }
                    disabled={!hasMinors}
                  />
                </FieldGroup>
              </div>
            </Card>

            <Card
              size="lg"
              className={`space-y-4 ${hasMinors ? "" : "opacity-60"}`}
            >
              <div className="space-y-1.5">
                <p className="font-display text-xl font-semibold text-ink">Backup guardian</p>
                <p className="text-[13px] text-muted">
                  If the preferred guardian cannot act, this person is next.
                </p>
              </div>
              <div className="space-y-3">
                <FieldGroup label="Full legal name">
                  <Input
                    placeholder="Optional"
                    value={backupGuardian?.name ?? ""}
                    onChange={(event) =>
                      updateGuardian(1, "name", event.target.value)
                    }
                    disabled={!hasMinors}
                  />
                </FieldGroup>
                <FieldGroup label="Relationship to child">
                  <Input
                    placeholder="Optional"
                    value={backupGuardian?.relationship ?? ""}
                    onChange={(event) =>
                      updateGuardian(1, "relationship", event.target.value)
                    }
                    disabled={!hasMinors}
                  />
                </FieldGroup>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!hasMinors}
                  onClick={() => {
                    updateGuardian(1, "name", "");
                    updateGuardian(1, "relationship", "");
                  }}
                >
                  I do not want a backup
                </Button>
              </div>
            </Card>

            <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
              <MessageSquareText className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
              <div className="space-y-1">
                <p className="text-[13px] font-semibold text-ink">Talk to your guardian first</p>
                <p className="text-[13px] leading-[1.5] text-muted">
                  It is best to confirm they are willing and able to care for the children. A backup guardian helps if
                  plans change.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-warning bg-warning-soft p-4">
              <AlertTriangle className="mt-0.5 text-warning" size={20} strokeWidth={1.6} />
              <div className="space-y-1">
                <p className="text-[13px] font-semibold text-ink">Court confirmation may be required</p>
                <p className="text-[13px] leading-[1.5] text-muted">
                  Kenyan courts may review guardianship appointments in the best interests of the child. We recommend
                  discussing your choice with family.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm" onClick={() => navigate("/drafting/review-result")}>
                Continue to review
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                Save and return later
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}


