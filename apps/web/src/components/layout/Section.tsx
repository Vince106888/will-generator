import { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.28em] text-ink/40">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl text-ink">{title}</h2>
        {description && <p className="max-w-2xl text-[15px] text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
