import { ImageResponse } from "next/og";

// Archivo fetched as a text-subsetted TTF at build time; null if the fetch fails, in which case
// the renderer's default sans is used.
export async function archivo(weight: 400 | 800, text: string) {
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

// The "RT" monogram at any canvas size, shared by the favicon, the Apple icon and the PWA icon
// routes so they cannot drift apart. `inset` shrinks the lettering toward the centre; Android
// maskable icons are cropped to a circle of ~80% diameter, so 0.62 keeps the letters inside it.
export async function iconMark(canvas: number, inset = 0.78) {
  const font = await archivo(800, "RT");
  const fontSize = Math.round(canvas * inset * 0.62);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0d",
          borderRadius: Math.round(canvas * 0.22),
          fontFamily: font ? "Archivo" : undefined,
          fontSize,
          fontWeight: 800,
          letterSpacing: -fontSize * 0.06,
          color: "#e8eaed",
        }}
      >
        RT
      </div>
    ),
    { width: canvas, height: canvas, fonts: font ? [{ name: "Archivo", data: font, weight: 800, style: "normal" }] : undefined }
  );
}
