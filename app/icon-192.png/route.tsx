import { iconMark } from "@/app/components/icon-mark";

// Served at /icon-192.png. A route rather than a Next icon convention because
// manifest.ts has to reference a stable URL, and the convention emits a
// build-hashed one (/icon?<hash>).

// The mark never changes, so prerender it at build time rather than paying a
// server render on every cache miss.
export const dynamic = "force-static";

export function GET() {
  return iconMark(192);
}
