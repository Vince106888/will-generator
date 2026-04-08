import { type ReactNode } from "react";
import { navigate } from "../../lib/navigation";
import { saveDraftingData, useDraftingData, type DraftingMode } from "../../lib/drafting";
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
  const { data, setData, status } = useDraftingData();

  return (
    <>
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
          <button
            type="button"
            className="hover:text-ink"
            onClick={() => navigate("/how-it-works")}
          >
            How it works
          </button>
          <button type="button" className="hover:text-ink" onClick={() => navigate("/privacy")}>
            Privacy
          </button>
          <button type="button" className="hover:text-ink" onClick={() => navigate("/faq")}>
            FAQ
          </button>
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
                const nextData = {
                  ...data,
                  draftingMode: ctaMode,
                  draftingModeConfirmed: true
                };
                setData(nextData);
                saveDraftingData(nextData);
              }
              navigate(ctaPath);
            }}
          >
            {ctaLabel}
          </Button>
        </div>
        </Container>
      </header>
      {status?.error ? (
        <div className="border-b border-border bg-warning/10">
          <Container size="wide" className="py-2 text-[12px] text-warning">
            {status.error}
          </Container>
        </div>
      ) : null}
    </>
  );
}
