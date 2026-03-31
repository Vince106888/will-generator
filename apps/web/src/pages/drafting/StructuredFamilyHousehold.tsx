// Frame: Structured Family and Household (EjguX)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function StructuredFamilyHousehold() {
  const { data, update } = useDraftingMode("structured");

  const updateDependant = (
    index: number,
    key: "name" | "relationship" | "age" | "location",
    value: string
  ) => {
    const next = [...data.dependants];
    next[index] = { ...next[index], [key]: value };
    update({ dependants: next });
  };

  const addDependant = () => {
    update({
      dependants: [...data.dependants, { name: "", relationship: "", age: "", location: "" }]
    });
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
        ctaMode: "structured",
        ctaPath: "/"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              Step 2 of 8: Family and household
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Family and household</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Share who depends on you and how your household is structured. This helps the will reflect your real
              responsibilities and protects people who rely on you.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">
                Step 2 of 8 — Family and household
              </p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-[25%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Household status</p>
                  <p className="text-[13px] text-muted">
                    Marital and household status influence how courts interpret a will. Simple answers are fine.
                  </p>
                </div>
                <div className="space-y-3">
                  <FieldGroup label="Marital status">
                    <Select
                      value={data.maritalStatus}
                      onChange={(event) => update({ maritalStatus: event.target.value })}
                    >
                      <option value="">Select</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Separated</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                      <option>Other</option>
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Spouse full name (optional)">
                    <Input
                      placeholder="Spouse full name"
                      value={data.spouseName}
                      onChange={(event) => update({ spouseName: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Spouse phone (optional)">
                    <Input
                      placeholder="+254 7xx xxx xxx"
                      value={data.spousePhone}
                      onChange={(event) => update({ spousePhone: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Multiple households?">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant={data.multipleHouseholds ? "secondary" : "primary"}
                        size="sm"
                        onClick={() => update({ multipleHouseholds: false })}
                      >
                        No
                      </Button>
                      <Button
                        variant={data.multipleHouseholds ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => update({ multipleHouseholds: true })}
                      >
                        Yes
                      </Button>
                    </div>
                  </FieldGroup>
                </div>
              </Card>

              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Children and dependants</p>
                  <p className="text-[13px] text-muted">
                    List children and anyone else you support financially or care for. Include step-children if they
                    depend on you.
                  </p>
                </div>
                <div className="space-y-4">
                  {data.dependants.map((dependant, index) => (
                    <div key={`${dependant.name}-${index}`} className="space-y-2 rounded-lg border border-border bg-secondary p-3">
                      <p className="text-[13px] font-semibold text-ink">Dependant {index + 1}</p>
                      <FieldGroup label="Full name">
                        <Input
                          placeholder="Full name"
                          value={dependant.name}
                          onChange={(event) => updateDependant(index, "name", event.target.value)}
                        />
                      </FieldGroup>
                      <FieldGroup label="Relationship">
                        <Input
                          placeholder="e.g. daughter, father"
                          value={dependant.relationship}
                          onChange={(event) =>
                            updateDependant(index, "relationship", event.target.value)
                          }
                        />
                      </FieldGroup>
                      <FieldGroup label="Age (optional)">
                        <Input
                          placeholder="Age"
                          value={dependant.age}
                          onChange={(event) => updateDependant(index, "age", event.target.value)}
                        />
                      </FieldGroup>
                      <FieldGroup label="Location (optional)">
                        <Input
                          placeholder="Town / county"
                          value={dependant.location}
                          onChange={(event) =>
                            updateDependant(index, "location", event.target.value)
                          }
                        />
                      </FieldGroup>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={addDependant}>
                    Add dependant
                  </Button>
                </div>
                <FieldGroup label="Dependants notes (optional)">
                  <Textarea
                    placeholder="Share any details that may affect your wishes."
                    value={data.dependantsNotes}
                    onChange={(event) => update({ dependantsNotes: event.target.value })}
                  />
                </FieldGroup>
              </Card>

              <HelperCallout
                title="Why we ask this"
                body="This section helps prevent dependants from being overlooked and reduces family disputes later."
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured/executors")}>
                  Continue to executors
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                  Save and return later
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <HelperCallout
                title="Privacy first"
                body="Family information is encrypted and only used to prepare your will. You can edit or remove it before signing."
              />
              <HelperCallout
                title="Do I list everyone?"
                body="Include anyone who relies on you or who you want the will to mention."
              />
              <HelperCallout
                title="Can I update later?"
                body="Yes. You can add or remove dependants before you sign."
              />
              <HelperCallout
                title="How this affects your will"
                body="Key clauses influenced by family details."
              />
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">How this affects your will</p>
                  <p className="text-[13px] text-muted">Key clauses influenced by family details.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Guardianship clauses for minor children</p>
                  <p>&bull; Family and dependant recognition</p>
                  <p className="text-muted">&bull; Distribution fairness considerations</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
