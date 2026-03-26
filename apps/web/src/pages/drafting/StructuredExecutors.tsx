// Frame: Executors (yb4Yk)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function StructuredExecutors() {
  const { data, update } = useDraftingData();
  const primary = data.executors[0] ?? { name: "", relationship: "", phone: "" };
  const backup = data.executors[1] ?? { name: "", relationship: "", phone: "" };

  const updateExecutor = (index: number, field: "name" | "relationship" | "phone", value: string) => {
    const next = [...data.executors];
    if (!next[index]) next[index] = { name: "", relationship: "", phone: "" };
    next[index] = { ...next[index], [field]: value };
    update({ executors: next });
  };

  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="Structured flow"
          title="Executors"
          description="An executor is the trusted person who carries out your wishes. Choose someone responsible and willing. You can name a backup executor in case the first person cannot serve."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Primary executor</p>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup label="Full name">
                  <Input
                    placeholder="e.g., Grace Wanjiru"
                    value={primary.name}
                    onChange={(event) => updateExecutor(0, "name", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Relationship">
                  <Input
                    placeholder="Spouse, sibling, friend"
                    value={primary.relationship}
                    onChange={(event) => updateExecutor(0, "relationship", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Phone number">
                  <Input
                    placeholder="07xx xxx xxx"
                    value={primary.phone}
                    onChange={(event) => updateExecutor(0, "phone", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Availability check" hint="Confirm they are willing to serve.">
                  <Input
                    placeholder="Yes - discussed"
                    value={data.executorNotes}
                    onChange={(event) => update({ executorNotes: event.target.value })}
                  />
                </FieldGroup>
              </div>
            </Card>

            <Card size="lg" variant="secondary" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Backup executor</p>
              <p className="text-xs text-muted">
                A backup executor helps if your first choice is unable to act. This avoids delays for your family.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup label="Full name">
                  <Input
                    placeholder="Optional"
                    value={backup.name}
                    onChange={(event) => updateExecutor(1, "name", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Relationship">
                  <Input
                    placeholder="Optional"
                    value={backup.relationship}
                    onChange={(event) => updateExecutor(1, "relationship", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Phone number">
                  <Input
                    placeholder="Optional"
                    value={backup.phone}
                    onChange={(event) => updateExecutor(1, "phone", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Availability check">
                  <Input placeholder="Have you spoken?" />
                </FieldGroup>
              </div>
            </Card>

            <Callout tone="info">
              Executors manage the legal process, settle debts, and distribute assets. Choose someone who is calm, fair,
              and organized.
            </Callout>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Executor responsibilities</p>
              <ul className="list-disc space-y-2 pl-5 text-xs text-muted">
                <li>Locate and secure the signed will</li>
                <li>Pay outstanding debts and taxes</li>
                <li>Distribute assets according to your wishes</li>
                <li>Communicate clearly with beneficiaries</li>
              </ul>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">What to tell them</p>
              <p className="text-xs text-muted">
                Let your executor know where the signed will is stored and provide contact details for your lawyer or
                advocate if you use one.
              </p>
            </Card>
            <TrustPanel
              title="We keep executors informed"
              items={[
                "You can share a draft summary with them later.",
                "We include clear instructions for accessing the final will.",
                "You remain in control of what is shared."
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/mapping")}>Back</Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/drafting/guardianship")}>
            Continue to guardianship
          </Button>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
