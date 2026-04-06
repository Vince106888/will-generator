// Frame: AI Corrections (fuTos)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { HelperCallout, ReviewChecklist, SuccessPanel, WarningBanner } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function AiCorrections() {
  const { data } = useDraftingMode("ai");
  const assets = data.assets
    .filter((asset) => asset.location || asset.notes)
    .map((asset) => asset.label || asset.location || asset.notes)
    .filter(Boolean);
  const beneficiaries = data.beneficiaries
    .map((beneficiary) => beneficiary.name?.trim())
    .filter(Boolean);
  const executor = data.executors?.[0]?.name?.trim();
  const guardian = data.guardians?.[0]?.name?.trim();
  const hasMinors = data.hasMinors;

  const fallbackAssets = [
    "House in Kiambu",
    "Rental plots in Machakos (2)",
    "Toyota vehicle",
    "Other personal items (not detailed)"
  ];
  const fallbackBeneficiaries = [
    "Wife - receives house",
    "Brian (son) - receives Toyota",
    "Nia (daughter) - receives rental plots"
  ];
  const assetsList = assets.length ? assets : fallbackAssets;
  const beneficiariesList = beneficiaries.length ? beneficiaries : fallbackBeneficiaries;

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to drafting</span>
          </>
        ),
        ctaMode: "ai",
        ctaPath: "/drafting/ai/input"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting — Step 5 of 6: Corrections
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Corrections</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Here is what we understood from your conversation. Review each section, correct anything wrong, and add
              missing details before we generate the formal draft.
            </p>
            <AiStepNav currentPath="/drafting/ai/corrections" />
          </div>

          <SuccessPanel
            title="Draft summary ready"
            body={`We extracted ${assetsList.length} assets and ${beneficiariesList.length} beneficiaries. Please confirm any missing items before you finalize.`}
          />

          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Assets mentioned</p>
                  <p className="text-[13px] text-muted">Review and edit each asset description.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-ink">
                  {assetsList.map((item, index) => (
                    <p key={`${item}-${index}`} className={index === assetsList.length - 1 ? "text-muted" : ""}>
                      &bull; {item}
                    </p>
                  ))}
                </div>
              </Card>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Beneficiaries mentioned</p>
                  <p className="text-[13px] text-muted">Confirm names and relationships.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-ink">
                  {beneficiariesList.map((item, index) => (
                    <p key={`${item}-${index}`}>&bull; {item}</p>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Executor</p>
                  <p className="text-[13px] text-muted">
                    {executor ? "Executor detected" : "We did not detect an executor yet."}
                  </p>
                </div>
                <div className="space-y-1.5 text-[13px] text-ink">
                  {executor ? (
                    <p>&bull; {executor}</p>
                  ) : (
                    <p className="text-warning">&bull; Required to finalize the will</p>
                  )}
                  <p className="text-muted">&bull; You can add a backup executor</p>
                </div>
              </Card>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Guardianship</p>
                  <p className="text-[13px] text-muted">Only relevant if you have minor children.</p>
                </div>
                <div className="space-y-1.5 text-[13px] text-muted">
                  <p>
                    &bull;{" "}
                    {guardian
                      ? `Guardian: ${guardian}`
                      : hasMinors
                        ? "No guardianship details found"
                        : "Not required (no minor children listed)"}
                  </p>
                  <p>&bull; We will explain when this applies</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <HelperCallout
              title="How to review"
              body="Read each card and confirm names, relationships, and asset descriptions. Use plain language corrections — we translate into legal format later."
            />
            <ReviewChecklist
              title="Review checklist"
              items={[
                { label: "Assets and beneficiaries reviewed", tone: "success" },
                { label: "Legal names and ID details match", tone: "success" },
                { label: "Executor and guardian choices confirmed", tone: "warning" }
              ]}
            />
          </div>

          <WarningBanner
            title="Missing information to confirm"
            body="Add an executor, confirm any dependants, and specify any remaining assets so the draft is complete."
          />

          <div className="space-y-3">
            <div className="space-y-2">
              <p className="font-display text-[26px] font-semibold text-ink">Confirm and generate your will draft</p>
              <p className="text-[14px] leading-[1.6] text-muted">
                Once you confirm these details, we will generate the formal draft and show you the review checklist.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => navigate("/drafting/ai/review")}
              >
                Generate formal draft
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => navigate("/drafting/ai/input")}
              >
                Back to drafting
              </Button>
            </div>
            <HelperCallout
              title="Need help before you finalize?"
              body="You can pause here, ask questions in the help center, or request an advocate review for complex estates."
            />
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
