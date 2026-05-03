"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const stack = ["TypeScript", "Next.js", "PostgreSQL", "Stripe", "Prisma", "Vercel", "Tailwind"];

const features = [
  "Stripe Connect for multi-party payment processing",
  "Real-time funding progress with WebSocket updates",
  "Creator dashboard with analytics and payout management",
  "KYC verification flow and fraud detection layer",
];

export default function ProjectCrowdfunding({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: "1px solid",
        borderColor: hovered ? "rgba(240,168,50,0.3)" : "var(--border)",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 40px rgba(240,168,50,0.05)" : "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(240,168,50,0.06) 0%, rgba(17,24,39,0) 100%)",
          padding: "1.25rem 1.75rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--amber)",
            letterSpacing: "0.1em",
          }}
        >
          fundorge — Dashboard
        </span>
      </div>

      {/* Screenshot */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          src="/crowdfunding.png"
          alt="Crowdfunding Platform Preview"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "top",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            filter: hovered ? "brightness(1)" : "brightness(0.9)",
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* Body */}
      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.6rem",
          }}
        >
          Crowdfunding Platform
        </h3>

        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1rem",
          }}
        >
          A full-featured crowdfunding platform with Stripe Connect, real-time analytics,
          and a creator dashboard built for scalable fintech systems.
        </p>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
          {stack.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--amber)",
                background: "var(--amber-dim)",
                border: "1px solid rgba(240,168,50,0.15)",
                padding: "0.2rem 0.5rem",
                borderRadius: "2px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--amber)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: expanded ? "0.85rem" : 0,
          }}
        >
          {expanded ? "▾ Hide Features" : "▸ Show Features"}
        </button>

        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ listStyle: "none", padding: 0 }}
          >
            {features.map((f) => (
              <li
                key={f}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.45rem",
                  paddingLeft: "1rem",
                  position: "relative",
                }}
              >
                <span style={{ position: "absolute", left: 0, color: "var(--amber)" }}>→</span>
                {f}
              </li>
            ))}
          </motion.ul>
        )}

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            marginTop: "1rem",
          }}
        >
          {["GitHub"].map((label) => (
            <a
              key={label}
              href="https://github.com/RindTel/crowdfunding" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "rgba(240,168,50,0.3)",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffbe33")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,168,50,0.3)")}
            >
              {label}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}