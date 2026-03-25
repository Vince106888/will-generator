import { ReactNode } from "react";
import { MarketingNav } from "./MarketingNav";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-paper">
      <MarketingNav />
      <main>{children}</main>
    </div>
  );
}
