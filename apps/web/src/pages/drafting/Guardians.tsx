import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { useDraftingData } from "../../lib/drafting";

export default function Guardians() {
  const { data, update } = useDraftingData();

  const updateGuardian = (
    index: number,
    key: "name" | "relationship" | "notes",
    value: string
  ) => {
    const next = data.guardians.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    update({ guardians: next });
  };

  return (
    <DraftingShell
      stepId="guardians"
      title="Guardians for minors"
      description="If you have minor children, appoint a guardian to care for them. This is one of the most important decisions."
      footer={<StepActions currentPath="/drafting/guardians" />}
    >
      <div className="space-y-4">
        <Card size="lg" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Primary guardian</p>
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Full name">
              <Input
                value={data.guardians[0]?.name || ""}
                onChange={(event) => updateGuardian(0, "name", event.target.value)}
                placeholder="Guardian name"
              />
            </FieldGroup>
            <FieldGroup label="Relationship">
              <Input
                value={data.guardians[0]?.relationship || ""}
                onChange={(event) => updateGuardian(0, "relationship", event.target.value)}
                placeholder="e.g. Sister, close friend"
              />
            </FieldGroup>
          </div>
        </Card>

        <Card size="lg" variant="secondary" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Backup guardian</p>
          <p className="text-xs text-muted">
            If the primary guardian cannot serve, the backup will be considered.
          </p>
        </Card>

        <Card size="lg" variant="secondary" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Notes</p>
          <p className="text-xs text-muted">Any special guidance for the guardian or your children.</p>
        </Card>
      </div>
    </DraftingShell>
  );
}
