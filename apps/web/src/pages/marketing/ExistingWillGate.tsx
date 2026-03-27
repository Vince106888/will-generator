// Frame: Existing Will Gate (Fd207)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import { useEffect, useRef } from "react";

export default function ExistingWillGate() {
  const { data, update } = useDraftingData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextPath =
    data.draftingMode === "structured"
      ? "/drafting/structured-flow"
      : "/drafting/ai-workspace";
  const isDraftingModeConfirmed = data.draftingModeConfirmed === true;

  useEffect(() => {
    if (!isDraftingModeConfirmed) navigate("/entry-choice");
  }, [isDraftingModeConfirmed]);

  const proceed = (nextExistingWill: typeof data.existingWill) => {
    update({ existingWill: nextExistingWill });
    navigate(isDraftingModeConfirmed ? nextPath : "/entry-choice");
  };

  return (
    <MarketingShell>
      <Container className="pb-24 pt-12">
        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              Do you already have a will?
            </h1>
            <p className="max-w-[760px] text-[15px] leading-7 text-muted">
              This helps us guide you correctly. If you already have a will, you can replace it or
              create a formal amendment (codicil). We explain both clearly so you avoid conflicting
              documents.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">I do not have a will</p>
              <p className="text-sm text-muted">
                Start a new will from scratch if you have never signed one before.
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>We guide you step by step</li>
              <li>You can use AI drafting or the structured form</li>
            </ul>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                proceed({
                  hasExisting: false,
                  type: "none",
                  notes: data.existingWill.notes || ""
                });
              }}
            >
              Start a new will
            </Button>
          </Card>

          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">I have a will and want a new one</p>
              <p className="text-sm text-muted">
                Create a new will that replaces the old one. The new will should reflect all your
                current wishes.
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>The new will revokes the old will</li>
              <li>We will include clear revocation language</li>
            </ul>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                proceed({
                  hasExisting: true,
                  type: "will",
                  notes: data.existingWill.notes || ""
                });
              }}
            >
              Replace existing will
            </Button>
          </Card>
        </div>

        <Card size="lg" className="mt-6 space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-ink">I want to create a codicil</p>
            <p className="text-sm text-muted">
              A codicil is a formal amendment to an existing will. It changes specific clauses
              without rewriting everything.
            </p>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>Upload your existing will</li>
            <li>Describe the changes you want to make</li>
            <li>We generate a codicil you can sign and witness</li>
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                proceed({
                  hasExisting: true,
                  type: "codicil",
                  notes: data.existingWill.notes || ""
                });
              }}
            >
              Start codicil
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/faq")}>
              See example codicil
            </Button>
          </div>
        </Card>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card size="lg" className="space-y-3 bg-warning-soft/40">
            <div>
              <p className="text-base font-semibold text-ink">If you are creating a codicil</p>
              <p className="text-sm text-muted">
                We need to see the existing will so we can reference the correct clauses. Upload
                a PDF or clear photo, then describe the changes you want to make.
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(event) => {
                const fileName = event.target.files?.[0]?.name ?? "";
                if (!fileName) return;
                update({
                  existingWill: {
                    ...data.existingWill,
                    notes: data.existingWill.notes || `Uploaded: ${fileName}`
                  }
                });
              }}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload file
              </Button>
              <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                Use phone camera
              </Button>
            </div>
            <p className="text-xs text-muted">
              You can redact sensitive information before upload. We only use this to draft the
              codicil.
            </p>
          </Card>

          <Callout tone="info">
            A codicil is a formal amendment to a will. It changes specific clauses while keeping
            the rest of the will the same.
          </Callout>
        </div>

        <div className="mt-8 space-y-4">
          <Card size="lg" variant="warning" className="space-y-2">
            <p className="text-sm font-semibold text-ink">
              Important: a new will replaces older ones
            </p>
            <p className="text-sm text-muted">
              If you create a new will, it will revoke previous wills. Make sure the new draft
              reflects your full intentions before signing.
            </p>
          </Card>
          <Callout tone="info">
            Kenyan law treats a signed will as your final instructions. Choosing the right path
            avoids confusion for your family and executor.
          </Callout>
          <TrustPanel
            title="We handle existing documents carefully"
            items={[
              "Uploads are encrypted and used only for codicil drafting.",
              "You can redact sensitive sections before sharing.",
              "We never change your will without your confirmation."
            ]}
          />
        </div>
      </Container>
    </MarketingShell>
  );
}
