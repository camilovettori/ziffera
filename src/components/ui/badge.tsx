import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-blue-200 bg-blue-50 text-blue-700 shadow-[0_10px_24px_rgba(59,130,246,0.08)]",
  secondary: "border-slate-200 bg-slate-50 text-slate-600",
  outline: "border-slate-200 bg-white text-slate-600",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
