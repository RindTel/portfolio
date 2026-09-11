import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Glass } from "@/components/Glass";
import { contact, person } from "@/content/site";

const pill = "pill mono";

export function Contact() {
  return (
    <div className="grid w-full grid-cols-12 items-center gap-x-8 gap-y-14">
      <div className="col-span-12 lg:col-span-5">
        <p className="max-w-[34ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.5] text-muted">{contact.heading}</p>
        <div className="mt-8 flex flex-col items-start gap-3">
          <Glass as="a" press href={`mailto:${person.email}`} className={`${pill} normal-case tracking-normal`}>
            <Mail size={15} strokeWidth={1.5} aria-hidden className="text-accent" />
            {person.email}
          </Glass>
          <div className="flex flex-wrap gap-3">
            <Glass as="a" press href={person.github} target="_blank" rel="noreferrer" className={pill}>
              GitHub <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden className="text-muted" />
            </Glass>
            <Glass as="a" press href={person.linkedin} target="_blank" rel="noreferrer" className={pill}>
              LinkedIn <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden className="text-muted" />
            </Glass>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <ContactForm />
      </div>
    </div>
  );
}
