import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PartagerClient } from "./PartagerClient";
import actionsData from "@/mocks/actions.json";
import { absoluteUrl, baseOpenGraph, baseTwitter } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const action = actionsData.find((a) => a.id === id || a.slug === id);

  if (!action) {
    return { title: "Partager" };
  }

  const description = action.description.slice(0, 160);
  const imageUrl = action.image || "/images/actions/default.png";

  return {
    title: `Partager : ${action.title}`,
    description,
    openGraph: {
      ...baseOpenGraph(locale),
      type: "article",
      title: action.title,
      description,
      url: absoluteUrl(`/${locale}/actions/${action.id}`),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: action.title }],
    },
    twitter: {
      ...baseTwitter(),
      title: action.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PartagerPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <PartagerClient actionId={id} />;
}
