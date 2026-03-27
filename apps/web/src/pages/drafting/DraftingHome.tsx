import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

const steps = [
  { title: "Personal details", note: "Captured" },
  { title: "Family & dependants", note: "Captured" },
  { title: "Executors", note: "Captured" },
  { title: "Beneficiaries", note: "Captured" },
  { title: "Assets", note: "Captured" },
  { title: "Distribution", note: "Captured" },
  { title: "Guardians", note: "Captured" },
  { title: "Special wishes", note: "Captured" }
];

export default function DraftingHome() {
  const { data } = useDraftingData();
  return (
    <DraftingShell
      stepId="personal-details"
      title="Drafting overview (Legacy)"
      description="Legacy stepper flow retained for archive reference. Use the active structured or AI flow."
      footer={<StepActions currentPath="/drafting/personal-details" />}
    >
      <div className="space-y-6">
        <Card className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Draft snapshot</p>
          <div className="grid gap-3 text-sm text-ink/70 md:grid-cols-2">
            <div>
              <p className="font-semibold text-ink">Primary executor</p>
              <p>{data.executors[0]?.name || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Primary beneficiary</p>
              <p>{data.beneficiaries[0]?.name || "Not set"}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <Card key={step.title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">{step.title}</p>
                <p className="text-xs text-ink/60">{step.note}</p>
              </div>
              <Badge tone="info">View</Badge>
            </Card>
          ))}
        </div>

        <button
          onClick={() => navigate("/drafting/structured-flow")}
          className="rounded-full bg-accent px-5 py-2 text-xs font-semibold text-white shadow-soft"
        >
          Go to structured flow
        </button>
      </div>
    </DraftingShell>
  );
}
