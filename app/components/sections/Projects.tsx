"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectRAG from "./ProjectRAG";
import ProjectCrowdfunding from "./ProjectCrowdfunding";
import ProjectStadium from "./ProjectStadium";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      style={{
        padding: "8rem 2rem",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "5rem" }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>02 / Projects</p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--text-primary)",
                maxWidth: 550,
              }}
            >
              Work that{" "}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400,
                }}
              >
                speaks
              </span>{" "}
              for itself
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                maxWidth: 380,
                lineHeight: 1.7,
              }}
            >
              Three projects spanning AI, financial technology, and enterprise
              networking.Each with a distinct technical identity.
            </p>
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <ProjectRAG index={0} />
          <ProjectCrowdfunding index={1} />
          <ProjectStadium index={2} />
        </div>
      </div>
    </section>
  );
}
