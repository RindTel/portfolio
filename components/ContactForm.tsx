"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";
import { Glass } from "@/components/Glass";
import { person } from "@/content/site";

// Sends client-side through EmailJS, same service, template and public key as the previous
// site. The public key is meant to live in the bundle; there is no server-side mail backend.
const EMAILJS = { service: "service_wcw7b5i", template: "template_6hqajnd", publicKey: "JI5fIGa9Fh8wNFVQL" };

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        { publicKey: EMAILJS.publicKey }
      );
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const field =
    "glass w-full rounded-[12px] px-4 py-3 text-[16px] text-text outline-none transition-colors placeholder:text-dim focus:border-accent/70";

  if (status === "sent") {
    return (
      <Glass tilt={1.5} className="rounded-[14px] p-7 md:p-9" role="status">
        <p className="mono text-accent">Message delivered</p>
        <p className="mt-3 text-[16px] leading-[1.5] text-text">I&apos;ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="link mono mt-6 cursor-pointer py-1">
          Send another
        </button>
      </Glass>
    );
  }

  const sending = status === "sending";
  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="mono text-dim">Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} className={field} />
        </label>
        <label className="grid gap-2">
          <span className="mono text-dim">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set("email")} className={field} />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="mono text-dim">Subject</span>
        <input name="subject" type="text" placeholder="Role, project or question" value={form.subject} onChange={set("subject")} className={field} />
      </label>
      <label className="grid gap-2">
        <span className="mono text-dim">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="The system, the data, and where you need help."
          value={form.message}
          onChange={set("message")}
          className={`${field} resize-none leading-[1.55]`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Glass as="button" press type="submit" disabled={sending} className={`pill mono ${sending ? "cursor-not-allowed text-muted" : "cursor-pointer"}`}>
          {sending ? "Sending" : "Send message"} <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
        </Glass>
        <span className="mono text-dim" aria-live="polite">
          {status === "error" ? (
            <>
              Failed to send. Email me directly at{" "}
              <a className="link py-0.5 lowercase" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </>
          ) : (
            "Replies within a day"
          )}
        </span>
      </div>
    </form>
  );
}
