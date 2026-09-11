import { ImageResponse } from "next/og";

// The "R" mark at any canvas size, shared by the apple icon and the PWA icon routes so they
// cannot drift apart. Ratios are fractions of the inner box, so glyph, border and radius scale
// together. `inset` is the inner box as a fraction of the canvas; Android maskable icons are
// cropped to a centre circle of ~80% diameter, and a 0.55 box keeps the corners inside it.
const BORDER = 6 / 132;
const RADIUS = 28 / 132;
const FONT = 76 / 132;
const TRACKING = -4 / 132;

export function iconMark(canvas: number, inset = 132 / 180) {
  const box = Math.round(canvas * inset);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0b0d" }}>
        <div
          style={{
            width: box,
            height: box,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `${Math.round(box * BORDER)}px solid #8fd3e4`,
            borderRadius: Math.round(box * RADIUS),
            fontSize: Math.round(box * FONT),
            fontWeight: 700,
            color: "#8fd3e4",
            letterSpacing: Math.round(box * TRACKING),
          }}
        >
          R
        </div>
      </div>
    ),
    { width: canvas, height: canvas }
  );
}
