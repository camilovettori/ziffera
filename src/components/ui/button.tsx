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
    "bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_52%,#60a5fa_100%)] text-white shadow-[0_18px_50px_rgba(59,130,246,0.24)] hover:shadow-[0_24px_64px_rgba(59,130,246,0.34)]",
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
      "inline-flex items-center justify-center gap-2 rounded-2xl border font-semibold transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;

      return React.cloneElement(child, {
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
