"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import blogData from "@/mocks/blog.json";

const CATEGORIES = Array.from(new Set(blogData.map((a) => a.category)));

export function BlogListClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const featured = blogData.find((a) => a.featured);
  const filtered = useMemo(() => {
    return blogData.filter((a) => {
      const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCat || a.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/pages/wejustice_blog.jpg)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.60) 50%, rgba(3, 7, 18, 0.80) 100%)" }} />
        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:py-20 lg:px-6">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 sm:text-lg">
            Analyses, enquetes, decryptages. Suivez nos combats juridiques et l'actualite de la justice collective.
          </p>

          {/* Search */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all focus-within:border-white/40 focus-within:bg-white/15 focus-within:shadow-xl sm:h-14 sm:px-5 sm:gap-3">
              <svg className="h-5 w-5 flex-shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Rechercher un article..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 flex-1 border-0 bg-transparent text-sm text-white placeholder-white/50 outline-none sm:h-14 sm:text-base"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
            <button
              onClick={() => setSelectedCat(null)}
              className={`flex shrink-0 items-center rounded-full px-4 py-2.5 text-sm transition-colors duration-150 ${!selectedCat ? "bg-white font-semibold text-gray-900 shadow-md" : "border border-white/30 bg-white/10 text-white hover:bg-white/20"}`}
            >
              Tous
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(selectedCat === cat ? null : cat)}
                className={`flex shrink-0 items-center rounded-full px-4 py-2.5 text-sm transition-colors duration-150 ${selectedCat === cat ? "bg-white font-semibold text-gray-900 shadow-md" : "border border-white/30 bg-white/10 text-white hover:bg-white/20"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      {featured && !search && !selectedCat && (
        <section className="bg-white py-12 dark:bg-gray-900 lg:py-16">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
            <a href={`/${locale}/blog/${featured.slug}`} className="group grid gap-6 lg:grid-cols-2">
              <div className="relative h-64 overflow-hidden rounded-lg lg:h-full">
                <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">{featured.category}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="mb-3 inline-flex w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Article a la une
                </span>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-brand dark:text-white lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image src={featured.author.avatar} alt={featured.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{featured.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(featured.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} - {featured.readTime} min de lecture
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* ─── Articles Grid ─── */}
      <section className={`py-12 lg:py-16 ${featured && !search && !selectedCat ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-900"}`}>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} article{filtered.length > 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">Aucun article ne correspond a votre recherche.</p>
              <button onClick={() => { setSearch(""); setSelectedCat(null); }} className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Voir tous les articles
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.filter((a) => !(a.featured && !search && !selectedCat)).map((article) => (
                <a key={article.id} href={`/${locale}/blog/${article.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-white/[0.08] dark:bg-gray-900">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-gray-900 backdrop-blur-sm">{article.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-brand dark:text-white">
                      {article.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="relative h-7 w-7 overflow-hidden rounded-full">
                        <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })} - {article.readTime} min
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
