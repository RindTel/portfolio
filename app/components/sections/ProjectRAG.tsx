"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
 
const stack = ["Python", "LangChain", "FAISS", "Ollama", "Qwen 2.5", "FastAPI", "Docker"];
const features = [
  "Local document ingestion with FAISS vector search",
  "Supports multiple LLMs via Ollama (Qwen, Llama, Mistral)",
  "Adjustable retrieval depth with reference chunk citations",
  "Fully offline — no API keys, runs on local hardware",
];
 
export default function ProjectRAG({ index }: { index: number }) {
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
        borderColor: hovered ? "rgba(51,255,136,0.3)" : "var(--border)",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 40px rgba(51,255,136,0.06)" : "none",
      }}
    >
      {/* Mac-style title bar */}
      <div
        style={{
          background: "#000d00",
          padding: "0.65rem 1.1rem",
          borderBottom: "1px solid rgba(51,255,136,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e", display: "block" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28ca41", display: "block" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "rgba(51,255,136,0.45)",
            marginLeft: "auto",
            letterSpacing: "0.1em",
          }}
        >
          RAG v1.0 — Intelligence Terminal
        </span>
      </div>
 
      {/* Screenshot */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#000d00",
        }}
      >
        <Image
          src="/rag-preview.png"
          alt="RAG Knowledge System — Intelligence Terminal UI"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "top",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            filter: hovered ? "brightness(1)" : "brightness(0.88)",
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Subtle green tint on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(51,255,136,0.03)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      </div>
 
      {/* Card body */}
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.65rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#33ff88",
                marginBottom: "0.3rem",
                opacity: 0.65,
              }}
            >
              Project 01
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              RAG Knowledge System
            </h3>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "#33ff88",
              background: "rgba(51,255,136,0.08)",
              border: "1px solid rgba(51,255,136,0.2)",
              padding: "0.22rem 0.55rem",
              borderRadius: "2px",
              whiteSpace: "nowrap",
            }}
          >
            AI / ML
          </span>
        </div>
 
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1.1rem",
          }}
        >
          A fully local Retrieval-Augmented Generation system with a retro terminal UI.
          Load any documents, query them semantically via FAISS vector search, and get
          cited answers — no internet, no API keys required.
        </p>
 
        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.1rem" }}>
          {stack.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "#33ff88",
                background: "rgba(51,255,136,0.07)",
                border: "1px solid rgba(51,255,136,0.15)",
                padding: "0.2rem 0.5rem",
                borderRadius: "2px",
                opacity: 0.85,
              }}
            >
              {t}
            </span>
          ))}
        </div>
 
        {/* Expandable features */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#33ff88",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: expanded ? "0.85rem" : 0,
            opacity: 0.65,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>{expanded ? "▾" : "▸"}</span>
          {expanded ? "Hide" : "Show"} Features
        </button>
 
        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ listStyle: "none", padding: 0, marginBottom: "1.1rem" }}
          >
            {features.map((f) => (
              <li
                key={f}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-secondary)",
                  paddingLeft: "1rem",
                  position: "relative",
                  marginBottom: "0.45rem",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ position: "absolute", left: 0, color: "#33ff88" }}>→</span>
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
          }}
        >
          {["GitHub"].map((label) => (
            <a
              key={label}
              href="https://github.com/RindTel/rag_terminal_1.0.0" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "rgba(51,255,136,0.55)",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#33ff88")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(51,255,136,0.55)")}
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
