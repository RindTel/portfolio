import { ImageResponse } from "next/og";

// The "R" mark at any canvas size, shared by apple-icon.tsx and the PWA icon
// routes so they can't drift apart. Every ratio below is apple-icon.tsx's
// original 180px geometry expressed as a fraction of the *inner box*, not the
// canvas — so the glyph, its border and its corner radius all scale together
// with the box. (Keying them to the canvas instead leaves the R at full size
// inside a shrunken box, which is exactly how it goes wrong.) Rendering at 180
// with the default inset reproduces the original icon exactly.
//
// `inset` is the inner box as a fraction of the canvas. Android maskable icons
// are cropped to a centre circle of ~80% diameter, and a 0.55 box has a 0.78
// diagonal — just inside that safe zone — so the corners survive the crop.
// app/icon.tsx is deliberately NOT built from this: at 32px an inner box turns
// to mush, so the favicon puts the border on the outer edge instead.
const BORDER = 6 / 132;
const RADIUS = 28 / 132;
const FONT = 76 / 132;
const TRACKING = -4 / 132;

export function iconMark(canvas: number, inset = 132 / 180) {
  const box = Math.round(canvas * inset);

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
            width: box,
            height: box,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `${Math.round(box * BORDER)}px solid #4ade80`,
            borderRadius: Math.round(box * RADIUS),
            fontSize: Math.round(box * FONT),
            fontWeight: 700,
            color: "#4ade80",
            letterSpacing: Math.round(box * TRACKING),
          }}
        >
          R
        </div>
      </div>
    ),
    { width: canvas, height: canvas },
  );
}
