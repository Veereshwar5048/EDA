import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { EVENT_CONFIG } from "../../config/event.config";

const CONTACT_ITEMS = [
  { icon: Mail,    label: "Email",    key: "email"    as const },
  { icon: Phone,   label: "Phone",    key: "phone"    as const },
  { icon: MapPin,  label: "Location", key: "location" as const },
] as const;

const Contact: React.FC = () => {
  const { contact, name } = EVENT_CONFIG;

  const getHref = (key: typeof CONTACT_ITEMS[number]["key"]) => {
    if (key === "email")    return `mailto:${contact.email}`;
    if (key === "phone")    return `tel:${contact.phone}`;
    return undefined;
  };

  const getValue = (key: typeof CONTACT_ITEMS[number]["key"]) => {
    if (key === "email")    return contact.email;
    if (key === "phone")    return contact.phone;
    return contact.location;
  };

  return (
    <section
      id="contact"
      aria-label="Contact information"
      className="section"
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      {/* Ambient blob */}
      <div
        aria-hidden
        className="blob"
        style={{
          width: 440, height: 440,
          bottom: "5%", right: "-4%",
          background: "radial-gradient(circle, rgba(61,95,252,0.07) 0%, transparent 70%)",
          animation: "blob-drift 13s ease-in-out infinite",
        }}
      />

      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-eyebrow">05 · Contact</span>
          <h2
            className="display-lg"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--fg-1)", marginBottom: 12 }}
          >
            Get in Touch
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-2)" }}>
            Have a question? Reach us through any channel below.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 20, marginBottom: 48 }}
        >
          {CONTACT_ITEMS.map(({ icon: Icon, label, key }, i) => {
            const href  = getHref(key);
            const value = getValue(key);

            return (
              <motion.article
                key={label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-56px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="card card-glow"
                style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Icon container */}
                <div
                  aria-hidden
                  style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(99,132,255,0.09)",
                    border: "1px solid rgba(99,132,255,0.2)",
                    color: "#93a8ff",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--fg-3)",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        color: "var(--fg-1)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--fg-1)", lineHeight: 1.5 }}>
                      {value}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-56px" }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: 20,
            padding: "48px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(61,95,252,0.1) 0%, rgba(124,58,237,0.1) 100%)",
            border: "1px solid rgba(99,132,255,0.2)",
          }}
        >
          <div className="grid-overlay" aria-hidden style={{ borderRadius: 20, opacity: 0.6 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              className="font-mono"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--blue-1)",
                marginBottom: 12,
              }}
            >
              Not every problem fits in a box
            </p>
            <h3
              className="display-lg"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--fg-1)", marginBottom: 12 }}
            >
              Ready to compete in{" "}
              <span className="grad-text">{name}</span>?
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "var(--fg-2)", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
              Register now and receive the dataset release notification directly in your inbox.
            </p>
            <a href={`mailto:${contact.email}`} className="btn-arrow" aria-label={`Email us at ${contact.email}`}>
              <span>{contact.email}</span>
              <ArrowRight size={15} className="arrow" aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
