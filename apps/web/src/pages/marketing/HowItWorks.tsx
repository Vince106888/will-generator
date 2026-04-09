// Frame: ACTIVE 01 Landing (DhkvM) - Derived section
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";
import { Button } from "../../components/ui/Button";
import { navigate } from "../../lib/navigation";
import { saveDraftingData, useDraftingData, type DraftingData } from "../../lib/drafting";
import { AlertTriangle, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const { data, setData } = useDraftingData();

  return (
    <MarketingShell
      nav={{
        ctaLabel: "Start drafting",
        ctaMode: "structured",
        ctaPath: "/entry-choice"
      }}
    >
      <div className="pb-24 pt-12">
        <Container size="wide" className="space-y-14">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
                  How it works
                </p>
                <h1 className="font-display text-[34px] leading-[1.1] text-ink sm:text-[44px]">
                  A calm, clear path to a Kenyan-valid will
                </h1>
                <p className="max-w-[720px] text-[16px] leading-7 text-muted">
                  We guide you through the same legal requirements advocates use, but in plain English. Choose a
                  conversational AI path or a structured checklist, then review everything before you sign.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-primary">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-semibold">
                  <ShieldCheck size={14} strokeWidth={1.6} />
                  Kenyan succession guidance
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-semibold">
                  <CheckCircle2 size={14} strokeWidth={1.6} />
                  Clear review before signing
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-semibold">
                  <ClipboardList size={14} strokeWidth={1.6} />
                  Progress saved automatically
                </span>
              </div>
            </div>
            <Card size="lg" className="space-y-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">
                What this covers
              </p>
              <div className="space-y-2 text-[14px] leading-6 text-muted">
                <p>&bull; Your assets, beneficiaries, executors, guardianship, and special wishes</p>
                <p>&bull; Clear explanations for codicils vs replacements</p>
                <p>&bull; Signing steps with the two-witness requirement</p>
                <p>&bull; Review checkpoints before anything is final</p>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">How the process works</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                We keep the experience calm and human. You can pause, return, and review before anything becomes final.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "1. Share your wishes",
                  copy: "Tell us what you own and who should receive it.",
                  bullets: [
                    "Speak or type in your own words",
                    "Add assets with broad or specific descriptions",
                    "Map items to the people you choose"
                  ]
                },
                {
                  title: "2. Review and confirm",
                  copy: "We summarize what we understood and flag gaps.",
                  bullets: [
                    "Check beneficiaries, executors, and guardianship",
                    "See missing or unclear items before finalizing",
                    "Everything is written in plain English"
                  ]
                },
                {
                  title: "3. Sign correctly",
                  copy: "We guide you through legal signing and witnesses.",
                  bullets: [
                    "Clear instructions for two witnesses",
                    "A beneficiary cannot be a witness",
                    "Safe storage guidance after signing"
                  ]
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
                    <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                  </div>
                  <div className="space-y-2 text-[13px] leading-6 text-muted">
                    {item.bullets.map((bullet) => (
                      <p key={bullet}>&bull; {bullet}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Pick your drafting path</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                Choose the route that feels easiest today. Both lead to the same legally grounded review, and you can
                switch later without losing progress.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-ink">Use AI to organize my will</p>
                  <p className="text-[13px] leading-6 text-muted">
                    Paste notes or describe your wishes. We organize, highlight gaps, and ask follow-ups.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] leading-6 text-muted">
                  <p>&bull; Conversational chat with examples of what to say</p>
                  <p>&bull; Voice input and document upload options</p>
                  <p>&bull; AI extracts assets, beneficiaries, and missing details</p>
                  <p>&bull; Review everything in plain English before you finalize</p>
                </div>
              </Card>
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-ink">Start a new will (guided form)</p>
                  <p className="text-[13px] leading-6 text-muted">
                    Answer clear questions step by step, with plain-English guidance at every section.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] leading-6 text-muted">
                  <p>&bull; Structured flow with required vs optional clearly marked</p>
                  <p>&bull; Asset-to-beneficiary mapping built in</p>
                  <p>&bull; Save and return anytime without losing progress</p>
                  <p>&bull; Review screen highlights missing or unclear items</p>
                </div>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">What you will need</h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                You can start with rough notes. These details simply make the session faster.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <Card size="lg" className="space-y-2">
                <p className="text-sm font-semibold text-ink">Personal details</p>
                <p className="text-[13px] leading-6 text-muted">
                  Legal name, ID or passport details, and current county of residence.
                </p>
              </Card>
              <Card size="lg" className="space-y-2">
                <p className="text-sm font-semibold text-ink">Assets & people</p>
                <p className="text-[13px] leading-6 text-muted">
                  A list of assets plus the beneficiaries and executors you want to appoint.
                </p>
              </Card>
              <Card size="lg" className="space-y-2">
                <p className="text-sm font-semibold text-ink">Special wishes</p>
                <p className="text-[13px] leading-6 text-muted">
                  Guardianship preferences, funeral wishes, or charitable intentions if you have them.
                </p>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Review before anything is final</h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                The draft is always reviewable. We show you exactly what was captured and where anything is missing or
                unclear before you proceed to signing.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-3 text-[14px] leading-7 text-muted">
                <p>
                  We highlight witness requirements, revocation language, and executor responsibilities so your draft
                  is practical &mdash; not just a template.
                </p>
                <p>
                  If you already have a signed will, you can choose a codicil (amendment) or a full replacement. We
                  explain the difference before you decide.
                </p>
              </div>
              <Callout className="space-y-2 text-ink">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 text-warning" size={18} strokeWidth={1.6} />
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-ink">Kenyan signing rules</p>
                    <p className="text-[13px] leading-6 text-muted">
                      A valid will must be signed by you and witnessed by two independent adults. A beneficiary cannot
                      be a witness.
                    </p>
                  </div>
                </div>
              </Callout>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-secondary p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-3">
                <h2 className="font-display text-2xl text-ink sm:text-3xl">Ready to start?</h2>
                <p className="text-[15px] leading-6 text-muted">
                  Start with AI or a guided checklist. You can switch later and keep your draft in sync.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    const nextData: DraftingData = {
                      ...data,
                      draftingMode: "ai",
                      draftingModeConfirmed: true
                    };
                    setData(nextData);
                    saveDraftingData(nextData);
                    navigate("/entry-choice");
                  }}
                  className="w-full justify-center sm:w-auto"
                >
                  Start drafting
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate("/existing-will")}
                  className="w-full justify-center sm:w-auto"
                >
                  Review an existing will
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </MarketingShell>
  );
}
