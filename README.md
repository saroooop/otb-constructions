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
  install-generated-media.sh  grades and installs the generated stills
  make-hero-film.sh           assembles public/video/hero.mp4 from the clips
  make-hero-video.sh          SUPERSEDED — photo-derived hero cut
  make-discipline-plates.sh   SUPERSEDED — photo-derived grid crops
```

## Media

Two bodies of imagery, kept apart on purpose.

**Real photography — people.** Three photographs from one site visit at a shaft
headgear. They carry every page where the content is about people: About,
Careers, Safety & Sustainability, and the safety band on the home page.

**Generated imagery — infrastructure.** Thirteen stills from OpenAI
`gpt-image-2.6-sunburst`, plus a hero film built from three of them with Runway
`gen4_turbo` image-to-video. Every generated frame is documentary-realist, arid
Southern African, and contains **no people** — generated faces are where this
kind of imagery stops being believable.

```
scripts/install-generated-media.sh <gen-dir>   grade + install the stills
scripts/make-hero-film.sh <clips-dir>          assemble public/video/hero.mp4
scripts/make-hero-video.sh                     SUPERSEDED — photo-derived cut
scripts/make-discipline-plates.sh              SUPERSEDED — photo-derived crops
```

The two superseded scripts overwrite generated media if run. They are kept as
the fallback route if only the three site photographs ever remain.

The hero film is 13s, 1920×1080, ~4.6MB, no audio, `+faststart`: an aerial over
an open pit at golden hour, a headgear silhouetted at dusk, a processing plant
at blue hour, cross-dissolved under one grade. `components/HeroMedia.tsx` plays
it muted and looping over a crossfading Ken-Burns slideshow of its own three
opening frames — so a missing file, a slow network or blocked autoplay degrades
to stills rather than a black rectangle, and nothing shifts.

## Before launch

Read `CONTENT-TODO.md`. The short version: the brand, the company statistics,
the project references and the vacancies are all placeholders, and every image
of infrastructure is generated and representative rather than a photograph of an
OTB project. Section 6 sets out the three honest ways to handle that.

## Accessibility and motion

`prefers-reduced-motion` disables the Ken Burns push, the scroll reveals and
smooth scrolling. Scroll reveals are neutralised entirely without JavaScript via
a `<noscript>` style in the layout, so the page is readable with JS off. Tiles
show their descriptive copy by default on touch, where there is no hover.
