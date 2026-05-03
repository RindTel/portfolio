"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    icon: "{ }",
    color: "var(--accent)",
    skills: [
      { name: "Python", level: 95 },
      { name: "TypeScript", level: 80 },
      { name: "Java", level: 50 },
      { name: "Go", level: 72 },
      { name: "C#", level: 40 },
      { name: "SQL", level: 87 },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "~>",
    color: "var(--violet)",
    skills: [
      { name: "TCP/IP Stack", level: 80 },
      { name: "BGP / OSPF", level: 85 },
      { name: "Cisco", level: 80 },
      { name: "Network Security", level: 82 },
      { name: "Wi-Fi 6 / 802.11ax", level: 75 },
      { name: "Voip", level: 68 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: "**",
    color: "#e88080",
    skills: [
      { name: "Python", level: 95 },
      { name: "PyTorch", level: 90 },
      { name: "RAG Systems", level: 90 },
      { name: "Numpy", level: 80 },
      { name: "Vector Databases", level: 85 },
      { name: "MLOps / Evaluation", level: 72 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: "[]",
    color: "var(--amber)",
    skills: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 78 },
      { name: "PostgreSQL", level: 88 },
      { name: "Git / CI/CD", level: 93 },
      { name: "Terraform", level: 72 },
      { name: "Linux / Bash", level: 90 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: "0.9rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-secondary)" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: color, opacity: 0.7 }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 1 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", background: color, borderRadius: 1, opacity: 0.85 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("languages");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeCategory = skillCategories.find((c) => c.id === active)!;

  return (
    <section id="skills" style={{ padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem" }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>03 / Skills</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-primary)" }}>
            Technical{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>arsenal</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>Categories</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.85rem 1rem", borderRadius: "4px", border: "1px solid",
                    borderColor: active === cat.id ? cat.color + "40" : "var(--border)",
                    background: active === cat.id ? cat.color + "0d" : "transparent",
                    cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: active === cat.id ? cat.color : "var(--text-muted)", width: 24, transition: "color 0.2s" }}>{cat.icon}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.88rem", color: active === cat.id ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 0.2s" }}>{cat.label}</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: "2rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>Quick Stats</p>
              {[{ label: "Years coding", val: "2+" }, { label: "Projects shipped", val: "5" }, { label: "Open source PRs", val: "12" }, { label: "Certifications", val: "3" }].map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent)", fontWeight: 500 }}>{s.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: activeCategory.color }}>{activeCategory.icon}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>{activeCategory.label}</h3>
            </div>
            {activeCategory.skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} color={activeCategory.color} delay={i * 0.06} />
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>Also familiar with</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["React","Next.js","GraphQL","WebSockets","Kafka","Elasticsearch","MongoDB","Prisma","gRPC","Protocol Buffers","WASM","Svelte","Three.js","FastAPI","Celery","RabbitMQ","Prometheus","Nginx"].map((tech, i) => (
                <motion.span key={tech} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 + i * 0.04 }} whileHover={{ scale: 1.05 }}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", background: "var(--surface)", border: "1px solid var(--border)", padding: "0.3rem 0.65rem", borderRadius: "2px", cursor: "default", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,210,190,0.2)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >{tech}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
