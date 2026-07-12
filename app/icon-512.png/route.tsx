import { iconMark } from "@/app/components/icon-mark";

// Served at /icon-512.png. Chrome wants a 512 in the manifest for the install
// prompt and the splash screen.

// The mark never changes, so prerender it at build time rather than paying a
// server render on every cache miss.
export const dynamic = "force-static";

export function GET() {
  return iconMark(512);
}
