"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "languages",
    label: "languages",
    skills: [
      { name: "sql", level: 87 },
      { name: "typescript", level: 80 },
      { name: "python", level: 80 },
      { name: "java", level: 30 },
      { name: "go", level: 20 },
    ],
  },
  {
    id: "data-ai",
    label: "data & ai",
    skills: [
      { name: "rag-systems", level: 90 },
      { name: "pytorch", level: 90 },
      { name: "vector-databases", level: 85 },
      { name: "faiss", level: 85 },
      { name: "langchain", level: 82 },
      { name: "numpy", level: 80 },
      { name: "mlops", level: 72 },
    ],
  },
  {
    id: "cloud-infra",
    label: "cloud & infra",
    skills: [
      { name: "linux/bash", level: 90 },
      { name: "git/ci-cd", level: 93 },
      { name: "docker", level: 85 },
      { name: "aws", level: 78 },
      { name: "terraform", level: 72 },
    ],
  },
  {
    id: "backend-tools",
    label: "backend & tools",
    skills: [
      { name: "postgresql", level: 88 },
      { name: "fastapi", level: 82 },
      { name: "next.js", level: 78 },
      { name: "prisma", level: 75 },
      { name: "rest-apis", level: 88 },
      { name: "stripe", level: 70 },
    ],
  },
];

function Bar({ level }: { level: number }) {
  const filled = Math.round((level / 100) * 20);

  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 0,
      }}
    >
      <span style={{ color: "var(--green)" }}>
        {"█".repeat(filled)}
      </span>
      <span style={{ color: "var(--border-mid)" }}>
        {"█".repeat(20 - filled)}
      </span>
      <span
        style={{
          color: "var(--text-muted)",
          marginLeft: "0.6rem",
        }}
      >
        {level}
      </span>
    </span>
  );
}

export default function Skills() {
  const [active, setActive] = useState("languages");

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  const cat = categories.find((c) => c.id === active)!;

  return (
    <section id="skills" style={{ padding: "7rem 2rem" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0,
            borderBottom: "1px solid var(--border)",
            marginBottom: "2rem",
          }}
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `1px solid ${
                  c.id === active ? "var(--green)" : "transparent"
                }`,
                marginBottom: -1,
                padding: "0.5rem 1rem",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color:
                  c.id === active
                    ? "var(--green)"
                    : "var(--text-muted)",
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (c.id !== active) {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (c.id !== active) {
                  e.currentTarget.style.color =
                    "var(--text-muted)";
                }
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skills Table */}
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--surface)",
            minHeight: 384,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "0.55rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface-2)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              skill
            </span>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              proficiency / 100
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {cat.skills.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="skill-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    padding: "0.75rem 1.25rem",
                    borderBottom:
                      i < cat.skills.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "var(--text-primary)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {s.name}
                  </span>

                  <Bar level={s.level} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-muted)",
            marginTop: "0.75rem",
            letterSpacing: "0.04em",
          }}
        >
          # self-assessed · context matters more than numbers
        </p>
      </div>

      <style>{`
        .skill-row:hover {
          background: var(--surface-2);
        }
      `}</style>
    </section>
  );
}