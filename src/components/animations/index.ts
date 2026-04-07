/**
 * Animation Library - WeJustice Demo
 *
 * Reusable, tokenized animation components.
 * All respect prefers-reduced-motion.
 * All use consistent easing: [0.4, 0, 0.2, 1]
 */

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  emphasis: 0.8,
} as const;

export const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  sharp: [0.4, 0, 0.6, 1] as const,
} as const;

export { AnimatedSection } from "./AnimatedSection";
export { AnimatedList, AnimatedListItem } from "./AnimatedList";
export { FadeIn } from "./FadeIn";
export { ScrollToTop } from "./ScrollToTop";
export { AnimatedCounter } from "./AnimatedCounter";
export { ScrollReveal } from "./ScrollReveal";
