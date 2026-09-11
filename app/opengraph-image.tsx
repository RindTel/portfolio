import { ImageResponse } from "next/og";
import { person } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name}, ${person.role}`;

// Archivo, fetched as text-subsetted TTFs at build time (800 for the initials, 400 for the
// rest). If a fetch fails the card still renders in the renderer's default sans.
async function archivo(weight: 400 | 800, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const initials = person.first[0] + person.last[0];
  const rest = `${person.role} ${person.name} rindrittelaku.vercel.app ${person.location}`;
  const [heavy, regular] = await Promise.all([archivo(800, initials), archivo(400, rest + rest.toUpperCase())]);
  const fonts = [
    heavy && { name: "Archivo", data: heavy, weight: 800 as const, style: "normal" as const },
    regular && { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(700px 420px at 88% -10%, rgba(143,211,228,0.10), transparent 65%), #0a0b0d",
          padding: "64px 80px 56px",
          color: "#e8eaed",
          fontFamily: fonts.length ? "Archivo" : undefined,
          fontWeight: 400,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "#8fd3e4", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#7b828c" }}>
            {person.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 300,
              fontWeight: 800,
              letterSpacing: -18,
              lineHeight: 0.9,
              color: "#e8eaed",
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: "#9aa1aa", letterSpacing: -0.5 }}>
            {person.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 24,
            fontSize: 20,
            color: "#7b828c",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>rindrittelaku.vercel.app</div>
          <div style={{ display: "flex" }}>{person.location}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
