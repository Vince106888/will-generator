// Frame: Landing Page v2 (DhkvM)
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1767082237202-92fb43a148ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ0MjA3OTZ8&ixlib=rb-4.1.0&q=80&w=1080";
const FAMILY_IMAGE =
  "https://images.unsplash.com/photo-1765248150160-5f13d6f98563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ0MjA5NjV8&ixlib=rb-4.1.0&q=80&w=1080";

const trustBadges = [
  {
    label: "Kenyan succession guidance",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary" fill="none">
        <path
          d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "Witness rules explained",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary" fill="none">
        <rect
          x="4"
          y="10"
          width="16"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 10V7a4 4 0 0 1 8 0v3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "Private by default",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary" fill="none">
        <path
          d="M12 20s-6-3-8-8a5 5 0 0 1 8-6 5 5 0 0 1 8 6c-2 5-8 8-8 8z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M10.5 11.5l1.5 1.5 3-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export default function Landing() {
  const { update } = useDraftingData();

  return (
    <MarketingShell nav={{ ctaLabel: "Start with AI", ctaMode: "ai" }}>
      <div className="pb-20 pt-10">
        <Container size="wide">
          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-display text-[42px] leading-[1.1] text-ink lg:text-[52px]">
                  Kenya‑first wills, explained simply.
                </h1>
                <p className="max-w-[720px] text-[17px] leading-7 text-muted">
                  Draft a legally grounded will with calm guidance. Choose a conversational AI
                  path or a structured checklist, then review everything in plain English before
                  you sign.
                </p>
                <p className="max-w-[640px] text-[15px] leading-7 text-muted">
                  We explain terms like executor, beneficiary, guardian, and codicil as you go —
                  no legal jargon required.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    update({ draftingMode: "ai", draftingModeConfirmed: true });
                    navigate("/entry-choice");
                  }}
                >
                  Start with AI drafting
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    update({ draftingMode: "structured", draftingModeConfirmed: true });
                    navigate("/entry-choice");
                  }}
                >
                  Use guided form
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-primary">
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
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <img
                src={HERO_IMAGE}
                alt="Calm Kenyan living room with warm lighting"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          <section className="mt-16 space-y-6" id="dual-path">
            <div className="space-y-3">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Choose how you want to draft
              </h2>
              <p className="max-w-[760px] text-[16px] leading-7 text-muted">
                Some people prefer to describe their wishes in their own words. Others want a
                structured checklist. Both paths lead to the same legally grounded draft and
                review, and you can switch later.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-ink">
                    Draft with AI (Recommended)
                  </p>
                  <p className="text-[13px] leading-6 text-muted">
                    Speak freely. We organize it into a will, highlight gaps, and ask follow-ups.
                  </p>
                </div>
                <ul className="space-y-2 text-[13px] leading-6 text-muted">
                  {[
                    "Conversational chat with examples of what to say",
                    "Voice input and document upload options",
                    "AI extracts assets, beneficiaries, and missing details",
                    "Review everything in plain English before you finalize"
                  ].map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Card>
              <Card size="lg" className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-ink">Use guided form</p>
                  <p className="text-[13px] leading-6 text-muted">
                    Answer clear questions step by step, with explanations at every section.
                  </p>
                </div>
                <ul className="space-y-2 text-[13px] leading-6 text-muted">
                  {[
                    "Structured flow with required vs optional clearly marked",
                    "Asset-to-beneficiary mapping built in",
                    "Save and return anytime without losing progress",
                    "Review screen highlights missing or unclear items"
                  ].map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          <section id="how-it-works" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                How the process works
              </h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                We keep the process calm and human. You can pause, return, and review before
                anything becomes final.
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
                  <ul className="space-y-2 text-[13px] leading-6 text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
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
                A will only protects your family if it is written and signed correctly for the
                laws that apply to your assets. We guide you through Kenya's requirements in plain
                English so you understand every decision.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-7 text-muted">
                <p>
                  If you have assets outside Kenya, you can still include them. Their treatment
                  may be subject to the laws of that country, and you may want specific advice for
                  those jurisdictions.
                </p>
                <p>
                  We highlight witness requirements, revocation language, and executor
                  responsibilities so your draft is practical — not just a template.
                </p>
              </div>
              <div className="rounded-xl border border-warning bg-warning-soft p-4">
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-warning" fill="none">
                    <path
                      d="M12 3l9 16H3L12 3z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 9v4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                  </svg>
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-ink">
                      Plain-English legal guidance
                    </p>
                    <p className="text-[13px] leading-6 text-muted">
                      We explain Kenyan will requirements in simple language and show you how to sign
                      correctly, including witness rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="privacy" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                Privacy and trust come first
              </h2>
              <p className="max-w-[720px] text-[15px] leading-7 text-muted">
                A will contains sensitive details about family, finances, and future plans. We
                protect that information with encryption, strict access controls, and clear
                retention options.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Encrypted by default",
                  copy:
                    "Your drafting data is encrypted in transit and at rest. We never share it casually.",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-primary" fill="none">
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M8 10V7a4 4 0 0 1 8 0v3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  )
                },
                {
                  title: "You stay in control",
                  copy:
                    "You can review, edit, or delete your draft before you finalize. Nothing is signed until you decide.",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-primary" fill="none">
                      <path
                        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )
                },
                {
                  title: "Confidential guidance",
                  copy:
                    "We provide calm explanations without asking for unnecessary personal details.",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-primary" fill="none">
                      <path
                        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  )
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
                Whether your estate is simple or complex, you deserve a respectful experience
                that explains decisions and avoids confusion for your family.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "First-time will writers",
                  copy: "You want guidance without the intimidation of legal jargon.",
                  bullets: [
                    "Clear explanations and examples",
                    "Optional AI drafting if you prefer to talk it out"
                  ]
                },
                {
                  title: "Families with complexity",
                  copy: "Blended families, dependants, or multiple properties.",
                  bullets: [
                    "Helps you think through guardianship and executors",
                    "Highlights conflicts or missing details"
                  ]
                },
                {
                  title: "Busy professionals",
                  copy: "You need a calm, efficient way to protect your family.",
                  bullets: ["Save and resume anytime", "Export in PDF or Word when ready"]
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
                    <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                  </div>
                  <ul className="space-y-2 text-[13px] leading-6 text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
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
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 text-[15px] leading-7 text-muted">
                <p>
                  Without a clear will, families may face delays, uncertainty, and conflict. A
                  well-written will reduces confusion and helps your loved ones act with
                  confidence when the time comes.
                </p>
                <p>
                  We guide you to record your intentions carefully — who receives what, who
                  executes the will, and what happens for minor children — so your wishes are
                  respected.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={FAMILY_IMAGE}
                  alt="Kenyan family sitting together"
                  className="h-full min-h-[220px] w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section id="what-makes-it-different" className="mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">
                What makes this experience different
              </h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                We focus on clarity, legal grounding, and human guidance — not just generating a
                document. We show you what we captured and why each step matters.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                {
                  title: "Kenya-first legal logic",
                  copy: "Built around the Law of Succession Act and practical signing guidance.",
                  bullets: ["Clear explanations for non‑lawyers", "Validity checklist before you finish"]
                },
                {
                  title: "Asset → beneficiary mapping",
                  copy: "Connect what you own directly to who should receive it.",
                  bullets: ["Fewer disconnected lists", "Visual allocation summaries"]
                },
                {
                  title: "AI + structured fallback",
                  copy: "Draft freely, then confirm details in a structured review.",
                  bullets: ["Missing details flagged automatically", "Calm prompts, not legal jargon"]
                },
                {
                  title: "Advocate review when needed",
                  copy: "Escalate complex estates to a trusted Kenyan advocate.",
                  bullets: ["Optional expert review", "Clear hand‑off and privacy controls"]
                }
              ].map((item) => (
                <Card key={item.title} size="lg" className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
                    <p className="text-[13px] leading-6 text-muted">{item.copy}</p>
                  </div>
                  <ul className="space-y-2 text-[13px] leading-6 text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
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
                You will always see the full FAQ inside the product, including definitions for
                executor, beneficiary, guardian, and codicil.
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
                  We guide you through Kenyan signing rules, witness requirements, and how to
                  keep your document safe.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      update({ draftingMode: "ai", draftingModeConfirmed: true });
                      navigate("/entry-choice");
                    }}
                    className="bg-primary text-paper shadow-soft"
                  >
                    Start with AI drafting
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      update({ draftingMode: "structured", draftingModeConfirmed: true });
                      navigate("/entry-choice");
                    }}
                  >
                    Use guided form
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
