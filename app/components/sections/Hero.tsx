"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ── typing animation ── */
function TypeWriter({ text, delay = 0, speed = 38, onDone }: {
  text: string; delay?: number; speed?: number; onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onDone]);

  return <>{displayed}</>;
}

const bootLines = [
  { delay: 0,    text: "initializing profile...",     dim: true  },
  { delay: 520,  text: "loading rindrit.telaku",      dim: false },
  { delay: 980,  text: "role: data engineer",         dim: false },
  { delay: 1420, text: "status: online ✓",            green: true },
  { delay: 1800, text: "ready.",                      dim: true  },
];

/* ── now block ──
   A clean, plain-text status card (no terminal framing): what I'm currently
   building, where I'm based, and the core stack I work in. */
function NowBlock() {
  return (
    <div style={{
      width: "100%",
      padding: "1.4rem 1.5rem",
      background: "var(--surface)",
      border: "1px solid var(--border)",
    }}>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10,
        color: "var(--text-muted)", letterSpacing: "0.1em",
        textTransform: "uppercase", marginBottom: "0.85rem",
      }}>
        Now
      </p>

      <p style={{
        fontSize: 14, color: "var(--text-secondary)",
        lineHeight: 1.75, marginBottom: "1.1rem", maxWidth: 640,
      }}>
        Currently building production data pipelines at ProQu, focused on ETL,
        dbt, and retrieval systems. Based in Pristina, Kosovo (GMT+1) — open to
        remote data engineering and full-stack roles.
      </p>

      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "baseline",
        gap: "0.6rem", paddingTop: "0.9rem",
        borderTop: "1px solid var(--border)",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--text-muted)", letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          Core Stack
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 12,
          color: "var(--text-secondary)", letterSpacing: "0.02em",
        }}>
          Python · TypeScript · SQL · dbt · DuckDB · Docker
        </span>
      </div>
    </div>
  );
}

const specs = [
  { key: "name",     val: "Rindrit Telaku" },
  { key: "role",     val: "Data Engineer" },
  { key: "location", val: "Pristina, KS" },
  { key: "focus",    val: "pipelines · infra · backend" },
  { key: "status",   val: "building", green: true },
];

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "6rem 2rem 4rem",
        maxWidth: 900,
        margin: "0 auto",
        gap: "2.5rem",
      }}
    >
      {/* Boot sequence */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {bootLines.map((l, i) => (
          <BootLine key={i} {...l} />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 0",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "start",
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          <h1 style={{
            fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "1.25rem",
          }}>
            Rindrit<br />Telaku
          </h1>
          <p style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            maxWidth: 420,
            marginBottom: "2rem",
          }}>
            Data engineer focused on pipelines, retrieval systems, and
            backend infrastructure. I turn messy, raw data into
            systems people can rely on, from offline RAG stacks
            to production ETL pipelines on AWS.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "projects →", href: "#projects", accent: true },
              { label: "contact",    href: "#contact" },
              { label: "resume ↗",  href: "/RindritTelakuCV.pdf" },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("/R") ? "_blank" : undefined}
                rel={l.href.startsWith("/R") ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: l.accent ? "var(--green)" : "var(--text-muted)",
                  letterSpacing: "0.04em",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = l.accent ? "var(--green)" : "var(--text-secondary)")}
                onMouseLeave={e => (e.currentTarget.style.color = l.accent ? "var(--green)" : "var(--text-muted)")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right - spec sheet with staggered load-in */}
        <div className="hero-specs" style={{ minWidth: 220 }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid var(--border)",
          }}>
            profile.json
          </div>
          {specs.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : 8 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 1fr",
                gap: "0.75rem",
                padding: "0.4rem 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                {s.key}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                color: s.green ? "var(--green)" : "var(--text-secondary)",
              }}>
                {s.green
                  ? <><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--green)", marginRight: 6, animation: "pulse-dot 2s ease-in-out infinite", verticalAlign: "middle" }} />{s.val}</>
                  : s.val
                }
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Now block - clean status card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <NowBlock />
      </motion.div>

      {/* Cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.8 }}
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}
      >
        <span style={{ color: "var(--green)" }}>$</span>{" "}
        <span style={{
          display: "inline-block", width: 8, height: 14,
          background: "var(--text-muted)",
          verticalAlign: "middle",
          animation: "blink 1.1s step-end infinite",
        }} />
      </motion.div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }
        @media (max-width: 680px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-specs { display: none; }
        }
      `}</style>
    </section>
  );
}

function BootLine({ text, dim, green, delay }: { text: string; dim?: boolean; green?: boolean; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!show) return null;

  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 11,
      color: green ? "var(--green)" : dim ? "var(--text-muted)" : "var(--text-secondary)",
      letterSpacing: "0.04em",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ color: "var(--text-muted)" }}>›</span>
      <TypeWriter text={text} speed={30} />
    </div>
  );
}
