"use client";

/**
 * FundsBar - Stacked horizontal bar for fund allocation transparency
 *
 * Shows how collected funds are distributed across categories.
 * Each segment has a color, percentage, and label.
 * Part of the component library (ui/).
 */

interface FundCategory {
  label: string;
  amount: number;
  pct: number;
  color: string;
}

interface FundsBarProps {
  totalCollected: number;
  totalSpent: number;
  categories: FundCategory[];
}

export function FundsBar({ totalCollected, totalSpent, categories }: FundsBarProps) {
  return (
    <div>
      {/* Totals */}
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalCollected.toLocaleString("fr-FR")} EUR
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">collectes</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {totalSpent.toLocaleString("fr-FR")} EUR depenses
        </div>
      </div>

      {/* Stacked bar */}
      <div className="mb-4 flex h-4 overflow-hidden rounded-full">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="transition-all duration-500"
            style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
            title={`${cat.label}: ${cat.pct}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.map((cat) => (
          <div key={cat.label} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-white">{cat.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {cat.amount.toLocaleString("fr-FR")} EUR ({cat.pct}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
