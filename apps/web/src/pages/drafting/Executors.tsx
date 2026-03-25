import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Textarea } from "../../components/ui/Textarea";
import { useDraftingData } from "../../lib/drafting";

export default function Executors() {
  const { data, update } = useDraftingData();

  const updateExecutor = (index: number, key: "name" | "relationship" | "phone", value: string) => {
    const next = data.executors.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    update({ executors: next });
  };

  return (
    <DraftingShell
      stepId="executors"
      title="Executors"
      description="An executor is the trusted person who carries out your wishes. Choose someone responsible and willing."
      footer={<StepActions currentPath="/drafting/executors" />}
      aside={
        <Card size="md" variant="info" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Choosing the right person</p>
          <p className="text-xs text-muted">
            Pick someone organized and willing to handle paperwork. It's often a close family member or trusted friend.
          </p>
        </Card>
      }
    >
      <div className="space-y-4">
        <Card size="lg" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Primary executor</p>
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Full name">
              <Input
                value={data.executors[0]?.name || ""}
                onChange={(event) => updateExecutor(0, "name", event.target.value)}
                placeholder="Executor name"
              />
            </FieldGroup>
            <FieldGroup label="Relationship">
              <Input
                value={data.executors[0]?.relationship || ""}
                onChange={(event) => updateExecutor(0, "relationship", event.target.value)}
                placeholder="e.g. Spouse, sibling"
              />
            </FieldGroup>
            <FieldGroup label="Phone number">
              <Input
                value={data.executors[0]?.phone || ""}
                onChange={(event) => updateExecutor(0, "phone", event.target.value)}
                placeholder="+254 7xx xxx xxx"
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Availability check" hint="Confirm they are willing to serve.">
            <Input
              value={data.executorNotes}
              onChange={(event) => update({ executorNotes: event.target.value })}
              placeholder="Yes, we discussed"
            />
          </FieldGroup>
        </Card>

        <Card size="lg" variant="secondary" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Backup executor</p>
          <p className="text-xs text-muted">
            If the primary executor is unable to serve, the backup takes over.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Full name">
              <Input
                value={data.executors[1]?.name || ""}
                onChange={(event) => updateExecutor(1, "name", event.target.value)}
                placeholder="Backup executor"
              />
            </FieldGroup>
            <FieldGroup label="Relationship">
              <Input
                value={data.executors[1]?.relationship || ""}
                onChange={(event) => updateExecutor(1, "relationship", event.target.value)}
                placeholder="e.g. Cousin, advocate"
              />
            </FieldGroup>
            <FieldGroup label="Phone number">
              <Input
                value={data.executors[1]?.phone || ""}
                onChange={(event) => updateExecutor(1, "phone", event.target.value)}
                placeholder="+254 7xx xxx xxx"
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Notes">
            <Textarea
              value={data.executorNotes}
              onChange={(event) => update({ executorNotes: event.target.value })}
              placeholder="Share anything the backup executor should know."
            />
          </FieldGroup>
        </Card>
      </div>
    </DraftingShell>
  );
}
