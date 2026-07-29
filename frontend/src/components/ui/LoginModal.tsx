import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import type { LoginFormData } from "../../types";
import { EVENT_CONFIG } from "../../config/event.config";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ mode: "onChange" });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await login(data);
      reset();
      onClose();
      navigate("/dashboard");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string } } };
      setServerError(
        axiosErr?.response?.data?.detail ?? "Invalid email or password."
      );
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setServerError(null);
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Sign In to ${EVENT_CONFIG.name}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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

        {/* Email */}
        <div>
          <label htmlFor="login-email" className="field-label">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@college.edu"
            className={`field-input ${errors.email ? "error-state" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="login-password" className="field-label">Password</label>
          <div style={{ position: "relative" }}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className={`field-input ${errors.password ? "error-state" : ""}`}
              style={{ paddingRight: 48 }}
              {...register("password", { required: "Password is required" })}
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
          {errors.password && <p className="field-error">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          id="login-submit-btn"
          className="btn btn-primary"
          style={{ width: "100%", opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden />
              Signing In…
            </>
          ) : (
            <>
              <LogIn size={18} aria-hidden />
              Sign In
            </>
          )}
        </button>

        {/* Switch to register */}
        <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: "0.875rem" }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            style={{
              background: "none",
              border: "none",
              color: "#93a8ff",
              fontWeight: 500,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Register Now
          </button>
        </p>
      </form>
    </Modal>
  );
};

export default LoginModal;
