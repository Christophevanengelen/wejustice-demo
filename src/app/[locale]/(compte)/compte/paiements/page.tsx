"use client";

/**
 * PaiementsPage — Historique des paiements du membre.
 *
 * Règles :
 * - Table Flowbite striped pour la lisibilité
 * - Badge Flowbite "success" (vert) pour le statut payé
 * - Montants formatés en EUR avec virgule (convention française)
 * - Dates en format français court
 * - Dark mode complet
 */

import { useTranslations } from "next-intl";
import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import userActivity from "@/mocks/user-activity.json";

export default function PaiementsPage() {
  const t = useTranslations("compte");
  return (
    <ComptePageShell
      title={t("paymentsTitle")}
      subtitle={t("paymentsSubtitle")}
    >
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-white/[0.08]">
        <Table>
          <TableHead>
            <TableHeadCell className="bg-gray-50 dark:bg-gray-800">{t("date")}</TableHeadCell>
            <TableHeadCell className="bg-gray-50 dark:bg-gray-800">{t("description")}</TableHeadCell>
            <TableHeadCell className="bg-gray-50 text-right dark:bg-gray-800">{t("amount")}</TableHeadCell>
            <TableHeadCell className="bg-gray-50 text-right dark:bg-gray-800">{t("statusLabel")}</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {userActivity.payments.map((p, i) => (
              <TableRow key={p.id} className={`${i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}`}>
                <TableCell className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(p.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-white">
                  {p.description}
                </TableCell>
                <TableCell className="text-right text-sm font-medium text-gray-900 dark:text-white">
                  {p.amount.toFixed(2).replace(".", ",")} EUR
                </TableCell>
                <TableCell className="text-right">
                  <Badge color="success" size="xs">{t("paid")}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComptePageShell>
  );
}
