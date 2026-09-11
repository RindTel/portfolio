"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "motion/react";
import { Glass } from "@/components/Glass";
import { Pipeline } from "@/components/Pipeline";
import { useMediaQuery } from "@/components/useMediaQuery";
import type { Project as ProjectData } from "@/content/site";

export function Project({ project, priority = false }: { project: ProjectData; priority?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const inView = useInView(diagramRef, { amount: 0.7, once: true });

  // Pointer devices play the pipeline on hover; touch devices play it once when the project is in view.
  const active = canHover ? hover : inView;

  return (
    <article
      ref={ref}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="grid grid-cols-12 items-center gap-x-8 gap-y-10"
    >
      <>
        <div className="col-span-12 lg:col-span-5">
          <p className="mono text-muted">{project.category}</p>
          <h3 className="mt-4 text-[clamp(2.2rem,4.8vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-balance">
            {project.name}
          </h3>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-text/90 md:text-[17px]">{project.description}</p>
          <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Glass as="a" press className="pill mono" href={project.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden className="text-muted" />
            </Glass>
            <Glass as="a" press className="pill mono" href={project.demo} target="_blank" rel="noreferrer">
              Live demo <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden className="text-muted" />
            </Glass>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Glass tilt={1.5} className="rounded-[14px] p-1.5" style={{ transition: "border-color 300ms ease", borderColor: active ? "rgb(255 255 255 / 0.18)" : undefined }}>
            <div
              className="w-full overflow-hidden rounded-[9px] bg-surface lg:max-h-[42vh]"
              style={{ aspectRatio: `${project.image.width} / ${project.image.height}` }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority={priority}
                className="h-full w-full object-cover object-top"
                style={{
                  filter: active ? "saturate(1) brightness(1)" : "saturate(0.55) brightness(0.82)",
                  transform: active ? "scale(1.015)" : "scale(1)",
                  transition: active
                    ? "filter 600ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)"
                    : "filter 250ms ease, transform 350ms ease",
                }}
              />
            </div>
          </Glass>
          <div ref={diagramRef} className="mt-5">
            <Pipeline data={project.pipeline} active={active} />
          </div>
          <ol className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-3">
            {project.notes.map((n, i) => (
              <li key={n.label}>
                <p className="mono text-dim">
                  <span className="mr-3">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">{n.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </>
    </article>
  );
}
