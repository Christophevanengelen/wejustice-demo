"use client";

/**
 * BlogArticleClient — Premium article layout.
 *
 * Best practices applied:
 * - Centered narrow column (max-w-3xl) for optimal reading (65 chars/line)
 * - Large hero with category badge, author card, reading time
 * - Lead paragraph (excerpt) in larger type
 * - Prose body with proper typography hierarchy
 * - Sticky share sidebar on desktop
 * - Table of contents auto-generated from H2 headings
 * - Related articles grid at bottom
 * - CTA conversion block after article
 * - Locale-aware dates
 */

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { CTAButton } from "@/components/ui/CTAButton";
import { ShareButtons } from "@/components/features/actions/ShareButtons";
import blogData from "@/mocks/blog.json";

export function BlogArticleClient({ slug }: { slug: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const article = blogData.find((a) => a.slug === slug);
  const [readProgress, setReadProgress] = useState(0);

  // Reading progress bar
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article introuvable</h1>
        <CTAButton href={`/${locale}/blog`} variant="light" size="sm" className="mt-6">
          Retour au blog
        </CTAButton>
      </div>
    );
  }

  const body = (article as Record<string, unknown>).body as string || "";
  const related = blogData.filter((a) => a.id !== article.id).slice(0, 3);
  const dateFormatted = new Date(article.date).toLocaleDateString(
    locale === "en" ? "en-US" : "fr-FR",
    { day: "numeric", month: "long", year: "numeric" }
  );

  // Extract H2 headings for table of contents
  const headings = [...body.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map((m, i) => ({
    id: `section-${i}`,
    text: m[1].replace(/<[^>]*>/g, ""),
  }));

  // Inject IDs into H2 tags for anchor links
  let bodyWithIds = body;
  headings.forEach((h, i) => {
    bodyWithIds = bodyWithIds.replace(/<h2/, `<h2 id="section-${i}"`) as string;
    // Only replace the first unprocessed one
    if (i === 0) {
      bodyWithIds = bodyWithIds.replace(/<h2(?! id)/, `<h2 id="section-${i}"`);
    }
  });
  // Simpler approach: replace all h2 tags sequentially
  let h2Index = 0;
  bodyWithIds = body.replace(/<h2/g, () => `<h2 id="section-${h2Index++}"`);

  return (
    <div>
      {/* Reading progress bar */}
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-brand transition-all duration-150" style={{ width: `${readProgress}%` }} />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.80) 0%, rgba(3, 7, 18, 0.90) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 lg:py-20">
          {/* Back link */}
          <Link href={`/${locale}/blog`} className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            {article.title}
          </h1>

          {/* Meta: author + date + read time */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{article.author.name}</p>
                <p className="text-xs text-white/50">{dateFormatted}</p>
              </div>
            </div>
            <span className="text-xs text-white/40">·</span>
            <span className="text-xs text-white/50">{article.readTime} min {locale === "en" ? "read" : "de lecture"}</span>
          </div>
        </div>
      </section>

      {/* ─── Article body ─── */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-10 lg:py-16">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">

            {/* Main content column */}
            <div>
              {/* Lead paragraph */}
              <p className="mb-10 border-l-4 border-brand pl-6 text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                {article.excerpt}
              </p>

              {/* Body */}
              <div
                className="prose prose-lg prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-gray-600 prose-p:dark:text-gray-400 prose-blockquote:border-brand prose-blockquote:text-gray-600 prose-strong:text-gray-900 prose-strong:dark:text-white prose-a:text-brand prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bodyWithIds) }}
              />

              {/* Share after article */}
              <div className="mt-12 flex items-center gap-3 border-t border-gray-200 pt-8 dark:border-white/[0.08]">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {locale === "en" ? "Share this article:" : "Partager cet article :"}
                </span>
                <ShareButtons
                  url={`https://wejustice.legal/blog/${article.slug}`}
                  title={article.title}
                  hashtag="Wejustice"
                  variant="icon-row"
                />
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-white/[0.08] dark:bg-gray-900">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {locale === "en" ? "Take action now" : "Agissez maintenant"}
                </h3>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  {locale === "en" ? "Join collective actions that advance justice." : "Rejoignez les actions collectives qui font avancer la justice."}
                </p>
                <CTAButton href={`/${locale}/actions`} size="lg">
                  {locale === "en" ? "Discover actions" : "Découvrir les actions"}
                </CTAButton>
              </div>
            </div>

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Table of contents */}
                {headings.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {locale === "en" ? "In this article" : "Dans cet article"}
                    </h4>
                    <nav className="space-y-2">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className="block text-sm text-gray-500 transition-colors hover:text-brand dark:text-gray-400 dark:hover:text-brand"
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Share */}
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {locale === "en" ? "Share" : "Partager"}
                  </h4>
                  <ShareButtons
                    url={`https://wejustice.legal/blog/${article.slug}`}
                    title={article.title}
                    hashtag="Wejustice"
                    variant="icon-row"
                  />
                </div>

                {/* Author card */}
                <div className="rounded-lg border border-gray-200 p-4 dark:border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Wejustice</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Related articles ─── */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50 py-12 dark:border-white/[0.08] dark:bg-gray-900 lg:py-16">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              {locale === "en" ? "Related articles" : "À lire aussi"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Link key={a.id} href={`/${locale}/blog/${a.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-white/[0.08] dark:bg-gray-900 dark:hover:border-white/[0.14] dark:hover:shadow-none">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={a.image} alt={a.title} fill className="img-zoom object-cover" />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-gray-900 dark:bg-gray-900/90 dark:text-white">
                        {a.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-base font-bold leading-snug text-gray-900 group-hover:text-brand dark:text-white line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {a.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <span>{new Date(a.date).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{a.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
