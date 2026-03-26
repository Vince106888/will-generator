// Frame: Entry Choice (V6ysS)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

const prepItems = [
  {
    title: "Identification",
    copy: "National ID or passport details help ensure the will is clearly linked to you."
  },
  {
    title: "Family and dependants",
    copy: "Names of your spouse, children, and anyone who depends on you financially."
  },
  {
    title: "Assets overview",
    copy: "Land, home, bank or SACCO accounts, M-Pesa, vehicles, and business interests."
  }
];

export default function EntryChoice() {
  const { update } = useDraftingData();

  return (
    <MarketingShell>
      <Container className="pb-24 pt-12">
        <PageHeader
          title="How would you like to begin?"
          description="Both paths create the same legally grounded will. Choose the style that feels most comfortable today - you can switch later without losing progress."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <Badge tone="info">Recommended for storytelling</Badge>
              <p className="text-lg font-semibold text-ink">Draft with AI</p>
              <p className="text-sm text-muted">
                Describe your wishes in your own words. We organize them, ask follow-ups, and build a structured
                draft you can review.
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Best if you want to talk things through naturally</li>
              <li>We translate your words into legal structure</li>
              <li>Ideal when you are not sure what details matter yet</li>
            </ul>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                update({ draftingMode: "ai" });
                navigate("/existing-will");
              }}
            >
              Start with AI
            </Button>
          </Card>

          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <Badge tone="neutral">Recommended for checklists</Badge>
              <p className="text-lg font-semibold text-ink">Use guided form</p>
              <p className="text-sm text-muted">
                A calm, step-by-step checklist with clear explanations and examples for each section.
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Structured prompts for each part of your will</li>
              <li>Helpful if you like certainty and clear steps</li>
              <li>Review everything before a draft is created</li>
            </ul>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                update({ draftingMode: "structured" });
                navigate("/existing-will");
              }}
            >
              Start with guided form
            </Button>
          </Card>
        </div>

        <div className="mt-6">
          <Callout tone="info">
            You can switch paths later. Start with AI, then move to the checklist - or vice versa - without losing
            your information.
          </Callout>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div>
              <p className="font-display text-2xl text-ink">Before you start</p>
              <p className="text-sm text-muted">You do not need everything perfect. A rough list is enough to begin.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {prepItems.map((item) => (
                <Card key={item.title} size="lg" className="space-y-2">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-sm leading-6 text-muted">{item.copy}</p>
                </Card>
              ))}
            </div>
          </div>
          <TrustPanel
            title="Privacy and calm guidance"
            items={[
              "We only ask for what is needed to draft the will.",
              "Sensitive family details are encrypted and never sold.",
              "Every legal term is explained in plain English."
            ]}
          />
        </div>

        <Card
          size="lg"
          variant="warning"
          className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-ink">Already have a will?</p>
            <p className="text-sm text-muted">
              You can replace an older will or create a codicil (formal amendment). We will guide you through both.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate("/existing-will")}>
            Review your options
          </Button>
        </Card>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink">
            We confirm Kenyan signing and witness requirements before anything becomes legally valid.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" onClick={() => navigate("/existing-will")}>
              Continue
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/")}>
              Back to landing
            </Button>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
