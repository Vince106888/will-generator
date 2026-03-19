import { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "info" | "warning" | "success" | "error";
};

const toneStyles: Record<NonNullable<CalloutProps["tone"]>, string> = {
  info: "border-border bg-secondary text-ink",
  warning: "border-warning bg-warning-soft text-ink",
  success: "border-success bg-success-soft text-ink",
  error: "border-error bg-error-soft text-ink"
};

export function Callout({ className, tone = "info", ...props }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-[13px] leading-relaxed",
        toneStyles[tone] ?? toneStyles.info,
        className
      )}
      {...props}
    />
  );
}
