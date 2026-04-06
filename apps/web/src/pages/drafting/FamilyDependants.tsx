import { DraftingShell } from "../../components/drafting/DraftingShell";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { StepActions } from "../../components/drafting/StepActions";
import { Textarea } from "../../components/ui/Textarea";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useDraftingData } from "../../lib/drafting";

export default function FamilyDependants() {
  const { data, update } = useDraftingData();

  return (
    <DraftingShell
      stepId="family"
      title="Family and dependants (Legacy)"
      description="Legacy stepper flow retained for archive reference. Use the active structured or AI flow."
      footer={<StepActions currentPath="/drafting/family" />}
      aside={
        <Card size="md" variant="secondary" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Family circumstances</p>
          <p className="text-xs text-muted">
            Share any details that may affect your wishes, such as dependants with special needs.
          </p>
        </Card>
      }
    >
      <div className="space-y-4">
        <Card size="lg" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Spouse</p>
          <p className="text-xs text-muted">
            If you have a spouse, add their details. If not, you can skip.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Spouse full name">
              <Input
                value={data.spouseName}
                onChange={(event) => update({ spouseName: event.target.value })}
                placeholder="Spouse full name"
              />
            </FieldGroup>
            <FieldGroup label="Spouse phone">
              <Input
                value={data.spousePhone}
                onChange={(event) => update({ spousePhone: event.target.value })}
                placeholder="+254 7xx xxx xxx"
              />
            </FieldGroup>
          </div>
        </Card>

        <Card size="lg" className="space-y-3">
          <p className="text-xs font-semibold text-ink">Children and dependants</p>
          <p className="text-xs text-muted">
            Add each child or dependant. We&apos;ll ask about guardians if any are minors.
          </p>
          {data.dependants.map((dependant, index) => (
            <Card key={`dependant-${index}`} size="md" variant="secondary" className="space-y-3">
              <p className="text-xs font-semibold text-ink">Dependant {index + 1}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup label="Full name">
                  <Input
                    value={dependant.name}
                    onChange={(event) => {
                      const next = data.dependants.map((item, i) =>
                        i === index ? { ...item, name: event.target.value } : item
                      );
                      update({ dependants: next });
                    }}
                    placeholder="Full name"
                  />
                </FieldGroup>
                <FieldGroup label="Relationship">
                  <Input
                    value={dependant.relationship}
                    onChange={(event) => {
                      const next = data.dependants.map((item, i) =>
                        i === index ? { ...item, relationship: event.target.value } : item
                      );
                      update({ dependants: next });
                    }}
                    placeholder="e.g. Daughter"
                  />
                </FieldGroup>
                <FieldGroup label="Age">
                  <Input
                    value={dependant.age}
                    onChange={(event) => {
                      const next = data.dependants.map((item, i) =>
                        i === index ? { ...item, age: event.target.value } : item
                      );
                      update({ dependants: next });
                    }}
                    placeholder="Age"
                  />
                </FieldGroup>
                <FieldGroup label="Location">
                  <Input
                    value={dependant.location}
                    onChange={(event) => {
                      const next = data.dependants.map((item, i) =>
                        i === index ? { ...item, location: event.target.value } : item
                      );
                      update({ dependants: next });
                    }}
                    placeholder="Town / county"
                  />
                </FieldGroup>
              </div>
            </Card>
          ))}
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              update({
                dependants: [
                  ...data.dependants,
                  { name: "", relationship: "", age: "", location: "" }
                ]
              })
            }
            className="w-full sm:w-auto"
          >
            Add dependant
          </Button>
        </Card>

        <Card size="lg" variant="secondary" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Family circumstances</p>
          <Textarea
            value={data.dependantsNotes}
            onChange={(event) => update({ dependantsNotes: event.target.value })}
            placeholder="Share any details that may affect your wishes."
          />
        </Card>
      </div>
    </DraftingShell>
  );
}
