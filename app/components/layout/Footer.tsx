"use client";
 
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1.5rem 2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          rindrit telaku · {new Date().getFullYear()}
        </span>
        <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          next.js · framer-motion · typescript
        </span>
        <a
          href="#"
          style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}