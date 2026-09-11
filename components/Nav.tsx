"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { FileText } from "lucide-react";
import { nav, person } from "@/content/site";

const spring = { stiffness: 220, damping: 26, mass: 0.6 };

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer position inside the pill, 0..1. Motion values only: no re-render per move.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-3, 3]);
  const rotateX = useTransform(sy, [0, 1], [3, -3]);
  const sheenX = useTransform(sx, (v) => `${v * 100}%`);
  const sheenY = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(140px 70px at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.11), transparent 70%)`;

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    // Slides stay pinned beneath later ones, so several can cross the middle band at once;
    // the active one is the last in page order that does. None crossing means the opening.
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const current = [...nav].reverse().find((n) => visible.has(n.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function onMove(e: React.PointerEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  // Slides are sticky, so a pinned slide reports its on-screen position (0) rather than its place
  // in the document. Sum the heights of everything before it to get the real scroll target.
  function go(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el || !el.parentElement) return;
    e.preventDefault();
    let y = 0;
    for (const sib of Array.from(el.parentElement.children)) {
      if (sib === el) break;
      y += (sib as HTMLElement).offsetHeight;
    }
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "auto" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4"
      style={{ bottom: "max(20px, env(safe-area-inset-bottom))", perspective: 600 }}
    >
      <motion.nav
        ref={ref}
        aria-label="Sections"
        onPointerMove={reduce ? undefined : onMove}
        onPointerLeave={reduce ? undefined : onLeave}
        style={reduce ? undefined : { rotateX, rotateY }}
        className="glass pointer-events-auto relative flex flex-nowrap items-center gap-0.5 whitespace-nowrap rounded-full p-1.5"
      >
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ background: sheen }}
          />
        )}
        <span className="relative hidden items-center pl-3 pr-2 sm:flex" title="Open to work">
          <span className="block size-1.5 rounded-full bg-accent" />
          <span className="sr-only">Open to work</span>
        </span>
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={`mono press relative rounded-full px-2 py-2 text-[10px] no-underline transition-colors duration-200 sm:px-3.5 sm:text-[11px] ${
                isActive ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          );
        })}
        <span aria-hidden className="mx-1 h-4 w-px bg-line-strong" />
        <a
          href={person.cv}
          target="_blank"
          rel="noreferrer"
          aria-label="Resume (PDF)"
          className="mono press relative flex items-center gap-1.5 rounded-full px-2 py-2 text-[10px] text-muted no-underline transition-colors duration-200 hover:text-text sm:px-3.5 sm:text-[11px]"
        >
          <FileText size={14} strokeWidth={1.5} aria-hidden className="sm:hidden" />
          <span className="hidden sm:inline">Resume</span>
        </a>
      </motion.nav>
    </div>
  );
}
