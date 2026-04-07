"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  separator = " ",
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    if (prefersReduced) {
      setDisplay(value.toLocaleString("fr-FR"));
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        const formatted = Math.round(latest).toLocaleString("fr-FR");
        setDisplay(separator !== " " ? formatted.replace(/\s/g, separator) : formatted);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, separator, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
