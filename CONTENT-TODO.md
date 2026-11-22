# Content to confirm before this goes to a client

Everything below is either a placeholder I invented to make the page work, or a
real constraint worth knowing about. Nothing here is a verified fact about OTB
Constructions. Search the codebase for `TODO` to find each one in place.

## 1. Brand — swaps in one file

`lib/brand.ts` holds the name, legal name, tagline, colours, email, phone and
addresses. No page hard-codes a brand string or a hex value, and the logo is
drawn in `components/Logo.tsx` from those colours. Changing the brand is one
file plus the matching `:root` tokens at the top of `app/globals.css`.

Current working values, all unconfirmed:

| Field | Current | Status |
|---|---|---|
| Name | OTB Constructions | working title |
| Legal entity | OTB Constructions Ltd | invented |
| Email | enquiries@otbconstructions.com | invented, domain not registered |
| Phone | +44 7405 746302 | taken from the BootHop footer — confirm it is right for this business |
| Offices | London, UK / Windhoek, Namibia | invented |

## 2. Numbers

**Sourced and safe to publish** — `marketStats` and `marketSource` in
`lib/content.ts`. These come from the Namibia Public-Private Forum deck
"Mining and Adjacent Sectors", 23–24 October 2025, which is served from
`/public/namppf-mining-adjacent-sectors.pdf` and cited on the page with a link
to the source. 13.3% of GDP, N$48B foreign exchange, US$2.8B pipeline,
18,148 direct jobs, 46.6% → 57% processed exports, <10% → 25% beneficiation.

**Invented — must be replaced** — `companyStats` in `lib/content.ts`:
- "40+ years combined experience"
- "2 operating regions"

They are on the About page. Either confirm them or delete the block.

## 3. Projects are illustrative, not delivered work

The four entries in `projects` (`lib/content.ts`) describe plausible scopes with
"Confidential" clients. **None of them is a real reference.** Publishing them as
delivered work would be a false claim. Replace with real references, or cut the
Projects page and keep the "request references" panel at the bottom of it.

## 4. Careers vacancies are invented

The six roles in `app/careers/page.tsx` are illustrative. Replace with live
vacancies or remove the list and keep the speculative-application route.

## 5. Insights are headlines without articles

`insights` in `lib/content.ts` holds three titles and standfirsts, each grounded
in a real finding from the NamPPF deck. The articles themselves are not written
— the page says "Full piece in preparation" rather than linking to nothing.
Either write them or cut the section.

## 6. Photography and film — what is real and what is generated

This matters more than anything else on this page, because publishing generated
imagery as if it were your own project photography is a false claim.

**Real — three photographs from one site visit.** `hero-headgear.jpg`,
`team-site-visit.jpg`, `site-access-ppe.jpg` and two near-duplicates. These are
used ONLY where the content is about people: the About hero, the Careers hero,
the Safety & Sustainability hero, and the safety band on the home page. That is
deliberate. The human claims on this site are backed by real photographs.

**Generated — thirteen images and one film.** Everything depicting
infrastructure is generated:

| Where | Files | Model |
|---|---|---|
| Six discipline plates | `public/disciplines/*.jpg` | OpenAI `gpt-image-2.6-sunburst` |
| Four sector plates | `public/sectors/sector-*.jpg` | same |
| Three hero stills | `public/sectors/hero-*.jpg` | same |
| Hero film (13s) | `public/video/hero.mp4` | Runway `gen4_turbo`, image-to-video from the three hero stills |

Prompts are in `scripts/` history and held one rule throughout: **no people in
any generated frame.** Generated faces are where this kind of imagery stops
being believable, and it would also have blurred the line above.

What this means in practice:

- These are *representative* images of mine haul roads, headgear, processing
  plants, pipelines, substations, open pits, desalination works, highways and
  industrial buildings. **They are not photographs of OTB projects.** Nothing on
  the site claims they are, but nobody should later caption them as such.
- Before launch, decide one of three things: (a) replace them with the client's
  own project photography, (b) keep them and add a short credit line in the
  footer noting that illustrative imagery is used, or (c) keep them silently,
  which is the common practice for a pre-trading contractor but is the weakest
  of the three.
- Regenerate or extend with `scripts/` — `install-generated-media.sh` grades and
  installs stills, `make-hero-film.sh` assembles the film.

The portrait from the WhatsApp zip is deliberately **not used** — it is a
personal photo of an identifiable person and needs their consent before it
appears on a public site.

## 7. Contact form delivery

`app/api/contact/route.ts` validates and logs, and emails via Resend when
`RESEND_API_KEY` and `CONTACT_TO` are set. Unset, it still returns 200 so the
form works in preview. Set these before launch or enquiries go nowhere:

```
RESEND_API_KEY=...
CONTACT_TO=enquiries@...
CONTACT_FROM=enquiries@...   # must be a verified sender domain
```

## 8. Legal pages

`privacy-policy`, `terms` and `cookie-policy` are written to be readable and are
accurate about what the site actually does (no analytics, no tracking cookies,
self-hosted fonts). They name England and Wales as governing law. A lawyer
should confirm that against the real operating entity and jurisdiction.
