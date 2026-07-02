"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

/* ── project data ─────────────────────────────────────────── */
type Project = {
  num: string;
  title: string;
  kind: string;
  img: string;
  pos: string;
  stack: string[];
  desc: string;
  features: string[];
  links: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    num: "01",
    title: "FovIQ · EXIF Insights",
    kind: "etl · analytics",
    img: "/exif.png",
    pos: "top",
    stack: ["Python", "DuckDB", "dbt", "Streamlit", "Pandas", "Altair"],
    desc: "Local ETL pipeline that turns a nature-photography library into EXIF analytics: shots by hour, capture locations, and the gear and exposure combinations behind every frame.",
    features: [
      "extracts EXIF metadata from a photo library into a DuckDB warehouse",
      "dbt models aggregate camera, ISO, aperture and shutter usage",
      "Streamlit dashboard with camera, hour-of-day and ISO filters",
      "capture-location map and automatic peak shooting-hour detection",
    ],
    links: [
      { label: "github", href: "https://github.com/RindTel" },
      { label: "live demo", href: "/demo.html" },
    ],
  },
  {
    num: "02",
    title: "Transit Lens",
    kind: "data · transit",
    img: "/transit.jpg",
    pos: "top",
    stack: ["Python", "DuckDB", "dbt", "Streamlit", "GTFS", "Leaflet"],
    desc: "GTFS delay-intelligence dashboard across four European transit networks. Ingests public schedule and real-time feeds, then surfaces the most-delayed routes, busiest stops, and peak-delay windows per city.",
    features: [
      "ingests GTFS feeds for Budapest, Prague, Zurich and Helsinki",
      "dbt marts compute average delay by hour and per route",
      "ranks the most-delayed routes and busiest stops by city",
      "interactive delay charts with a live stop-density map",
    ],
    links: [
      { label: "github", href: "https://github.com/RindTel" },
      { label: "live demo", href: "/demo_fundforge.html" },
    ],
  },
  {
    num: "03",
    title: "RAG Knowledge System",
    kind: "data · ai",
    img: "/rag.png",
    pos: "top",
    stack: ["Python", "LangChain", "FAISS", "Ollama", "Qwen 2.5", "FastAPI", "Docker"],
    desc: "Fully local retrieval-augmented generation with a terminal UI. FAISS vector search, offline LLM inference via Ollama, cited chunk responses.",
    features: [
      "local document ingestion with FAISS vector search",
      "supports multiple LLMs via Ollama (Qwen, Llama, Mistral)",
      "adjustable retrieval depth with reference chunk citations",
      "fully offline, no API keys, runs on local hardware",
    ],
    links: [
      { label: "github", href: "https://github.com/RindTel/rag_terminal_1.0.0" },
      { label: "live demo", href: "/rag_demo.html" },
    ],
  },
];

/* ── single card ──────────────────────────────────────────── */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="proj-card"
    >
      {/* top accent line - animates in on hover */}
      <span className="proj-accent" />

      {/* thumbnail */}
      <div className="proj-thumb">
        {imgError ? (
          <div className="proj-thumb-fallback">
            <span className="proj-thumb-cmd">{p.title.split(/\s·\s?/)[0]}</span>
          </div>
        ) : (
          <Image
            src={p.img}
            alt={p.title}
            fill
            sizes="(max-width: 700px) 100vw, 300px"
            style={{ objectFit: "cover", objectPosition: p.pos }}
            onError={() => setImgError(true)}
          />
        )}
        <span className="proj-num">{p.num}</span>
        <span className="proj-kind">{p.kind}</span>
      </div>

      {/* body */}
      <div className="proj-body">
        <h3 className="proj-title">{p.title}</h3>

        <div className="proj-stack">
          {p.stack.map(t => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>

        <p className="proj-desc">{p.desc}</p>

        <button
          className="proj-toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span className="proj-caret" style={{ transform: open ? "rotate(90deg)" : "none" }}>▸</span>
          {open ? "hide" : "show"} features
        </button>

        {/* smooth height expand - no layout jump */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="features"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <ul className="proj-features">
                {p.features.map(f => (
                  <li key={f}><span>-</span>{f}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* links - pinned to the bottom so every card lines up */}
        <div className="proj-links">
          {p.links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ── section ──────────────────────────────────────────────── */
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" style={{ padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <h2 style={{
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
            }}>
              Selected work
            </h2>
            <a
              href="https://github.com/RindTel"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                color: "var(--text-muted)", letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              github.com/RindTel ↗
            </a>
          </motion.div>
        </div>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} p={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 720px) {
          .proj-grid { grid-template-columns: 1fr; }
        }
        .proj-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .proj-card:hover {
          background: var(--surface-2);
          border-color: var(--border-mid);
          transform: translateY(-3px);
        }

        .proj-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--green);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
          z-index: 3;
        }
        .proj-card:hover .proj-accent { transform: scaleX(1); }

        .proj-thumb {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .proj-thumb img {
          filter: brightness(0.8) saturate(0.7);
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.4s ease;
        }
        .proj-thumb-fallback {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem;
          background:
            repeating-linear-gradient(
              0deg, var(--surface-2), var(--surface-2) 1px,
              transparent 1px, transparent 26px
            ),
            var(--surface);
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.04em;
        }
        .proj-thumb-cmd { color: var(--text-secondary); }
        .proj-card:hover .proj-thumb img {
          transform: scale(1.06);
          filter: brightness(1) saturate(0.95);
        }
        .proj-num {
          position: absolute; top: 8px; left: 8px; z-index: 2;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--text-secondary);
          background: rgba(10,10,10,0.85);
          padding: 1px 6px; border: 1px solid var(--border);
        }
        .proj-kind {
          position: absolute; top: 8px; right: 8px; z-index: 2;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--green); letter-spacing: 0.04em;
          background: rgba(10,10,10,0.85);
          padding: 1px 6px; border: 1px solid var(--green-border);
        }

        .proj-body {
          display: flex; flex-direction: column;
          flex: 1;
          padding: 1.25rem;
        }
        .proj-title {
          font-size: 15px; font-weight: 500; letter-spacing: 0.01em;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
          transition: color 0.2s ease;
        }
        .proj-card:hover .proj-title { color: var(--green); }

        .proj-stack { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.85rem; }
        .proj-tag {
          font-family: var(--font-mono); font-size: 10px;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          padding: 1px 6px;
          transition: border-color 0.2s, color 0.2s;
        }
        .proj-card:hover .proj-tag { border-color: var(--border-mid); }

        .proj-desc {
          font-size: 14px; line-height: 1.75;
          color: var(--text-secondary);
          margin-bottom: 0.85rem;
        }

        .proj-toggle {
          align-self: flex-start;
          background: none; border: none; padding: 0;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-muted); cursor: pointer;
          letter-spacing: 0.03em;
          display: flex; align-items: center; gap: 0.4rem;
          transition: color 0.15s;
        }
        .proj-toggle:hover { color: var(--text-secondary); }
        .proj-caret { display: inline-block; transition: transform 0.25s ease; color: var(--green); }

        .proj-features { list-style: none; padding: 0.75rem 0 0; margin: 0; }
        .proj-features li {
          position: relative; padding-left: 1rem;
          font-size: 11px; line-height: 1.75; color: var(--text-secondary);
        }
        .proj-features li span { position: absolute; left: 0; color: var(--green); }

        .proj-links {
          margin-top: auto;
          padding-top: 0.9rem;
          border-top: 1px solid var(--border);
          display: flex; gap: 1.25rem;
        }
        .proj-links a {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary); letter-spacing: 0.03em;
          transition: color 0.15s;
        }
        .proj-links a:hover { color: var(--green); }
      `}</style>
    </section>
  );
}
