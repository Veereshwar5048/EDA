import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { EVENT_CONFIG } from "../../config/event.config";
import CinematicBackground from "../ui/CinematicBackground";
import OwlGuide from "../mascot/OwlGuide";

interface HeroProps { onRegisterClick: () => void; }

/* ── Animated counting number ───────────────────────────────── */
const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const num    = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");
  const count  = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isNaN(num)) return;
    const ctrl = animate(count, num, { duration: 2.2, delay: 0.8, ease: "easeOut" });
    return ctrl.stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  if (isNaN(num)) return <span>{value}</span>;
  return <motion.span>{rounded}</motion.span>;
};

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const { name, tagline, description, stats } = EVENT_CONFIG;

  const scrollDown = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  /* Shared entrance animation factory */
  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--bg-0)",
      }}
    >
      {/* ── Background WebGL Layer (z-0) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="cinematic-bg-container"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <CinematicBackground />
      </motion.div>

      {/* ── Overlay Layers (z-1) ──────────────────────────────── */}
      
      {/* 1. Dark Gradient Overlay (20% to 90% dark) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(2,4,8,0.2) 0%, rgba(2,4,8,0.6) 50%, rgba(2,4,8,0.95) 100%)",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      {/* 2. AI Accent Glow Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse at 50% 30%, rgba(61,95,252,0.15) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
        aria-hidden
      />

      {/* 3. Subtle Noise / Mesh Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      {/* ── Main content (z-10) ──────────────────────────────── */}
      <div
        className="container relative text-center"
        style={{ zIndex: 10, paddingTop: 160, paddingBottom: 120 }}
      >
        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0.2)} style={{ marginBottom: 32 }} className="flex justify-center">
          <span
            role="text"
            aria-label={`Data Analytics Club ${EVENT_CONFIG.year}`}
            className="inline-flex items-center"
            style={{
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "var(--fg-2)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "#60a5fa",
                animation: "pulse 2s ease-in-out infinite",
                flexShrink: 0,
                boxShadow: "0 0 10px rgba(96, 165, 250, 0.6)",
              }}
            />
            Data Analytics Club · {EVENT_CONFIG.year}
          </span>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
          style={{ marginBottom: 16 }}
        >
          <OwlGuide size={100} variant="floating" />
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.4)}
          className="display-xl"
          style={{
            fontSize: "clamp(3rem, 8.5vw, 6.5rem)",
            marginBottom: 24,
            color: "#ffffff",
            textShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to{" "}
          <span className="grad-text">{name}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.5)} // 200ms after heading
          style={{
            fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
            fontWeight: 500,
            color: "var(--fg-1)",
            marginBottom: 16,
            lineHeight: 1.5,
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          {tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.6)}
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--fg-2)",
            marginBottom: 48,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.8)} // Appears last
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: 16, marginBottom: 80 }}
        >
          <button
            id="hero-register-btn"
            onClick={onRegisterClick}
            className="btn btn-primary"
            style={{ 
              minWidth: 180,
              boxShadow: "0 0 30px rgba(61,95,252,0.4), inset 0 1px 1px rgba(255,255,255,0.2)"
            }}
          >
            Register Now <ArrowRight size={16} aria-hidden />
          </button>
          <button
            onClick={scrollDown}
            className="btn btn-outline"
            style={{ 
              minWidth: 160,
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            aria-label="Explore event sections"
          >
            Explore Event
          </button>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Event statistics"
          id="hero-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            maxWidth: 640,
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 16px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                minHeight: 96,
              }}
            >
              <div className="stat-num-sm" aria-label={`${s.value} ${s.label}`}>
                <CountUp value={s.value} />
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  marginTop: 6,
                  color: "var(--fg-3)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <style>{`
          @media (max-width: 480px) {
            #hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
            #hero-stats > div:nth-child(2) { border-right: none !important; }
            #hero-stats > div:nth-child(1), #hero-stats > div:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.04); }
          }
          @media (prefers-reduced-motion: reduce) {
            .cinematic-bg-container {
              display: none !important;
            }
          }
        `}</style>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.5 },
          y: { delay: 1.8, repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute"
        style={{ 
          bottom: 32, 
          left: "50%", 
          transform: "translateX(-50%)", 
          color: "rgba(255,255,255,0.4)", 
          background: "none", 
          border: "none", 
          cursor: "pointer", 
          zIndex: 10 
        }}
        aria-label="Scroll down to content"
      >
        <ChevronDown size={28} aria-hidden />
      </motion.button>
    </section>
  );
};

export default Hero;
