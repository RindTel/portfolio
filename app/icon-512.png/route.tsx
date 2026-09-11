import { iconMark } from "@/app/icon-mark";

// Served at /icon-512.png. A route rather than a Next icon convention because manifest.ts needs a
// stable URL and the convention emits a build-hashed one. Prerendered at build time.
export const dynamic = "force-static";

export function GET() {
  return iconMark(512);
}
