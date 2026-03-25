import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function AiExtractionSummary() {
  const { data } = useDraftingData();
  const assets = data.assets.filter((asset) => asset.location || asset.notes).map((asset) => asset.label);
  const beneficiaries = data.beneficiaries
    .filter((beneficiary) => beneficiary.name)
    .map((beneficiary) => `${beneficiary.name}${beneficiary.relationship ? ` (${beneficiary.relationship})` : ""}`);
  const executorStatus = [
    data.executors[0]?.name ? "Primary executor added" : "Primary executor not yet added",
    data.executors[1]?.name ? "Backup executor added" : "Backup executor not yet added"
  ];
  const extractionCards = [
    {
      title: "Assets found",
      items: assets.length > 0 ? assets : ["No assets captured yet"]
    },
    {
      title: "Beneficiaries found",
      items: beneficiaries.length > 0 ? beneficiaries : ["No beneficiaries captured yet"]
    },
    {
      title: "Executor status",
      items: executorStatus
    }
  ];

  const missingItems = [
    !data.executors[0]?.name && "Primary executor",
    !data.beneficiaries[0]?.name && "Beneficiaries",
    assets.length === 0 && "Assets",
    data.hasMinors && !data.guardians[0]?.name && "Guardian for minors"
  ].filter(Boolean) as string[];

  return (
    <WorkspaceShell>
      <Container className="pb-24 pt-12 max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">AI extraction summary</p>
          <p className="max-w-[860px] text-[15px] leading-7 text-muted">
            We extracted the details below. Please confirm missing items and adjust anything that feels incomplete.
          </p>
        </div>

        <Card size="lg" variant="success" className="mt-6 space-y-2">
          <Badge tone="success">Draft summary ready</Badge>
          <p className="text-sm font-semibold text-ink">
            We extracted {Math.max(assets.length, 0)} assets and {Math.max(beneficiaries.length, 0)} beneficiaries.
          </p>
          <p className="text-sm text-muted">
            Please confirm missing items before you finalize. You stay in control of every section.
          </p>
        </Card>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {extractionCards.map((card) => (
            <Card key={card.title} size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">{card.title}</p>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button variant="secondary" size="sm">
                Review details
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Callout tone="warning">
            Add an executor, confirm any dependants, and specify any remaining assets so the draft is complete.
          </Callout>
          <Card size="lg" className="space-y-3">
            <p className="text-sm font-semibold text-ink">Missing information to confirm</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              {missingItems.length > 0 ? (
                missingItems.map((item) => <li key={item}>{item}</li>)
              ) : (
                <li>All critical items are captured.</li>
              )}
            </ul>
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
              Add missing details
            </Button>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink">
            You can return to the AI workspace to refine the summary or continue into structured drafting.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai-workspace")}>
              Back to conversation
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
              Continue to structured flow
            </Button>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
