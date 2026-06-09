"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Role = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  bullets?: string[];   // optional "what I did" points - omitted on current role
  stack?: string[];
};

const roles: Role[] = [
  {
    role: "Junior Ingestion Specialist",
    company: "ProQu",
    period: "May 2026 - Present",
    location: "Remote",
    current: true,
    summary:
      "Building and maintaining production data pipelines that ingest and normalize multi-source risk data on AWS. Working with large-scale datasets, automating ingestion workflows, monitoring data quality, and improving pipeline reliability across multiple sources.",
    stack: ["Python", "AWS", "SQL", "ETL", "Git"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <section id="experience" style={{ padding: "7rem 2rem" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <p className="section-tag">experience</p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: "2.5rem",
          }}
        >
          Where I&apos;ve worked
        </motion.h2>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {roles.map((role, index) => (
            <motion.article
              key={`${role.company}-${role.role}-${role.period}`}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.45,
                delay: 0.1 + index * 0.1,
              }}
              className="exp-row"
            >
              {/* Left Column */}
              <div className="exp-meta">
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    marginBottom: "0.4rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.03em",
                    color: "var(--text-secondary)",
                  }}
                >
                  {role.current && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--green)",
                        display: "inline-block",
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                  )}

                  {role.period}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.04em",
                    color: "var(--text-muted)",
                  }}
                >
                  {role.location}
                </p>
              </div>

              {/* Right Column */}
              <div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {role.role}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.03em",
                    color: "var(--green)",
                    marginBottom: "0.85rem",
                  }}
                >
                  @ {role.company}
                </p>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                  }}
                >
                  {role.summary}
                </p>

                {role.bullets?.length ? (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      marginBottom: "1.1rem",
                    }}
                  >
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        style={{
                          position: "relative",
                          paddingLeft: "1.1rem",
                          fontSize: 13,
                          lineHeight: 1.7,
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "var(--green)",
                          }}
                        >
                          ›
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {role.stack?.length ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.3rem",
                    }}
                  >
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.02em",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border)",
                          padding: "1px 7px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .exp-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 2rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border);
        }
        .exp-row:hover h3 {
          color: var(--green);
          transition: color 0.2s ease;
        }

        @keyframes pulse-dot {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5);
          }

          50% {
            box-shadow: 0 0 0 4px rgba(74, 222, 128, 0);
          }
        }

        @media (max-width: 680px) {
          .exp-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            padding: 1.75rem 0;
          }
          /* date + location on one line to keep the header compact */
          .exp-meta {
            display: flex;
            align-items: baseline;
            gap: 0.75rem;
          }
          .exp-meta p { margin-bottom: 0 !important; }
        }
      `}</style>
    </section>
  );
}