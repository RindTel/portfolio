# Alex Morgan — Portfolio

A custom, dark-mode portfolio built with **Next.js 15**, **Framer Motion**, and **Tailwind CSS v4**. Production-ready and deployable to Vercel in one click.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | Framer Motion |
| Fonts | Syne (display), DM Mono, Instrument Serif |
| Deployment | Vercel |

## Sections

1. **Hero** — Animated perspective grid canvas, typewriter subtitle, CTA buttons
2. **About** — Bio, core strengths, technical interests
3. **Projects** — Three distinct visual identities:
   - RAG Knowledge System — retro CRT terminal with live animation
   - Crowdfunding Platform — fintech dashboard with real progress bars
   - Smart Stadium Network — animated SVG node graph with data flow
4. **Skills** — Interactive category tabs with animated skill bars + tech cloud
5. **Experience** — Vertical timeline with work and education entries
6. **Contact** — Form + social links + availability status

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com/new) — zero configuration required.

## Customisation

All placeholder content is clearly marked and editable:

- **Personal info**: `app/components/sections/Hero.tsx` and `About.tsx`
- **Projects**: `ProjectRAG.tsx`, `ProjectCrowdfunding.tsx`, `ProjectStadium.tsx`
- **Skills**: `Skills.tsx` — edit the `skillCategories` array
- **Experience**: `Experience.tsx` — edit the `timeline` array
- **Contact**: `Contact.tsx` — edit `socials` array and availability status
- **Colors**: `app/globals.css` — all defined as CSS custom properties in `:root`
- **Fonts**: `app/globals.css` — swap the Google Fonts import

## Performance

- Static site generation (SSG) — zero server runtime
- `next/image` optimisation ready
- Security headers configured
- Lighthouse score target: 95+ across all metrics
