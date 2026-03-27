import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import { Button } from "../ui/Button";

export function MarketingNav() {
  const { update } = useDraftingData();

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-16">
        <p className="font-display text-lg font-semibold text-ink">WillGuide Kenya</p>
        <nav className="hidden items-center gap-6 text-[13px] text-muted lg:flex">
          <a href="#how-it-works" className="hover:text-ink">
            How it works
          </a>
          <a href="#kenyan-validity" className="hover:text-ink">
            Kenyan validity
          </a>
          <a href="#privacy" className="hover:text-ink">
            Privacy
          </a>
          <a href="#faq" className="hover:text-ink">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-[13px] font-semibold text-ink">Sign in</button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              update({ draftingMode: "ai" });
              navigate("/entry-choice");
            }}
          >
            Start with AI
          </Button>
        </div>
      </div>
    </header>
  );
}
