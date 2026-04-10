"use client";

import { useState, useMemo } from "react";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/ui/CTAButton";
import { ActionCard } from "@/components/features/actions/ActionCard";
import actionsData from "@/mocks/actions.json";

/**
 * Filter categories — groups raw themes into 5 readable categories.
 * The backend can have any number of tags, the front groups them.
 */
const FILTER_CATEGORIES_RAW: { key: string; themes: string[] }[] = [
  { key: "filterHealth", themes: ["sante", "sante animale", "agriculture", "environnement"] },
  { key: "filterLiberties", themes: ["libertes", "transparence", "democratie", "vie privee"] },
  { key: "filterConsumer", themes: ["consommation"] },
  { key: "filterDigital", themes: ["numerique"] },
];

export function ActionsListClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const t = useTranslations("actions");
  const [search, setSearch] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const FILTER_CATEGORIES = FILTER_CATEGORIES_RAW.map((c) => ({
    ...c,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label: t(c.key as any),
  }));

  const filtered = useMemo(() => {
    return actionsData.filter((a) => {
      const q = search.toLowerCase();
      const keywords = (a as Record<string, unknown>).keywords as string[] | undefined;
      const searchable = [
        a.title,
        a.description,
        a.tag,
        a.themes.join(" "),
        keywords ? keywords.join(" ") : "",
      ].join(" ").toLowerCase();
      const matchSearch = !search || searchable.includes(q);
      if (!selectedKey) return matchSearch;
      const cat = FILTER_CATEGORIES_RAW.find((c) => c.key === selectedKey);
      const matchTheme = cat ? a.themes.some((thm) => cat.themes.includes(thm)) : true;
      return matchSearch && matchTheme;
    });
  }, [search, selectedKey]);

  return (
    <div>
      {/* --- Hero with background image --- */}
      <section className="relative flex min-h-[50vh] flex-col overflow-hidden">
        <Image
          src="/images/pages/wejustice_actions.jpg"
          alt={t("heroTitle")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.60) 50%, rgba(3, 7, 18, 0.80) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:py-20 lg:px-6">
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          {/* Search bar */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all focus-within:border-white/40 focus-within:bg-white/15 focus-within:shadow-xl sm:h-14 sm:px-5 sm:gap-3">
              <svg className="h-5 w-5 flex-shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
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

          {/* Filter chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
            <button
              onClick={() => setSelectedKey(null)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                !selectedKey
                  ? "bg-white font-semibold text-gray-900 shadow-md"
                  : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t("filterAll")}
            </button>
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedKey(selectedKey === cat.key ? null : cat.key)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                  selectedKey === cat.key
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

      {/* --- Actions grid --- */}
      <section className="bg-white py-12 dark:bg-gray-900 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {t("found", { count: filtered.length })}
          </p>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {t("noResults")}
              </p>
              <Button color="light" size="sm" className="mt-4" onClick={() => { setSearch(""); setSelectedKey(null); }}>
                {t("resetFilters")}
              </Button>
            </div>
          ) : (
            <div className="grid auto-rows-[1fr] gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* TODO: action content translations will come from backend CMS */}
              {filtered.map((action) => (
                <ActionCard
                  key={action.id}
                  id={action.id}
                  slug={action.slug}
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

          {/* CTA */}
          <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-white/[0.08] dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              {t("goFurtherTitle")}
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {t("goFurtherSubtitle")}
            </p>
            <CTAButton href={`/${locale}/tarifs`} size="lg">
              {t("discoverPlans")}
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
