// Frame: Structured Beneficiaries (zXzDB)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function StructuredBeneficiaries() {
  const { data, update } = useDraftingMode("structured");

  const updateBeneficiary = (
    index: number,
    key: "name" | "relationship" | "phone" | "idType" | "share",
    value: string
  ) => {
    const next = [...data.beneficiaries];
    next[index] = { ...next[index], [key]: value };
    update({ beneficiaries: next });
  };

  const addBeneficiary = () => {
    update({
      beneficiaries: [
        ...data.beneficiaries,
        { name: "", relationship: "", phone: "", idType: "", share: "" }
      ]
    });
  };

  const allocationSummary = data.assetAllocations.flatMap((allocation) => {
    const assetLabel = allocation.assetLabel?.trim();
    if (!assetLabel) return [];
    const targets = allocation.allocations
      .map((target) => target.beneficiary?.trim() || "")
      .filter(Boolean);
    return [`${assetLabel} → ${targets.length ? targets.join(", ") : "Not assigned"}`];
  });

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
              Step 6 of 8: Beneficiaries
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Beneficiaries</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              List everyone you want to receive something. We help you split assets clearly so there are no gaps or
              surprises.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">Step 6 of 8 — Beneficiaries</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-[75%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Beneficiaries list</p>
                  <p className="text-[13px] text-muted">
                    Use legal names where possible. You can add minors and dependants here as well.
                  </p>
                </div>
                <div className="space-y-4">
                  {data.beneficiaries.map((beneficiary, index) => (
                    <div key={`${beneficiary.name}-${index}`} className="space-y-2 rounded-lg border border-border bg-secondary p-3">
                      <p className="text-[13px] font-semibold text-ink">Beneficiary {index + 1}</p>
                      <FieldGroup label="Full name">
                        <Input
                          placeholder="Full name"
                          value={beneficiary.name}
                          onChange={(event) =>
                            updateBeneficiary(index, "name", event.target.value)
                          }
                        />
                      </FieldGroup>
                      <FieldGroup label="Relationship">
                        <Input
                          placeholder="e.g. spouse, child"
                          value={beneficiary.relationship}
                          onChange={(event) =>
                            updateBeneficiary(index, "relationship", event.target.value)
                          }
                        />
                      </FieldGroup>
                      <FieldGroup label="Phone or email (optional)">
                        <Input
                          placeholder="Optional"
                          value={beneficiary.phone}
                          onChange={(event) =>
                            updateBeneficiary(index, "phone", event.target.value)
                          }
                        />
                      </FieldGroup>
                      <FieldGroup label="ID type (optional)">
                        <Input
                          placeholder="National ID, passport"
                          value={beneficiary.idType}
                          onChange={(event) =>
                            updateBeneficiary(index, "idType", event.target.value)
                          }
                        />
                      </FieldGroup>
                      <FieldGroup label="Share or note (optional)">
                        <Input
                          placeholder="Example: 50% or equal"
                          value={beneficiary.share}
                          onChange={(event) =>
                            updateBeneficiary(index, "share", event.target.value)
                          }
                        />
                      </FieldGroup>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={addBeneficiary}>
                    Add beneficiary
                  </Button>
                </div>
              </Card>

              <HelperCallout
                title="Share and allocation"
                body="You can split by percentage or by specific gifts. We flag any asset that is missing a recipient."
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured/wishes")}>
                  Continue to special wishes
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured/assets")}>
                  Back to assets
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Allocation summary</p>
                  <p className="text-[13px] text-muted">
                    Every asset should point to at least one beneficiary.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  {allocationSummary.length ? (
                    allocationSummary.map((line) => <p key={line}>&bull; {line}</p>)
                  ) : (
                    <p className="text-muted">&bull; No allocations yet</p>
                  )}
                </div>
              </Card>
              <HelperCallout
                title="Share and allocation"
                body="You can split by percentage or by specific gifts. We flag any asset that is missing a recipient."
              />
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
