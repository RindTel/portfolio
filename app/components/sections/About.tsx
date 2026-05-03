"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const strengths = [
  { label: "Systems Thinking", desc: "Designing scalable architectures that anticipate complexity before it arrives." },
  { label: "AI Engineering", desc: "Building production grade ML pipelines, RAG systems, and intelligent agents." },
  { label: "Full-Stack Craft", desc: "End to end ownership from database schema to polished user interfaces." },
  { label: "Network Design", desc: "Enterprise scale infrastructure, security protocols, and distributed systems." },
];

const interests = [
  "Retrieval-Augmented Generation",
  "Distributed Systems",
  "Network Security",
  "Compiler Design",
  "WebAssembly",
  "Formal Verification",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(4rem, 10vh, 8rem) 2rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ marginBottom: "clamp(4rem, 10vh, 6rem)" }}
      >
        <p style={{ 
          fontFamily: "var(--font-mono)", 
          fontSize: "0.75rem", 
          letterSpacing: "0.3em", 
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "1.5rem" 
        }}>
          01 / About
        </p>

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--text-primary)",
          maxWidth: 850,
        }}>
          Engineered for{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
            complexity,
          </span>{" "}
          built for clarity.
        </h2>
      </motion.div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "clamp(2rem, 8vw, 6rem)",
        alignItems: "start",
      }}>
        
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Narrative Content: Inline with the first Strength Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              I&apos;m a Software Engineer with a deep focus on systems that scale and adapt.
              My work sits at the intersection of AI infrastructure and distributed computing.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              I prioritize clean architecture and predictable behavior, ensuring systems remain
              resilient and maintainable under extreme pressure.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {[
              { label: "Resume", href: "/Rindrit_CV.pdf" },
              { label: "GitHub", href: "https://github.com/RindTel" },
              { label: "LinkedIn", href: "https://linkedin.com/in/rindrittelaku" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--accent-dim)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ position: "relative" }}
        >
          {/* Label is positioned absolutely so it doesn't push the first card down */}
          <p style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            marginBottom: "1.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}>
            Core Expertise
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
            {strengths.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                style={{
                  padding: "1.5rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  cursor: "default",
                }}
                whileHover={{ borderColor: "var(--accent)", y: -4, transition: { duration: 0.2 } }}
              >
                <h4 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}>
                  {s.label}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "1.25rem",
            }}>
              Technical Interests
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {interests.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "2px",
                    border: "1px solid rgba(99,210,190,0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}