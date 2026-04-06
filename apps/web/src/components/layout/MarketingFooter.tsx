import { navigate } from "../../lib/navigation";
import { Container } from "./Container";

const linkClassName = "text-muted transition-colors hover:text-ink";

export function MarketingFooter() {
  return (
    <footer className="py-12">
      <Container size="wide">
        <div className="rounded-xl border border-border bg-card px-6 py-8 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[280px] space-y-2">
              <p className="font-display text-lg font-semibold text-ink">WillGuide Kenya</p>
              <p className="text-[13px] text-muted">
                Kenya-first will drafting with calm guidance.
              </p>
              <p className="text-[13px] text-muted">
                Plain-English explanations, legal signing support, and privacy by default.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-2 text-[12px]">
                <p className="font-semibold text-ink">Resources</p>
                <button
                  type="button"
                  className={linkClassName}
                  onClick={() => navigate("/drafting/signing-guide")}
                >
                  Signing guide
                </button>
                <button
                  type="button"
                  className={linkClassName}
                  onClick={() => navigate("/faq")}
                >
                  FAQ
                </button>
              </div>
              <div className="space-y-2 text-[12px]">
                <p className="font-semibold text-ink">Legal</p>
                <button
                  type="button"
                  className={linkClassName}
                  onClick={() => navigate("/privacy")}
                >
                  Privacy
                </button>
              </div>
            </div>
          </div>
          <div className="my-6 h-px w-full bg-border" />
          <div className="flex flex-col gap-2 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 WillGuide Kenya</span>
            <span>Built for Kenyan families</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
