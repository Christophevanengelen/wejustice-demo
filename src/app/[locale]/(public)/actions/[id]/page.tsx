import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ActionDetailClient } from "./ActionDetailClient";
import actionsData from "@/mocks/actions.json";
import { absoluteUrl, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { actionArticleJsonLd, breadcrumbJsonLd, safeJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return actionsData.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const action = actionsData.find((a) => a.id === id || a.slug === id);

  if (!action) {
    return { title: "Action introuvable" };
  }

  const description = action.description.slice(0, 160);
  const url = absoluteUrl(`/${locale}/actions/${action.id}`);
  const imageUrl = action.image || "/images/actions/default.png";

  return {
    title: action.title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: absoluteUrl(`/fr/actions/${action.id}`),
        en: absoluteUrl(`/en/actions/${action.id}`),
      },
    },
    openGraph: {
      ...baseOpenGraph(locale),
      type: "article",
      title: action.title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: action.title,
        },
      ],
    },
    twitter: {
      ...baseTwitter(),
      title: action.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ActionDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const action = actionsData.find((a) => a.id === id || a.slug === id);

  return (
    <>
      {action && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(actionArticleJsonLd(action as never, locale)) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([
              { name: "Accueil", href: `/${locale}` },
              { name: "Actions", href: `/${locale}/actions` },
              { name: action.title, href: `/${locale}/actions/${action.id}` },
            ])) }}
          />
        </>
      )}
      <ActionDetailClient actionId={id} />
    </>
  );
}
