import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
 
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rindrittelaku.dev"),
  title: "Rindrit Telaku · Data Engineer",
  description: "Data engineer building pipelines, intelligent retrieval systems, and backend infrastructure. Based in Pristina.",
  keywords: ["data engineer", "data pipelines", "RAG", "backend", "infrastructure", "Python", "portfolio"],
  authors: [{ name: "Rindrit Telaku" }],
  verification: { google: "FCGDLkUcpZrrP2Np639IVF9WvGRxw6HQJ1H4pXRvGlQ" },
  openGraph: {
    title: "Rindrit Telaku · Data Engineer",
    description: "Pipelines, intelligent systems, backend infrastructure.",
    type: "website",
    url: "https://rindrittelaku.dev",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}