// Frame: Landing Page v2 (DhkvM)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import heroImage from "../../assets/landing-hero.png";

export default function Landing() {
  const { update } = useDraftingData();

  return (
    <MarketingShell>
      <div className="pb-20 pt-10">
        <Container>
          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.32em] text-muted">
                  Kenya-first wills, explained simply.
                </p>
                <h1 className="font-display text-[40px] leading-[1.1] text-ink lg:text-[52px]">
                  Draft a legally grounded will with calm guidance.
                </h1>
                <p className="max-w-[560px] text-[15px] leading-7 text-muted">
                  Choose a conversational AI path or a structured checklist, then review everything in plain English
                  before you sign.
                </p>
                <p className="max-w-[560px] text-[13px] leading-6 text-muted">
                  We explain terms like executor, beneficiary, guardian, and codicil as you go - no legal jargon
                  required.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    update({ draftingMode: "ai" });
                    navigate("/entry-choice");
                  }}
                >
                  Start with AI drafting
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    update({ draftingMode: "structured" });
                    navigate("/entry-choice");
                  }}
                >
                  Use guided form
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-ink">
                {[
                  "Kenyan succession guidance",
                  "Witness rules explained",
                  "Private by default"
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img src={heroImage} alt="A calm Kenyan living room with plants and warm lighting" className="h-full w-full object-cover" />
            </div>
          </section>

          <section className="mt-16 space-y-6" id="dual-path">
            <div className="space-y-3">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Choose how you want to draft</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                Some people prefer to describe their wishes in their own words. Others want a structured checklist.
                Both paths lead to the same legally grounded draft and review, and you can switch later.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-ink">Draft with AI (Recommended)</p>
                  <p className="text-[13px] leading-6 text-muted">
                    Speak freely. We organize it into a will, highlight gaps, and ask follow-ups.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    update({ draftingMode: "ai" });
                    navigate("/entry-choice");
                  }}
                >
                  Start with AI drafting
                </Button>
              </Card>
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-ink">Use guided form</p>
                  <p className="text-[13px] leading-6 text-muted">
                    Answer clear questions step by step, with explanations at every section.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    update({ draftingMode: "structured" });
                    navigate("/entry-choice");
                  }}
                >
                  Use guided form
                </Button>
              </Card>
            </div>
          </section>

          <section id="how-it-works" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">How the process works</h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                We keep the process calm and human. You can pause, return, and review before anything becomes final.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "1. Share your wishes",
                  copy: "Tell us what you own and who should receive it."
                },
                {
                  title: "2. Review and confirm",
                  copy: "We summarize what we understood and flag gaps."
                },
                {
                  title: "3. Sign correctly",
                  copy: "We guide you through legal signing and witnesses."
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-2">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="kenyan-validity" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Why Kenyan validity matters</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                A will only protects your family if it is written and signed correctly for the laws that apply to your
                assets. We guide you through Kenya's requirements in plain English so you understand every decision.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="space-y-3 text-[13px] leading-6 text-muted">
                <p>
                  If you have assets outside Kenya, you can still include them. Their treatment may be subject to the
                  laws of that country, and you may want specific advice for those jurisdictions.
                </p>
                <p>
                  We highlight witness requirements, revocation language, and executor responsibilities so your draft
                  is practical - not just a template.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary p-5">
                <p className="text-sm font-semibold text-ink">Plain-English legal guidance</p>
                <p className="mt-2 text-[13px] leading-6 text-muted">
                  We explain Kenyan will requirements in simple language and show you how to sign correctly, including
                  witness rules.
                </p>
              </div>
            </div>
          </section>

          <section id="privacy" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Privacy and trust come first</h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                A will contains sensitive details about family, finances, and future plans. We protect that information
                with encryption, strict access controls, and clear retention options.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Encrypted by default",
                  copy: "Your drafting data is encrypted in transit and at rest. We never share it casually."
                },
                {
                  title: "You stay in control",
                  copy: "You can review, edit, or delete your draft before you finalize. Nothing is signed until you decide."
                },
                {
                  title: "Confidential guidance",
                  copy: "We provide calm explanations without asking for unnecessary personal details."
                }
              ].map((item) => (
                <Card key={item.title} size="lg" variant="secondary" className="space-y-2">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="who-this-is-for" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Who this is for</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                Whether your estate is simple or complex, you deserve a respectful experience that explains decisions
                and avoids confusion for your family.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "First-time will writers",
                  copy: "You want guidance without the intimidation of legal jargon."
                },
                {
                  title: "Families with complexity",
                  copy: "Blended families, dependants, or multiple properties."
                },
                {
                  title: "Busy professionals",
                  copy: "You need a calm, efficient way to protect your family."
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-2">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="why-wills-matter" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Why wills matter for Kenyan families</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 text-[13px] leading-6 text-muted">
                <p>
                  Without a clear will, families may face delays, uncertainty, and conflict. A well-written will
                  reduces confusion and helps your loved ones act with confidence when the time comes.
                </p>
                <p>
                  We guide you to record your intentions carefully - who receives what, who executes the will, and what
                  happens for minor children - so your wishes are respected.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="h-full min-h-[220px] w-full bg-gradient-to-br from-secondary via-card to-paper" />
              </div>
            </div>
          </section>

          <section id="what-makes-it-different" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">What makes this experience different</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                We focus on clarity, legal grounding, and human guidance - not just generating a document. We show you
                what we captured and why each step matters.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                {
                  title: "Kenya-first legal logic",
                  copy: "Built around the Law of Succession Act and practical signing guidance."
                },
                {
                  title: "Asset to beneficiary mapping",
                  copy: "Connect what you own directly to who should receive it."
                },
                {
                  title: "AI + structured fallback",
                  copy: "Draft freely, then confirm details in a structured review."
                },
                {
                  title: "Advocate review when needed",
                  copy: "Escalate complex estates to a trusted Kenyan advocate."
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-2">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="faq" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Quick answers before you start</h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                You will always see the full FAQ inside the product, including definitions for executor, beneficiary,
                guardian, and codicil.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {[
                {
                  q: "Do I need a lawyer to use this?",
                  a: "No. This experience is designed for non-lawyers and explains each step. You can request advocate review if your situation is complex."
                },
                {
                  q: "What makes a will valid in Kenya?",
                  a: "A valid will must be signed by you and witnessed by two independent adults. A beneficiary cannot be a witness."
                },
                {
                  q: "What if I already have a will?",
                  a: "You can create a new will that replaces the old one, or create a codicil (a formal amendment). We will guide you through both options."
                },
                {
                  q: "Can I include assets outside Kenya?",
                  a: "Yes, but those assets may also be subject to the laws of that country. We flag this and explain when to seek local advice."
                }
              ].map((faq) => (
                <Card key={faq.q} size="lg" className="space-y-2">
                  <p className="text-sm font-semibold text-ink">{faq.q}</p>
                  <p className="text-[13px] leading-6 text-muted">{faq.a}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="rounded-3xl bg-primary px-6 py-8 text-paper lg:px-12 lg:py-10">
              <div className="max-w-[720px] space-y-3">
                <h2 className="font-display text-3xl text-paper lg:text-4xl">
                  Start drafting with confidence
                </h2>
                <p className="text-[14px] leading-6 text-paper/80">
                  We guide you through Kenyan signing rules, witness requirements, and how to keep your document safe.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    className="rounded-full bg-paper px-5 py-2.5 text-[13px] font-semibold text-primary"
                    onClick={() => {
                      update({ draftingMode: "ai" });
                      navigate("/entry-choice");
                    }}
                  >
                    Start with AI drafting
                  </button>
                  <button
                    className="rounded-full border border-white/20 bg-[#2c4158] px-5 py-2.5 text-[13px] font-semibold text-paper"
                    onClick={() => {
                      update({ draftingMode: "structured" });
                      navigate("/entry-choice");
                    }}
                  >
                    Use guided form
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </MarketingShell>
  );
}

