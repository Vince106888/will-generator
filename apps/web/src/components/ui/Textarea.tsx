import { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export function Textarea({ className, hasError, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-lg border bg-card px-3.5 py-2.5 text-[13px] leading-relaxed text-ink transition focus:outline-none focus:ring-2 focus:ring-info/20",
        hasError ? "border-error" : "border-border",
        className
      )}
      {...props}
    />
  );
}
