import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EVENT_CONFIG } from "../../config/event.config";

const About: React.FC = () => {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { about } = EVENT_CONFIG;

  const fadeIn = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const cardReveal = (delay = 0) => ({
    initial:    { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="about"
      aria-label="About the event"
      className="section"
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      {/* Ambient blob */}
      <div
        aria-hidden
        className="blob"
        style={{
          width: 400, height: 400,
          top: "10%", right: "5%",
          background: "radial-gradient(circle, rgba(61,95,252,0.07) 0%, transparent 70%)",
          animation: "blob-drift 14s ease-in-out infinite",
        }}
      />

      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{ gap: 64 }}
          ref={ref}
        >
          {/* ── Left: header + data table ───────────────────── */}
          <div>
            <motion.span {...fadeIn(0)} className="section-eyebrow">
              00 · About the Event
            </motion.span>

            <motion.h2
              {...fadeIn(0.08)}
              className="display-lg"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--fg-1)", marginBottom: 16 }}
            >
              {about.heading}
            </motion.h2>

            <motion.p
              {...fadeIn(0.16)}
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--fg-2)",
                marginBottom: 32,
                maxWidth: 520,
              }}
            >
              {about.body}
            </motion.p>

            <motion.div {...fadeIn(0.24)} className="data-table">
              {about.specs.map((row) => (
                <div key={row.key} className="data-row">
                  <span className="data-key">{row.key}</span>
                  <span className="data-val">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 2×2 cards ─────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
            {EVENT_CONFIG.whyParticipate.map((item, i) => (
              <motion.article
                key={item.number}
                {...cardReveal(i * 0.09)}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="card card-glow"
                style={{ padding: 24 }}
                aria-label={item.title}
              >
                <div
                  className="font-mono font-bold"
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.14em",
                    color: "var(--blue-1)",
                    marginBottom: 16,
                  }}
                >
                  {item.number}
                </div>
                <h3
                  className="display-md"
                  style={{ fontSize: "1rem", color: "var(--fg-1)", marginBottom: 8 }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--fg-2)" }}>
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
