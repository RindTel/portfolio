import type { NextConfig } from "next";
 
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
        // SAMEORIGIN (not DENY) so our own /demo + /demo-fundforge routes can
        // embed the demo HTML files in an iframe; still blocks other sites.
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};
 
export default nextConfig;
 