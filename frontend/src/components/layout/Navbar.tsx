import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, LayoutDashboard, LogOut } from "lucide-react";
import { EVENT_CONFIG } from "../../config/event.config";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isAuthenticated, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === "/";

  /* ── Scroll detection ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ──────────────── */
  useEffect(() => {
    if (!isHome) return;
    const ids = EVENT_CONFIG.navLinks.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveSection(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  /* ── Smooth scroll handler ────────────────────────────────── */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!isHome) {
      navigate("/", { state: { scrollTo: href } });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── Cross-route scroll-to on mount ──────────────────────── */
  useEffect(() => {
    if (isHome && location.state?.scrollTo) {
      const target = location.state.scrollTo as string;
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [isHome, location.state]);

  /* ── Lock body scroll when drawer is open ─────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ══ Sticky Nav ════════════════════════════════════════ */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background:     scrolled ? "rgba(2,4,8,0.84)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)"        : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:   scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition:     "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: 72 }}>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center no-underline"
              style={{ gap: 10 }}
              aria-label={`${EVENT_CONFIG.name} home`}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #3d5ffc, #7c3aed)",
                }}
              >
                <Zap size={17} color="#fff" strokeWidth={2.5} aria-hidden />
              </div>
              <span
                className="font-display font-bold text-white"
                style={{ fontSize: "1.125rem", letterSpacing: "-0.02em" }}
              >
                {EVENT_CONFIG.name}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center" style={{ gap: 4 }}>
              {EVENT_CONFIG.navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative font-medium transition-colors"
                    style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      fontSize: "0.875rem",
                      color: isActive ? "var(--fg-1)" : "var(--fg-2)",
                      textDecoration: "none",
                    }}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0"
                        style={{ background: "rgba(255,255,255,0.065)", borderRadius: 8 }}
                        transition={{ type: "spring", bounce: 0.22, duration: 0.38 }}
                        aria-hidden
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Desktop auth */}
            <div className="hidden lg:flex items-center" style={{ gap: 8 }}>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-outline btn-sm" style={{ gap: 6 }}>
                    <LayoutDashboard size={14} aria-hidden /> Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="btn btn-outline btn-sm"
                    style={{ gap: 6 }}
                    aria-label="Sign out"
                  >
                    <LogOut size={14} aria-hidden /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="nav-signin-btn"
                    onClick={onLoginClick}
                    className="btn btn-outline btn-sm"
                  >
                    Sign In
                  </button>
                  <button
                    id="nav-register-btn"
                    onClick={onRegisterClick}
                    className="btn btn-primary btn-sm"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col items-center justify-center"
              style={{
                width: 40, height: 40,
                borderRadius: 8,
                background: menuOpen ? "rgba(255,255,255,0.07)" : "transparent",
                border: "1px solid",
                borderColor: menuOpen ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "background 0.2s ease, border-color 0.2s ease",
                cursor: "pointer",
                gap: 5,
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                className="block bg-current rounded"
                style={{ width: 18, height: 2, color: "var(--fg-2)" }}
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block bg-current rounded"
                style={{ width: 14, height: 2, color: "var(--fg-2)" }}
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                className="block bg-current rounded"
                style={{ width: 18, height: 2, color: "var(--fg-2)" }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ══ Mobile drawer ════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(2,4,8,0.72)", backdropFilter: "blur(8px)" }}
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col"
              style={{
                width: 280,
                background: "#07101e",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between"
                style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="font-display font-bold text-white" style={{ fontSize: "1rem" }}>
                  {EVENT_CONFIG.name}
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer" }}
                  aria-label="Close menu"
                >
                  <X size={18} color="var(--fg-2)" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto" style={{ padding: "16px 16px 0" }}>
                {EVENT_CONFIG.navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center font-medium"
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      marginBottom: 4,
                      color: "var(--fg-2)",
                      textDecoration: "none",
                      fontSize: "0.9375rem",
                      minHeight: 48,
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.color = "var(--fg-1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--fg-2)";
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer auth */}
              <div style={{ padding: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 10 }}>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="btn btn-outline" style={{ justifyContent: "center" }}>
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-outline" style={{ justifyContent: "center" }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { onLoginClick(); setMenuOpen(false); }} className="btn btn-outline" style={{ justifyContent: "center" }}>
                      Sign In
                    </button>
                    <button onClick={() => { onRegisterClick(); setMenuOpen(false); }} className="btn btn-primary" style={{ justifyContent: "center" }}>
                      Register Now
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
