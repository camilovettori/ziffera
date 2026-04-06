import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "btn-primary shimmer-hover bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white shadow-[0_4px_24px_rgba(99,102,241,0.45),0_0_0_1px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_34px_rgba(99,102,241,0.52),0_0_0_1px_rgba(139,92,246,0.35)]",
  secondary:
    "bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100",
  outline:
    "bg-white text-slate-800 border border-slate-200 hover:bg-blue-50 hover:border-blue-200",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 py-3 text-sm",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
  icon: "h-11 w-11",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild, children, ...props }, ref) => {
    const classes = cn(
      "relative inline-flex items-center justify-center gap-2 rounded-2xl border font-semibold transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;

      return React.cloneElement(child, {
        ...props,
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
