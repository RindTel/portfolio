"use client";
import { useEffect } from "react";

export default function ScrollHandler() {
  useEffect(() => {
    // Prevent browser from auto-restoring scroll position on back navigation.
    // We handle it manually so the page hydrates fully before scrolling to the anchor.
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";

      // If the URL has an anchor hash on load/back-navigation, scroll to it
      // after the page has had a chance to render.
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  return null;
}
