import type { MetadataRoute } from "next";
import { person } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} · ${person.role}`,
    short_name: person.name,
    description: `${person.role}. ${person.statement}`,
    start_url: "/",
    // "browser", not "standalone": this is a site, not an installable app.
    display: "browser",
    background_color: "#0a0b0d",
    theme_color: "#0a0b0d",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
