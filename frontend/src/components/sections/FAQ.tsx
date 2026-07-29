import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { EVENT_CONFIG } from "../../config/event.config";
import type { FAQItem } from "../../config/event.config";

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, index, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-56px" }}
    transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
    style={{
      borderRadius: 12,
      border: `1px solid ${isOpen ? "rgba(99,132,255,0.22)" : "var(--glass-border)"}`,
      background:   isOpen ? "rgba(99,132,255,0.025)" : "var(--glass-bg)",
      overflow: "hidden",
      transition: "border-color 0.25s ease, background 0.25s ease",
    }}
  >
    {/* Toggle button */}
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      id={`faq-trigger-${index}`}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "20px 24px",
        textAlign: "left",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontWeight: 600,
          fontSize: "0.9375rem",
          lineHeight: 1.5,
          color: isOpen ? "var(--fg-1)" : "var(--fg-2)",
          transition: "color 0.2s ease",
        }}
      >
        {item.question}
      </span>

      <span
        aria-hidden
        style={{
          flexShrink: 0,
          width: 28, height: 28,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isOpen ? "rgba(99,132,255,0.14)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${isOpen ? "rgba(99,132,255,0.28)" : "rgba(255,255,255,0.08)"}`,
          color: isOpen ? "#93a8ff" : "var(--fg-3)",
          transition: "all 0.25s ease",
        }}
      >
        {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
      </span>
    </button>

    {/* Animated panel */}
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-trigger-${index}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: "easeInOut" }}
          className="accordion-body"
        >
          <div
            style={{
              padding: "0 24px 20px",
              borderTop: "1px solid var(--glass-border)",
            }}
          >
            <div style={{ height: 16 }} />
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--fg-2)" }}>
              {item.answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section"
      style={{ borderTop: "1px solid var(--glass-border)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-eyebrow">04 · FAQ</span>
          <h2
            className="display-lg"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--fg-1)", marginBottom: 12 }}
          >
            Questions &amp; Answers
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-2)" }}>
            Everything you need to know about {EVENT_CONFIG.name}.
          </p>
        </motion.div>

        {/* Accordion — max 720px centered */}
        <div
          style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}
          role="list"
          aria-label="FAQ items"
        >
          {EVENT_CONFIG.faq.map((item, i) => (
            <div key={i} role="listitem">
              <AccordionItem
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
