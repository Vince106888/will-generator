import { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TrustPanelProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  items?: string[];
};

export function TrustPanel({
  title = "Your information stays private",
  items = [
    "We encrypt sensitive details and never sell your data.",
    "You control what is shared and when a draft is exported.",
    "We explain every legal term in plain English."
  ],
  className,
  ...props
}: TrustPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-secondary px-5 py-4 text-[13px] text-ink",
        className
      )}
      {...props}
    >
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-[13px] leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
