import { motion } from "framer-motion";
import {
  Download,
  FileText,
  LogOut,
  User,
  Zap,
  BookOpen,
  Database,
  ExternalLink,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EVENT_CONFIG } from "../config/event.config";

const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/* ── Shared card style ──────────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  background: "var(--glass-bg)",
  border: "1px solid var(--glass-border)",
  borderRadius: 16,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};

/* ── Entrance animation factory ─────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  /* ── Guards ─────────────────────────────────────────────── */
  if (!isLoading && !isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 32, height: 32,
            border: "2px solid var(--blue-1)",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.75s linear infinite",
          }}
          role="status"
          aria-label="Loading"
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate("/"); };

  /* ── Download cards config ──────────────────────────────── */
  const downloadCards = [
    {
      id: "download-dataset",
      label: "Competition Dataset",
      description: "Official dataset files for all problem statements",
      icon: <Database size={20} aria-hidden />,
      href: `${BACKEND_URL}${EVENT_CONFIG.downloads.dataset}`,
      iconBg: "rgba(99,132,255,0.1)",
      iconColor: "#93a8ff",
      iconBorder: "rgba(99,132,255,0.2)",
    },
    {
      id: "download-rulebook",
      label: "Rulebook & Guidelines",
      description: "Rules, evaluation criteria, and submission format",
      icon: <FileText size={20} aria-hidden />,
      href: `${BACKEND_URL}${EVENT_CONFIG.downloads.rulebook}`,
      iconBg: "rgba(124,58,237,0.1)",
      iconColor: "#c4b5fd",
      iconBorder: "rgba(124,58,237,0.2)",
    },
  ];

  const quickLinks = [
    {
      id: "dashboard-problems-link",
      label: "Problem Statements",
      sub: "View all challenges",
      icon: <BookOpen size={18} aria-hidden />,
      iconBg: "rgba(99,132,255,0.1)",
      iconColor: "#93a8ff",
      iconBorder: "rgba(99,132,255,0.2)",
      onClick: () => navigate("/", { state: { scrollTo: "#problem-statements" } }),
      href: undefined,
    },
    {
      id: "dashboard-contact-link",
      label: "Contact Organizers",
      sub: EVENT_CONFIG.contact.email,
      icon: <Mail size={18} aria-hidden />,
      iconBg: "rgba(124,58,237,0.1)",
      iconColor: "#c4b5fd",
      onClick: undefined,
      href: `mailto:${EVENT_CONFIG.contact.email}`,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background decoration */}
      <div className="grid-overlay" aria-hidden />
      <div
        aria-hidden
        className="blob"
        style={{
          width: 400, height: 400,
          top: "-5%", right: "0%",
          background: "radial-gradient(circle, rgba(61,95,252,0.09) 0%, transparent 70%)",
          animation: "blob-drift 14s ease-in-out infinite",
          position: "fixed",
        }}
      />
      <div
        aria-hidden
        className="blob"
        style={{
          width: 360, height: 360,
          bottom: "10%", left: "-5%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          animation: "blob-drift 18s ease-in-out infinite",
          animationDelay: "-4s",
          position: "fixed",
        }}
      />

      {/* ── Top bar ─────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid var(--glass-border)",
          background: "rgba(2,4,8,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <Link
            to="/"
            className="inline-flex items-center no-underline"
            style={{ gap: 10 }}
            aria-label={`${EVENT_CONFIG.name} home`}
          >
            <div
              style={{
                width: 36, height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #3d5ffc, #7c3aed)",
              }}
            >
              <Zap size={16} color="#fff" strokeWidth={2.5} aria-hidden />
            </div>
            <span
              className="font-display font-bold text-white"
              style={{ fontSize: "1.0625rem", letterSpacing: "-0.02em" }}
            >
              {EVENT_CONFIG.name}
            </span>
          </Link>

          <button
            id="dashboard-logout-btn"
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ gap: 8 }}
            aria-label="Sign out of your account"
          >
            <LogOut size={14} aria-hidden />
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────── */}
      <main
        className="container"
        style={{ paddingTop: 64, paddingBottom: 96, position: "relative", zIndex: 1 }}
      >
        {/* ── Welcome header ─────────────────────────────────── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div
              aria-hidden
              style={{
                width: 48, height: 48,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(99,132,255,0.1)",
                border: "1px solid rgba(99,132,255,0.2)",
                flexShrink: 0,
              }}
            >
              <User size={22} color="#93a8ff" />
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "var(--fg-3)", marginBottom: 2 }}>
                Welcome back,
              </p>
              <h1
                className="display-lg"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--fg-1)" }}
              >
                {user?.full_name}
              </h1>
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 100,
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.18)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 7, height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#4ade80" }}>
              Registered for{" "}
              <span className="grad-text-blue">{EVENT_CONFIG.name}</span>
            </span>
          </div>
        </motion.div>

        {/* ── Profile card ───────────────────────────────────── */}
        <motion.section {...fadeUp(0.08)} style={{ marginBottom: 32 }} aria-label="Your profile">
          <h2
            className="display-md"
            style={{ fontSize: "1rem", color: "var(--fg-1)", marginBottom: 20 }}
          >
            Profile
          </h2>
          <div style={{ ...cardStyle, padding: 24 }}>
            <div
              className="grid grid-cols-2 sm:grid-cols-4"
              style={{ gap: 24 }}
            >
              {[
                { label: "Full Name",   value: user?.full_name   },
                { label: "College",     value: user?.college     },
                { label: "Department",  value: user?.department  },
                { label: "Year",        value: user?.year        },
              ].map((field) => (
                <div key={field.label}>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--fg-3)",
                      marginBottom: 6,
                    }}
                  >
                    {field.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "var(--fg-1)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={field.value ?? "—"}
                  >
                    {field.value ?? "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Email — full-width row */}
            <div style={{ borderTop: "1px solid var(--glass-border)", marginTop: 20, paddingTop: 20 }}>
              <p
                className="font-mono"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg-3)",
                  marginBottom: 6,
                }}
              >
                Email
              </p>
              <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--fg-1)" }}>
                {user?.email}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Downloads ──────────────────────────────────────── */}
        <motion.section {...fadeUp(0.14)} style={{ marginBottom: 32 }} aria-label="Resources and downloads">
          <h2
            className="display-md"
            style={{ fontSize: "1rem", color: "var(--fg-1)", marginBottom: 20 }}
          >
            Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
            {downloadCards.map((card) => (
              <motion.a
                key={card.id}
                id={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  ...cardStyle,
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textDecoration: "none",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,132,255,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "var(--glass-bg-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--glass-bg)";
                }}
                aria-label={card.label}
              >
                <div
                  aria-hidden
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: card.iconBg,
                    border: `1px solid ${card.iconBorder}`,
                    color: card.iconColor,
                    flexShrink: 0,
                    transition: "transform 0.2s ease",
                  }}
                >
                  {card.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--fg-1)", marginBottom: 2 }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--fg-3)" }}>{card.description}</p>
                </div>
                <Download size={16} color="var(--fg-3)" aria-hidden style={{ flexShrink: 0 }} />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* ── Quick Links ────────────────────────────────────── */}
        <motion.section {...fadeUp(0.2)} aria-label="Quick links">
          <h2
            className="display-md"
            style={{ fontSize: "1rem", color: "var(--fg-1)", marginBottom: 20 }}
          >
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
            {quickLinks.map((ql) => {
              const commonStyle: React.CSSProperties = {
                ...cardStyle,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
                textDecoration: "none",
                cursor: "pointer",
                transition: "border-color 0.25s ease, background 0.25s ease",
              };
              const inner = (
                <>
                  <div
                    aria-hidden
                    style={{
                      width: 44, height: 44,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: ql.iconBg,
                      border: `1px solid ${ql.iconBorder ?? "transparent"}`,
                      color: ql.iconColor,
                      flexShrink: 0,
                    }}
                  >
                    {ql.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--fg-1)", marginBottom: 2 }}>
                      {ql.label}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--fg-3)" }}>{ql.sub}</p>
                  </div>
                  <ExternalLink size={15} color="var(--fg-3)" aria-hidden />
                </>
              );

              return ql.onClick ? (
                <motion.button
                  key={ql.id}
                  id={ql.id}
                  onClick={ql.onClick}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{ ...commonStyle, border: "1px solid var(--glass-border)", background: "var(--glass-bg)", textAlign: "left" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,132,255,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "var(--glass-bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--glass-bg)";
                  }}
                  aria-label={ql.label}
                >
                  {inner}
                </motion.button>
              ) : (
                <motion.a
                  key={ql.id}
                  id={ql.id}
                  href={ql.href}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={commonStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "var(--glass-bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--glass-bg)";
                  }}
                  aria-label={ql.label}
                >
                  {inner}
                </motion.a>
              );
            })}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Dashboard;
