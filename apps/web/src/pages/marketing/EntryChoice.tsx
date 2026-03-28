// Frame: Entry Choice (V6ysS)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";
import { Button } from "../../components/ui/Button";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function EntryChoice() {
  const { update } = useDraftingData();

  return (
    <MarketingShell showFooter={false} nav={{ ctaLabel: "Start drafting" }}>
      <Container size="narrow" className="pb-24 pt-12">
        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              How would you like to begin?
            </h1>
            <p className="max-w-[760px] text-[15px] leading-7 text-muted">
              Both paths create the same legally grounded will. Choose the style that feels most
              comfortable today — you can switch later without losing progress.
            </p>
          </div>
          <p className="max-w-[760px] text-sm leading-6 text-muted">
            We explain executor, beneficiary, guardian, and codicil as you go, so you never have
            to guess legal terms.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">Draft with AI</p>
              <p className="text-sm text-muted">
                Describe your wishes in your own words. We will ask gentle follow-ups and
                summarize what we capture.
              </p>
            </div>
            <div className="space-y-3 text-sm text-muted">
              <p className="text-sm italic text-muted">
                Example: "I have a home in Kiambu, my wife gets the house, my son gets the car."
              </p>
              <ul className="space-y-2 text-sm leading-6 text-muted">
                {[
                  "Voice input and document upload supported",
                  "We ask follow-ups only where needed",
                  "Review extracted assets and beneficiaries before you confirm"
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  update({ draftingMode: "ai", draftingModeConfirmed: true });
                  navigate("/existing-will");
                }}
              >
                Start with AI drafting
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/faq")}>
                See a sample conversation
              </Button>
            </div>
          </Card>

          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">Use guided form</p>
              <p className="text-sm text-muted">
                Answer a step-by-step checklist with explanations and examples.
              </p>
            </div>
            <ul className="space-y-2 text-sm leading-6 text-muted">
              {[
                "Clear required vs optional labels",
                "Asset-to-beneficiary mapping built in",
                "Progress bar with ability to return later"
              ].map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  update({ draftingMode: "structured", draftingModeConfirmed: true });
                  navigate("/existing-will");
                }}
              >
                Start guided form
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/faq")}>
                Preview the steps
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Callout>
            <p className="text-sm font-semibold text-ink">You can switch paths later</p>
            <p className="text-sm text-muted">
              Start with AI or the checklist, then switch any time without losing progress. Your
              draft stays synced.
            </p>
          </Callout>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-display text-2xl text-ink">Before you start</p>
              <p className="text-sm text-muted">
                You do not need everything perfect. A rough list of assets and family is enough
                to begin — we will help you refine details.
              </p>
            </div>
            <Card size="lg" className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-ink">Helpful to have</p>
                <p className="text-sm text-muted">
                  These details make drafting faster, but they are not required to start.
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-muted">
                {[
                  "National ID or passport details",
                  "A list of assets and rough values",
                  "Names of beneficiaries and executors",
                  "Guardianship preferences if you have minors"
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Card>
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
              If you already have a will, we help you draft a codicil (a formal amendment) or
              replace it with a new will. We explain the legal effect before you choose.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate("/existing-will")}>
            Review your options
          </Button>
        </Card>
      </Container>
    </MarketingShell>
  );
}
