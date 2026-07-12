import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Self-hosted at build time and served from /_next/static. A remote @import in
// globals.css doesn't survive the build — Tailwind v4 owns @import handling and
// strips remote URLs — so the fonts silently never loaded. This also keeps the
// app free of any cross-origin dependency, letting the CSP drop both Google hosts.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-jetbrains",
});
 
export const metadata: Metadata = {
  // The live site. rindrittelaku.dev does not resolve — set NEXT_PUBLIC_SITE_URL
  // to switch to a custom domain once its DNS is actually pointed at Vercel.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rindrittelaku.vercel.app",
  ),
  title: "Rindrit Telaku · Data Engineer",
  description: "Data engineer building pipelines, intelligent retrieval systems, and backend infrastructure. Based in Pristina.",
  keywords: ["data engineer", "data pipelines", "RAG", "backend", "infrastructure", "Python", "portfolio"],
  authors: [{ name: "Rindrit Telaku" }],
  verification: { google: "FCGDLkUcpZrrP2Np639IVF9WvGRxw6HQJ1H4pXRvGlQ" },
  // No `images`, `icons` or `manifest` keys here on purpose: they are generated
  // by app/opengraph-image.tsx, app/icon.tsx, app/apple-icon.tsx and
  // app/manifest.ts. Declaring them here would override those file conventions
  // and re-point the tags at the /og-image.png and /favicon.ico that never
  // existed in public/ — which is exactly how they came to 404.
  openGraph: {
    title: "Rindrit Telaku · Data Engineer",
    description: "Pipelines, intelligent systems, backend infrastructure.",
    type: "website",
    url: "/",
    siteName: "Rindrit Telaku",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rindrit Telaku · Data Engineer",
    description: "Pipelines, intelligent systems, backend infrastructure.",
  },
  robots: { index: true, follow: true },
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0d1017" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}