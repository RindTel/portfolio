"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const stack = ["Cisco IOS-XE", "Python", "OSPF/BGP", "802.11ax Wi-Fi 6", "VLAN/QoS", "Ansible", "Grafana"];

const features = [
  "Multi-tier hierarchical network with redundant 10G uplinks",
  "Segmented IoT VLAN with deep packet inspection",
  "Dynamic Wi-Fi 6 channel allocation for 50K+ concurrent clients",
  "Real-time telemetry dashboard with sub-second alerting",
];

export default function ProjectStadium({ index }: { index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

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
        borderColor: hovered ? "rgba(155,127,232,0.35)" : "var(--border)",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 40px rgba(155,127,232,0.06)" : "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(155,127,232,0.06) 0%, rgba(17,24,39,0) 100%)",
          padding: "1rem 1.75rem",
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
            color: "var(--violet)",
            letterSpacing: "0.1em",
          }}
        >
          Stadium Network Architecture
        </span>
      </div>

      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#05060a",
        }}
      >
        <Image
          src="/stadium.png"
          alt="Smart Stadium Network Architecture"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            filter: hovered ? "brightness(1)" : "brightness(0.9)",
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* BODY */}
      <div style={{ padding: "1.75rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--violet)",
                marginBottom: "0.4rem",
                opacity: 0.7,
              }}
            >
              Project 03
            </p>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Smart Stadium Network
            </h3>
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--violet)",
              background: "var(--violet-dim)",
              border: "1px solid rgba(155,127,232,0.2)",
              padding: "0.25rem 0.6rem",
              borderRadius: "2px",
            }}
          >
            Networking
          </span>
        </div>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1.25rem",
          }}
        >
          Enterprise grade network architecture for a 50,000 seat smart stadium.
          Designed a hierarchical topology supporting IoT sensors, HD broadcast feeds,
          guest Wi-Fi, and secure operations networks with zero single points of failure.
        </p>

        {/* STACK */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {stack.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--violet)",
                background: "var(--violet-dim)",
                border: "1px solid rgba(155,127,232,0.15)",
                padding: "0.2rem 0.55rem",
                borderRadius: "2px",
                opacity: 0.85,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* TOGGLE FEATURES */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--violet)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: expanded ? "1rem" : 0,
            opacity: 0.7,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>{expanded ? "▾" : "▸"}</span> {expanded ? "Hide" : "Show"} Features
        </button>

        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem" }}
          >
            {features.map((f) => (
              <li
                key={f}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  paddingLeft: "1rem",
                  position: "relative",
                  marginBottom: "0.5rem",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ position: "absolute", left: 0, color: "var(--violet)" }}>→</span>
                {f}
              </li>
            ))}
          </motion.ul>
        )}

        {/* LINKS */}
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
              href="https://github.com/RindTel/football-network" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(155,127,232,0.6)",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--violet)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(155,127,232,0.6)")}
            >
              {label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}