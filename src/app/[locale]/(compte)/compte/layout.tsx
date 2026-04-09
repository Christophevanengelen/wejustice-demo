"use client";

/**
 * Compte layout — Shell de l'espace membre.
 *
 * Architecture :
 * - Navbar fixed en haut (z-30, h-16)
 * - Sidebar fixed à gauche SOUS la navbar (top-16, z-20) — desktop uniquement
 * - Sidebar overlay sur mobile (z-40, avec backdrop z-30)
 * - Contenu principal scrollable avec padding-top pour la navbar
 *   et margin-left pour la sidebar (desktop)
 * - Fond bg-gray-50 / dark:bg-gray-900 (page background)
 *
 * Séparé du layout public (Navigation + Footer) via les route groups
 * Next.js : (public) vs (compte). Pas de hack CSS nécessaire.
 */

import { useState } from "react";
import { CompteSidebar } from "@/components/features/compte/CompteSidebar";
import { CompteNavbar } from "@/components/features/compte/CompteNavbar";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import { DemoToolbar } from "@/components/layout/DemoToolbar";

export default function CompteLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar — fixed top, z-30 */}
      <CompteNavbar onMenuClick={() => setSidebarOpen(true)} />
      {/* Sidebar — fixed left, SOUS la navbar */}
      <CompteSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Contenu principal — décalé par la navbar (pt-16) et la sidebar (lg:ml-64) */}
      <main className="min-h-screen pt-16 lg:ml-64">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
      <DemoToolbar />
      <ScrollToTop />
    </div>
  );
}
