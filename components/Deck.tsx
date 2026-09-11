"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Scroll choreography for the whole page, in viewport heights: the opening is pinned for the
// whole deck, the first RUNWAY viewports of scroll play its reveal, then each slide rises over
// whatever is pinned beneath it.
export const RUNWAY = 0.8;

export function Runway() {
  const reduce = useReducedMotion();
  return <div aria-hidden style={{ height: reduce ? 0 : `${RUNWAY * 100}vh` }} />;
}

export function Slide({
  index,
  last,
  id,
  label,
  counter,
  children,
}: {
  index: number;
  last: boolean;
  id?: string;
  label: string;
  counter?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const stacked = !reduce;
  const { scrollY } = useScroll();

  // A slide taller than the viewport pins with a negative top so its bottom edge stops at the
  // viewport bottom and every line stays reachable; a shorter slide pins at the top.
  const [top, setTop] = useState(0);
  // Scroll position at which the next slide starts entering the viewport.
  const coverStart = useRef(Infinity);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const measure = () => {
      const h = window.innerHeight;
      const own = el.offsetHeight;
      setTop(Math.min(0, h - own));
      let flowTop = 0;
      for (const sib of Array.from(el.parentElement!.children)) {
        if (sib === el) break;
        flowTop += (sib as HTMLElement).offsetHeight;
      }
      coverStart.current = flowTop + own - h;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // 0 while this slide is on top, 1 once the next slide fully covers it.
  const cover = useTransform(scrollY, (y) => {
    if (!stacked || last || typeof window === "undefined") return 0;
    return Math.min(1, Math.max(0, (y - coverStart.current) / window.innerHeight));
  });
  const transform = useTransform(cover, (c) => `scale(${1 - c * 0.06}) translate3d(0, ${-c * 32}px, 0)`);
  const filter = useTransform(cover, (c) => `brightness(${1 - c * 0.55})`);

  return (
    <motion.section
      ref={ref}
      id={id}
      data-slide={index}
      className={`bg-bg ${stacked ? "sticky md:min-h-screen" : "relative"} ${index === 0 ? "" : "border-t border-line"}`}
      style={stacked ? { top, transform, filter, transformOrigin: "50% 20%" } : undefined}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-5 py-14 md:px-10 md:py-8 md:min-h-screen 2xl:max-w-[1680px]">
        <div className="mono flex items-center justify-between border-b border-line pb-4 text-dim">
          <span>{label}</span>
          {counter && <span>{counter}</span>}
        </div>
        <div className="flex flex-1 flex-col justify-center pt-10 md:pt-6">{children}</div>
      </div>
    </motion.section>
  );
}
