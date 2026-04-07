"use client";

import { useState } from "react";
import { useAuth, type DemoRole } from "@/lib/mock-auth";

const ROLES: { value: DemoRole; label: string; desc: string }[] = [
  { value: "anonymous", label: "Anonyme", desc: "Visiteur non connecte" },
  { value: "free", label: "Gratuit (L0)", desc: "Marie Libre - signataire" },
  { value: "member", label: "Membre (L1)", desc: "Jean Dupont - citoyen engage" },
  { value: "admin", label: "Admin", desc: "Dashboard administration" },
  { value: "lawyer", label: "Avocat", desc: "Me. Sophie Martin" },
];

export function DemoToolbar() {
  const { demoRole, setDemoRole, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
        aria-label="Demo controls"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[9999] w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-600 dark:bg-gray-800">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Demo Mode
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>

          {/* Role selector */}
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Role utilisateur
          </p>
          <div className="mb-4 space-y-1">
            {ROLES.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setDemoRole(value)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  demoRole === value
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <div className={`h-2 w-2 rounded-full ${demoRole === value ? "bg-primary-600 dark:bg-primary-400" : "bg-gray-300 dark:bg-gray-600"}`} />
                <div>
                  <span className="font-medium">{label}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Current user summary */}
          {user && (
            <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Connecte en tant que <strong className="text-gray-900 dark:text-white">{user.firstName} {user.lastName}</strong>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email} - {user.role} / {user.plan}</p>
            </div>
          )}

          {/* Language */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-600">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Langue</span>
            <div className="flex gap-1">
              <a href="/fr" className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">FR</a>
              <a href="/en" className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">EN</a>
            </div>
          </div>

          {/* Demo badge */}
          <div className="mt-3 rounded-lg bg-yellow-50 p-2 text-center text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Donnees fictives - aucune API reelle
          </div>
        </div>
      )}
    </>
  );
}
