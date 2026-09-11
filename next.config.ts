import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Dev-only allowances, neither of which reaches production:
//  - 'unsafe-eval': `next dev` uses eval-based sourcemaps and React Refresh.
//  - va.vercel-scripts.com: Speed Insights loads its debug script from there in dev.
//    In prod it resolves to /_vercel/speed-insights/script.js (same-origin).
const devScript = isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : "";
const devConnect = isDev ? " https://va.vercel-scripts.com" : "";

// Strict policy for the app itself. No CDN origins, no 'unsafe-eval' in prod.
// - 'unsafe-inline' (script): the App Router emits inline hydration scripts.
// - 'unsafe-inline' (style): Motion and Lenis set inline styles.
// - No font hosts: next/font self-hosts Archivo and JetBrains Mono into /_next/static.
// - img-src data: the grain overlay is an SVG data URI.
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

// The demo pages in public/demos are standalone HTML that pull charting libs from CDNs,
// so they get their own, looser policy and the app above does not inherit it.
// - 'unsafe-eval': Plotly uses new Function() internally.
// - 'unsafe-inline' (script): the RAG demo uses attribute handlers, some generated at runtime.
// - img-src https:: Leaflet pulls map tiles from cartocdn.
// - connect-src cdn.plot.ly: the scattergeo map fetches its topojson at runtime.
const demoCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.plot.ly https://unpkg.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://cdn.plot.ly",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
        },
        // Nothing opens a cross-origin popup; CORP stops other origins loading our assets
        // as subresources without affecting top-level navigation or link-preview crawlers.
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        // One year of HSTS, no includeSubDomains, no preload. Inert over http://localhost.
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
      ],
    },
    // headers() merges every matching rule, so these two sources stay mutually exclusive:
    // everything except /demos/* gets the app policy, /demos/* gets the demo policy.
    {
      source: "/((?!demos/).*)",
      headers: [
        { key: "Content-Security-Policy", value: appCsp },
        // Every cross-origin resource the app loads is a CORS XHR (EmailJS), so require-corp
        // holds. Any cross-origin asset added later without a CORP header will be blocked.
        { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
      ],
    },
    {
      source: "/demos/:file(foviq\\.html|transit-lens\\.html|rag\\.html)",
      headers: [
        { key: "Content-Security-Policy", value: demoCsp },
        // cdn.plot.ly and cartocdn tiles send no CORP header, so the demos use credentialless
        // (Safari treats it as unsafe-none; the demos still render there).
        { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
      ],
    },
  ],
};

export default nextConfig;
