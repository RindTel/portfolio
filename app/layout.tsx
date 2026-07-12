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
  openGraph: {
    title: "Rindrit Telaku · Data Engineer",
    description: "Pipelines, intelligent systems, backend infrastructure.",
    type: "website",
    url: "/",
    siteName: "Rindrit Telaku",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rindrit Telaku · Data Engineer",
    description: "Pipelines, intelligent systems, backend infrastructure.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}