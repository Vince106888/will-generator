// Frame: Guardianship (aSEwT)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { navigate } from "../../lib/navigation";

export default function StructuredGuardianship() {
  return (
    <WorkspaceShell nav={{ ctaLabel: "Save and exit", ctaPath: "/" }}>
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-[34px] font-semibold text-ink">Guardianship</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              This section applies only if you have minor children. A guardian would care for them if both parents pass
              away, and the court may confirm the appointment.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                <path
                  d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
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
                <Button variant="secondary" size="sm">
                  No
                </Button>
                <Button variant="primary" size="sm">
                  Yes
                </Button>
              </div>
            </Card>

            <Card size="lg" className="space-y-4">
              <div className="space-y-1.5">
                <p className="font-display text-xl font-semibold text-ink">Preferred guardian</p>
                <p className="text-[13px] text-muted">
                  Who should care for your minor children if both parents pass away?
                </p>
              </div>
              <div className="space-y-3">
                <FieldGroup label="Full legal name">
                  <Input placeholder="e.g. Esther Achieng Odhiambo" />
                </FieldGroup>
                <FieldGroup label="Relationship to child">
                  <Input placeholder="e.g. aunt, uncle" />
                </FieldGroup>
              </div>
            </Card>

            <Card size="lg" className="space-y-4">
              <div className="space-y-1.5">
                <p className="font-display text-xl font-semibold text-ink">Backup guardian</p>
                <p className="text-[13px] text-muted">
                  If the preferred guardian cannot act, this person is next.
                </p>
              </div>
              <div className="space-y-3">
                <FieldGroup label="Full legal name">
                  <Input placeholder="Optional" />
                </FieldGroup>
                <FieldGroup label="Relationship to child">
                  <Input placeholder="Optional" />
                </FieldGroup>
                <Button variant="ghost" size="sm">
                  I do not want a backup
                </Button>
              </div>
            </Card>

            <div className="flex gap-3 rounded-xl border border-warning bg-warning-soft p-4">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-warning" fill="none">
                <path
                  d="M12 3l9 16H3l9-16z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 9v5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
              </svg>
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
