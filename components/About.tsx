import { Glass } from "@/components/Glass";
import { about } from "@/content/site";

function Tags({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="mono w-24 text-dim">{label}</span>
      <ul className="flex flex-wrap gap-1.5" aria-label={label}>
        {items.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  const [based, currently, openTo] = about.facts;
  return (
    <div className="grid w-full grid-cols-12 gap-x-6 gap-y-6">
      <Glass tilt={1.5} className="col-span-12 flex flex-col justify-between gap-10 rounded-[14px] p-7 lg:col-span-7 md:p-9">
        <p className="max-w-[30ch] text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.3] tracking-[-0.02em] text-text">{about.intro}</p>
        <p className="mono text-dim">{based.value}</p>
      </Glass>

      <Glass tilt={2} className="col-span-12 flex flex-col gap-7 rounded-[14px] p-7 md:p-9 lg:col-span-5">
        <div className="flex items-center gap-2.5">
          <span className="block size-1.5 rounded-full bg-accent" aria-hidden />
          <span className="mono text-text">Open to work</span>
        </div>
        <div className="grid gap-6">
          {[currently, openTo].map((f) => (
            <div key={f.label} className="grid gap-1.5">
              <p className="mono text-dim">{f.label}</p>
              <p className="max-w-[30ch] text-[16px] leading-[1.45] text-text">{f.value}</p>
            </div>
          ))}
        </div>
      </Glass>

      <ol className="col-span-12 grid gap-x-6 gap-y-6 border-t border-line pt-6 md:grid-cols-3">
        {about.strengths.map((s, i) => (
          <li key={s.label}>
            <span className="mono text-dim">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-[16px] text-text">{s.label}</p>
            <p className="mt-1.5 max-w-[34ch] text-[14px] leading-[1.55] text-muted">{s.detail}</p>
          </li>
        ))}
      </ol>

      <div className="col-span-12 grid gap-3 border-t border-line pt-6">
        <Tags label="Core stack" items={about.stack} />
        <Tags label="Interests" items={about.interests} />
      </div>
    </div>
  );
}
