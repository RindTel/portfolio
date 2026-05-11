import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rindrittelaku.dev"),
  title: "Rindrit Telaku",
  description: "Computer Science student specializing in AI systems, distributed architectures, and full-stack engineering. Building intelligent, scalable software.",
  keywords: ["software engineer", "computer science", "AI", "machine learning", "full-stack", "portfolio", "RAG", "distributed systems"],
  authors: [{ name: "Rindrit Telaku" }],
  verification: {
  google: "FCGDLkUcpZrrP2Np639IVF9WvGRxw6HQJ1H4pXRvGlQ",
},
  openGraph: {
    title: "Rindrit Telaku",
    description: "CS student specializing in AI systems, distributed architectures, and full-stack engineering.",
    type: "website",
    url: "https://rindrittelaku.dev",
    siteName: "Rindrit Telaku Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rindrit Telaku Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rindrit Telaku",
    description: "CS student specializing in AI systems and distributed architectures.",
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
        <meta name="theme-color" content="#080a0f" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
