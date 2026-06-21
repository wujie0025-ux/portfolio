import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f5f5f5] text-[#1a1a1a]",
        className
      )}
    >
      {children}
    </span>
  );
}
