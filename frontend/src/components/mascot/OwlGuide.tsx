import React from "react";
import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

interface OwlGuideProps {
  className?: string;
  size?: number;
  variant?: "idle" | "floating" | "pointing";
}

const OwlGuide: React.FC<OwlGuideProps> = ({ className = "", size = 120, variant = "floating" }) => {
  // Animation variants
  const floatAnim: TargetAndTransition = {
    y: ["-4%", "4%", "-4%"],
    transition: { duration: 4, ease: "easeInOut", repeat: Infinity },
  };

  const wingLeftAnim: TargetAndTransition = {
    rotate: [0, 15, 0],
    transformOrigin: "right top",
    transition: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.2 },
  };

  const wingRightAnim: TargetAndTransition = {
    rotate: [0, -15, 0],
    transformOrigin: "left top",
    transition: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.2 },
  };

  const blinkAnim: TargetAndTransition = {
    scaleY: [1, 1, 0.1, 1, 1],
    transition: { duration: 5, times: [0, 0.9, 0.95, 0.98, 1], repeat: Infinity, ease: "easeInOut" },
  };

  const glowPulse: TargetAndTransition = {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size, filter: "drop-shadow(0 10px 20px rgba(99,132,255,0.3))" }}
      animate={variant === "floating" ? floatAnim : {}}
      whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.3 } }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        {/* Glow Filters */}
        <defs>
          <filter id="neonGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="bodyGrad" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a2238" />
            <stop offset="100%" stopColor="#0f1525" />
          </linearGradient>
        </defs>

        {/* ── Wings ── */}
        <motion.g animate={wingLeftAnim}>
          <path
            d="M50 85 C30 100, 20 130, 25 150 C40 140, 50 120, 55 100 Z"
            fill="#12182b"
            stroke="#3d5ffc"
            strokeWidth="3"
            filter="url(#neonGlowBlue)"
          />
          {/* Circuit Lines on Wing */}
          <path d="M35 110 L45 100 L50 105" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="35" cy="110" r="2" fill="#22d3ee" />
        </motion.g>

        <motion.g animate={wingRightAnim}>
          <path
            d="M150 85 C170 100, 180 130, 175 150 C160 140, 150 120, 145 100 Z"
            fill="#12182b"
            stroke="#3d5ffc"
            strokeWidth="3"
            filter="url(#neonGlowBlue)"
          />
          {/* Circuit Lines on Wing */}
          <path d="M165 110 L155 100 L150 105" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="165" cy="110" r="2" fill="#22d3ee" />
        </motion.g>

        {/* ── Main Body (Capsule/Egg shape) ── */}
        <rect x="55" y="40" width="90" height="120" rx="45" fill="url(#bodyGrad)" stroke="#6384ff" strokeWidth="2" />
        
        {/* Core Chest Reactor */}
        <motion.circle
          cx="100" cy="125" r="12"
          fill="none" stroke="#22d3ee" strokeWidth="2"
          filter="url(#neonGlowCyan)"
          animate={glowPulse}
        />
        <motion.circle
          cx="100" cy="125" r="4"
          fill="#22d3ee"
          filter="url(#neonGlowCyan)"
          animate={glowPulse}
        />

        {/* ── Face Plate ── */}
        <path d="M65 65 Q100 85 135 65 Q135 100 100 110 Q65 100 65 65 Z" fill="#0b101d" stroke="#3d5ffc" strokeWidth="2" />

        {/* ── Eyes ── */}
        <motion.g animate={blinkAnim} style={{ transformOrigin: "100px 75px" }}>
          {/* Left Eye */}
          <circle cx="82" cy="75" r="14" fill="#060c14" stroke="#22d3ee" strokeWidth="3" filter="url(#neonGlowCyan)" />
          <circle cx="82" cy="75" r="5" fill="#ffffff" filter="url(#neonGlowCyan)" />
          
          {/* Right Eye */}
          <circle cx="118" cy="75" r="14" fill="#060c14" stroke="#22d3ee" strokeWidth="3" filter="url(#neonGlowCyan)" />
          <circle cx="118" cy="75" r="5" fill="#ffffff" filter="url(#neonGlowCyan)" />
        </motion.g>

        {/* ── Beak (Holo Triangle) ── */}
        <polygon points="95,90 105,90 100,102" fill="#a78bfa" filter="url(#neonGlowBlue)" />

        {/* ── Head Antenna / Ears ── */}
        <path d="M70 45 L60 25 L75 35 Z" fill="none" stroke="#6384ff" strokeWidth="2" />
        <circle cx="60" cy="25" r="3" fill="#22d3ee" filter="url(#neonGlowCyan)" />
        
        <path d="M130 45 L140 25 L125 35 Z" fill="none" stroke="#6384ff" strokeWidth="2" />
        <circle cx="140" cy="25" r="3" fill="#22d3ee" filter="url(#neonGlowCyan)" />
      </svg>
    </motion.div>
  );
};

export default OwlGuide;
