import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon. At 32px an inner box turns to mush, so the border sits on the outer edge.
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
          background: "#0a0b0d",
          border: "2px solid #8fd3e4",
          borderRadius: 6,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: "#8fd3e4", letterSpacing: -1, display: "flex" }}>R</div>
      </div>
    ),
    size
  );
}
