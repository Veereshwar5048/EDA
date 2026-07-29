import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, AuthState, LoginFormData, RegisterFormData } from "../types";
import api from "../utils/api";

// ── Context Shape ─────────────────────────────────────────────
interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ──────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("xyz_token");
    const userStr = localStorage.getItem("xyz_user");
    if (token && userStr) {
      try {
        const user: User = JSON.parse(userStr);
        setState({ user, token, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem("xyz_token");
        localStorage.removeItem("xyz_user");
        setState((s) => ({ ...s, isLoading: false }));
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);

    const res = await api.post("/api/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, user } = res.data;
    localStorage.setItem("xyz_token", access_token);
    localStorage.setItem("xyz_user", JSON.stringify(user));
    setState({ user, token: access_token, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(async (data: RegisterFormData) => {
    const { confirm_password, ...payload } = data;
    void confirm_password; // validated in form, not sent to API
    await api.post("/api/auth/register", payload);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("xyz_token");
    localStorage.removeItem("xyz_user");
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
