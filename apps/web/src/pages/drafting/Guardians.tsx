import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Card } from "../../components/ui/Card";
import { useDraftingData } from "../../lib/drafting";

export default function Guardians() {
  const { data, update } = useDraftingData();

  const updateGuardian = (
    index: number,
    key: "name" | "relationship" | "phone" | "location" | "notes",
    value: string
  ) => {
    const next = data.guardians.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    update({ guardians: next });
  };

  return (
    <DraftingShell
      stepId="guardians"
      title="Guardians for minors (Legacy)"
      description="Legacy stepper flow retained for archive reference. Use the active structured or AI flow."
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
            <FieldGroup label="Phone number">
              <Input
                value={data.guardians[0]?.phone || ""}
                onChange={(event) => updateGuardian(0, "phone", event.target.value)}
                placeholder="+254 7xx xxx xxx"
              />
            </FieldGroup>
            <FieldGroup label="Location">
              <Input
                value={data.guardians[0]?.location || ""}
                onChange={(event) => updateGuardian(0, "location", event.target.value)}
                placeholder="Town or county"
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Notes for the guardian">
            <Textarea
              value={data.guardianNotes}
              onChange={(event) => update({ guardianNotes: event.target.value })}
              placeholder="Share any guidance for care, schooling, or family expectations."
            />
          </FieldGroup>
        </Card>

        <Card size="lg" variant="secondary" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Backup guardian</p>
          <p className="text-xs text-muted">
            If the primary guardian cannot serve, the backup will be considered.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Full name">
              <Input
                value={data.guardians[1]?.name || ""}
                onChange={(event) => updateGuardian(1, "name", event.target.value)}
                placeholder="Backup guardian"
              />
            </FieldGroup>
            <FieldGroup label="Relationship">
              <Input
                value={data.guardians[1]?.relationship || ""}
                onChange={(event) => updateGuardian(1, "relationship", event.target.value)}
                placeholder="e.g. Uncle, godparent"
              />
            </FieldGroup>
            <FieldGroup label="Phone number">
              <Input
                value={data.guardians[1]?.phone || ""}
                onChange={(event) => updateGuardian(1, "phone", event.target.value)}
                placeholder="+254 7xx xxx xxx"
              />
            </FieldGroup>
            <FieldGroup label="Location">
              <Input
                value={data.guardians[1]?.location || ""}
                onChange={(event) => updateGuardian(1, "location", event.target.value)}
                placeholder="Town or county"
              />
            </FieldGroup>
          </div>
        </Card>

        <Card size="lg" variant="secondary" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Notes</p>
          <p className="text-xs text-muted">Any special guidance for the guardian or your children.</p>
        </Card>
      </div>
    </DraftingShell>
  );
}
