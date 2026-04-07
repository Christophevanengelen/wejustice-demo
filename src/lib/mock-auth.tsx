"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import usersData from "@/mocks/users.json";

// ─── Types (mirrors real AuthProvider interface) ───

export type UserRole = "admin" | "moderator" | "lawyer" | "publisher" | "user";
export type UserPlan = "free" | "level_1" | "level_2" | "member";
export type DemoRole = "anonymous" | "free" | "member" | "admin" | "lawyer";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  plan: UserPlan;
  country?: string | null;
  avatar?: string | null;
  avatarColor?: string | null;
  totalCredits?: number;
  grade?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPremium: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  // Demo-specific
  demoRole: DemoRole;
  setDemoRole: (role: DemoRole) => void;
}

const MOCK_USERS: Record<DemoRole, AuthUser | null> = {
  anonymous: null,
  free: usersData.free as AuthUser,
  member: usersData.member as AuthUser,
  admin: usersData.admin as AuthUser,
  lawyer: usersData.lawyer as AuthUser,
};

// ─── Context ───

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ───

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [demoRole, setDemoRole] = useState<DemoRole>("member");

  const user = MOCK_USERS[demoRole];
  const isAuthenticated = user !== null;
  const isPremium = user?.plan === "member" || user?.plan === "level_2";

  const login = useCallback(async () => {
    setDemoRole("member");
  }, []);

  const logout = useCallback(async () => {
    setDemoRole("anonymous");
  }, []);

  const checkAuth = useCallback(async () => {
    // No-op in demo
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        isAuthenticated,
        isPremium,
        login,
        logout,
        checkAuth,
        demoRole,
        setDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hooks (same API as real project) ───

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within MockAuthProvider");
  return ctx;
}

export function useAuthSafe() {
  const ctx = useContext(AuthContext);
  return {
    user: ctx?.user ?? null,
    isLoading: ctx?.isLoading ?? false,
    isAuthenticated: ctx?.isAuthenticated ?? false,
    isPremium: ctx?.isPremium ?? false,
    canFetch: true,
  };
}
