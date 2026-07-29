import { Zap, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EVENT_CONFIG } from "../../config/event.config";

/* ── Inline SVG social icons ────────────────────────────────── */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  twitter: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

const Footer: React.FC = () => {
  const { contact, navLinks, name, organizer, year } = EVENT_CONFIG;

  return (
    <footer
      style={{
        borderTop: "1px solid var(--glass-border)",
        background: "var(--bg-0)",
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 48, paddingTop: 80, paddingBottom: 64 }}
        >
          {/* Brand column */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center no-underline"
              style={{ gap: 10, marginBottom: 16 }}
              aria-label={`${name} home`}
            >
              <div
                style={{
                  width: 32, height: 32,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #3d5ffc, #7c3aed)",
                  flexShrink: 0,
                }}
              >
                <Zap size={15} color="#fff" strokeWidth={2.5} aria-hidden />
              </div>
              <span
                className="font-display font-bold text-white"
                style={{ fontSize: "1.0625rem", letterSpacing: "-0.02em" }}
              >
                {name}
              </span>
            </Link>

            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "var(--fg-2)",
                maxWidth: 280,
                marginBottom: 24,
              }}
            >
              Machine Learning Prediction Challenge by the {organizer}. Compete, iterate, and win.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8 }}>
              {Object.entries(contact.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on ${platform}`}
                  style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--fg-3)",
                    transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color        = "var(--fg-1)";
                    el.style.background   = "rgba(99,132,255,0.09)";
                    el.style.borderColor  = "rgba(99,132,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color        = "var(--fg-3)";
                    el.style.background   = "rgba(255,255,255,0.04)";
                    el.style.borderColor  = "var(--glass-border)";
                  }}
                >
                  {SOCIAL_ICONS[platform] ?? <ArrowUpRight size={13} />}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                marginBottom: 20,
              }}
            >
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--fg-2)",
                        textDecoration: "none",
                        display: "inline-block",
                        padding: "4px 0",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--fg-1)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-2)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                marginBottom: 20,
              }}
            >
              Contact
            </p>
            <div className="data-table">
              <div className="data-row">
                <span className="data-key">Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="data-val"
                  style={{ textDecoration: "none", color: "var(--fg-2)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
                >
                  {contact.email}
                </a>
              </div>
              <div className="data-row">
                <span className="data-key">Phone</span>
                <span className="data-val">{contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="divider" />
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ gap: 8, paddingTop: 24, paddingBottom: 32 }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--fg-3)" }}>
            © {year} {organizer} · {name}
          </p>
          <p
            className="font-mono"
            style={{ fontSize: "0.75rem", color: "var(--fg-4)", letterSpacing: "0.06em" }}
          >
            ML Prediction Challenge
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
