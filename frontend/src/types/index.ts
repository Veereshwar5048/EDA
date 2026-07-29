// ── Auth Types ────────────────────────────────────────────────
export interface User {
  id: string;
  full_name: string;
  college: string;
  department: string;
  year: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ── Form Types ────────────────────────────────────────────────
export interface RegisterFormData {
  full_name: string;
  college: string;
  department: string;
  year: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// ── API Response Types ────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

// ── Config Types ──────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
}
