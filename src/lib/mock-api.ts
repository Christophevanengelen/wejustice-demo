/**
 * Mock API - drop-in replacement for djangoApi.
 *
 * Reads from static JSON files in mocks/.
 * Mutations are logged to console (no persistence).
 */

import actionsData from "@/mocks/actions.json";
import siteSettingsData from "@/mocks/site-settings.json";
import testimonialsData from "@/mocks/testimonials.json";

// Simulated network latency (ms)
const LATENCY = 80;

async function delay(ms: number = LATENCY): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

type MockAction = (typeof actionsData)[number];

// ─── Route matching ───

function matchRoute(path: string): unknown {
  const clean = path.replace(/^\//, "").replace(/\/$/, "");

  // GET /actions/
  if (clean === "actions" || clean === "actions/") {
    return actionsData;
  }

  // GET /actions/:id/
  const actionMatch = clean.match(/^actions\/([^/]+)\/?$/);
  if (actionMatch) {
    const id = actionMatch[1];
    return (actionsData as MockAction[]).find(
      (a) => a.id === id || a.slug === id
    ) ?? null;
  }

  // GET /site-settings/
  if (clean === "site-settings" || clean.startsWith("site-settings")) {
    return siteSettingsData;
  }

  // GET /testimonials/
  if (clean === "testimonials" || clean.startsWith("testimonials")) {
    return testimonialsData;
  }

  // GET /auth/me/
  if (clean === "auth/me" || clean === "auth/me/") {
    // Returns null - auth is handled by MockAuthProvider
    return null;
  }

  // GET /notifications/
  if (clean === "notifications" || clean.startsWith("notifications")) {
    return [];
  }

  // GET /auth/user-state/
  if (clean.startsWith("auth/user-state")) {
    return {
      signedActions: ["dejavu-transparence-vaccins", "ultimatum-linky-refus"],
      totalSignatures: 2,
      participations: [],
      favorites: ["phonegate-ondes-ill\u00E9gales"],
    };
  }

  console.warn(`[mock-api] No mock for: ${path}`);
  return null;
}

// ─── Public API (same interface as djangoApi) ───

export const mockApi = {
  async get<T>(path: string): Promise<T> {
    await delay();
    const data = matchRoute(path);
    return data as T;
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    await delay();
    console.log("[mock-api] POST", path, body);

    // Simulate quick-sign
    if (path.includes("quick-sign")) {
      return { success: true, message: "Signature enregistree (demo)" } as T;
    }

    return { success: true } as T;
  },

  async patch<T>(path: string, body?: unknown): Promise<T> {
    await delay();
    console.log("[mock-api] PATCH", path, body);
    return { success: true } as T;
  },

  async put<T>(path: string, body?: unknown): Promise<T> {
    await delay();
    console.log("[mock-api] PUT", path, body);
    return { success: true } as T;
  },

  async del(path: string): Promise<void> {
    await delay();
    console.log("[mock-api] DELETE", path);
  },
};
