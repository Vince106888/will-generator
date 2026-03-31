// Frame: Structured Personal Details (74ORj)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function StructuredPersonalDetails() {
  const { data, update } = useDraftingMode("structured");

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
              Step 1 of 8: Personal details
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Personal details</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              These details help identify you unambiguously in the will.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">Step 1 of 8 — Personal details</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-[12.5%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-4">
              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Legal identity</p>
                  <p className="text-[13px] text-muted">
                    These details help identify you unambiguously in the will.
                  </p>
                </div>
                <div className="space-y-3">
                  <FieldGroup label="Full legal name">
                    <Input
                      placeholder="e.g. Grace Wanjiku Mwangi"
                      value={data.legalName}
                      onChange={(event) => update({ legalName: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="ID type">
                    <Select
                      value={data.idType}
                      onChange={(event) => update({ idType: event.target.value })}
                    >
                      <option>National ID</option>
                      <option>Passport</option>
                      <option>Alien ID</option>
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="ID / passport number">
                    <Input
                      placeholder="ID / passport number"
                      value={data.idNumber}
                      onChange={(event) => update({ idNumber: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Date of birth">
                    <Input
                      type="date"
                      value={data.dateOfBirth}
                      onChange={(event) => update({ dateOfBirth: event.target.value })}
                    />
                  </FieldGroup>
                </div>
              </Card>

              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Contact and address</p>
                  <p className="text-[13px] text-muted">
                    Your address helps locate you in legal records and notices.
                  </p>
                </div>
                <div className="space-y-3">
                  <FieldGroup label="Email (optional)">
                    <Input
                      placeholder="you@email.com"
                      value={data.email}
                      onChange={(event) => update({ email: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Phone (optional)">
                    <Input
                      placeholder="+254 7xx xxx xxx"
                      value={data.phone}
                      onChange={(event) => update({ phone: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Address">
                    <Input
                      placeholder="Street, town, county"
                      value={data.address}
                      onChange={(event) => update({ address: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="County">
                    <Input
                      placeholder="Town or county"
                      value={data.county}
                      onChange={(event) => update({ county: event.target.value })}
                    />
                  </FieldGroup>
                </div>
              </Card>

              <HelperCallout
                title="What this affects"
                body="These details appear in your will to confirm your identity and reduce legal confusion."
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => navigate("/drafting/structured/family")}
                >
                  Continue to family
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => navigate("/drafting/structured-flow")}
                >
                  Save and return later
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <HelperCallout
                title="What if I do not have ID?"
                body="You can still start. We will explain the minimum legal identifiers needed for a valid will."
              />
              <HelperCallout
                title="Can I update this later?"
                body="Yes. You can edit these details any time before you sign."
              />
              <HelperCallout
                title="What this affects"
                body="Where these details appear in your will."
              />
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">What this affects</p>
                  <p className="text-[13px] text-muted">Where these details appear in your will.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Opening legal statement</p>
                  <p>&bull; Identification of the testator</p>
                  <p className="text-muted">&bull; Signature and witness sections</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
