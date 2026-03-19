import { ReactNode } from "react";
import { MarketingNav } from "./MarketingNav";
import { MarketingFooter } from "./MarketingFooter";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-paper">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
