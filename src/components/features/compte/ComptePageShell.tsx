/**
 * ComptePageShell — Coquille centralisée pour toutes les pages /compte
 *
 * RÈGLE : Chaque page /compte DOIT wrapper son contenu dans <ComptePageShell>.
 * Cela garantit un layout identique sur toutes les pages :
 * - max-width cohérent (défaut: 4xl)
 * - titre H1 + sous-titre toujours au même endroit
 * - espacement title→content identique partout
 * - responsive + dark mode automatique
 *
 * Usage :
 *   <ComptePageShell title="Mes signatures" subtitle="5 actions signées">
 *     {contenu}
 *   </ComptePageShell>
 *
 * Props optionnelles :
 * - maxWidth: "2xl" | "4xl" | "6xl" (défaut: "4xl")
 * - actions: ReactNode pour les boutons/liens à droite du titre
 */

interface ComptePageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "2xl" | "4xl" | "6xl";
  actions?: React.ReactNode;
}

const MAX_WIDTH_MAP = {
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
} as const;

export function ComptePageShell({
  title,
  subtitle,
  children,
  maxWidth = "4xl",
  actions,
}: ComptePageShellProps) {
  return (
    <div className={`mx-auto ${MAX_WIDTH_MAP[maxWidth]}`}>
      {/* Header — identique sur TOUTES les pages */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex-shrink-0">{actions}</div>
          )}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
