import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

export function PageHeading({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn("text-2xl lg:text-4xl font-bold", className)}
      data-testid="page-heading"
    >
      {children}
    </h1>
  );
}
