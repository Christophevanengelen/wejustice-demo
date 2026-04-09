"use client";

import { Badge } from "flowbite-react";

const STATUS_MAP: Record<string, { label: string; color: "green" | "blue" | "yellow" | "indigo" | "red" | "purple" | "gray" }> = {
  collecting: { label: "Ouverte", color: "green" },
  goal_reached: { label: "Ouverte", color: "green" },
  formal_notice: { label: "En cours", color: "blue" },
  negotiation: { label: "En cours", color: "blue" },
  legal_action: { label: "En cours", color: "blue" },
  won: { label: "Terminée", color: "gray" },
  partial: { label: "Terminée", color: "gray" },
  closed: { label: "Terminée", color: "gray" },
};

export function StatusBadge({ status, size = "xs" }: { status: string; size?: "sm" | "xs" }) {
  const info = STATUS_MAP[status] || STATUS_MAP.collecting;
  return <Badge color={info.color} size={size}>{info.label}</Badge>;
}

export function getStatusLabel(status: string): string {
  return (STATUS_MAP[status] || STATUS_MAP.collecting).label;
}
