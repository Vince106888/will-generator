// Frame: Existing Will Gate (Fd207)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { Input } from "../../components/ui/Input";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

const codicilSteps = [
  "Upload your existing will so we can reference the correct clauses.",
  "Describe the exact changes you want to make.",
  "We generate a codicil you can sign and witness."
];

export default function ExistingWillGate() {
  const { data, update } = useDraftingData();
  const nextPath =
    data.draftingMode === "structured"
      ? "/drafting/structured-flow"
      : "/drafting/ai-workspace";

  return (
    <MarketingShell>
      <Container className="pb-24 pt-12">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Do you already have a will?</p>
          <p className="max-w-[820px] text-[15px] leading-7 text-muted">
            This helps us guide you correctly. If you already have a will, you can either replace it or create a
            formal amendment (codicil). We explain both in plain language below.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">I do not have a will</p>
              <p className="text-sm text-muted">
                Start a new will from scratch. We will guide you through each step and explain why it matters.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                update({
                  existingWill: {
                    hasExisting: false,
                    type: "unsure",
                    notes: ""
                  }
                });
                navigate(nextPath);
              }}
            >
              Continue
            </Button>
          </Card>

          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">I have a will and want a new one</p>
              <p className="text-sm text-muted">
                Create a new will that replaces the old one. We will ask you to review all sections so nothing is
                missed.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                update({
                  existingWill: {
                    hasExisting: true,
                    type: "will",
                    notes: data.existingWill.notes || ""
                  }
                });
                navigate(nextPath);
              }}
            >
              Start a replacement will
            </Button>
          </Card>
        </div>

        <Card size="lg" className="mt-6 space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-ink">I want to create a codicil</p>
            <p className="text-sm text-muted">
              A codicil is a formal amendment to an existing will. Use this if you want to keep most of your will but
              change specific parts.
            </p>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {codicilSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                update({
                  existingWill: {
                    hasExisting: true,
                    type: "codicil",
                    notes: data.existingWill.notes || ""
                  }
                });
                navigate(nextPath);
              }}
            >
              Start codicil drafting
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/advocate-review")}>
              Talk to an advocate first
            </Button>
          </div>
        </Card>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card size="lg" variant="secondary" className="space-y-3">
            <div>
              <p className="text-base font-semibold text-ink">If you are creating a codicil</p>
              <p className="text-sm text-muted">
                We need to see the existing will so we can reference the correct clauses. Upload a PDF or clear photo.
              </p>
            </div>
            <Input type="file" />
            <p className="text-xs text-muted">
              You can redact sensitive information before upload. We only use this to draft the codicil.
            </p>
            <Input
              placeholder="Add context about the changes you want"
              value={data.existingWill.notes}
              onChange={(event) =>
                update({
                  existingWill: {
                    ...data.existingWill,
                    notes: event.target.value
                  }
                })
              }
            />
          </Card>

          <div className="space-y-4">
            <Callout tone="warning">
              If you create a new will, it will revoke previous wills. Make sure the new draft reflects your full
              intentions before signing.
            </Callout>
            <Card size="lg" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Need help deciding?</p>
              <p className="text-sm text-muted">
                We can connect you to an advocate for a quick review of your situation and the right path forward.
              </p>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/advocate-review")}>
                Request advocate support
              </Button>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink">
            We explain legal signing requirements before you finalize anything.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                update({
                  existingWill: {
                    ...data.existingWill,
                    hasExisting: data.existingWill.type !== "unsure"
                  }
                });
                navigate(nextPath);
              }}
            >
              Continue
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/entry-choice")}>
              Back to entry choice
            </Button>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
