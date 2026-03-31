// Frame: ACTIVE 03 Existing Will Review Gate (Fd207)
import { useRef } from "react";
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { WarningBanner } from "../../components/ui/PencilPanels";
import { navigate } from "../../lib/navigation";
import { saveDraftingData, useDraftingData } from "../../lib/drafting";
import { FileText, Info } from "lucide-react";

export default function ExistingWillGate() {
  const { data, setData } = useDraftingData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const nextPath =
    data.draftingMode === "structured"
      ? "/drafting/structured-flow"
      : "/drafting/ai-workspace";

  const proceed = (nextExistingWill: typeof data.existingWill) => {
    const nextData = {
      ...data,
      existingWill: nextExistingWill,
      draftingModeConfirmed: true
    };
    setData(nextData);
    saveDraftingData(nextData);
    navigate(nextPath);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const openCameraPicker = () => {
    cameraInputRef.current?.click();
  };

  return (
    <MarketingShell
      showFooter={false}
      nav={{
        ctaLabel: "Start drafting"
      }}
    >
      <Container size="narrow" className="pb-24 pt-12">
        <div className="space-y-3">
          <div className="space-y-3">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Tell us about your current will
            </h1>
            <p className="max-w-[760px] text-[16px] leading-[1.6] text-muted">
              {
                "This helps us avoid conflicting documents. If you already have a signed will, you can amend it with a codicil or replace it completely. We explain both clearly before you proceed."
              }
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">I do not have a signed will</p>
              <p className="text-[13px] text-muted">
                Start a new will from scratch if you have never signed one before.
              </p>
            </div>
            <div className="space-y-2 text-[13px] leading-[1.6] text-muted">
              <p>• Choose AI or the guided form</p>
              <p>• We explain each term in plain English</p>
            </div>
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
              <p className="text-lg font-semibold text-ink">Replace my existing will</p>
              <p className="text-[13px] text-muted">
                Create a new will that fully replaces the old one.
              </p>
            </div>
            <div className="space-y-2 text-[13px] leading-[1.6] text-muted">
              <p>• The new will revokes the old will</p>
              <p>• We add clear revocation language</p>
            </div>
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
            <p className="text-lg font-semibold text-ink">Create a codicil (amendment)</p>
            <p className="text-[13px] text-muted">
              Change specific clauses without rewriting everything.
            </p>
          </div>
          <div className="space-y-2 text-[13px] leading-[1.6] text-muted">
            <p>• Upload your existing will</p>
            <p>• Describe the changes you want</p>
            <p>• We draft a codicil you can sign and witness</p>
          </div>
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

        <div className="mt-10 space-y-3">
          <div className="space-y-1.5">
            <p className="font-display text-[26px] font-semibold text-ink">
              If you are creating a codicil
            </p>
            <p className="text-[14px] leading-[1.6] text-muted">
              We need the existing will so we can reference the correct clauses. Upload a PDF
              or clear photos, then describe the changes you want.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <Card size="md" className="space-y-2">
              <div className="space-y-1">
                <p className="text-[14px] font-semibold text-ink">Upload existing will</p>
                <p className="text-[13px] leading-[1.6] text-muted">
                  Drag and drop a PDF, or use your phone camera to upload a clear photo of each
                  page.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="sm" onClick={openFilePicker}>
                  Upload file
                </Button>
                <Button variant="ghost" size="sm" onClick={openCameraPicker}>
                  Use phone camera
                </Button>
              </div>
            </Card>

            <Callout className="space-y-2">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 text-primary" size={18} strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">What is a codicil?</p>
                  <p className="text-[13px] leading-[1.6] text-muted">
                    A codicil is a formal amendment to a will. It changes specific clauses while
                    keeping the rest of the will the same.
                  </p>
                </div>
              </div>
            </Callout>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <WarningBanner
            title="Important: a new will replaces older ones"
            body="If you create a new will, it will revoke previous wills. Make sure the new draft reflects your full intentions before signing."
          />

          <Callout className="space-y-2">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 text-primary" size={18} strokeWidth={1.6} />
              <div className="space-y-1">
                <p className="text-[13px] font-semibold text-ink">Why we start here</p>
                <p className="text-[13px] leading-[1.6] text-muted">
                  A signed will is your final instructions. Choosing the right path avoids
                  confusion for your family and executor.
                </p>
              </div>
            </div>
          </Callout>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
        />
      </Container>
    </MarketingShell>
  );
}
