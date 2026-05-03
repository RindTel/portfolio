"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
 
const strengths = [
  { label: "Systems Thinking", desc: "Designing scalable architectures that anticipate complexity before it arrives." },
  { label: "AI Engineering", desc: "Building production grade ML pipelines, RAG systems, and intelligent agents." },
  { label: "Full-Stack Craft", desc: "End to end ownership from database schema to polished user interfaces." },
  { label: "Network Design", desc: "Enterprise scale infrastructure, security protocols, and distributed systems." },
];
 
const interests = ["Retrieval-Augmented Generation", "Distributed Systems", "Network Security", "Compiler Design", "WebAssembly", "Formal Verification"];
 
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
 
  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: "5rem" }}
      >
        <p className="section-label" style={{ marginBottom: "1rem" }}>01 / About</p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            maxWidth: 600,
          }}
        >
          Engineered for{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
            complexity,
          </span>
          {" "}built for clarity
        </h2>
      </motion.div>
 
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* Bio column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            I&apos;m a Software Engineer with a deep passion for building software
            at the intersection of intelligence and infrastructure. My work spans AI pipelines,
            distributed systems, and network architecture.
          </p>
 
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              marginBottom: "2rem",
            }}
          >
            I thrive in environments where technical complexity meets product ambition. Whether it&apos;s
            designing a retrieval augmented generation system from scratch or architecting a smart
            stadium network for 50,000 concurrent users. I care deeply about the craft.
          </p>
 
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  padding: "0.5rem 1rem",
                  borderRadius: "2px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
 
        {/* Strengths column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="strengths-col"
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
            }}
          >
            Core Strengths
          </p>
 
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            {strengths.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                style={{
                  padding: "1.25rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  transition: "border-color 0.2s",
                  cursor: "default",
                }}
                whileHover={{ borderColor: "rgba(99,210,190,0.3)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
 
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "1rem",
            }}
          >
            Technical Interests
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {interests.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                  border: "1px solid rgba(99,210,190,0.15)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "2px",
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
 
      <style>{`
        @media (max-width: 640px) {
          .strengths-col { margin-top: 3rem; }
        }
      `}</style>
    </section>
  );
}
 