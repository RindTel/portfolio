"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMediaQuery } from "@/components/useMediaQuery";
import { useReducedMotion } from "motion/react";
import type { Pipeline as PipelineData } from "@/content/site";

const H = 30;
const STEP = 0.34; // seconds per edge
// Horizontal (wide screens): stages left to right, branches as rows.
const HX = { stage: 150, branch: 58, padX: 6, padY: 12 };
// Vertical (narrow screens): stages top to bottom, branches as columns.
const VX = { stage: 52, branch: 168, padX: 6, padY: 6 };


function nodeWidth(label: string) {
  return Math.round(label.length * 6.9 + 22);
}

export function Pipeline({ data, active }: { data: PipelineData; active: boolean }) {
  const packetRefs = useRef<(SVGAnimateMotionElement | null)[]>([]);
  const vertical = useMediaQuery("(max-width: 767px)");
  const reduce = useReducedMotion();
  const lit = reduce ? true : active;

  const layout = useMemo(() => {
    const pos = new Map<string, { x: number; y: number; w: number }>();
    for (const n of data.nodes) {
      const w = nodeWidth(n.label);
      pos.set(
        n.id,
        vertical
          ? { x: VX.padX + n.row * VX.branch, y: VX.padY + n.col * VX.stage, w }
          : { x: HX.padX + n.col * HX.stage, y: HX.padY + n.row * HX.branch, w }
      );
    }
    // Depth = longest path from any source, so a node lights when its last input arrives.
    const depth = new Map<string, number>();
    const incoming = (id: string) => data.edges.filter((e) => e.to === id);
    const d = (id: string): number => {
      if (depth.has(id)) return depth.get(id)!;
      const ins = incoming(id);
      const v = ins.length ? Math.max(...ins.map((e) => d(e.from))) + 1 : 0;
      depth.set(id, v);
      return v;
    };
    data.nodes.forEach((n) => d(n.id));

    const edgePath = (from: string, to: string) => {
      const a = pos.get(from)!;
      const b = pos.get(to)!;
      if (vertical) {
        // Fixed anchor per column so a linear chain of uneven-width nodes reads as one straight line.
        const x1 = a.x + 24;
        const y1 = a.y + H;
        const x2 = b.x + 24;
        const y2 = b.y;
        const c = Math.max(10, (y2 - y1) * 0.5);
        return `M ${x1} ${y1} C ${x1} ${y1 + c}, ${x2} ${y2 - c}, ${x2} ${y2}`;
      }
      const x1 = a.x + a.w;
      const y1 = a.y + H / 2;
      const x2 = b.x;
      const y2 = b.y + H / 2;
      const c = Math.max(24, (x2 - x1) * 0.5);
      return `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
    };

    // One packet per source-to-sink path, so every branch animates.
    const packets: { path: string; dur: number }[] = [];
    const walk = (id: string, path: string, hops: number) => {
      const outs = data.edges.filter((e) => e.from === id);
      if (!outs.length) {
        if (hops) packets.push({ path, dur: hops * STEP });
        return;
      }
      for (const e of outs) walk(e.to, (path ? path + " " : "") + edgePath(e.from, e.to), hops + 1);
    };
    data.nodes.filter((n) => !incoming(n.id).length).forEach((n) => walk(n.id, "", 0));

    const maxX = Math.max(...data.nodes.map((n) => pos.get(n.id)!.x + pos.get(n.id)!.w));
    const maxY = Math.max(...data.nodes.map((n) => pos.get(n.id)!.y + H));
    return { pos, depth, edgePath, packets, width: maxX + (vertical ? VX.padX : HX.padX), height: maxY + (vertical ? VX.padY : HX.padY) };
  }, [data, vertical]);

  // Play only on the false -> true edge of `active`. Seeding with the initial value means a
  // component that mounts while already hovered (hot reload, re-keyed layout) does not replay.
  const wasActive = useRef(active);
  useEffect(() => {
    const rising = active && !wasActive.current;
    wasActive.current = active;
    if (!rising || reduce) return;
    packetRefs.current.forEach((el) => el?.beginElement());
  }, [active, reduce]);

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      width={vertical ? layout.width : "100%"}
      style={{ display: "block", maxWidth: "100%" }}
      aria-label="System diagram"
      role="img"
    >
      {data.edges.map((e) => (
        <path
          key={`${e.from}-${e.to}`}
          d={layout.edgePath(e.from, e.to)}
          fill="none"
          stroke="rgb(255 255 255 / 0.16)"
          strokeWidth={1}
        />
      ))}
      {data.nodes.map((n) => {
        const p = layout.pos.get(n.id)!;
        const delay = layout.depth.get(n.id)! * STEP;
        return (
          <g
            key={n.id}
            style={{
              opacity: lit ? 1 : 0.7,
              transition: lit ? `opacity 220ms ease ${delay}s` : "opacity 140ms ease",
            }}
          >
            <rect
              x={p.x}
              y={p.y}
              width={p.w}
              height={H}
              rx={4}
              fill="#111316"
              stroke={lit ? "rgb(255 255 255 / 0.24)" : "rgb(255 255 255 / 0.12)"}
              style={{ transition: lit ? `stroke 220ms ease ${delay}s` : "stroke 140ms ease" }}
            />
            <text
              x={p.x + p.w / 2}
              y={p.y + H / 2 + 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={11}
              letterSpacing="0.08em"
              fill="#e8eaed"
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      {!reduce &&
        layout.packets.map((pk, i) => (
          <circle key={`${vertical}-${i}`} r={3} fill="#8fd3e4" style={{ opacity: active ? 1 : 0, transition: "opacity 140ms ease" }}>
            <animateMotion
              ref={(el) => {
                packetRefs.current[i] = el as SVGAnimateMotionElement | null;
              }}
              dur={`${pk.dur}s`}
              path={pk.path}
              begin="indefinite"
              fill="freeze"
              calcMode="paced"
            />
          </circle>
        ))}
    </svg>
  );
}
