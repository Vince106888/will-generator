import { ReactNode } from "react";
import { MarketingNav, type MarketingNavProps } from "./MarketingNav";
import { MarketingFooter } from "./MarketingFooter";

type MarketingShellProps = {
  children: ReactNode;
  showFooter?: boolean;
  nav?: MarketingNavProps;
};

export function MarketingShell({ children, showFooter = true, nav }: MarketingShellProps) {
  return (
    <div className="bg-paper">
      <MarketingNav {...nav} />
      <main>{children}</main>
      {showFooter ? <MarketingFooter /> : null}
    </div>
  );
}
