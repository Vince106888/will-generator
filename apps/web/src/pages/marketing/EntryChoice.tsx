// Frame: ACTIVE 02 Entry Decision (V6ysS)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";
import { Button } from "../../components/ui/Button";
import { navigate } from "../../lib/navigation";
import { saveDraftingData, useDraftingData } from "../../lib/drafting";
import { resolveDraftingEntryPath } from "../../lib/draftingGuard";
import { AlertTriangle, Shuffle } from "lucide-react";

export default function EntryChoice() {
  const { data, setData } = useDraftingData();

  return (
    <MarketingShell
      showFooter={false}
      nav={{
        ctaLabel: "Start drafting"
      }}
    >
      <Container size="narrow" className="pb-24 pt-12">
        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              Choose how you want to start
            </h1>
            <p className="max-w-[760px] text-[15px] leading-7 text-muted">
              {
                "All paths lead to the same legally grounded will. Pick what feels easiest today. You can switch later, and we keep your draft in sync."
              }
            </p>
          </div>
          <p className="max-w-[760px] text-sm leading-6 text-muted">
            {
              "We explain executor, beneficiary, guardian, and codicil in plain English so you never have to guess."
            }
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">Use AI to organize my will</p>
              <p className="text-sm text-muted">
                Paste notes or describe your wishes. We organize, highlight gaps, and ask
                follow-ups.
              </p>
            </div>
            <div className="space-y-3 text-sm text-muted">
              <p className="text-sm text-muted">
                Example: "I own a home in Kiambu, my spouse should live there, and my daughter gets
                the car."
              </p>
              <div className="space-y-2 text-sm leading-6 text-muted">
                <p>• Paste notes, upload a document, or speak freely</p>
                <p>• We ask follow‑ups only where needed</p>
                <p>• You review everything in plain English before confirming</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const nextData = {
                    ...data,
                    draftingMode: "ai",
                    draftingModeConfirmed: true
                  };
                  setData(nextData);
                  saveDraftingData(nextData);
                  navigate(resolveDraftingEntryPath("ai", "/existing-will"));
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
              <p className="text-lg font-semibold text-ink">Start from scratch (guided form)</p>
              <p className="text-sm text-muted">
                Answer clear questions step by step, with why‑we‑ask explanations.
              </p>
            </div>
            <div className="space-y-2 text-sm leading-6 text-muted">
              <p>• Required vs optional is clearly marked</p>
              <p>• Built‑in assets and beneficiaries mapping</p>
              <p>• Save and return later without losing progress</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const nextData = {
                    ...data,
                    draftingMode: "structured",
                    draftingModeConfirmed: true
                  };
                  setData(nextData);
                  saveDraftingData(nextData);
                  navigate(resolveDraftingEntryPath("structured", "/existing-will"));
                }}
              >
                Start guided form
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/faq")}>
                Preview the steps
              </Button>
            </div>
          </Card>

          <Card size="lg" className="space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-ink">Review an existing will</p>
              <p className="text-sm text-muted">
                If you already have a signed will, start here.
              </p>
            </div>
            <div className="space-y-2 text-sm leading-6 text-muted">
              <p>• We explain codicil vs replacement in plain English</p>
              <p>• Upload a PDF or clear photos of your will</p>
              <p>• You stay in control before anything is final</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/existing-will")}
              >
                Start review
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/faq")}>
                Preview the steps
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Callout>
            <div className="flex items-start gap-3">
              <Shuffle className="mt-0.5 text-primary" size={18} strokeWidth={1.6} />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">
                  You can switch between AI and guided form
                </p>
                <p className="text-sm text-muted">
                  {
                    "Start with AI or the checklist, then switch any time without losing progress. Existing‑will review stays separate to avoid conflicts."
                  }
                </p>
              </div>
            </div>
          </Callout>
        </div>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <p className="font-display text-2xl text-ink">Before you start</p>
            <p className="text-sm text-muted">
              {
                "You do not need everything perfect. A rough list of assets and family is enough to begin — we will help you refine details."
              }
            </p>
          </div>
          <Card size="lg" className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-ink">Helpful to have</p>
              <p className="text-sm text-muted">
                These details make drafting faster, but they are not required to start.
              </p>
            </div>
            <div className="space-y-2 text-sm leading-6 text-muted">
              <p>• National ID or passport details</p>
              <p>• A list of assets and rough values</p>
              <p>• Names of beneficiaries and executors</p>
              <p>• Guardianship preferences if you have minors</p>
            </div>
          </Card>
        </div>

        <Card size="lg" variant="warning" className="mt-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 text-warning" size={18} strokeWidth={1.6} />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-ink">Already have a signed will?</p>
              <p className="text-sm text-muted">
                {
                  "Start with a quick review so you can decide between a codicil (amendment) and a full replacement. We explain the legal effect before you choose."
                }
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </MarketingShell>
  );
}
