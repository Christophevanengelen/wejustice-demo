import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlogListClient } from "./BlogListClient";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités, analyses juridiques et victoires citoyennes sur Wejustice.",
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogListClient />;
}
