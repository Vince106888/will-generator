import { navigate } from "../../lib/navigation";
import { Button } from "../ui/Button";

export function MarketingNav() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-16">
        <p className="font-display text-lg font-semibold text-ink">Esheria Wills</p>
        <nav className="hidden items-center gap-6 text-[13px] text-muted lg:flex">
          <a href="#how-it-works" className="hover:text-ink">
            How it works
          </a>
          <a href="#legal-guidance" className="hover:text-ink">
            Legal guidance
          </a>
          <a href="#faq" className="hover:text-ink">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-[13px] font-semibold text-ink">Sign in</button>
          <Button variant="primary" size="sm" onClick={() => navigate("/entry-choice")}>
            Start drafting
          </Button>
        </div>
      </div>
    </header>
  );
}
