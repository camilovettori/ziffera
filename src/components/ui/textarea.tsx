import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[180px] w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-[15px] leading-7 text-ink outline-none transition placeholder:text-ink-3 hover:border-ink/30 focus:border-z-blue focus:ring-2 focus:ring-z-blue/15 disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
