"use client";

import { useState, useMemo } from "react";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CTAButton } from "@/components/ui/CTAButton";
import { ActionCard } from "@/components/features/actions/ActionCard";
import actionsData from "@/mocks/actions.json";

/**
 * Catégories de filtres — regroupement des thèmes en 5 catégories lisibles.
 * Le backend peut avoir autant de tags qu'il veut, le front les regroupe.
 * Chaque catégorie mappe vers les thèmes bruts du mock.
 */
const FILTER_CATEGORIES: { label: string; themes: string[] }[] = [
  { label: "Santé", themes: ["santé", "santé animale", "agriculture", "environnement"] },
  { label: "Libertés", themes: ["libertés", "transparence", "démocratie", "vie privée"] },
  { label: "Consommation", themes: ["consommation"] },
  { label: "Numérique", themes: ["numérique"] },
];

export function ActionsListClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return actionsData.filter((a) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase());
      if (!selectedTheme) return matchSearch;
      // Trouver la catégorie sélectionnée et vérifier si l'action a un de ses thèmes
      const cat = FILTER_CATEGORIES.find((c) => c.label === selectedTheme);
      const matchTheme = cat ? a.themes.some((t) => cat.themes.includes(t)) : true;
      return matchSearch && matchTheme;
    });
  }, [search, selectedTheme]);

  return (
    <div>
      {/* ─── Hero with background image - glass variant (prod pattern) ─── */}
      <section className="relative flex min-h-[50vh] flex-col overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/pages/wejustice_actions.jpg"
          alt="Actions collectives WeJustice"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.60) 50%, rgba(3, 7, 18, 0.80) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:py-20">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            Actions collectives
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 sm:text-lg">
            Rejoignez les actions qui vous concernent. Chaque signature compte.
          </p>

          {/* Search bar - glass variant */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all focus-within:border-white/40 focus-within:bg-white/15 focus-within:shadow-xl sm:h-14 sm:px-5 sm:gap-3">
              <svg className="h-5 w-5 flex-shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Rechercher une action..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 flex-1 border-0 bg-transparent text-sm text-white placeholder-white/50 outline-none sm:h-14 sm:text-base"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="rounded-md p-1 text-white/50 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter chips - glass variant */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
            <button
              onClick={() => setSelectedTheme(null)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                !selectedTheme
                  ? "bg-white font-semibold text-gray-900 shadow-md"
                  : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Toutes
            </button>
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedTheme(selectedTheme === cat.label ? null : cat.label)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                  selectedTheme === cat.label
                    ? "bg-white font-semibold text-gray-900 shadow-md"
                    : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Actions grid ─── */}
      <section className="bg-white py-12 dark:bg-gray-900 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} action{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Aucune action ne correspond à votre recherche.
              </p>
              <Button color="light" size="sm" className="mt-4" onClick={() => { setSearch(""); setSelectedTheme(null); }}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((action) => (
                <ActionCard
                  key={action.id}
                  id={action.id}
                  title={action.title}
                  description={action.description}
                  status={action.status}
                  tag={action.tag}
                  themes={action.themes}
                  signatures={action.signatures}
                  lawyer={action.lawyer}
                  image={action.image}
                  locale={locale}
                  signaturesThisWeek={action.signaturesThisWeek}
                />
              ))}
            </div>
          )}

          {/* CTA — Aller plus loin */}
          <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              Vous voulez aller plus loin ?
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Devenez partie prenante des actions en justice en choisissant votre forfait.
            </p>
            <CTAButton href={`/${locale}/tarifs`} size="lg">
              Découvrir les forfaits
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
