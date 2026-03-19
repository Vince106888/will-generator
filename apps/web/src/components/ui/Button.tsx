import { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-paper hover:bg-primary/90",
  secondary: "bg-secondary text-ink border border-border hover:bg-secondary/80",
  outline: "border border-border text-ink hover:border-primary/50",
  ghost: "text-primary hover:text-primary/80"
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[13px]",
  lg: "px-6 py-3 text-sm"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info/30 disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
