import type { Metadata } from "next";
import { absoluteUrl, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import EnSavoirPlusClient from "./EnSavoirPlusClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fr"
    ? "En savoir plus — Wejustice, la justice collective"
    : "Learn more — Wejustice, collective justice";
  const description = locale === "fr"
    ? "Découvrez l'histoire de Wejustice, la joint venture entre un cabinet d'avocats et un expert en communication digitale. Ensemble, nous rendons la justice accessible à tous."
    : "Discover the story of Wejustice, the joint venture between a law firm and a digital communication expert. Together, we make justice accessible to all.";

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/qui-sommes-nous`),
      languages: { fr: absoluteUrl("/fr/qui-sommes-nous"), en: absoluteUrl("/en/qui-sommes-nous") },
    },
    openGraph: { ...baseOpenGraph(locale), title, description, url: absoluteUrl(`/${locale}/qui-sommes-nous`) },
    twitter: { ...baseTwitter(), title, description },
  };
}

export default function EnSavoirPlusPage() {
  return <EnSavoirPlusClient />;
}
