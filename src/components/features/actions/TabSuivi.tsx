"use client";

/**
 * TabSuivi - Transparency & follow-up tab
 *
 * Sections: Milestones → Timeline → Funds → Results → Next Step
 * Part of the component library (features/actions/).
 */

// MilestoneTracker retire du suivi - deja visible dans TabPresentation

interface TimelineEvent {
  date: string;
  label: string;
  type: string;
  description: string;
  side?: "nous" | "adversaire";
  document?: string;
}

interface TabSuiviProps {
  currentSignatures: number;
  timeline: TimelineEvent[];
  funds: { totalCollected: number; totalSpent: number; categories: { label: string; amount: number; pct: number; color: string }[] };
  results: { value: string; unit: string; label: string }[];
  nextStep: { title: string; description: string; estimatedDate: string | null };
}

/* Timeline event styling - green for us, red for adversary, semantic for types */
const EVENT_STYLES: Record<string, { dot: string; bg: string; icon: string }> = {
  milestone:     { dot: "bg-green-500", bg: "", icon: "M5 13l4 4L19 7" },
  juridique:     { dot: "bg-amber-500", bg: "", icon: "M3 6l3 1m0 0l-3 9a5 5 0 006 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5 5 0 006 0M18 7l3 9m-3-9l-6-2" },
  communication: { dot: "bg-blue-500",  bg: "", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
  financier:     { dot: "bg-purple-500", bg: "", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  adversaire:    { dot: "bg-red-500",   bg: "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
};

export function TabSuivi({ currentSignatures, timeline, funds, results, nextStep }: TabSuiviProps) {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Nous rendons compte de chaque etape. Voici ce qui a ete accompli grace a votre soutien
        et celui de {currentSignatures.toLocaleString("fr-FR")} signataires.
      </p>

      {/* Milestones retires du suivi - deja dans TabPresentation (FOMO) */}

      {/* ─── 2. TIMELINE ─── */}
      {timeline.length > 0 && (
        <section>
          <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
            Journal de bord
          </h3>
          <p className="mb-6 text-xs text-gray-500 dark:text-gray-400">
            Chaque etape documentee. Nos actions et les reponses de l&apos;adversaire.
          </p>
          <div className="space-y-0">
            {timeline.map((event, i) => {
              const style = EVENT_STYLES[event.type] || EVENT_STYLES.milestone;
              const isAdversaire = event.side === "adversaire";
              return (
                <div key={i} className="flex gap-4">
                  {/* Dot + line */}
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${style.dot}`}>
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                      </svg>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`mb-4 flex-1 rounded-lg p-4 ${style.bg || "bg-gray-50 dark:bg-gray-900"}`}>
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      {isAdversaire && (
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30">
                          Adversaire
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-bold ${isAdversaire ? "text-red-700 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                      {event.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                    {event.document && (
                      <a href="#" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {event.document}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Fonds retires - pas d'affichage public des montants */}

      {/* Resultats retires - pas de montants financiers publics */}

      {/* ─── 5. PROCHAINE ETAPE ─── */}
      <section>
        <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
          <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
            Prochaine etape : {nextStep.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{nextStep.description}</p>
          {nextStep.estimatedDate && (
            <p className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
              Date estimee : {new Date(nextStep.estimatedDate).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
