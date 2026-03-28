import { navigate } from "../../lib/navigation";
import { useDraftingData, type DraftingMode } from "../../lib/drafting";
import { Button } from "../ui/Button";
import { Container } from "./Container";

export type MarketingNavProps = {
  ctaLabel?: string;
  ctaMode?: DraftingMode | null;
  ctaPath?: string;
};

export function MarketingNav({
  ctaLabel = "Start drafting",
  ctaMode = null,
  ctaPath = "/entry-choice"
}: MarketingNavProps) {
  const { update } = useDraftingData();

  return (
    <header className="border-b border-border bg-card">
      <Container size="wide" className="flex h-[72px] items-center justify-between gap-6">
        <p className="font-display text-lg font-semibold text-ink">WillGuide Kenya</p>
        <nav className="hidden items-center gap-6 text-[13px] text-muted lg:flex">
          <a href="#how-it-works" className="hover:text-ink">
            How it works
          </a>
          <a href="#privacy" className="hover:text-ink">
            Privacy
          </a>
          <a href="#faq" className="hover:text-ink">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-[13px] font-semibold text-primary">Sign in</button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (ctaMode) {
                update({ draftingMode: ctaMode, draftingModeConfirmed: true });
              }
              navigate(ctaPath);
            }}
          >
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </header>
  );
}
