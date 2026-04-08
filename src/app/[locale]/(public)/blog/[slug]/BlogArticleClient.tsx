"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CTAButton } from "@/components/ui/CTAButton";
import { ShareButtons } from "@/components/features/actions/ShareButtons";
import blogData from "@/mocks/blog.json";

export function BlogArticleClient({ slug }: { slug: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const article = blogData.find((a) => a.slug === slug);

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

  // Suggest 3 other articles
  const related = blogData.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(3, 7, 18, 0.85) 0%, rgba(3, 7, 18, 0.70) 50%, rgba(3, 7, 18, 0.55) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <Link href={`/${locale}/blog`} className="mb-6 flex items-center gap-1 text-sm text-white/70 hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {article.category}
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            {article.title}
          </h1>
          <div className="mb-6 flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{article.author.name}</p>
              <p className="text-xs text-white/60">
                {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} - {article.readTime} min de lecture
              </p>
            </div>
          </div>

          {/* Share - dans le hero comme la page action */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Partager :</span>
            <ShareButtons
              url={`https://wejustice.legal/blog/${article.slug}`}
              title={article.title}
              hashtag="WeJustice"
              variant="icon-row"
            />
          </div>
        </div>
      </section>

      {/* ─── Article body ─── */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-6 lg:px-6 lg:py-16">
          {/* Lead */}
          <p className="mb-8 text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
            {article.excerpt}
          </p>

          {/* Article body */}
          <div
            className="prose prose-gray max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: (article as Record<string, unknown>).body as string || "<p>Cet article sera publié prochainement avec le contenu complet.</p>" }}
          />

          {/* CTA — Agissez maintenant */}
          <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-white/[0.08] dark:bg-gray-900">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Agissez maintenant
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Rejoignez les actions collectives qui font avancer la justice.
            </p>
            <CTAButton href={`/${locale}/actions`} size="lg">
              Découvrir les actions
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ─── Related articles ─── */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-12 dark:bg-gray-900 lg:py-16">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              &Agrave; lire aussi
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Link key={a.id} href={`/${locale}/blog/${a.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-white/[0.08] dark:bg-gray-900 dark:hover:border-white/[0.14] dark:hover:shadow-none">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">{a.category}</span>
                    <h3 className="mb-2 text-base font-bold text-gray-900 group-hover:text-brand dark:text-white line-clamp-2">{a.title}</h3>
                    <p className="mt-auto text-xs text-gray-400 dark:text-gray-500">
                      {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })} - {a.readTime} min
                    </p>
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
