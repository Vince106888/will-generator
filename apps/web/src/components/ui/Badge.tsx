import { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning" | "info";
};

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-secondary text-muted",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info"
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
