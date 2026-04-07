"use client";

import { Badge } from "flowbite-react";

const STATUS_MAP: Record<string, { label: string; color: "green" | "blue" | "yellow" | "indigo" | "red" | "purple" | "gray" }> = {
  collecting: { label: "Collecte en cours", color: "green" },
  goal_reached: { label: "Objectif atteint", color: "blue" },
  formal_notice: { label: "Mise en demeure", color: "yellow" },
  negotiation: { label: "Negociation", color: "indigo" },
  legal_action: { label: "Action en justice", color: "red" },
  won: { label: "Victoire", color: "purple" },
  partial: { label: "Resultat partiel", color: "yellow" },
  closed: { label: "Cloturee", color: "gray" },
};

export function StatusBadge({ status, size = "xs" }: { status: string; size?: "sm" | "xs" }) {
  const info = STATUS_MAP[status] || STATUS_MAP.collecting;
  return <Badge color={info.color} size={size}>{info.label}</Badge>;
}

export function getStatusLabel(status: string): string {
  return (STATUS_MAP[status] || STATUS_MAP.collecting).label;
}
