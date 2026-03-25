import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function AssetsBeneficiariesMapping() {
  const { data, update } = useDraftingData();

  const addAllocation = (assetLabel: string) => {
    const next = [...data.assetAllocations];
    if (!next.find((item) => item.assetLabel === assetLabel)) {
      next.push({
        assetLabel,
        allocations: [{ beneficiary: "", share: "", notes: "" }]
      });
      update({ assetAllocations: next });
    }
  };

  const updateAllocation = (
    assetLabel: string,
    index: number,
    field: "beneficiary" | "share" | "notes",
    value: string
  ) => {
    const next = data.assetAllocations.map((item) => {
      if (item.assetLabel !== assetLabel) return item;
      const allocations = item.allocations.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry
      );
      return { ...item, allocations };
    });
    update({ assetAllocations: next });
  };

  const addAllocationRow = (assetLabel: string) => {
    const next = data.assetAllocations.map((item) => {
      if (item.assetLabel !== assetLabel) return item;
      return {
        ...item,
        allocations: [...item.allocations, { beneficiary: "", share: "", notes: "" }]
      };
    });
    update({ assetAllocations: next });
  };

  return (
    <WorkspaceShell>
      <Container className="pb-24 pt-12 max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Assets + beneficiaries mapping</p>
          <p className="max-w-[900px] text-[15px] leading-7 text-muted">
            Assign each asset to the people you want to receive it. You can split assets, set percentages, or add
            notes for clarity.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <Card size="lg" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink">Assets to assign</p>
                <span className="rounded-full bg-warning-soft px-3 py-1 text-[11px] font-semibold text-warning">
                  {data.assets.length} items
                </span>
              </div>
              <div className="space-y-3">
                {data.assets.map((asset) => {
                  const allocation = data.assetAllocations.find((item) => item.assetLabel === asset.label);
                  const statusLabel = allocation ? "Assigned" : "Needs allocation";
                  return (
                    <div key={asset.label} className="rounded-xl border border-border bg-paper p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-ink">{asset.label}</p>
                          <p className="text-xs text-muted">
                            {asset.location || asset.notes || "Add location or notes for clarity."}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                            allocation ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                      {allocation && (
                        <div className="mt-4 space-y-3">
                          {allocation.allocations.map((entry, index) => (
                            <div key={`${asset.label}-${index}`} className="rounded-lg border border-border bg-secondary p-3">
                              <div className="grid gap-3 md:grid-cols-3">
                                <FieldGroup label="Beneficiary">
                                  <Input
                                    placeholder="Name"
                                    value={entry.beneficiary}
                                    onChange={(event) =>
                                      updateAllocation(asset.label, index, "beneficiary", event.target.value)
                                    }
                                  />
                                </FieldGroup>
                                <FieldGroup label="Share">
                                  <Input
                                    placeholder="e.g., 50% or full"
                                    value={entry.share}
                                    onChange={(event) =>
                                      updateAllocation(asset.label, index, "share", event.target.value)
                                    }
                                  />
                                </FieldGroup>
                                <FieldGroup label="Notes">
                                  <Input
                                    placeholder="Optional notes"
                                    value={entry.notes}
                                    onChange={(event) =>
                                      updateAllocation(asset.label, index, "notes", event.target.value)
                                    }
                                  />
                                </FieldGroup>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addAllocationRow(asset.label)}
                          >
                            Add another beneficiary
                          </Button>
                        </div>
                      )}
                      {!allocation && (
                        <Button variant="secondary" size="sm" className="mt-3" onClick={() => addAllocation(asset.label)}>
                          Start allocation
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
              <Button variant="secondary" size="sm">
                Add another asset
              </Button>
            </Card>

            <Card size="lg" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Beneficiaries in this draft</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.beneficiaries.map((beneficiary, index) => (
                  <div key={`${beneficiary.name}-${index}`} className="rounded-xl border border-border bg-paper p-4">
                    <p className="text-sm font-semibold text-ink">{beneficiary.name || "Unnamed beneficiary"}</p>
                    <p className="text-xs text-muted">{beneficiary.relationship || "Relationship"}</p>
                    <p className="text-xs text-muted">{beneficiary.phone || "Phone not provided"}</p>
                  </div>
                ))}
              </div>
              <Button variant="secondary" size="sm">
                Add beneficiary
              </Button>
            </Card>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-3">
              <p className="text-xs font-semibold text-ink">Allocation detail</p>
              <p className="text-sm font-semibold text-ink">Set remainder clause</p>
              <p className="text-xs text-muted">
                Assets not listed above should still go somewhere. Use the remainder clause to cover everything else.
              </p>
              <FieldGroup label="Remainder clause" hint="Example: Divide remaining assets equally among my children.">
                <Input
                  placeholder="Describe who receives remaining assets"
                  value={data.remainderClause}
                  onChange={(event) => update({ remainderClause: event.target.value })}
                />
              </FieldGroup>
              <Button variant="primary" size="sm">
                Save remainder clause
              </Button>
            </Card>

            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Helpful reminder</p>
              <p className="text-xs text-muted">
                If minors inherit assets, make sure a guardian or trustee is named in the next step.
              </p>
            </Card>

            <Callout tone="warning">
              You can return to this mapping step before finalizing. Clear allocations reduce disputes.
            </Callout>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">You can adjust allocations later before finalizing the draft.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
              Back
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured-executors")}>
              Continue to executors
            </Button>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
