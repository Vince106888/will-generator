// Frame: ACTIVE 01 Landing (DhkvM)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";
import { AlertTriangle, Eye, HeartHandshake, Lock, Shield } from "lucide-react";
import heroImage from "../../assets/landing-hero.png";

const trustBadges = [
  {
    label: "Kenyan succession guidance",
    icon: <Shield className="text-primary" size={14} strokeWidth={1.6} />
  },
  {
    label: "Witness rules explained",
    icon: <Lock className="text-primary" size={14} strokeWidth={1.6} />
  },
  {
    label: "Private by default",
    icon: <HeartHandshake className="text-primary" size={14} strokeWidth={1.6} />
  }
];

export default function Landing() {
  return (
    <MarketingShell
      nav={{
        ctaLabel: "Start with AI",
        ctaMode: "ai",
        ctaPath: "/entry-choice"
      }}
    >
      <div className="pb-20 pt-10">
        <Container size="wide">
          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-display text-[32px] leading-[1.1] text-ink sm:text-[42px] lg:text-[52px]">
                  Kenya‑first wills, explained simply.
                </h1>
                <p className="max-w-[720px] text-[16px] leading-7 text-muted sm:text-[17px]">
                  {
                    "Draft a legally grounded will with calm guidance. Choose a conversational AI path or a structured checklist, then review everything in plain English before you sign."
                  }
                </p>
                <p className="max-w-[640px] text-[14px] leading-7 text-muted sm:text-[15px]">
                  {
                    "We explain terms like executor, beneficiary, guardian, and codicil as you go — no legal jargon required."
                  }
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                  onClick={() => navigate("/entry-choice")}
                >
                  Start a new will
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                  onClick={() => navigate("/existing-will")}
                >
                  Review an existing will
                </Button>
              </div>
              <div className="flex flex-col items-start gap-2 text-[12px] text-primary">
                {trustBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-semibold"
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-[320px] overflow-hidden rounded-2xl border border-border bg-card shadow-soft sm:h-[420px] lg:h-[520px]">
              <img src={heroImage} alt="" className="h-full w-full object-cover" />
            </div>
          </section>

          <section className="mt-16 space-y-6" id="dual-path">
            <div className="space-y-3">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Choose how you want to draft
              </h2>
              <p className="max-w-[760px] text-[16px] leading-7 text-muted">
                {
                  "Some people prefer to describe their wishes in their own words. Others want a structured checklist. Both paths lead to the same legally grounded draft and review, and you can switch later."
                }
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-ink">
                    Use AI to organize my will
                  </p>
                  <p className="text-[13px] leading-6 text-muted">
                    Paste notes or describe your wishes. We organize, highlight gaps, and ask
                    follow-ups.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] leading-6 text-muted">
                  <p>• Conversational chat with examples of what to say</p>
                  <p>• Voice input and document upload options</p>
                  <p>• AI extracts assets, beneficiaries, and missing details</p>
                  <p>• Review everything in plain English before you finalize</p>
                </div>
              </Card>
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-ink">
                    Start a new will (guided form)
                  </p>
                  <p className="text-[13px] leading-6 text-muted">
                    Answer clear questions step by step, with plain-English guidance at every
                    section.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] leading-6 text-muted">
                  <p>• Structured flow with required vs optional clearly marked</p>
                  <p>• Asset-to-beneficiary mapping built in</p>
                  <p>• Save and return anytime without losing progress</p>
                  <p>• Review screen highlights missing or unclear items</p>
                </div>
              </Card>
            </div>
          </section>

          <section id="how-it-works" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                How the process works
              </h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                {
                  "We keep the process calm and human. You can pause, return, and review before anything becomes final."
                }
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "1. Share your wishes",
                  copy: "Tell us what you own and who should receive it.",
                  bullets: [
                    "• Speak or type in your own words",
                    "• Add assets with broad or specific descriptions",
                    "• Map items to the people you choose"
                  ]
                },
                {
                  title: "2. Review and confirm",
                  copy: "We summarize what we understood and flag gaps.",
                  bullets: [
                    "• Check beneficiaries, executors, and guardianship",
                    "• See missing or unclear items before finalizing",
                    "• Everything is written in plain English"
                  ]
                },
                {
                  title: "3. Sign correctly",
                  copy: "We guide you through legal signing and witnesses.",
                  bullets: [
                    "• Clear instructions for two witnesses",
                    "• A beneficiary cannot be a witness",
                    "• Safe storage guidance after signing"
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
                      <p key={bullet}>{bullet}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="kenyan-validity" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Why Kenyan validity matters
              </h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                {
                  "A will only protects your family if it is written and signed correctly for the laws that apply to your assets. We guide you through Kenya’s requirements in plain English so you understand every decision."
                }
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
              <div className="space-y-3 text-[14px] leading-7 text-muted">
                <p>
                  {
                    "If you have assets outside Kenya, you can still include them. Their treatment may be subject to the laws of that country, and you may want specific advice for those jurisdictions."
                  }
                </p>
                <p>
                  {
                    "We highlight witness requirements, revocation language, and executor responsibilities so your draft is practical — not just a template."
                  }
                </p>
              </div>
              <Card size="md" variant="warning" className="space-y-2 text-ink">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 text-warning" size={18} strokeWidth={1.6} />
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-ink">
                      Plain‑English legal guidance
                    </p>
                    <p className="text-[13px] leading-6 text-muted">
                      {
                        "We explain Kenyan will requirements in simple language and show you how to sign correctly, including witness rules."
                      }
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="privacy" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Privacy and trust come first
              </h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                {
                  "A will contains sensitive details about family, finances, and future plans. We protect that information with encryption, strict access controls, and clear retention options."
                }
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Encrypted by default",
                  copy: "Your drafting data is encrypted in transit and at rest. We never share it casually.",
                  icon: <Lock className="text-primary" size={20} strokeWidth={1.6} />
                },
                {
                  title: "You stay in control",
                  copy:
                    "You can review, edit, or delete your draft before you finalize. Nothing is signed until you decide.",
                  icon: <Eye className="text-primary" size={20} strokeWidth={1.6} />
                },
                {
                  title: "Confidential guidance",
                  copy: "We provide calm explanations without asking for unnecessary personal details.",
                  icon: <Shield className="text-primary" size={20} strokeWidth={1.6} />
                }
              ].map((item) => (
                <Callout key={item.title} className="space-y-2 text-ink">
                  <div className="flex items-start gap-3">
                    {item.icon}
                    <div className="space-y-1">
                      <p className="text-[13px] font-semibold text-ink">{item.title}</p>
                      <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                    </div>
                  </div>
                </Callout>
              ))}
            </div>
          </section>

          <section id="who-this-is-for" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Who this is for</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                {
                  "Whether your estate is simple or complex, you deserve a respectful experience that explains decisions and avoids confusion for your family."
                }
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "First‑time will writers",
                  copy: "You want guidance without the intimidation of legal jargon.",
                  bullets: [
                    "• Clear explanations and examples",
                    "• Optional AI drafting if you prefer to talk it out"
                  ]
                },
                {
                  title: "Families with complexity",
                  copy: "Blended families, dependants, or multiple properties.",
                  bullets: [
                    "• Helps you think through guardianship and executors",
                    "• Highlights conflicts or missing details"
                  ]
                },
                {
                  title: "Busy professionals",
                  copy: "You need a calm, efficient way to protect your family.",
                  bullets: ["• Save and resume anytime", "• Export in PDF or Word when ready"]
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
                    <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                  </div>
                  <div className="space-y-2 text-[13px] leading-6 text-muted">
                    {item.bullets.map((bullet) => (
                      <p key={bullet}>{bullet}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="why-wills-matter" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Why wills matter for Kenyan families
              </h2>
            </div>
            <div className="max-w-[760px] space-y-3 text-[15px] leading-7 text-muted">
              <p>
                {
                  "Without a clear will, families may face delays, uncertainty, and conflict. A well‑written will reduces confusion and helps your loved ones act with confidence when the time comes."
                }
              </p>
              <p>
                {
                  "We guide you to record your intentions carefully — who receives what, who executes the will, and what happens for minor children — so your wishes are respected."
                }
              </p>
            </div>
          </section>

          <section id="what-makes-it-different" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                What makes this experience different
              </h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                {
                  "We focus on clarity, legal grounding, and human guidance — not just generating a document. We show you what we captured and why each step matters."
                }
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                {
                  title: "Kenya‑first legal logic",
                  copy: "Built around the Law of Succession Act and practical signing guidance.",
                  bullets: [
                    "• Clear explanations for non‑lawyers",
                    "• Validity checklist before you finish"
                  ]
                },
                {
                  title: "Asset → beneficiary mapping",
                  copy: "Connect what you own directly to who should receive it.",
                  bullets: ["• Fewer disconnected lists", "• Visual allocation summaries"]
                },
                {
                  title: "AI + structured fallback",
                  copy: "Draft freely, then confirm details in a structured review.",
                  bullets: ["• Missing details flagged automatically", "• Calm prompts, not legal jargon"]
                },
                {
                  title: "Advocate review when needed",
                  copy: "Escalate complex estates to a trusted Kenyan advocate.",
                  bullets: ["• Optional expert review", "• Clear hand‑off and privacy controls"]
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
                    <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                  </div>
                  <div className="space-y-2 text-[13px] leading-6 text-muted">
                    {item.bullets.map((bullet) => (
                      <p key={bullet}>{bullet}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="faq" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Quick answers before you start
              </h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                {
                  "You will always see the full FAQ inside the product, including definitions for executor, beneficiary, guardian, and codicil."
                }
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {[
                {
                  q: "Do I need a lawyer to use this?",
                  a: "No. This experience is designed for non‑lawyers and explains each step. You can request advocate review if your situation is complex."
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
                  <p className="text-[14px] font-semibold text-ink">{faq.q}</p>
                  <p className="text-[13px] leading-6 text-muted">{faq.a}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="rounded-xl bg-primary px-6 py-8 text-paper lg:px-12 lg:py-10">
              <div className="max-w-[720px] space-y-3">
                <h2 className="font-display text-3xl text-paper lg:text-4xl">
                  Start drafting with confidence
                </h2>
                <p className="text-[15px] leading-6 text-secondary">
                  {
                    "We guide you through Kenyan signing rules, witness requirements, and how to keep your document safe."
                  }
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full justify-center sm:w-auto"
                    onClick={() => navigate("/existing-will")}
                  >
                    Review an existing will
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </MarketingShell>
  );
}
