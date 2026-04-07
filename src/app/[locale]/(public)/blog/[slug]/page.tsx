import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlogArticleClient } from "./BlogArticleClient";
import blogData from "@/mocks/blog.json";
import { absoluteUrl, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { blogArticleJsonLd, breadcrumbJsonLd, safeJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return blogData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = blogData.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  const description = article.excerpt.slice(0, 160);
  const url = absoluteUrl(`/${locale}/blog/${article.slug}`);
  const imageUrl = article.image || "/images/wejustice_home_hero.png";

  return {
    title: article.title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: absoluteUrl(`/fr/blog/${article.slug}`),
        en: absoluteUrl(`/en/blog/${article.slug}`),
      },
    },
    openGraph: {
      ...baseOpenGraph(locale),
      type: "article",
      title: article.title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      ...baseTwitter(),
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = blogData.find((a) => a.slug === slug);

  return (
    <>
      {article && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(blogArticleJsonLd(article as never, locale)) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([
              { name: "Accueil", href: `/${locale}` },
              { name: "Blog", href: `/${locale}/blog` },
              { name: article.title, href: `/${locale}/blog/${article.slug}` },
            ])) }}
          />
        </>
      )}
      <BlogArticleClient slug={slug} />
    </>
  );
}
