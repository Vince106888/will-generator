import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { navigate } from "../../lib/navigation";
import heroImage from "../../assets/landing-hero.png";

export default function Landing() {
  return (
    <MarketingShell>
      <div className="pb-20 pt-10">
        <Container>
          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-display text-[40px] leading-[1.1] text-ink lg:text-[52px]">
                  Create a will that protects your family, step by step.
                </h1>
                <p className="max-w-[560px] text-[15px] leading-7 text-muted">
                  Esheria Wills guides you through a calm, legally aware process designed for Kenyan families. No
                  legal jargon. Clear explanations at every step.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md" onClick={() => navigate("/pre-start")}>
                  Start drafting
                </Button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-secondary px-5 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-secondary/80"
                >
                  See how it works
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-ink">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 3l7 3v6c0 4.5-3.5 8-7 9-3.5-1-7-4.5-7-9V6l7-3z" />
                  </svg>
                  Kenya-first legal context
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  Structured will draft
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img src={heroImage} alt="A calm Kenyan living room with plants and warm lighting" className="h-full w-full object-cover" />
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-[14px] text-ink sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold">
              Built around Kenyan succession requirements, with clear signing guidance.
            </span>
            <span className="text-muted">Optional advocate review for complex estates.</span>
          </div>

          <section className="mt-16 space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">What Esheria Wills does</h2>
              <p className="max-w-[760px] text-[15px] leading-7 text-muted">
                A guided drafting experience that turns your wishes into a structured will draft, plus a clear guide
                to make it legally valid.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Clear identity and family details",
                  copy: "We help you record the people and relationships that matter in a legally clear way."
                },
                {
                  title: "Assets organized by category",
                  copy: "From land and M-Pesa to vehicles and business interests, everything is structured clearly."
                },
                {
                  title: "Guided distribution wishes",
                  copy: "Assign who receives what, with fallback handling and residuary wishes explained simply."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-[13px] leading-6 text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Why wills matter</h2>
              <p className="text-[15px] leading-7 text-muted">
                A clear will reduces conflict, protects dependants, and helps your family honor your wishes.
              </p>
              <p className="text-[15px] leading-7 text-muted">
                We help you start early with a calm, guided draft that can be finalized with proper witnesses.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary p-5">
              <p className="text-sm font-semibold text-ink">Peace of mind</p>
              <p className="mt-2 text-[13px] leading-6 text-muted">
                A structured will clarifies guardianship, assets, and responsibilities.
              </p>
            </div>
          </section>

          <section id="how-it-works" className="mt-16 space-y-6">
            <h2 className="font-display text-3xl text-ink lg:text-4xl">How the process works</h2>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "1. Share your details",
                  copy: "We collect only what is needed to identify you clearly."
                },
                {
                  title: "2. List assets and beneficiaries",
                  copy: "Add people and property in clear, guided categories."
                },
                {
                  title: "3. Review and sign",
                  copy: "We generate a draft and give a clear signing guide."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-[13px] leading-6 text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="legal-guidance" className="mt-16 space-y-6">
            <h2 className="font-display text-3xl text-ink lg:text-4xl">What to prepare before you start</h2>
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                { title: "Identification", copy: "National ID or passport details." },
                { title: "Family details", copy: "Spouse, children, dependants, guardians." },
                { title: "Assets list", copy: "Land titles, accounts, vehicles, businesses." }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-[13px] leading-6 text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-ink">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 7h16M6 7l6-3 6 3M6 7v5a6 6 0 0 0 12 0V7" />
                </svg>
                Aligned to Kenyan succession law
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                  <path d="M9 8h6M9 12h6M9 16h4" />
                </svg>
                Clear signing and witnessing guide
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
                Optional advocate review
              </span>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card px-6 py-5 text-[14px] text-ink sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">Complex estate? We can connect you to an advocate.</p>
                <p className="text-[13px] leading-6 text-muted">
                  If your situation involves trusts, large business interests, or disputes, request a professional review.
                </p>
              </div>
              <button className="rounded-full border border-border bg-secondary px-4 py-2 text-[13px] font-semibold text-ink">
                Request review
              </button>
            </div>
          </section>

          <section id="faq" className="mt-16 space-y-6">
            <h2 className="font-display text-3xl text-ink lg:text-4xl">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is this a legally valid will?",
                  a: "The draft becomes legally valid only after proper signing and witnessing. We provide clear steps."
                },
                {
                  q: "Can I save and continue later?",
                  a: "Yes. Your progress is saved automatically so you can return anytime."
                },
                {
                  q: "What if my estate is complex?",
                  a: "You can request an advocate review for complex assets or family situations."
                }
              ].map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-border bg-card px-6 py-5">
                  <p className="text-sm font-semibold text-ink">{faq.q}</p>
                  <p className="mt-2 text-[13px] leading-6 text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="rounded-3xl bg-primary px-6 py-8 text-paper lg:px-12 lg:py-10">
              <div className="max-w-[720px] space-y-3">
                <h2 className="font-display text-3xl text-paper lg:text-4xl">
                  Start drafting your will with confidence
                </h2>
                <p className="text-[14px] leading-6 text-paper/80">
                  We guide you one step at a time and explain why each detail matters.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    className="rounded-full bg-paper px-5 py-2.5 text-[13px] font-semibold text-primary"
                    onClick={() => navigate("/pre-start")}
                  >
                    Start drafting
                  </button>
                  <a
                    href="#how-it-works"
                    className="rounded-full border border-white/20 bg-[#2c4158] px-5 py-2.5 text-[13px] font-semibold text-paper"
                  >
                    See how it works
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </MarketingShell>
  );
}
