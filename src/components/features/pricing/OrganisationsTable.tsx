"use client";

/**
 * OrganisationsTable - Pricing table for organizations (2nd persona).
 *
 * Two columns: Syndicats/entreprises and Assos/ONG.
 * Features with checkmarks, "Option" labels, and beneficiary ranges.
 * CTA: "Contactez-nous" for both.
 */

const FEATURES = [
  {
    label: "Lancez un ultimatum",
    sub: "Lancez une pétition pouvant donner lieu à une action collective en Justice",
    syndic: true,
    asso: true,
  },
  {
    label: "Agissez en Justice",
    sub: "Permettez à votre organisation et ses soutiens d'agir en Justice",
    syndic: true,
    asso: true,
  },
  {
    label: "Étendez votre communauté",
    sub: "Mobilisez vos membres et au-delà grâce à nos outils à fort impact",
    syndic: true,
    asso: true,
  },
  {
    label: "Gérez l'action",
    sub: "Bénéficiez de l'accompagnement d'un gestionnaire de projet dédié",
    syndic: "option",
    asso: "option",
  },
  {
    label: "Activez votre site",
    sub: "Choisissez l'intégration de l'action au sein de votre propre site Internet",
    syndic: "option",
    asso: "option",
  },
  {
    label: "Soutenez un large public",
    sub: "Agissez pour votre structure, ses membres, et plus encore",
    syndic: "De 100 à 10K bénéficiaires",
    asso: "De 1K à 250K membres",
  },
] as const;

function CellContent({ value, color }: { value: true | string; color: string }) {
  if (value === true) {
    return (
      <span className={`text-lg font-medium ${color}`}>
        &#10003;
      </span>
    );
  }
  if (value === "option") {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <span className={`text-lg font-medium ${color}`}>&#10003;</span>
        <span className={`text-[10px] font-medium ${color}`}>Option</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-lg font-medium ${color}`}>&#10003;</span>
      <span className={`text-[10px] font-medium ${color}`}>{value}</span>
    </div>
  );
}

export function OrganisationsTable() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-5 py-4" />
                <th className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 20 20" className="text-gray-500 dark:text-gray-400">
                      <rect x="3" y="7" width="14" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M7,7 L7,5 C7,3.5 8.5,3 10,3 C11.5,3 13,3.5 13,5 L13,7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      Syndicats / entreprises
                    </span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 20 20" className="text-gray-500 dark:text-gray-400">
                      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <ellipse cx="10" cy="10" rx="3" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      Assos / ONG
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {FEATURES.map((feat, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-5 py-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                      {feat.label}
                    </div>
                    {feat.sub && (
                      <div className="mt-1 max-w-xs text-[11px] text-gray-500 dark:text-gray-400">
                        {feat.sub}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center align-middle">
                    <CellContent
                      value={feat.syndic}
                      color="text-gray-600 dark:text-gray-300"
                    />
                  </td>
                  <td className="min-w-[140px] px-4 py-4 text-center align-middle">
                    <CellContent
                      value={feat.asso}
                      color="text-amber-700 dark:text-amber-400"
                    />
                  </td>
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <td className="px-5 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                    Faites-le maintenant
                  </div>
                  <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                    Discutez de votre projet avec un expert en actions collectives
                  </div>
                </td>
                <td className="px-4 py-4 text-center align-middle">
                  <a
                    href="https://calendly.com/wejustice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Contactez-nous
                  </a>
                </td>
                <td className="px-4 py-4 text-center align-middle">
                  <a
                    href="https://calendly.com/wejustice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg border border-amber-400 px-4 py-2 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20"
                  >
                    Contactez-nous
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
