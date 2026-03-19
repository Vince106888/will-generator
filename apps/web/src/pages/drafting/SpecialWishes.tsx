import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { Card } from "../../components/ui/Card";
import { useDraftingData } from "../../lib/drafting";

export default function SpecialWishes() {
  useDraftingData();

  return (
    <DraftingShell
      stepId="special-wishes"
      title="Special wishes"
      description="Optional notes to help your family honor your wishes clearly."
      footer={<StepActions currentPath="/drafting/special-wishes" />}
    >
      <div className="space-y-4">
        <Card size="lg" className="space-y-2">
          <p className="text-sm font-semibold text-ink">Funeral wishes</p>
          <div className="h-[120px] rounded-lg border border-border bg-secondary px-4 py-3 text-xs text-muted">
            Share details like burial location or ceremony preferences.
          </div>
        </Card>
        <Card size="lg" variant="secondary" className="space-y-2">
          <p className="text-sm font-semibold text-ink">Digital wishes</p>
          <div className="h-[120px] rounded-lg border border-border bg-card px-4 py-3 text-xs text-muted">
            Instructions for social accounts, photos, or online property.
          </div>
        </Card>
        <Card size="lg" variant="secondary" className="space-y-2">
          <p className="text-sm font-semibold text-ink">Charitable intentions</p>
          <div className="h-[120px] rounded-lg border border-border bg-card px-4 py-3 text-xs text-muted">
            Optional guidance for donations or charitable support.
          </div>
        </Card>
      </div>
    </DraftingShell>
  );
}
