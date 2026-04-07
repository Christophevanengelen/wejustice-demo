"use client";

/**
 * ScrollReveal — Scroll-triggered reveal animation wrapper.
 *
 * Wraps any child with a fade + slide animation that triggers when the
 * element enters the viewport. Supports stagger delays for lists/grids.
 *
 * Usage:
 *   <ScrollReveal delay={0.1}>
 *     <Card>...</Card>
 *   </ScrollReveal>
 */

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING, DURATION } from "./index";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts (seconds). Use for stagger effects. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Direction the element slides from. */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Slide distance in pixels. */
  distance?: number;
  /** How much of the element must be visible to trigger (0-1). */
  threshold?: number;
  /** Only animate once (default true). */
  once?: boolean;
  /** Scale effect — element grows from this value to 1. */
  scale?: number;
}

const DIRECTION_OFFSET = {
  up: (d: number) => ({ y: d }),
  down: (d: number) => ({ y: -d }),
  left: (d: number) => ({ x: d }),
  right: (d: number) => ({ x: -d }),
  none: () => ({}),
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = DURATION.slow,
  direction = "up",
  distance = 24,
  threshold = 0.15,
  once = true,
  scale,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const offset = DIRECTION_OFFSET[direction](distance);
  const initialScale = scale ? { scale } : {};

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, ...initialScale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: EASING.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}
