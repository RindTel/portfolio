import { iconMark } from "@/app/components/icon-mark";

// Served at /icon-maskable-512.png. Android crops home-screen icons to whatever
// shape the launcher uses, so this one pulls the mark well inside the safe zone
// and lets the background bleed to the edge. It is a separate file from
// icon-512 on purpose: an icon declared "any maskable" gets used for both, and
// the padding that saves it from the crop makes it look shrunken everywhere it
// isn't cropped.

// The mark never changes, so prerender it at build time rather than paying a
// server render on every cache miss.
export const dynamic = "force-static";

export function GET() {
  return iconMark(512, 0.55);
}
