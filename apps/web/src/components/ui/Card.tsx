import { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "warning" | "info" | "success" | "error";
  size?: "sm" | "md" | "lg";
};

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "border-border bg-card",
  secondary: "border-border bg-secondary",
  warning: "border-warning bg-warning-soft",
  info: "border-info bg-info-soft",
  success: "border-success bg-success-soft",
  error: "border-error bg-error-soft"
};

const sizeStyles: Record<NonNullable<CardProps["size"]>, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6"
};

export function Card({
  className,
  variant = "default",
  size = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
