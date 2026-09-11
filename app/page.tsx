import { Opening } from "@/components/Opening";
import { Project } from "@/components/Project";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Runway, Slide } from "@/components/Deck";
import { person, projects } from "@/content/site";

export default function Home() {
  const total = String(projects.length).padStart(2, "0");
  const n = projects.length;
  return (
    <main className="relative">
      <Opening />
      <Runway />
      <Slide index={0} last={false} id="about" label="About">
        <About />
      </Slide>
      <Slide index={1} last={false} id="experience" label="Experience">
        <Experience />
      </Slide>
      {projects.map((p, i) => (
        <Slide key={p.slug} index={2 + i} last={false} id={i === 0 ? "work" : undefined} label="Selected work" counter={`${p.index} / ${total}`}>
          <Project project={p} priority={i === 0} />
        </Slide>
      ))}
      <Slide index={2 + n} last id="contact" label="Contact">
        <div className="flex flex-1 items-center">
          <Contact />
        </div>
        <footer className="mono flex justify-between border-t border-line pb-16 pt-6 text-dim md:pb-0">
          <span>{person.name}</span>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </Slide>
    </main>
  );
}
