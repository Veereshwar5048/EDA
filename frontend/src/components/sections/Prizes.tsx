import { motion } from "framer-motion";
import { Trophy, Check } from "lucide-react";
import { EVENT_CONFIG } from "../../config/event.config";

const ACCENT: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  blue:   { border: "rgba(99,132,255,0.3)",  glow: "rgba(99,132,255,0.1)",   text: "#93a8ff",  bg: "rgba(99,132,255,0.06)"  },
  purple: { border: "rgba(124,58,237,0.3)",  glow: "rgba(124,58,237,0.08)",  text: "#c4b5fd",  bg: "rgba(124,58,237,0.06)"  },
  indigo: { border: "rgba(79,70,229,0.28)",  glow: "rgba(79,70,229,0.07)",   text: "#a5b4fc",  bg: "rgba(79,70,229,0.05)"   },
};

const Prizes: React.FC = () => (
  <section
    id="prizes"
    aria-label="Prizes and recognition"
    className="section"
    style={{ borderTop: "1px solid var(--glass-border)" }}
  >
    {/* Ambient blob */}
    <div
      aria-hidden
      className="blob"
      style={{
        width: 400, height: 400,
        top: "8%", right: "0%",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        animation: "blob-drift 15s ease-in-out infinite",
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
        <span className="section-eyebrow">03 · Rewards</span>
        <h2
          className="display-lg"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--fg-1)", marginBottom: 12 }}
        >
          Prizes &amp; Recognition
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--fg-2)" }}>
          Total prize pool:{" "}
          <strong style={{ color: "var(--fg-1)", fontWeight: 700 }}>₹50,000</strong>
        </p>
      </motion.div>

      {/* Prize cards — 3 columns, equal width */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 20, maxWidth: 960, margin: "0 auto" }}
      >
        {EVENT_CONFIG.prizes.map((prize, i) => {
          const colors = ACCENT[prize.accent] ?? ACCENT.blue;
          const isFirst = i === 0;

          return (
            <motion.article
              key={prize.rank}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-56px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="card"
              aria-label={`${prize.rank}: ${prize.amount}`}
              style={{
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                borderColor: isFirst ? colors.border : "var(--glass-border)",
                background: isFirst
                  ? `linear-gradient(145deg, ${colors.bg} 0%, var(--glass-bg) 100%)`
                  : "var(--glass-bg)",
                boxShadow: isFirst ? `0 0 48px ${colors.glow}` : "none",
              }}
            >
              {/* Trophy + rank */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--fg-3)",
                      marginBottom: 8,
                    }}
                  >
                    {prize.rank}
                  </p>
                  <div className="stat-num-lg" aria-label={prize.amount}>
                    {prize.amount}
                  </div>
                </div>

                <div
                  style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <Trophy size={18} color={colors.text} />
                </div>
              </div>

              {/* Perks list */}
              <ul
                style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}
                aria-label="Perks"
              >
                {prize.perks.map((perk) => (
                  <li
                    key={perk}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 18, height: 18,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Check size={10} color={colors.text} strokeWidth={2.5} />
                    </span>
                    <span style={{ fontSize: "0.875rem", color: "var(--fg-2)" }}>{perk}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Prizes;
