"use client";
import { clsx } from "clsx";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-200 hover:shadow-lg hover:shadow-brand-300",
  secondary:
    "bg-white text-stone-800 border border-stone-200 hover:bg-stone-50 shadow-sm",
  ghost: "bg-transparent text-stone-600 hover:bg-stone-100",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

