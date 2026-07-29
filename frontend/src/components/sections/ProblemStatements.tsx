import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../../config/event.config";
import type { ProblemStatement } from "../../config/event.config";
import OwlGuide from "../mascot/OwlGuide";

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner:     "badge badge-green",
  Intermediate: "badge badge-amber",
  Advanced:     "badge badge-red",
};

const CAT_COLOR: Record<string, string> = {
  Regression:        "#6384ff",
  Classification:    "#a78bfa",
  "Anomaly Detection": "#f87171",
  "Time Series":     "#22d3ee",
};

const ProblemCard: React.FC<{ ps: ProblemStatement; index: number }> = ({ ps, index }) => {
  const dotColor = CAT_COLOR[ps.category] ?? "#6384ff";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="card card-glow"
      style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}
      aria-label={`Problem ${ps.id}: ${ps.title}`}
    >
      {/* Top row: category + difficulty */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: dotColor,
              boxShadow: `0 0 8px ${dotColor}60`,
              flexShrink: 0,
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-3)",
            }}
          >
            {ps.category}
          </span>
        </div>
        <span className={DIFFICULTY_BADGE[ps.difficulty] ?? "badge"}>
          {ps.difficulty}
        </span>
      </div>

      {/* Index + Title */}
      <div>
        <p
          className="font-mono"
          style={{ fontSize: "0.6875rem", color: "var(--fg-4)", marginBottom: 6 }}
          aria-hidden
        >
          {ps.id < 10 ? `_0${ps.id}` : `_${ps.id}`}
        </p>
        <h3
          className="display-md"
          style={{ fontSize: "1.125rem", color: "var(--fg-1)" }}
        >
          {ps.title}
        </h3>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--fg-2)", flex: 1 }}>
        {ps.description}
      </p>

      {/* Data table */}
      <div className="data-table">
        {ps.specs.map((row) => (
          <div key={row.key} className="data-row">
            <span className="data-key">{row.key}</span>
            <span className="data-val">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {ps.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </motion.article>
  );
};

const ProblemStatements: React.FC = () => (
  <section
    id="problem-statements"
    aria-label="Problem statements"
    className="section"
    style={{ borderTop: "1px solid var(--glass-border)" }}
  >
    <div
      aria-hidden
      className="blob"
      style={{
        width: 480, height: 480,
        top: "15%", left: "-6%",
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        animation: "blob-drift 18s ease-in-out infinite",
      }}
    />

    <div className="container">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 64, position: "relative" }}
      >
        <div style={{ position: "absolute", top: -80, right: "10%" }}>
          <OwlGuide size={90} variant="idle" />
        </div>
        <span className="section-eyebrow">01 · Challenges</span>
        <h2
          className="display-lg"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--fg-1)", marginBottom: 12 }}
        >
          Problem Statements
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--fg-2)", maxWidth: 480 }}>
          Four domains. One leaderboard. Choose your challenge.
        </p>
      </motion.div>

      {/* 2-col grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 20 }}
      >
        {EVENT_CONFIG.problemStatements.map((ps, i) => (
          <ProblemCard key={ps.id} ps={ps} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProblemStatements;
