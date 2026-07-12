import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Two dev-only allowances, neither of which reaches production:
//  - 'unsafe-eval': `next dev` uses eval-based sourcemaps and React Refresh.
//  - va.vercel-scripts.com: Speed Insights loads its debug script from there in
//    dev. In prod it resolves to /_vercel/speed-insights/script.js (same-origin,
//    proxied by Vercel), so 'self' already covers it.
const devScript = isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : "";
const devConnect = isDev ? " https://va.vercel-scripts.com" : "";

// Strict policy for the app itself. No CDN origins, no 'unsafe-eval' in prod.
// - 'unsafe-inline' (script): the App Router emits inline hydration scripts
//   (self.__next_f.push). Dropping it requires a nonce + middleware.
// - No font hosts: next/font/google self-hosts Inter + JetBrains Mono into
//   /_next/static at build time, so 'self' covers them. The app now makes zero
//   cross-origin requests apart from the contact form.
// - api.emailjs.com: the contact form posts to it from the browser.
const appCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devScript}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://api.emailjs.com${devConnect}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

// The demo pages in public/ are standalone HTML that pull charting libs from
// CDNs. They get their own, looser policy so the app above doesn't inherit it.
// - 'unsafe-eval': Plotly uses new Function() internally.
// - 'unsafe-inline' (script): rag_demo.html uses onclick=/onkeydown= attribute
//   handlers, some generated at runtime — hashes can't cover those.
// - img-src https:: Leaflet pulls map tiles from {s}.basemaps.cartocdn.com.
const demoCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.plot.ly https://unpkg.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Plotly doesn't bundle topojson: the scattergeo map in demo.html fetches its
  // geometry from cdn.plot.ly at runtime, which connect-src (not script-src)
  // governs. Without this the script loads but the map renders blank.
  "connect-src 'self' https://cdn.plot.ly",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const DEMO_FILES = ["demo.html", "demo_fundforge.html", "rag_demo.html"];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
        },
        // Nothing opens a cross-origin popup, so severing window.opener costs
        // nothing. CORP stops other origins loading our assets as subresources;
        // it doesn't affect top-level navigation (the resume PDF, the demo
        // links) or server-side link-preview crawlers fetching og-image.png.
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
      ],
    },
    // headers() merges every matching rule rather than stopping at the first,
    // so these two sources must stay mutually exclusive — two values for one
    // header key on the same path would conflict. Applies to CSP and COEP
    // alike, which is why both are set per-source rather than above.
    {
      source: `/((?!${DEMO_FILES.map((f) => f.replace(".", "\\.")).join("|")}).*)`,
      headers: [
        { key: "Content-Security-Policy", value: appCsp },
        // Verified: every cross-origin resource the app loads sends
        // CORP: cross-origin (both Google Fonts hosts), and the EmailJS call is
        // a CORS-mode XHR, which COEP doesn't restrict. So require-corp holds
        // here with no changes. Caveat: any cross-origin asset added later
        // without a CORP header will be silently blocked.
        { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
      ],
    },
    {
      source: `/:demo(${DEMO_FILES.map((f) => f.replace(".", "\\.")).join("|")})`,
      headers: [
        { key: "Content-Security-Policy", value: demoCsp },
        // The demos can't take require-corp: cdn.plot.ly (Plotly) and
        // *.basemaps.cartocdn.com (Leaflet tiles) send no CORP header, so it
        // would blank the charts and the map. credentialless loads them without
        // credentials instead and demands no CORP — neither needs cookies.
        // Safari ignores this value (treats it as unsafe-none): the demos just
        // aren't isolated there, they still render.
        { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
      ],
    },
  ],
};

export default nextConfig;
