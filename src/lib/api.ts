/**
 * api.ts — Typed API client for the WeJustice BFF.
 *
 * In DEMO mode: returns data from static JSON mocks.
 * In PROD mode: will call the real BFF endpoints (Next.js API routes → PHP backend).
 *
 * RULE: Components MUST import from here, NEVER from @/mocks/ directly.
 * Exception: static marketing content (site-settings, testimonials) can stay as JSON imports
 * because they don't come from the API in production either (they're CMS/static content).
 *
 * Mocks classification:
 * ─────────────────────
 * RUNTIME (will come from BFF/API in prod — must go through this client):
 *   - actions.json       → GET /api/actions, GET /api/actions/:slug
 *   - comments.json      → GET /api/actions/:slug/comments
 *   - user-activity.json → GET /api/me/dashboard
 *   - users.json         → GET /api/auth/me
 *   - blog.json          → GET /api/cms/articles (or headless CMS)
 *
 * STATIC MARKETING (stays as JSON imports, no API needed):
 *   - site-settings.json → howItWorks, socialLinks (hardcoded marketing content)
 *   - testimonials.json  → press quotes (hardcoded marketing content)
 */

import actionsData from "@/mocks/actions.json";
import blogData from "@/mocks/blog.json";
import commentsData from "@/mocks/comments.json";
import userActivityData from "@/mocks/user-activity.json";

// ─── Types ───

export type Action = (typeof actionsData)[number];
export type BlogArticle = (typeof blogData)[number];
export type CommentsMap = typeof commentsData;
export type Comment = CommentsMap[keyof CommentsMap][number];
export type UserActivity = typeof userActivityData;

// ─── API Client ───

/**
 * Typed API client.
 * In demo: reads from JSON mocks synchronously (wrapped in Promise for interface compat).
 * In prod: will fetch from BFF endpoints.
 */
export const api = {
  // ─── Actions ───

  async getActions(): Promise<Action[]> {
    return actionsData as Action[];
  },

  async getAction(idOrSlug: string): Promise<Action | null> {
    return (
      (actionsData as Action[]).find(
        (a) => a.id === idOrSlug || a.slug === idOrSlug
      ) ?? null
    );
  },

  // ─── Comments ───

  async getComments(actionSlug: string): Promise<Comment[]> {
    // In prod: GET /api/actions/:slug/comments
    const map = commentsData as Record<string, Comment[]>;
    return map[actionSlug] ?? [];
  },

  // ─── Blog ───

  async getBlogArticles(): Promise<BlogArticle[]> {
    return blogData as BlogArticle[];
  },

  async getBlogArticle(slug: string): Promise<BlogArticle | null> {
    return (
      (blogData as BlogArticle[]).find((a) => a.slug === slug) ?? null
    );
  },

  // ─── User / Account ───

  async getUserActivity(): Promise<UserActivity> {
    // In prod: GET /api/me/dashboard
    return userActivityData;
  },

  // ─── Mutations (demo: no-ops) ───

  async signAction(_actionSlug: string, _data: { email: string; firstName: string; lastName: string }): Promise<{ success: boolean }> {
    // In prod: POST /api/actions/:slug/signatures
    return { success: true };
  },

  async postComment(_actionSlug: string, _data: { content: string }): Promise<{ success: boolean }> {
    // In prod: POST /api/actions/:slug/comments
    return { success: true };
  },
};
