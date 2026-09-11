import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { person } from "@/content/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description = `${person.role} building data pipelines, retrieval systems and production ingestion on AWS. Based in ${person.location}.`;

export const metadata: Metadata = {
  // The live site. Set NEXT_PUBLIC_SITE_URL to switch to a custom domain once its DNS points at Vercel.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rindrittelaku.vercel.app"),
  title: `${person.name} · ${person.role}`,
  description,
  keywords: ["data engineer", "AI engineer", "data pipelines", "RAG", "dbt", "DuckDB", "AWS", "Python", "portfolio"],
  authors: [{ name: person.name }],
  verification: { google: "FCGDLkUcpZrrP2Np639IVF9WvGRxw6HQJ1H4pXRvGlQ" },
  // No `images`, `icons` or `manifest` keys on purpose: app/opengraph-image.tsx, app/icon.tsx,
  // app/apple-icon.tsx and app/manifest.ts generate them.
  openGraph: {
    title: `${person.name} · ${person.role}`,
    description: person.statement,
    type: "website",
    url: "/",
    siteName: person.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} · ${person.role}`,
    description: person.statement,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

const CONTRACT = `THESIS: The name is the interface. One engineer's name fills the first viewport alone; everything else arrives when the visitor asks for it by scrolling. Refuses the hero-with-tagline-and-cards arrangement.
          OWN-WORLD: Near-black ground (#0a0b0d), off-white Archivo set tight and wide, JetBrains Mono for metadata, one icy cyan (#8fd3e4) for live state and the moving packet. Glass only on the floating nav, the meta chips and the image frames. Hairlines, no cards.
          STORY: Visitor reads a name, then a role, then a sentence; scrolls into three large project compositions whose pipeline diagrams animate a packet through the real system; finds one job, three strengths, one email.
          FIRST VIEWPORT: RINDRIT TELAKU in two lines at 13vw, lower-left, nothing else but the glass nav pill at the bottom center. On scroll the name tightens its width axis and dims while DATA & AI ENGINEER and the statement reveal beneath it.
          FORM: Name-first scroll choreography, brief-pinned by the user (no concept roll, direction pinned).
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body className="atmosphere">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--
${CONTRACT}
-->` }} />
        <SmoothScroll>
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
        <Nav />
        <SpeedInsights />
      </body>
    </html>
  );
}
