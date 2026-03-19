import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useDraftingData } from "../../lib/drafting";

export default function Beneficiaries() {
  useDraftingData();

  return (
    <DraftingShell
      stepId="beneficiaries"
      title="Beneficiaries"
      description="Add the people you want to provide for. We'll ask for relationship and contact details."
      footer={<StepActions currentPath="/drafting/beneficiaries" />}
    >
      <div className="space-y-4">
        <Card size="md" className="space-y-2">
          <p className="text-sm font-semibold text-ink">Mary Njeri (Spouse)</p>
          <p className="text-xs text-muted">ID: National ID • Phone: 07xx xxx xxx</p>
          <p className="text-xs text-muted">Add notes about dependants or special needs.</p>
        </Card>
        <Button variant="secondary" size="sm">
          Add beneficiary
        </Button>
      </div>
    </DraftingShell>
  );
}
