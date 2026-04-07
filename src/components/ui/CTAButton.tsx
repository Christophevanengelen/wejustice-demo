"use client";

/**
 * CTAButton — THE single CTA button for WeJustice.
 *
 * Uses brand red (primary-700 = #C20520 light, primary-500 dark).
 * NEVER use Flowbite `color="failure"` — use this component instead.
 *
 * Variants:
 *   - "solid"   (default) — filled brand red, white text
 *   - "outline" — brand red border + text, transparent bg
 *   - "light"   — gray border, neutral bg (secondary CTA)
 *
 * Sizes: "sm" | "md" (default) | "lg" | "xl"
 *
 * Supports `href` for link-buttons via Next.js Link.
 */

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type CTAVariant = "solid" | "outline" | "light";
type CTASize = "sm" | "md" | "lg" | "xl";

interface CTAButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  variant?: CTAVariant;
  size?: CTASize;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

const sizeClasses: Record<CTASize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

const variantClasses: Record<CTAVariant, string> = {
  solid: [
    "bg-primary-700 text-white",
    "hover:bg-primary-800 active:bg-primary-900",
    "dark:bg-primary-600 dark:hover:bg-primary-700 dark:active:bg-primary-800",
    "focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800",
  ].join(" "),
  outline: [
    "border-2 border-primary-700 text-primary-700 bg-transparent",
    "hover:bg-primary-50 active:bg-primary-100",
    "dark:border-primary-500 dark:text-primary-500",
    "dark:hover:bg-primary-900/20 dark:active:bg-primary-900/30",
    "focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800",
  ].join(" "),
  light: [
    "border border-gray-300 bg-white text-gray-900",
    "hover:bg-gray-100 active:bg-gray-200",
    "dark:border-gray-600 dark:bg-gray-800 dark:text-white",
    "dark:hover:bg-gray-700 dark:active:bg-gray-600",
    "focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700",
  ].join(" "),
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  function CTAButton(
    { children, variant = "solid", size = "md", href, className = "", fullWidth, ...rest },
    ref,
  ) {
    const classes = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);
