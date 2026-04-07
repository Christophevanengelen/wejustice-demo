"use client";

import { Progress } from "flowbite-react";

interface SignatureProgressProps {
  current: number;
  goal: number;
  /** "compact" = no goal text, "full" = with goal + percentage */
  variant?: "compact" | "full";
}

export function SignatureProgress({ current, goal, variant = "full" }: SignatureProgressProps) {
  const pct = Math.min(100, Math.round((current / goal) * 100));

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {current.toLocaleString("fr-FR")} signatures
        </span>
        {variant === "full" && (
          <span className="text-gray-500 dark:text-gray-400">{pct}%</span>
        )}
      </div>
      {/* color="red" maps to brand red via flowbite-theme.ts */}
      <Progress progress={pct} size="sm" color="red" />
      {variant === "full" && (
        <p className="mt-1 text-right text-xs text-gray-400 dark:text-gray-500">
          Objectif : {goal.toLocaleString("fr-FR")}
        </p>
      )}
    </div>
  );
}
