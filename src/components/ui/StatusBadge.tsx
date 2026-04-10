"use client";

import { Badge } from "flowbite-react";
import { useTranslations } from "next-intl";

const STATUS_COLORS: Record<string, "green" | "blue" | "yellow" | "indigo" | "red" | "purple" | "gray"> = {
  collecting: "green",
  goal_reached: "green",
  formal_notice: "blue",
  negotiation: "blue",
  legal_action: "blue",
  won: "gray",
  partial: "gray",
  closed: "gray",
};

export function StatusBadge({ status, size = "xs" }: { status: string; size?: "sm" | "xs" }) {
  const t = useTranslations("status");
  const color = STATUS_COLORS[status] || STATUS_COLORS.collecting;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const label = t(status as any) || t("collecting");
  return <Badge color={color} size={size}>{label}</Badge>;
}

export function getStatusLabel(status: string): string {
  // Static fallback for non-component contexts
  const FALLBACK: Record<string, string> = {
    collecting: "Ouverte",
    goal_reached: "Ouverte",
    formal_notice: "En cours",
    negotiation: "En cours",
    legal_action: "En cours",
    won: "Terminee",
    partial: "Terminee",
    closed: "Terminee",
  };
  return FALLBACK[status] || FALLBACK.collecting;
}
