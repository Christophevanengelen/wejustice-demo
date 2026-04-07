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

import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import userActivity from "@/mocks/user-activity.json";

export default function PaiementsPage() {
  return (
    <ComptePageShell
      title="Paiements"
      subtitle="Historique de vos paiements et contributions."
    >
      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell className="text-right">Montant</TableHeadCell>
            <TableHeadCell className="text-right">Statut</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {userActivity.payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="whitespace-nowrap">
                  {new Date(p.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  {p.description}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {p.amount.toFixed(2).replace(".", ",")} EUR
                </TableCell>
                <TableCell className="text-right">
                  <Badge color="success" size="xs">Paye</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComptePageShell>
  );
}
