// Frame: Assets + Beneficiaries Mapping (nFFsn)
import { useEffect, useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { AlertTriangle, Info, Link2, Table2 } from "lucide-react";

export default function AssetsBeneficiariesMapping() {
  const { data, update } = useDraftingMode("structured");
  const assets = data.assets
    .filter((asset) => asset.location || asset.notes)
    .map((asset) => ({
      label: asset.label || "Asset",
      detail: asset.location || asset.notes || "Details pending"
    }));
  const beneficiaries = data.beneficiaries
    .map((beneficiary) => beneficiary.name?.trim())
    .filter(Boolean);

  const fallbackAssets = [
    { label: "House in Kiambu", detail: "Property" },
    { label: "Toyota Prado KDM 456A", detail: "Vehicle" },
    { label: "M-Pesa account", detail: "Cash / Mobile money" }
  ];
  const fallbackBeneficiaries = ["Wife", "Brian (son)", "Nia (daughter)"];
  const assetsList = assets.length ? assets : fallbackAssets;
  const beneficiariesList = beneficiaries.length ? beneficiaries : fallbackBeneficiaries;
  const assetOptions = data.assets.map((asset, index) => ({
    value: asset.label || `Asset ${index + 1}`,
    label: asset.label || `Asset ${index + 1}`
  }));
  const beneficiaryOptions = data.beneficiaries
    .map((beneficiary, index) => ({
      value: beneficiary.name || `Beneficiary ${index + 1}`,
      label: beneficiary.name || `Beneficiary ${index + 1}`
    }))
    .filter((option) => option.value.trim().length > 0);
  const [allocationForm, setAllocationForm] = useState({
    assetLabel: assetOptions[0]?.value ?? "",
    beneficiary: beneficiaryOptions[0]?.value ?? "",
    share: "",
    notes: ""
  });
  const [allocationStatus, setAllocationStatus] = useState<string | null>(null);

  useEffect(() => {
    setAllocationForm((prev) => ({
      ...prev,
      assetLabel: prev.assetLabel || assetOptions[0]?.value || "",
      beneficiary: prev.beneficiary || beneficiaryOptions[0]?.value || ""
    }));
  }, [assetOptions, beneficiaryOptions]);

  const allocationItems = useMemo(() => {
    const mapped = data.assetAllocations.flatMap((allocation) => {
      const assetLabel = allocation.assetLabel?.trim();
      if (!assetLabel) return [];
      const targets = allocation.allocations
        .map((target) => target.beneficiary?.trim() || "")
        .filter(Boolean);
      return [
        {
          assetLabel,
          assignees: targets.length ? targets : ["Not assigned"]
        }
      ];
    });
    return mapped.length
      ? mapped
      : [
          { assetLabel: "House in Kiambu", assignees: ["Wife"] },
          { assetLabel: "Toyota Prado KDM 456A", assignees: ["Brian (son)"] },
          { assetLabel: "M-Pesa account", assignees: ["Nia (daughter)"] }
        ];
  }, [data.assetAllocations]);

  const updateAsset = (index: number, key: "label" | "location" | "notes", value: string) => {
    const next = [...data.assets];
    next[index] = { ...next[index], [key]: value };
    update({ assets: next });
  };

  const updateBeneficiary = (
    index: number,
    key: "name" | "relationship" | "phone" | "idType" | "share",
    value: string
  ) => {
    const next = [...data.beneficiaries];
    next[index] = { ...next[index], [key]: value };
    update({ beneficiaries: next });
  };

  const handleAddAsset = () => {
    const customCount = data.assets.filter((asset) =>
      asset.label.toLowerCase().startsWith("custom asset")
    ).length;
    update({
      assets: [
        ...data.assets,
        { label: `Custom asset ${customCount + 1}`, location: "", notes: "" }
      ]
    });
  };

  const handleAddBeneficiary = () => {
    update({
      beneficiaries: [
        ...data.beneficiaries,
        { name: "", relationship: "", phone: "", idType: "", share: "" }
      ]
    });
  };

  const handleAddAllocation = () => {
    setAllocationStatus(null);
    if (!allocationForm.assetLabel || !allocationForm.beneficiary) {
      setAllocationStatus("Select an asset and beneficiary first.");
      return;
    }
    const next = [...data.assetAllocations];
    const existingIndex = next.findIndex(
      (allocation) => allocation.assetLabel === allocationForm.assetLabel
    );
    const entry = {
      beneficiary: allocationForm.beneficiary,
      share: allocationForm.share,
      notes: allocationForm.notes
    };
    if (existingIndex >= 0) {
      const existing = next[existingIndex];
      next[existingIndex] = {
        ...existing,
        allocations: [...existing.allocations, entry]
      };
    } else {
      next.push({
        assetLabel: allocationForm.assetLabel,
        allocations: [entry]
      });
    }
    update({ assetAllocations: next });
    setAllocationForm((prev) => ({ ...prev, share: "", notes: "" }));
    setAllocationStatus("Allocation saved.");
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
        ctaPath: "/"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              Step 5 of 8 — Assets
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Assets and beneficiaries</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              List what you own so nothing important is missed. Short descriptions are fine — you can add more detail
              later.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">Step 5 of 8: Assets</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-[62.5%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Assets you have</p>
                  <p className="text-[13px] text-muted">Add each item you own, even if the description is general.</p>
                </div>
                <div className="space-y-4">
                  {data.assets.map((asset, index) => (
                    <div key={`${asset.label}-${index}`} className="space-y-2 rounded-lg border border-border bg-secondary p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13px] font-semibold text-ink">{asset.label || `Asset ${index + 1}`}</p>
                        {index >= 6 ? (
                          <Input
                            className="max-w-[220px]"
                            placeholder="Asset label"
                            value={asset.label}
                            onChange={(event) =>
                              updateAsset(index, "label", event.target.value)
                            }
                          />
                        ) : null}
                      </div>
                      <FieldGroup label="Location or identifier">
                        <Input
                          placeholder="Town, deed number, account name, or note"
                          value={asset.location}
                          onChange={(event) =>
                            updateAsset(index, "location", event.target.value)
                          }
                        />
                      </FieldGroup>
                      <FieldGroup label="Notes (optional)" hint="Add anything that helps identify this asset.">
                        <Textarea
                          className="min-h-[72px]"
                          placeholder="Optional notes"
                          value={asset.notes}
                          onChange={(event) =>
                            updateAsset(index, "notes", event.target.value)
                          }
                        />
                      </FieldGroup>
                    </div>
                  ))}
                  {assetsList.length === 0 ? (
                    <p className="text-[12px] text-muted">No assets listed yet.</p>
                  ) : null}
                </div>
                <Button variant="ghost" size="sm" onClick={handleAddAsset}>
                  Add another asset
                </Button>
              </Card>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Who gets what</p>
                  <p className="text-[13px] text-muted">
                    Link each asset to the person who should receive it. You can split items by percentage if needed.
                  </p>
                </div>
                <div className="space-y-2">
                  {allocationItems.map((allocation) => (
                    <div key={allocation.assetLabel} className="rounded-lg border border-border bg-secondary p-3">
                      <p className="text-[13px] font-semibold text-ink">{allocation.assetLabel}</p>
                      <p className="text-[12px] text-muted">
                        Assigned to: {allocation.assignees.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 rounded-lg border border-border bg-secondary p-3">
                  <FieldGroup label="Asset">
                    <Select
                      value={allocationForm.assetLabel}
                      onChange={(event) =>
                        setAllocationForm((prev) => ({
                          ...prev,
                          assetLabel: event.target.value
                        }))
                      }
                    >
                      {assetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Beneficiary">
                    <Select
                      value={allocationForm.beneficiary}
                      onChange={(event) =>
                        setAllocationForm((prev) => ({
                          ...prev,
                          beneficiary: event.target.value
                        }))
                      }
                    >
                      {beneficiaryOptions.length ? (
                        beneficiaryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      ) : (
                        <option value="">Add a beneficiary first</option>
                      )}
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Share or instructions (optional)" hint="Example: 50% or split equally.">
                    <Input
                      placeholder="Optional share"
                      value={allocationForm.share}
                      onChange={(event) =>
                        setAllocationForm((prev) => ({
                          ...prev,
                          share: event.target.value
                        }))
                      }
                    />
                  </FieldGroup>
                  <FieldGroup label="Notes (optional)">
                    <Input
                      placeholder="Optional notes"
                      value={allocationForm.notes}
                      onChange={(event) =>
                        setAllocationForm((prev) => ({
                          ...prev,
                          notes: event.target.value
                        }))
                      }
                    />
                  </FieldGroup>
                  {allocationStatus ? (
                    <p className="text-[12px] text-muted">{allocationStatus}</p>
                  ) : null}
                  <Button variant="primary" size="sm" onClick={handleAddAllocation}>
                    Add allocation
                  </Button>
                </div>
              </Card>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <Info className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Tips for describing assets</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    General descriptions are acceptable (for example: "all my vehicles" or "bank accounts at KCB"). More
                    detail helps your executor.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <Table2 className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Valuation is optional</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    You do not need exact values. If helpful, note approximate amounts or locations to help your
                    executor identify the asset.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Beneficiaries</p>
                  <p className="text-[13px] text-muted">
                    Add everyone who should receive something, even if the share is small.
                  </p>
                </div>
                <div className="space-y-3">
                  {data.beneficiaries.map((beneficiary, index) => (
                    <div key={`${beneficiary.name}-${index}`} className="space-y-2 rounded-lg border border-border bg-secondary p-3">
                      <p className="text-[13px] font-semibold text-ink">
                        Beneficiary {index + 1}
                      </p>
                      <FieldGroup label="Full name">
                        <Input
                          placeholder="e.g. Mary Njeri"
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
                            updateBeneficiary(
                              index,
                              "relationship",
                              event.target.value
                            )
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
                  {beneficiariesList.length === 0 ? (
                    <p className="text-[12px] text-muted">No beneficiaries listed yet.</p>
                  ) : null}
                </div>
                <Button variant="ghost" size="sm" onClick={handleAddBeneficiary}>
                  Add beneficiary
                </Button>
              </Card>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <Link2 className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Allocation summary</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    Every asset should point to at least one beneficiary. If you want a remainder clause, note who
                    receives anything not listed.
                  </p>
                </div>
              </div>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Remainder clause example</p>
                  <p className="text-[13px] text-muted">Use when assets are not listed individually.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; "Everything else goes equally to my children."</p>
                  <p>&bull; "Any remaining property goes to my spouse."</p>
                  <p className="text-muted">You can change this later if needed.</p>
                </div>
                <FieldGroup label="Your remainder clause">
                  <Textarea
                    className="min-h-[96px]"
                    placeholder="Write who should receive anything not listed above."
                    value={data.remainderClause}
                    onChange={(event) =>
                      update({ remainderClause: event.target.value })
                    }
                  />
                </FieldGroup>
              </Card>

              {!data.remainderClause.trim() ? (
                <div className="flex gap-3 rounded-xl border border-warning bg-warning-soft p-4">
                  <AlertTriangle className="mt-0.5 text-warning" size={20} strokeWidth={1.6} />
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-ink">Missing: remainder clause</p>
                    <p className="text-[13px] leading-[1.5] text-muted">
                      Decide who should receive any assets not specifically listed above. This prevents unintentional gaps.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured-executors")}>
                  Continue to executors
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                  Save and return later
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}


