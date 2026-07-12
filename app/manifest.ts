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
  };
}
