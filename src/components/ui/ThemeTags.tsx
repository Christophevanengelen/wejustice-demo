"use client";

/**
 * ThemeTags - Action theme labels
 *
 * Two variants:
 * - "default": Gray pills for cards and light backgrounds
 * - "on-dark": White semi-transparent pills for hero overlays
 *
 * Part of the component library.
 */

interface ThemeTagsProps {
  themes: string[];
  variant?: "default" | "on-dark";
}

export function ThemeTags({ themes, variant = "default" }: ThemeTagsProps) {
  const cls =
    variant === "on-dark"
      ? "rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium capitalize text-white/80"
      : "rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-600 dark:bg-gray-700 dark:text-gray-300";

  /* Max 2 thèmes affichés — pas de wrap, pas de surcharge visuelle */
  const visible = themes.slice(0, 2);

  return (
    <div className="flex gap-1.5">
      {visible.map((theme) => (
        <span key={theme} className={cls}>
          {theme}
        </span>
      ))}
    </div>
  );
}
