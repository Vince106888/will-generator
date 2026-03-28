// Frame: Assets + Beneficiaries Mapping (nFFsn)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function AssetsBeneficiariesMapping() {
  useDraftingMode("structured");

  return (
    <WorkspaceShell nav={{ ctaLabel: "Save and exit", ctaPath: "/" }}>
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-[34px] font-semibold text-ink">Assets and beneficiaries</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              List what you own and link each item to who should receive it. This keeps the draft clear for your executor
              and reduces family disputes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Assets you have</p>
                  <p className="text-[13px] text-muted">Add each item you own, even if the description is general.</p>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="text-ink">House in Kiambu</span>
                    <span className="text-[12px] text-muted">Property</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-ink">Toyota Prado KDM 456A</span>
                    <span className="text-[12px] text-muted">Vehicle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-ink">M-Pesa account</span>
                    <span className="text-[12px] text-muted">Cash / Mobile money</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/mapping")}>
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
                  <div className="rounded-lg border border-border bg-secondary p-3">
                    <p className="text-[13px] font-semibold text-ink">House in Kiambu</p>
                    <p className="text-[12px] text-muted">Assigned to: Wife</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary p-3">
                    <p className="text-[13px] font-semibold text-ink">Toyota Prado KDM 456A</p>
                    <p className="text-[12px] text-muted">Assigned to: Brian (son)</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary p-3">
                    <p className="text-[13px] font-semibold text-ink">M-Pesa account</p>
                    <p className="text-[12px] text-muted">Assigned to: Nia (daughter)</p>
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/mapping")}>
                  Add allocation
                </Button>
              </Card>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M12 8v4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Tips for describing assets</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    General descriptions are acceptable (for example: "all my vehicles" or "bank accounts at KCB"). More
                    detail helps your executor.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <path
                    d="M6 4h12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 8h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 8v12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 8v12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
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
                <div className="space-y-1.5 text-[13px] text-ink">
                  <p>• Wife</p>
                  <p>• Brian (son)</p>
                  <p>• Nia (daughter)</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/mapping")}>
                  Add beneficiary
                </Button>
              </Card>

              <div className="flex gap-3 rounded-xl border border-border bg-secondary p-4">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <path
                    d="M10 13a4 4 0 1 1 0-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 11a4 4 0 1 1 0 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
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
                  <p>• "Everything else goes equally to my children."</p>
                  <p>• "Any remaining property goes to my spouse."</p>
                  <p className="text-muted">You can change this later if needed.</p>
                </div>
              </Card>

              <div className="flex gap-3 rounded-xl border border-warning bg-warning-soft p-4">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-warning" fill="none">
                  <path
                    d="M12 3l9 16H3l9-16z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9v5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="17" r="1" fill="currentColor" />
                </svg>
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Missing: remainder clause</p>
                  <p className="text-[13px] leading-[1.5] text-muted">
                    Decide who should receive any assets not specifically listed above. This prevents unintentional gaps.
                  </p>
                </div>
              </div>

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
