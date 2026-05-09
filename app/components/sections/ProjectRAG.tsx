"use client";
import { useState } from "react";
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
      {/* Title Bar */}
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
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28ca41" }} />
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
 
      {/* Image */}
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
            alt="RAG System"
              fill
                sizes="(max-width: 768px) 100vw, 33vw"
               style={{
                   objectFit: "cover",
                   objectPosition: "top",
                     transform: hovered ? "scale(1.02)" : "scale(1)",
                     transition: "transform 0.6s ease",
                   filter: hovered ? "brightness(1)" : "brightness(0.88)",
               }}
             />  
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
          }}
        />
      </div>
 
      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "0.6rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "#33ff88",
              opacity: 0.65,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Project 01
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--text-primary)",
            }}
          >
            RAG Knowledge System
          </h3>
        </div>
 
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1rem",
          }}
        >
          A fully local Retrieval-Augmented Generation system with a retro terminal UI.
          Uses FAISS vector search with cited responses and offline LLM inference.
        </p>
 
        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
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
              }}
            >
              {t}
            </span>
          ))}
        </div>
 
        {/* Features toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            background: "none",
            border: "none",
            color: "#33ff88",
            cursor: "pointer",
            marginBottom: expanded ? "0.8rem" : 0,
          }}
        >
          {expanded ? "▾ Hide Features" : "▸ Show Features"}
        </button>
 
        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}
          >
            {features.map((f) => (
              <li
                key={f}
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.4rem",
                  position: "relative",
                  paddingLeft: "1rem",
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
          {[
            { label: "GitHub", href: "https://github.com/RindTel/rag_terminal_1.0.0", external: true },
            { label: "Live Demo", href: "/demo.html", external: true },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#33ff88")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(51,255,136,0.55)")}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "rgba(51,255,136,0.55)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
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
 