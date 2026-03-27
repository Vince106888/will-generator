// Frame: Structured Flow Shell (fF89o)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function StructuredFlowShell() {
  const { data } = useDraftingData();
  const hasAssets = Boolean(data.assets.some((asset) => asset.location || asset.notes));
  const hasBeneficiaries = Boolean(data.beneficiaries.some((beneficiary) => beneficiary.name));
  const hasMapping = Boolean(data.assetAllocations.some((allocation) => allocation.allocations.length));
  const hasExecutors = Boolean(data.executors.some((executor) => executor.name));
  const hasGuardians = data.hasMinors ? Boolean(data.guardians.some((guardian) => guardian.name)) : true;

  const sections = [
    {
      title: "What do you have?",
      status: hasAssets ? "Complete" : "Pending",
      detail: hasAssets
        ? "Assets listed with notes or locations."
        : "List land, money, vehicles, and other property."
    },
    {
      title: "Who should receive it?",
      status: hasBeneficiaries ? "In progress" : "Pending",
      detail: hasBeneficiaries
        ? "Beneficiaries added. Relationships can be clarified later." 
        : "Add the people or organisations you want to receive assets."
    },
    {
      title: "Match assets to people",
      status: hasMapping ? "In progress" : "Pending",
      detail: hasMapping
        ? "Allocations started. Confirm shares and notes."
        : "Assign each asset to a beneficiary and share amount." 
    },
    {
      title: "Executors and guardians",
      status: hasExecutors && hasGuardians ? "Complete" : hasExecutors ? "In progress" : "Pending",
      detail: "Name trusted people to carry out your wishes and care for minors if needed."
    }
  ];

  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="Structured flow"
          title="Structured drafting flow"
          description="We organize your wishes into clear sections, then guide you through each one with plain-language prompts. You can pause, review, or revisit earlier steps anytime."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">Your drafting path</p>
                  <p className="text-xs text-muted">Step-by-step with clear checkpoints before drafting.</p>
                </div>
                <Badge tone="info">Autosaved</Badge>
              </div>
              <div className="space-y-3">
                {sections.map((section) => (
                  <div key={section.title} className="rounded-xl border border-border bg-paper p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-ink">{section.title}</p>
                        <p className="text-xs text-muted">{section.detail}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          section.status === "Complete"
                            ? "bg-success-soft text-success"
                            : section.status === "In progress"
                              ? "bg-warning-soft text-warning"
                              : "bg-secondary text-muted"
                        }`}
                      >
                        {section.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai-summary")}>
                  Back to AI summary
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/mapping")}>
                  Start mapping
                </Button>
              </div>
            </Card>

            <Callout tone="info">
              We will never finalize your will without your review. Each section can be edited before it becomes part of
              the draft.
            </Callout>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Why we ask these details</p>
              <p className="text-xs text-muted">
                Kenyan law expects clarity about assets, beneficiaries, and guardians. Clear details reduce disputes and
                make execution smoother.
              </p>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Guardianship is conditional</p>
              <p className="text-xs text-muted">
                If you do not have minors, you can skip guardianship. If you do, it is one of the most important choices
                in your will.
              </p>
            </Card>
            <TrustPanel
              title="Privacy reminder"
              items={[
                "Your inputs are encrypted and stored only to build your draft.",
                "You can delete your data at any time.",
                "We never finalize a will without your confirmation."
              ]}
            />
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}


