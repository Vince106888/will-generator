import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function StructuredGuardianship() {
  const { data, update } = useDraftingData();
  const primary = data.guardians[0] ?? { name: "", relationship: "", notes: "" };
  const backup = data.guardians[1] ?? { name: "", relationship: "", notes: "" };

  const updateGuardian = (
    index: number,
    field: "name" | "relationship" | "phone" | "location" | "notes",
    value: string
  ) => {
    const next = [...data.guardians];
    if (!next[index]) next[index] = { name: "", relationship: "", phone: "", location: "", notes: "" };
    next[index] = { ...next[index], [field]: value };
    update({ guardians: next });
  };

  return (
    <WorkspaceShell>
      <Container className="pb-24 pt-12 max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Guardianship</p>
          <p className="max-w-[900px] text-[15px] leading-7 text-muted">
            If you have minor children, appoint a guardian who will care for them if you are no longer able to. This is
            optional if you have no minors, but we still ask in case circumstances change.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Primary guardian</p>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup label="Full name">
                  <Input
                    placeholder="e.g., Josephine Otieno"
                    value={primary.name}
                    onChange={(event) => updateGuardian(0, "name", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Relationship">
                  <Input
                    placeholder="Sister, cousin, close friend"
                    value={primary.relationship}
                    onChange={(event) => updateGuardian(0, "relationship", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Phone number">
                  <Input
                    placeholder="07xx xxx xxx"
                    value={primary.phone ?? ""}
                    onChange={(event) => updateGuardian(0, "phone", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Location">
                  <Input
                    placeholder="Town or county"
                    value={primary.location ?? ""}
                    onChange={(event) => updateGuardian(0, "location", event.target.value)}
                  />
                </FieldGroup>
              </div>
              <FieldGroup
                label="Notes for the guardian"
                hint="Optional: add context about schooling, routines, or family expectations."
              >
                <Textarea
                  placeholder="Share any guidance you want them to know."
                  className="min-h-[120px]"
                  value={data.guardianNotes}
                  onChange={(event) => update({ guardianNotes: event.target.value })}
                />
              </FieldGroup>
            </Card>

            <Card size="lg" variant="secondary" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Backup guardian</p>
              <p className="text-xs text-muted">
                A backup guardian is recommended. If the primary guardian cannot serve, this keeps your children secure.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup label="Full name">
                  <Input
                    placeholder="Optional"
                    value={backup.name}
                    onChange={(event) => updateGuardian(1, "name", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Relationship">
                  <Input
                    placeholder="Optional"
                    value={backup.relationship}
                    onChange={(event) => updateGuardian(1, "relationship", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Phone number">
                  <Input
                    placeholder="Optional"
                    value={backup.phone ?? ""}
                    onChange={(event) => updateGuardian(1, "phone", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Location">
                  <Input
                    placeholder="Optional"
                    value={backup.location ?? ""}
                    onChange={(event) => updateGuardian(1, "location", event.target.value)}
                  />
                </FieldGroup>
              </div>
            </Card>

            <Callout tone="warning">
              Guardianship is a serious decision. Consider who understands your children, your values, and their daily
              needs.
            </Callout>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">If you have no minors</p>
              <p className="text-xs text-muted">
                You can leave this blank. We will still include a note in case minor dependants are added later.
              </p>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Guardians and executors</p>
              <p className="text-xs text-muted">
                Guardians can be different from executors. Some families prefer separate roles for care and legal tasks.
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-executors")}>
            Back
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/drafting/review-result")}>
            Continue to review
          </Button>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
