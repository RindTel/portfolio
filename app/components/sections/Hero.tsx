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

/* ── focus block ──
   Replaces the old decorative pipeline SVG (which paired hand-drawn nodes
   with a fake log stream of invented throughput numbers). This is a small
   honest terminal card: a typed command that reveals three true lines about
   what I actually build, the stack I use, and where I am. */
const FOCUS_LINES = [
  "building local-first data tools: ETL, retrieval, dashboards",
  "stack: python, typescript, sql, duckdb, dbt, docker",
  "based in pristina, ks · gmt+1",
];

function FocusBlock() {
  const [typed, setTyped] = useState(false);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      padding: "1.25rem 1.5rem 1.4rem",
      background: "var(--surface)",
      border: "1px solid var(--border)",
    }}>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10,
        color: "var(--text-muted)", letterSpacing: "0.08em",
        textTransform: "uppercase", marginBottom: "1rem",
      }}>
        # ~/focus
      </p>

      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 12,
        color: "var(--text-secondary)", letterSpacing: "0.03em",
        marginBottom: "0.85rem",
      }}>
        <span style={{ color: "var(--green)", marginRight: 8 }}>$</span>
        <TypeWriter text="cat focus.txt" speed={34} onDone={() => setTyped(true)} />
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {FOCUS_LINES.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 4 }}
            animate={typed ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.14, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              color: i === FOCUS_LINES.length - 1 ? "var(--green)" : "var(--text-muted)",
              letterSpacing: "0.03em",
            }}
          >
            <span style={{ color: "var(--text-muted)", marginRight: 6 }}>›</span>
            {line}
          </motion.p>
        ))}
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
            Data engineer at heart. I design pipelines, intelligent
            retrieval, and backends built to take a beating. From offline
            RAG stacks to enterprise networks, I care about systems that
            hold up.
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

      {/* Focus block - honest terminal card in place of the old pipeline graph */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <FocusBlock />
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
