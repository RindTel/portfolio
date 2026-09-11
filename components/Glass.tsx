"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useMediaQuery } from "@/components/useMediaQuery";

const spring = { stiffness: 220, damping: 26, mass: 0.6 };
const tags = { div: motion.div, a: motion.a, button: motion.button, li: motion.li } as const;

type Props = {
  as?: keyof typeof tags;
  tilt?: number; // max degrees of tilt toward the pointer
  press?: boolean; // scale down while pressed
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
    href?: string;
    target?: string;
    rel?: string;
    type?: "button" | "submit";
    disabled?: boolean;
  };

// A glass surface that reacts to the pointer the way the nav does: a radial sheen follows
// the cursor and the surface tilts a few degrees toward it. Static on touch and reduced motion.
export function Glass({ as = "div", tilt = 3, press = false, className = "", style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const live = useMediaQuery("(hover: hover) and (pointer: fine)") && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt]);
  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt]);
  const sheenX = useTransform(sx, (v) => `${v * 100}%`);
  const sheenY = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(140px 70px at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.11), transparent 70%)`;

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

  const M = tags[as];
  return (
    <M
      // @ts-expect-error the ref type varies with the rendered tag
      ref={ref}
      className={`glass relative overflow-hidden ${className}`}
      onPointerMove={live ? onMove : undefined}
      onPointerLeave={live ? onLeave : undefined}
      style={live ? { ...style, rotateX, rotateY, transformPerspective: 600 } : style}
      whileTap={press && !reduce ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", ...spring }}
      {...rest}
    >
      {live && <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: sheen }} />}
      {children}
    </M>
  );
}
