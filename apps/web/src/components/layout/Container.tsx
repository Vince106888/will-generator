import { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide";
};

const sizeStyles: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-[980px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]"
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-16", sizeStyles[size], className)}
      {...props}
    />
  );
}
