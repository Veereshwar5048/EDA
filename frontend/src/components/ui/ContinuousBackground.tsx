import React from "react";
import { motion } from "framer-motion";

const ContinuousBackground: React.FC = () => {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: "linear-gradient(to bottom, #02040a 0%, #060b19 50%, #02040a 100%)",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundSize: "60px 60px",
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 20%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 20%, transparent 80%)",
        }}
      />

      {/* Floating geometric light beams */}
      <motion.div
        animate={{
          x: ["0%", "20%", "0%"],
          y: ["0%", "-10%", "0%"],
        }}
        transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(ellipse at center, rgba(61,95,252,0.06) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          transform: "rotate(-15deg)",
        }}
      />

      <motion.div
        animate={{
          x: ["0%", "-15%", "0%"],
          y: ["0%", "15%", "0%"],
        }}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity, delay: 5 }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "50vw",
          height: "50vh",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.05) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      {/* Floating particles (simulated via CSS animations on a few scattered divs) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["0vh", "-100vh"],
            x: [0, (Math.random() - 0.5) * 200, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            y: { duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear" },
            x: { duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear" },
            delay: Math.random() * 10,
          }}
          style={{
            position: "absolute",
            bottom: "-10%",
            left: `${Math.random() * 100}%`,
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            borderRadius: "50%",
            background: Math.random() > 0.5 ? "#60a5fa" : "#a78bfa",
            boxShadow: "0 0 10px rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  );
};

export default ContinuousBackground;
