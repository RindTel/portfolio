"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const strengths = [
  { key: "pipeline arch",  val: "end to end data workflows: ingestion, transform, retrieval, delivery" },
  { key: "rag systems",    val: "local LLM inference, FAISS vector search, cited document retrieval" },
  { key: "data modeling",  val: "dbt transformations, dimensional modeling, DuckDB warehousing" },
];

const interests = [
  "retrieval augmented generation",
  "distributed systems",
  "data modeling",
  "analytics engineering",
];

const stats = [
  { val: "2024",  label: "Building Since" },
  { val: "10+",    label: "Projects Shipped" },
  { val: "5+", label: "transit networks analyzed" },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" style={{ padding: "7rem 2rem", maxWidth: 900, margin: "0 auto" }} ref={ref}>
      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          marginBottom: "4rem",
        }}
        className="stats-grid"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.07 }}
            style={{
              background: "var(--surface)",
              padding: "1.25rem 1.5rem",
              display: "flex", flexDirection: "column", gap: "0.25rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 600,
              color: "var(--green)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}>
              {s.val}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--text-muted)", letterSpacing: "0.06em",
            }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
          marginBottom: "4rem",
        }}
        className="about-grid"
      >
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            color: "var(--text-primary)",
            marginBottom: "1.25rem",
          }}>
            Building systems<br />that process data<br />at scale.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
            I&apos;m a data engineer focused on pipelines, retrieval systems, and
            backend infrastructure.Turning raw data into systems people can trust.
          </p>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
            I&apos;ve built a fully offline RAG system, an EXIF analytics pipeline over
            a personal photo library, and a GTFS delay intelligence dashboard spanning
            four European transit networks.
          </p>

          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {[
              { label: "github ↗",   href: "https://github.com/RindTel" },
              { label: "linkedin ↗", href: "https://linkedin.com/in/rindrittelaku" },
              { label: "email ↗",    href: "mailto:rindritelaku@gmail.com" },
              { label: "resume ↗",   href: "/RindritTelakuCV.pdf" },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  color: "var(--text-muted)", letterSpacing: "0.04em",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--text-muted)", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: "0.75rem",
          }}>
            core strengths
          </p>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {strengths.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
                style={{
                  padding: "0.85rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
                className="strength-row"
              >
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  color: "var(--text-muted)", letterSpacing: "0.06em",
                  marginBottom: "0.25rem",
                }}>
                  {s.key}
                </p>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {s.val}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
      >
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--text-muted)", letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "1rem",
        }}>
          technical interests
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {interests.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.05 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                padding: "3px 12px",
                letterSpacing: "0.02em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              className="interest-tag"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <style>{`
        .about-grid { gap: 5rem; }
        .strength-row:hover { background: var(--surface); padding-left: 0.75rem; transition: padding 0.2s; }
        .strength-row:hover p:last-child { color: var(--text-primary) !important; }
        .interest-tag:hover { border-color: var(--green-border) !important; color: var(--green) !important; cursor: default; }
        .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 680px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
