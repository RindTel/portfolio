import { Glass } from "@/components/Glass";
import { experience } from "@/content/site";

export function Experience() {
  return (
    <div className="grid gap-12">
      {experience.map((job) => (
        <article key={job.company} className="grid grid-cols-12 items-center gap-x-8 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Glass className="inline-flex items-center gap-3 rounded-full py-2 pl-3 pr-4">
              {job.current && <span className="block size-1.5 rounded-full bg-accent" aria-hidden />}
              <span className="mono text-muted">
                {job.start} - {job.end}
              </span>
              <span className="mono text-dim">{job.mode}</span>
            </Glass>
            <h3 className="mt-6 text-[clamp(1.7rem,3.2vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              {job.role}
              <span className="block font-normal text-muted">at {job.company}</span>
            </h3>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-text/85 md:text-[17px]">{job.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
              {job.stack.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <ul className="col-span-12 grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {job.highlights.map((h) => (
              <Glass as="li" tilt={2} key={h.label} className="rounded-[14px] p-6">
                <p className="mono text-dim">{h.label}</p>
                <p className="mt-2 text-[15px] leading-[1.5] text-text/90">{h.detail}</p>
              </Glass>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
