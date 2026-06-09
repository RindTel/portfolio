"use client";
import { useState, useEffect } from "react";
 
const links = [
  { label: "about",      href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects",   href: "#projects" },
  { label: "skills",     href: "#skills" },
  { label: "contact",    href: "#contact" },
];
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
 
  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: 48,
          padding: "0 2rem",
          background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
       <div style={{
         maxWidth: 900, margin: "0 auto", height: "100%",
         display: "flex", alignItems: "center",
       }}>
        {/* wordmark */}
        <a
          href="#"
          style={{ fontSize: 12, color: "var(--text-primary)", letterSpacing: "0.06em" }}
        >
          rindrit<span style={{ color: "var(--green)" }}>@</span>dev<span
            style={{
              display: "inline-block", width: 7, height: 13,
              background: "var(--green)", marginLeft: 2,
              verticalAlign: "middle",
              animation: "blink 1.1s step-end infinite",
            }}
          />
        </a>
 
        {/* desktop links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem", marginLeft: "auto" }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/RindritTelakuCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11, color: "var(--green)", letterSpacing: "0.04em",
              border: "1px solid rgba(34,197,94,0.3)",
              padding: "3px 10px",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--green-dim)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            resume
          </a>
        </div>
 
        {/* mobile */}
        <button
          className="nav-burger"
          onClick={() => setOpen(!open)}
          style={{
            display: "none", marginLeft: "auto", background: "none",
            border: "none", color: "var(--text-secondary)", fontSize: 18, padding: 4,
          }}
          aria-label="menu"
        >
          {open ? "×" : "≡"}
        </button>
       </div>
      </nav>
 
      {open && (
        <div
          style={{
            position: "fixed", top: 48, left: 0, right: 0, zIndex: 99,
            background: "rgba(10,10,10,0.98)",
            borderBottom: "1px solid var(--border)",
            padding: "1.5rem 2rem",
            display: "flex", flexDirection: "column", gap: "1.25rem",
          }}
        >
          {links.map(l => (
            <a
              key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 12, color: "var(--text-secondary)", letterSpacing: "0.04em" }}
            >
              ~ {l.label}
            </a>
          ))}
          <a
            href="/RindritTelakuCV.pdf" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: "var(--green)" }}
          >
            resume ↗
          </a>
        </div>
      )}
 
      <style>{`
        @media (max-width: 700px) {
          .nav-links { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
 