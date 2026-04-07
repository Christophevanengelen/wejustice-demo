import { setRequestLocale } from "next-intl/server";
import { DesignSystemClient } from "./DesignSystemClient";

type Props = { params: Promise<{ locale: string }> };

export default async function DesignSystemPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DesignSystemClient />;
}
