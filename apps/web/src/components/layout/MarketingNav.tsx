import { type ReactNode } from "react";
import { navigate } from "../../lib/navigation";
import { useDraftingData, type DraftingMode } from "../../lib/drafting";
import { Button } from "../ui/Button";
import { Container } from "./Container";

export type MarketingNavProps = {
  ctaLabel?: ReactNode;
  ctaMode?: DraftingMode | null;
  ctaPath?: string;
  ctaClassName?: string;
  ctaSize?: "sm" | "md" | "lg";
  ctaOnClick?: () => void;
};

export function MarketingNav({
  ctaLabel = "Start drafting",
  ctaMode = null,
  ctaPath = "/entry-choice",
  ctaClassName,
  ctaSize = "sm",
  ctaOnClick
}: MarketingNavProps) {
  const { update } = useDraftingData();

  return (
    <header className="border-b border-border bg-card">
      <Container size="wide" className="flex h-[56px] items-center justify-between gap-4 sm:h-[64px] lg:h-[72px]">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="font-display text-[15px] font-semibold text-ink transition-colors hover:text-primary sm:text-lg"
        >
          <span className="sm:hidden">WillGuide</span>
          <span className="hidden sm:inline">WillGuide Kenya</span>
        </button>
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
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="text-[12px] font-semibold text-primary sm:text-[13px]">Sign in</button>
          <Button
            variant="primary"
            size={ctaSize}
            className={ctaClassName}
            onClick={() => {
              if (ctaOnClick) {
                ctaOnClick();
                return;
              }
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
