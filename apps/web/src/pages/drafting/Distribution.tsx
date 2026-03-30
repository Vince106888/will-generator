import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useDraftingData } from "../../lib/drafting";

export default function Distribution() {
  useDraftingData();

  return (
    <>
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[390px] bg-paper">
          <div className="flex h-[62px] items-center justify-center text-sm text-ink">9:41</div>
          <div className="space-y-4 px-5 pb-6">
            <div className="space-y-2">
              <p className="font-display text-2xl text-ink">Distribution (Legacy)</p>
              <p className="text-xs text-muted">
                Legacy stepper flow retained for archive reference. Use the active structured or AI flow.
              </p>
            </div>
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Family home - Lavington</p>
              <p className="text-xs text-muted">Allocate to one or more beneficiaries.</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <DraftingShell
          stepId="distribution"
          title="Distribution wishes (Legacy)"
          description="Legacy stepper flow retained for archive reference. Use the active structured or AI flow."
          footer={<StepActions currentPath="/drafting/distribution" />}
        >
          <div className="space-y-4">
            <Card size="md" className="space-y-3">
              <p className="text-sm font-semibold text-ink">Family home - Lavington</p>
              <p className="text-xs text-muted">
                Allocate this asset to one or more beneficiaries.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-full bg-secondary px-2 py-1 text-ink">Grace Wanjiku * 60%</span>
                <span className="rounded-full bg-secondary px-2 py-1 text-ink">Daniel Mwangi * 40%</span>
              </div>
              <Button variant="secondary" size="sm">
                Add allocation
              </Button>
            </Card>

            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Residuary wishes</p>
              <p className="text-xs text-muted">
                Anything not listed above should go to:
              </p>
            </Card>
          </div>
        </DraftingShell>
      </div>
    </>
  );
}
