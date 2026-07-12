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
    display: "standalone",
    background_color: "#0d1017",
    theme_color: "#0d1017",
    // Without these, a "standalone" manifest installs to the home screen with a
    // blank icon. 192 and 512 are what Chrome requires to consider the site
    // installable at all; the maskable variant is what Android actually crops.
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
