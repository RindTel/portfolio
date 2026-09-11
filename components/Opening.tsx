"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RUNWAY } from "@/components/Deck";
import { person } from "@/content/site";

export function Opening() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Progress of the reveal over the first RUNWAY viewports of scroll.
  const p = useTransform(scrollY, (y) =>
    typeof window === "undefined" ? 0 : Math.min(1, Math.max(0, y / (RUNWAY * window.innerHeight)))
  );

  const wdth = useTransform(p, [0, 0.8], [118, 100]);
  const nameVariation = useMotionTemplate`"wdth" ${wdth}, "wght" 800`;
  const nameY = useTransform(p, [0, 0.8], [0, -28]);
  const nameTransform = useMotionTemplate`translate3d(0, ${nameY}px, 0)`;
  const nameOpacity = useTransform(p, [0.2, 0.85], [1, 0.42]);

  const roleClip = useTransform(p, [0.15, 0.5], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const roleY = useTransform(p, [0.15, 0.5], [14, 0]);
  const roleTransform = useMotionTemplate`translate3d(0, ${roleY}px, 0)`;
  const stmtClip = useTransform(p, [0.4, 0.85], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const stmtY = useTransform(p, [0.4, 0.85], [14, 0]);
  const stmtTransform = useMotionTemplate`translate3d(0, ${stmtY}px, 0)`;

  return (
    <section
      className={`flex min-h-[100dvh] flex-col justify-center px-5 pt-[15vh] md:justify-end md:px-10 md:pt-0 md:pb-[14vh] ${reduce ? "" : "sticky top-0"}`}
    >
      <motion.h1
        className="display text-[clamp(3.5rem,15.5vw,13rem)] 2xl:text-[clamp(13rem,11vw,17rem)]"
        style={
          reduce
            ? { fontVariationSettings: '"wdth" 104, "wght" 800' }
            : { fontVariationSettings: nameVariation, transform: nameTransform, opacity: nameOpacity }
        }
      >
        {person.first}
        <br />
        {person.last}
      </motion.h1>

      <div className="mt-8 grid gap-4 md:mt-10">
        <motion.p
          className="mono text-[14px] text-accent md:text-[16px]"
          style={reduce ? undefined : { clipPath: roleClip, transform: roleTransform }}
        >
          {person.role}
        </motion.p>
        <motion.p
          className="max-w-[28ch] text-[clamp(1.25rem,2.4vw,1.9rem)] leading-[1.2] tracking-[-0.02em] text-text"
          style={reduce ? undefined : { clipPath: stmtClip, transform: stmtTransform }}
        >
          {person.statement}
        </motion.p>
      </div>
    </section>
  );
}
