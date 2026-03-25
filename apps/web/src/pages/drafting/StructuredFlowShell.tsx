import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function StructuredFlowShell() {
  const { data } = useDraftingData();
  const hasPersonal = Boolean(data.legalName && data.idNumber);
  const hasFamily = Boolean(data.dependants.some((dependant) => dependant.name));
  const hasAssets = Boolean(data.assets.some((asset) => asset.location || asset.notes));
  const hasBeneficiaries = Boolean(data.beneficiaries.some((beneficiary) => beneficiary.name));
  const hasExecutors = Boolean(data.executors.some((executor) => executor.name));
  const hasGuardians = data.hasMinors ? Boolean(data.guardians.some((guardian) => guardian.name)) : true;

  const sections = [
    {
      title: "Personal and family details",
      status: hasPersonal && hasFamily ? "Complete" : hasPersonal ? "In progress" : "Pending",
      detail: hasPersonal
        ? "Personal ID details captured. Family notes can be updated any time."
        : "Capture your name, ID, and family context."
    },
    {
      title: "Assets inventory",
      status: hasAssets ? "Complete" : "In progress",
      detail: hasAssets
        ? "Assets listed with notes or locations."
        : "List your major assets so we can map beneficiaries."
    },
    {
      title: "Beneficiary mapping",
      status: hasBeneficiaries ? "In progress" : "Pending",
      detail: hasBeneficiaries
        ? "Confirm who receives each asset and any shared portions."
        : "Add beneficiaries before assigning assets."
    },
    {
      title: "Executors and guardians",
      status: hasExecutors && hasGuardians ? "Complete" : hasExecutors ? "In progress" : "Pending",
      detail: "Name trusted people to carry out your wishes and care for minors if needed."
    }
  ];

  return (
    <WorkspaceShell>
      <Container className="pb-24 pt-12 max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Structured drafting flow</p>
          <p className="max-w-[880px] text-[15px] leading-7 text-muted">
            We organize your wishes into clear sections, then guide you through each one with plain-language prompts.
            You can pause, review, or revisit earlier steps anytime.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">Your drafting path</p>
                  <p className="text-xs text-muted">Step-by-step, with clear checkpoints before drafting.</p>
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
              <p className="text-xs font-semibold text-ink">Draft status</p>
              <p className="text-sm font-semibold text-ink">Capturing and organizing your wishes</p>
              <p className="text-xs text-muted">
                We update the summary as you go. You remain in control of every section.
              </p>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Why we ask these details</p>
              <p className="text-xs text-muted">
                Kenyan law expects clarity about assets, beneficiaries, and guardians. Clear details reduce disputes and
                make execution smoother.
              </p>
            </Card>
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Privacy reminder</p>
              <p className="text-xs text-muted">
                Your inputs are encrypted and stored only to build your draft. You can delete your data at any time.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
