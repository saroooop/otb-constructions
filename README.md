# Dareweb — OTB Constructions

Marketing site for a civil engineering and mining infrastructure contractor.
Next.js 16 App Router, React 19, Tailwind 4, lucide-react — the same base flow
as `boothop`, with the page structure and component vocabulary of `otb-midas`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## The design

A cross of two references, which is what was asked for:

**From WBHO** — full-bleed photography that runs edge to edge, signal red used
structurally, the "What we do" grid of captioned image tiles, and the left-rule
intro paragraph.

**From the UK tier-one contractors** — square corners instead of rounded,
hairline rules instead of shadows, an editorial display face, restrained motion,
large sourced numbers on a dark ground, and generous whitespace between bands.

Concretely: navy `#06182B` / `#0B2742`, signal red `#C8102E`, concrete neutrals,
Archivo for headings and Inter for body, 2px radii, and one cool grade applied
across every photograph so three different days read as one shoot.

## Layout

```
app/
  page.tsx            home — hero film, position statement, tile grid,
                      sourced market numbers, sectors, projects, approach,
                      safety band, insights
  services/           six disciplines, alternating detail rows
  sectors/            six markets + market evidence
  projects/           case rows (PLACEHOLDER — see CONTENT-TODO.md)
  sustainability/     safety practice and ESG
  insights/           lead piece + two cards
  about/  careers/  contact/
  privacy-policy/  terms/  cookie-policy/
  api/contact/        validated, honeypotted, Resend-optional
components/
  Nav  Footer  Logo  HeroMedia  PageHero  Reveal  ContactForm  LegalShell
lib/
  brand.ts            ← all branding. Change this file, not the pages.
  content.ts          ← all copy and data, with sourced/placeholder split
scripts/
  make-hero-video.sh        cuts public/video/hero.mp4 from the site photos
  make-discipline-plates.sh cuts six distinct crops for the grids
```

## Media

There is no stock photography here. Everything is cut from three photographs
taken on one site visit.

`scripts/make-hero-video.sh` builds an 18.6s 1920×1080 H.264 hero film: each
portrait plate is scaled to the full frame width and the camera drifts
vertically through it (the move that suits a 40m tower), with a slow push, 1.2s
cross-dissolves, and a single cool grade with a vignette. ~4.7MB, no audio,
`+faststart`.

`components/HeroMedia.tsx` plays it muted and looping over a crossfading
Ken-Burns slideshow of the same stills. If the file is missing, slow, or
autoplay is blocked, the video stays at opacity 0 and the stills carry the hero
— nothing shifts and nothing goes black.

Re-run either script after replacing the source photographs.

## Before launch

Read `CONTENT-TODO.md`. The short version: the brand, the company statistics,
the project references and the vacancies are all placeholders, and no photograph
on the site actually depicts a road, a pipeline or a processing plant.

## Accessibility and motion

`prefers-reduced-motion` disables the Ken Burns push, the scroll reveals and
smooth scrolling. Scroll reveals are neutralised entirely without JavaScript via
a `<noscript>` style in the layout, so the page is readable with JS off. Tiles
show their descriptive copy by default on touch, where there is no hover.
