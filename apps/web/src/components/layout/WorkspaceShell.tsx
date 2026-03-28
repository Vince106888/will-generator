import { ReactNode } from "react";
import { MarketingNav, type MarketingNavProps } from "./MarketingNav";

type WorkspaceShellProps = {
  children: ReactNode;
  nav?: MarketingNavProps;
};

export function WorkspaceShell({ children, nav }: WorkspaceShellProps) {
  return (
    <div className="bg-paper">
      <MarketingNav {...nav} />
      <main>{children}</main>
    </div>
  );
}
