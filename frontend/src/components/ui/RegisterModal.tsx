import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, CheckCircle2, Loader2, UserPlus } from "lucide-react";
import Modal from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import type { RegisterFormData } from "../../types";
import { EVENT_CONFIG } from "../../config/event.config";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "PG 1st Year", "PG 2nd Year"];

const passwordRules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "Number", test: (v: string) => /\d/.test(v) },
  { label: "Special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ mode: "onChange" });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser(data);
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string } } };
      setServerError(
        axiosErr?.response?.data?.detail ?? "Registration failed. Please try again."
      );
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setServerError(null);
      setIsSuccess(false);
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Register for ${EVENT_CONFIG.name}`}>
      {/* ── Success State ──────────────────────────────────────── */}
      {isSuccess ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "32px 0", textAlign: "center" }}>
          <div
            style={{
              width: 64, height: 64,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircle2 size={32} color="#4ade80" />
          </div>
          <h3 className="display-md" style={{ fontSize: "1.25rem", color: "var(--fg-1)" }}>
            Registration Successful!
          </h3>
          <p style={{ color: "var(--fg-2)" }}>
            Welcome to {EVENT_CONFIG.name}! You can now sign in with your credentials.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Server error */}
          {serverError && (
            <div
              style={{
                padding: 14,
                borderRadius: 12,
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
                fontSize: "0.875rem",
              }}
              role="alert"
            >
              {serverError}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="reg-fullname" className="field-label">Full Name</label>
            <input
              id="reg-fullname"
              type="text"
              placeholder="Your full name"
              className={`field-input ${errors.full_name ? "error-state" : ""}`}
              {...register("full_name", { required: "Full name is required" })}
            />
            {errors.full_name && <p className="field-error">{errors.full_name.message}</p>}
          </div>

          {/* College */}
          <div>
            <label htmlFor="reg-college" className="field-label">College / Institution</label>
            <input
              id="reg-college"
              type="text"
              placeholder="Your college name"
              className={`field-input ${errors.college ? "error-state" : ""}`}
              {...register("college", { required: "College is required" })}
            />
            {errors.college && <p className="field-error">{errors.college.message}</p>}
          </div>

          {/* Department + Year */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label htmlFor="reg-dept" className="field-label">Department</label>
              <input
                id="reg-dept"
                type="text"
                placeholder="e.g. CSE"
                className={`field-input ${errors.department ? "error-state" : ""}`}
                {...register("department", { required: "Department is required" })}
              />
              {errors.department && <p className="field-error">{errors.department.message}</p>}
            </div>
            <div>
              <label htmlFor="reg-year" className="field-label">Year</label>
              <select
                id="reg-year"
                className={`field-input ${errors.year ? "error-state" : ""}`}
                style={{ appearance: "none" }}
                {...register("year", { required: "Year is required" })}
              >
                <option value="">Select</option>
                {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <p className="field-error">{errors.year.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="field-label">Email Address</label>
            <input
              id="reg-email"
              type="email"
              placeholder="you@college.edu"
              className={`field-input ${errors.email ? "error-state" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="reg-password" className="field-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className={`field-input ${errors.password ? "error-state" : ""}`}
                style={{ paddingRight: 48 }}
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    length: (v) => v.length >= 8 || "At least 8 characters",
                    upper: (v) => /[A-Z]/.test(v) || "Needs uppercase",
                    lower: (v) => /[a-z]/.test(v) || "Needs lowercase",
                    number: (v) => /\d/.test(v) || "Needs a number",
                    special: (v) => /[^A-Za-z0-9]/.test(v) || "Needs a special character",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--fg-3)",
                  cursor: "pointer",
                  padding: 4,
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password strength indicators */}
            {passwordValue && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}>
                {passwordRules.map((rule) => {
                  const passed = rule.test(passwordValue);
                  return (
                    <div key={rule.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                          background: passed ? "#4ade80" : "var(--fg-3)",
                        }}
                      />
                      <span style={{ fontSize: "0.75rem", color: passed ? "#4ade80" : "var(--fg-3)" }}>
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {errors.password && <p className="field-error">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="reg-confirm" className="field-label">Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="reg-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                className={`field-input ${errors.confirm_password ? "error-state" : ""}`}
                style={{ paddingRight: 48 }}
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (v) => v === passwordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--fg-3)",
                  cursor: "pointer",
                  padding: 4,
                }}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="field-error">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            id="reg-submit-btn"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 8, opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden />
                Registering…
              </>
            ) : (
              <>
                <UserPlus size={18} aria-hidden />
                Create Account
              </>
            )}
          </button>

          {/* Switch to login */}
          <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: "0.875rem", paddingTop: 4 }}>
            Already registered?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={{
                background: "none",
                border: "none",
                color: "#93a8ff",
                fontWeight: 500,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Sign In
            </button>
          </p>
        </form>
      )}
    </Modal>
  );
};

export default RegisterModal;
