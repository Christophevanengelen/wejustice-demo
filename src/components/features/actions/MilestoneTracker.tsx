"use client";

/**
 * MilestoneTracker - Signature milestone visualization
 *
 * Horizontal track with dots at each milestone.
 * Reached = filled green + checkmark. Current = pulsing. Future = gray.
 * Used in the "Suivi" tab of the action detail page.
 *
 * Part of the component library.
 */

const DEFAULT_MILESTONES = [1000, 5000, 10000, 25000, 50000, 100000];

const MILESTONE_LABELS: Record<number, string> = {
  1000: "Visibilite mediatique",
  5000: "Mise en demeure",
  10000: "Depot de plainte",
  25000: "Action collective",
  50000: "Impact majeur",
  100000: "Mouvement national",
};

interface MilestoneTrackerProps {
  currentSignatures: number;
  milestones?: number[];
  className?: string;
}

export function MilestoneTracker({
  currentSignatures,
  milestones = DEFAULT_MILESTONES,
  className,
}: MilestoneTrackerProps) {
  return (
    <div className={className}>
      <div className="space-y-4">
        {milestones.map((milestone, i) => {
          const reached = currentSignatures >= milestone;
          const isCurrent = !reached && (i === 0 || currentSignatures >= milestones[i - 1]);

          return (
            <div key={milestone} className="flex items-start gap-4">
              {/* Dot + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    reached
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : isCurrent
                        ? "bg-white text-gray-900 ring-2 ring-gray-300 dark:bg-gray-900 dark:text-white dark:ring-gray-500"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                  }`}
                >
                  {reached ? (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    (i + 1).toString()
                  )}
                </div>
                {/* Connecting line (not on last item) */}
                {i < milestones.length - 1 && (
                  <div className={`mt-1 h-6 w-0.5 ${reached ? "bg-green-300 dark:bg-green-700" : "bg-gray-200 dark:bg-gray-700"}`} />
                )}
              </div>

              {/* Content */}
              <div className="pt-1">
                <p className={`text-sm font-medium ${reached ? "text-green-700 dark:text-green-400" : isCurrent ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                  {milestone.toLocaleString("fr-FR")} signatures
                </p>
                <p className={`text-xs ${reached ? "text-green-600 dark:text-green-500" : "text-gray-400 dark:text-gray-500"}`}>
                  {MILESTONE_LABELS[milestone] || "Palier suivant"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
