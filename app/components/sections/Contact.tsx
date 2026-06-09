"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
 
const socials = [
  { label: "github",   value: "github.com/RindTel",            href: "https://github.com/RindTel" },
  { label: "linkedin", value: "linkedin.com/in/rindrittelaku", href: "https://linkedin.com/in/rindrittelaku" },
  { label: "email",    value: "rindritelaku@gmail.com",        href: "mailto:rindritelaku@gmail.com" },
  { label: "resume",   value: "RindritTelakuCV.pdf",               href: "/RindritTelakuCV.pdf" },
  { label: "location", value: "Pristina, Kosovo",             href: undefined },
];
 
const fieldStyle: React.CSSProperties = {
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  padding: "0.65rem 0.85rem",
  width: "100%",
  outline: "none",
  lineHeight: 1.5,
};
 
export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
 
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_wcw7b5i", "template_6hqajnd",
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        { publicKey: "JI5fIGa9Fh8wNFVQL" }
      );
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      alert("failed to send. try email directly.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <section id="contact" style={{ padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }} ref={ref}>
        <p className="section-tag">contact</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }} className="contact-grid">
 
          {/* Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <h2 style={{
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}>
              Get in touch
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "2rem" }}>
              Roles, collaborations, or a hard data problem worth solving.
              Send it over, I reply within a day.
            </p>
 
            {/* terminal label */}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--text-muted)", letterSpacing: "0.06em",
              marginBottom: "0.5rem",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <span style={{ color: "var(--green)" }}>$</span>
              send-message --to rindritelaku@gmail.com
            </div>
 
            {sent ? (
              <div style={{
                border: "1px solid var(--border)", padding: "2rem",
                background: "var(--surface)",
              }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)", marginBottom: "0.25rem" }}>
                  ✓ message delivered
                </p>
                <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      required style={fieldStyle}
                      onFocus={e => (e.target.style.borderColor = "var(--border-mid)")}
                      onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                  <div>
                    <label style={labelStyle}>email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      required style={fieldStyle}
                      onFocus={e => (e.target.style.borderColor = "var(--border-mid)")}
                      onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={fieldStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--border-mid)")}
                    onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <div>
                  <label style={labelStyle}>message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    required style={{ ...fieldStyle, resize: "vertical", minHeight: 130 }}
                    onFocus={e => (e.target.style.borderColor = "var(--border-mid)")}
                    onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "none",
                    border: `1px solid ${loading ? "var(--border)" : "var(--green-border)"}`,
                    color: loading ? "var(--text-muted)" : "var(--green)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12, letterSpacing: "0.06em",
                    padding: "0.75rem 1.25rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "var(--green-dim)"; }}
                  onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "none"; }}
                >
                  {loading ? "sending..." : "$ send →"}
                </button>
              </form>
            )}
          </motion.div>
 
          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--text-muted)", letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "0.75rem",
            }}>
              links
            </p>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {socials.map(s => (
                <div key={s.label} style={{
                  display: "grid", gridTemplateColumns: "80px 1fr",
                  padding: "0.8rem 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "center", gap: "1rem",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
                    {s.label}
                  </span>
                  {s.href ? (
                    <a href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ fontSize: 14, color: "var(--text-secondary)", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                      {s.value} ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{s.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
 
      <style>{`
        @media (max-width: 680px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
 
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  color: "var(--text-muted)",
  letterSpacing: "0.08em",
  marginBottom: "0.35rem",
};