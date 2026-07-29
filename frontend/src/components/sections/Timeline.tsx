import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../../config/event.config";

const Timeline: React.FC = () => {
  const items = EVENT_CONFIG.timeline;

  return (
    <section
      id="timeline"
      aria-label="Event timeline"
      className="section"
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64, position: "relative" }}
        >
          <span className="section-eyebrow">02 · Schedule</span>
          <h2
            className="display-lg"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--fg-1)", marginBottom: 12 }}
          >
            Event Timeline
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-2)" }}>
            Key milestones from registration to results.
          </p>
        </motion.div>

        {/* Timeline list — max 720px centered */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-56px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", gap: 24, paddingBottom: isLast ? 0 : 24 }}
              >
                {/* Left rail */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    width: 40,
                  }}
                >
                  {/* Mono number */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--blue-1)",
                      marginBottom: 8,
                      writingMode: "vertical-rl",
                      userSelect: "none",
                    }}
                    aria-hidden
                  >
                    {item.index}
                  </span>
                  {/* Node */}
                  <div className="timeline-node" aria-hidden />
                  {/* Connector */}
                  {!isLast && (
                    <div
                      aria-hidden
                      style={{
                        flex: 1,
                        width: 1,
                        marginTop: 8,
                        background:
                          "linear-gradient(to bottom, rgba(99,132,255,0.22), rgba(124,58,237,0.1))",
                        minHeight: 40,
                      }}
                    />
                  )}
                </div>

                {/* Event card */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="card card-glow"
                  style={{ flex: 1, padding: 24, marginBottom: isLast ? 0 : 4 }}
                >
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
                    {item.date}
                  </p>
                  <h3
                    className="display-md"
                    style={{ fontSize: "1rem", color: "var(--fg-1)", marginBottom: 8 }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--fg-2)" }}>
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
