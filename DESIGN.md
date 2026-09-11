---
name: Rindrit Telaku Portfolio
description: Name-first, dark, glass-accented engineer portfolio with one icy cyan accent and real pipeline diagrams.
colors:
  ink: "#0a0b0d"
  surface: "#111316"
  graphite: "#1a1d21"
  line: "rgb(255 255 255 / 0.08)"
  line-strong: "rgb(255 255 255 / 0.16)"
  text: "#e8eaed"
  muted: "#9aa1aa"
  dim: "#7b828c"
  ice: "#8fd3e4"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 15.5vw, 13rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 100 to 118"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.12em"
rounded:
  tag: "4px"
  frame: "14px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "40px"
  section-desktop: "160px"
  section-mobile: "112px"
  container: "1400px"
components:
  nav-pill:
    backgroundColor: "rgb(255 255 255 / 0.04)"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px"
  nav-item-active:
    backgroundColor: "rgb(255 255 255 / 0.08)"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "3px 7px"
  image-frame:
    backgroundColor: "rgb(255 255 255 / 0.04)"
    rounded: "{rounded.frame}"
    padding: "6px"
---

# Design System: Rindrit Telaku Portfolio

## Overview

**Creative North Star: "The Instrument Panel at Night"**

A dark room, one instrument lit. The page is near-black with off-white type and a single cold accent that marks live state: the availability dot, the active nav item, the packet moving through a pipeline. Everything else is restrained so that scale and precision do the talking. The name fills the first viewport alone; the profession, the statement, and the work arrive only when the visitor scrolls for them.

Glass is a material, not a decoration. It appears on exactly three things that float above the page: the bottom navigation, the metadata chips, and the frames around project screenshots. Sections are separated by hairlines and space, never by cards.

**Key Characteristics:**
- Name-first, scroll-revealed opening
- One accent, used only for live state and motion
- Hairlines and negative space instead of cards
- Monospace strictly for metadata: numbers, categories, stacks, dates
- Real system diagrams as the engineering signature

## Colors

A cold monochrome ramp with one icy accent.

### Primary
- **Ice** (#8fd3e4): availability dot, active state, pipeline packet, focus ring, link hover, text selection at 28%. Never a fill, never a glow.

### Neutral
- **Ink** (#0a0b0d): page ground.
- **Surface** (#111316): pipeline node fill, image frame interior.
- **Graphite** (#1a1d21): scrollbar thumb.
- **Line** (rgb 255 255 255 / 0.08) and **Line strong** (0.16): hairline dividers, tag borders, link underlines.
- **Text** (#e8eaed), **Muted** (#9aa1aa), **Dim** (#7b828c): three steps of type. Dim stays above 4.5:1 on Ink and is reserved for 11px mono.

### Named Rules
**The Live State Rule.** Ice marks something that is currently true or currently moving. If an element is static and informational, it does not get the accent.

## Typography

**Display and Body Font:** Archivo variable (system-ui fallback), width axis 62 to 125 available.
**Label/Mono Font:** JetBrains Mono (ui-monospace fallback).

**Character:** A wide, heavy grotesk at display scale, set tight, against a small tracked mono for metadata. Confident through size, not through decoration.

### Hierarchy
- **Display** (800, clamp(3.5rem, 15.5vw, 13rem), 0.88, uppercase, -0.04em): the name only. Width axis animates from 118 to 100 on scroll.
- **Headline** (700, clamp(2.2rem, 6vw, 5.4rem), 0.95, -0.04em, sentence case): project names.
- **Title** (600, clamp(1.9rem, 4vw, 3.4rem), 1.02, -0.04em): section titles and the contact heading (contact goes to clamp(2rem, 5vw, 4.6rem)).
- **Lead** (500, clamp(1.5rem, 3vw, 2.6rem), 1.15, -0.03em): the About lead sentence.
- **Body** (400, 16 to 17px, 1.6): descriptions, max 46 to 62ch.
- **Label** (mono 400, 11px, 0.12em, uppercase): categories, stacks, dates, index numbers, nav items. The role line in the opening is the one mono label allowed at 14 to 16px.

### Named Rules
**The Mono Is Data Rule.** Monospace never sets a heading or a sentence. It sets things a machine would print: numbers, identifiers, dates, stack names.

## Layout

Single column inside a 1400px container with 20px gutters on mobile and 40px from 768px. Sections use a 12-column grid at md and above: project text takes 5 columns and the visual 7 (the third project mirrors this), experience meta takes 4 and content 8, About lead and strengths take 8 with a 4-column aside starting at column 9. Everything collapses to one column below 768px.

Vertical rhythm: 160px between sections on desktop, 112px on mobile. The top of the page is a sticky deck: the opening is pinned for the whole deck, its reveal plays over the first 0.8 viewports of scroll, then every page (three projects, Experience, About, Contact) is a 100vh slide that rises over the one beneath it, which scales to 0.94 and dims as it is covered. Each slide opens with a mono header row (page label left, project counter right) under a hairline, and centers its content in the remaining height. Below 768px and under reduced motion the slides flow normally. The bottom navigation is fixed at max(20px, safe-area) from the bottom edge.

## Elevation & Depth

Tonal layering, not shadows. The only shadows in the system belong to the glass surfaces: an inset 1px top highlight (white at 9%), an inset 1px bottom shade (black at 25%), and a soft 20px-offset ambient drop (black at 75%, 60px blur, -20px spread). Depth elsewhere comes from hairlines and from the fixed atmosphere: two radial cyan washes at 7% and 3.5% and a grain overlay at 3.5% opacity with overlay blending.

### Named Rules
**The One Glass Rule.** Glass (blur 20px, saturate 150%, 4% white fill, 10% white border) is used on the nav pill, every pill button, metadata chips, the About tiles and the project image frames, and every glass surface behaves the same way through the shared Glass component: a radial sheen follows the pointer and the surface tilts up to 3 degrees toward it (1.5 to 2 on large surfaces), spring-smoothed, static on touch and under reduced motion. Buttons scale to 0.97 while pressed.

## Shapes

Three radii, each tied to one kind of thing: 4px for tags and pipeline nodes, 14px for image frames, full pill for the navigation and chips. Borders are 1px hairlines at 8% or 16% white. No filled cards.

## Components

### Navigation
- **Style:** floating glass pill, fixed bottom center, one row of four mono labels with a leading Ice availability dot.
- **Default / Hover / Active:** Muted text; Text on hover (pointer devices only); the active item carries a sliding 8% white pill (spring 380/32) and Text color.
- **Motion:** the pill tilts up to 3 degrees toward the cursor and a radial sheen follows it, both spring-smoothed motion values. Disabled under reduced motion.
- **Mobile:** same pill, 12px item padding, fits 390px on one line.

### Links
- **Style:** inline, no underline, 1px bottom hairline at 16% white, mono for utility links and Archivo for the email.
- **Hover:** text and border go Ice over 160ms. Pressable elements scale to 0.97 on active.

### Tags
- **Style:** mono 11px, 1px hairline border, 4px radius, 3px by 7px padding, Muted text, transparent fill.

### Image frame
- **Style:** glass container with 14px radius and 6px padding around a 9px-radius Surface well; screenshot rests at saturate 0.55 and brightness 0.82, returns to full and scales 1.015 when the project is active.

### Pipeline diagram (signature component)
Data-driven SVG of the project's real system: 30px-tall nodes with 4px radius, Surface fill, mono uppercase labels, cubic hairline edges. Stages run left to right on desktop and top to bottom below 768px, with branches as rows or columns. At rest nodes sit at 70% opacity; when the project is hovered (pointer) or scrolled into view (touch) an Ice packet travels each source-to-sink path at 0.34s per edge and nodes brighten in topological order. Under reduced motion the diagram renders lit with no packet.

## Do's and Don'ts

### Do:
- **Do** start every surface from Ink with off-white type and let scale carry hierarchy.
- **Do** keep the accent to live state: one dot, one active item, one moving packet per view.
- **Do** separate content with hairlines and 112 to 160px of space.
- **Do** honor prefers-reduced-motion and prefers-reduced-transparency with static and solid fallbacks.

### Don't:
- **Don't** add cards, glows, gradient text, or a second accent.
- **Don't** put an eyebrow label above a heading. The only mono line above a project name is its category, and the slide counter lives in the slide's header row, not above the title.
- **Don't** use monospace for prose or headings.
- **Don't** add terminal, matrix, cyberpunk, or AI brain imagery, skill bars, testimonials, or a biography.
