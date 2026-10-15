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
    "border-z-deep bg-z-blue text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_-8px_rgba(31,91,255,0.7)] hover:bg-z-deep",
  secondary:
    "border-z-blue/20 bg-z-wash text-z-deep hover:border-z-blue/40",
  outline:
    "border-line-strong bg-surface text-ink hover:border-ink/40",
  ghost: "border-transparent bg-transparent text-ink-2 hover:bg-ink/5 hover:text-ink",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 py-3 text-sm",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
  icon: "h-11 w-11",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild, children, ...props }, ref) => {
    const classes = cn(
      "relative inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60",
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
