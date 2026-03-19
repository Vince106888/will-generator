import { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className, hasError, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border bg-card px-3.5 py-2.5 text-[13px] leading-relaxed text-ink transition focus:outline-none focus:ring-2 focus:ring-info/20",
        hasError ? "border-error" : "border-border",
        className
      )}
      {...props}
    />
  );
}
