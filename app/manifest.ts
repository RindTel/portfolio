import type { MetadataRoute } from "next";

// Replaces the /site.webmanifest that layout.tsx referenced but that never
// existed in public/. Next serves this at /manifest.webmanifest and links it.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rindrit Telaku · Data Engineer",
    short_name: "Rindrit Telaku",
    description:
      "Data engineer building pipelines, intelligent retrieval systems, and backend infrastructure.",
    start_url: "/",
    // "browser", not "standalone": this is a site, not an app. Chrome's
    // installability check requires a standalone/fullscreen/minimal-ui display
    // AND 192+512 icons, so declaring "browser" keeps the install prompt out of
    // the omnibox even though the icons below satisfy the rest of the checklist.
    display: "browser",
    background_color: "#0d1017",
    theme_color: "#0d1017",
    // Still worth shipping without installability: these are what a home-screen
    // bookmark and the Android task switcher use, and a "standalone" manifest
    // with no icons installs blank. The maskable variant is what Android crops.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
