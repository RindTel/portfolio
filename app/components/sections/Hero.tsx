"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.003;

      // Draw perspective grid
      const vp = { x: canvas.width / 2, y: canvas.height * 0.55 };
      const gridColor = "rgba(99,210,190,0.06)";
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let i = 0; i <= 12; i++) {
        const y = vp.y + (i - 6) * 60 + Math.sin(t + i * 0.3) * 5;
        const perspective = Math.abs(i - 6) / 6;
        const alpha = Math.max(0, 0.12 - perspective * 0.1);
        ctx.strokeStyle = `rgba(99,210,190,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines converging to vanishing point
      const numV = 20;
      for (let i = 0; i <= numV; i++) {
        const x = (i / numV) * canvas.width;
        const alpha = 0.04 + Math.sin(t * 0.5 + i * 0.2) * 0.02;
        ctx.strokeStyle = `rgba(99,210,190,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(vp.x, vp.y);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const x = ((Math.sin(t * 0.4 + i * 2.1) * 0.5 + 0.5) * canvas.width);
        const y = ((Math.cos(t * 0.3 + i * 1.7) * 0.5 + 0.5) * canvas.height * 0.8);
        const size = 1 + Math.sin(t + i) * 0.5;
        const alpha = 0.3 + Math.sin(t * 0.7 + i * 0.8) * 0.2;
        ctx.fillStyle = `rgba(99,210,190,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

const titleWords = ["Software", "Engineer"];

export default function Hero() {
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const subtitle = "Computer Science and Engineering student at UBT · AI Systems · Distributed Architectures · Full-Stack Engineering";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < subtitle.length) {
        setTypedSubtitle(subtitle.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,210,190,0.04) 0%, transparent 70%)",
      }}
    >
      <AnimatedGrid />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(99,210,190,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          paddingTop: "72px",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          Available
        </motion.div>

        <div style={{ marginBottom: "1.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              marginBottom: "0.5rem",
            }}
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "0.25rem",
            }}
          >
            Rindrit Telaku
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
                fontStyle: "italic",
                color: word === "&" ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: 400,
              }}
            >
              {word}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            letterSpacing: "0.02em",
            maxWidth: 560,
            marginBottom: "3rem",
            minHeight: "1.2em",
          }}
        >
          {typedSubtitle}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "0.9em",
              background: "var(--accent)",
              marginLeft: 2,
              verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          I build intelligent systems and elegant software.From RAG powered AI pipelines
          to enterprise network architectures. Focused on engineering solutions that are
          both technically rigorous and beautifully crafted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "0.85rem 2rem",
              borderRadius: "2px",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.25s ease",
            }}
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              background: "transparent",
              padding: "0.85rem 2rem",
              borderRadius: "2px",
              border: "1px solid var(--border-accent)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.25s ease",
            }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              animation: "fadeUpDown 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Scroll
          </span>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUpDown { 0%,100%{opacity:0.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(8px)} }
        .btn-primary:hover { opacity:0.85; transform:translateY(-1px); box-shadow:0 8px 30px rgba(99,210,190,0.25); }
        .btn-secondary:hover { background:rgba(99,210,190,0.08); border-color:var(--accent); }
      `}</style>
    </section>
  );
}
