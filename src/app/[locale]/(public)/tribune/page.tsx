import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TribuneWaitingClient } from "./TribuneWaitingClient";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Tribune",
  description: "La Tribune WeJustice - partagez votre voix et mobilisez la communauté pour la justice.",
};

export default async function TribunePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TribuneWaitingClient />;
}
