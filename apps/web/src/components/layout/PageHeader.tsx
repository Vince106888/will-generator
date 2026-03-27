import { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </p>
      )}
      <div className="space-y-2">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">{title}</h1>
        {description && (
          <p className="max-w-[760px] text-[15px] leading-7 text-muted">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
