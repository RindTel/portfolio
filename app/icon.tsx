import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon. Palette matches globals.css: --bg, --green, --bg again for the glyph.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1017",
          border: "2px solid #4ade80",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#4ade80",
            letterSpacing: -1,
            display: "flex",
          }}
        >
          R
        </div>
      </div>
    ),
    { ...size },
  );
}
