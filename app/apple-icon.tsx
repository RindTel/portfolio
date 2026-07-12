import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon. Same mark as icon.tsx, scaled — iOS masks the corners
// itself, so this fills the square rather than rounding it.
export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "6px solid #4ade80",
            borderRadius: 28,
            fontSize: 76,
            fontWeight: 700,
            color: "#4ade80",
            letterSpacing: -4,
          }}
        >
          R
        </div>
      </div>
    ),
    { ...size },
  );
}
