# Content still to confirm before launch

Last verified against the code on **26 November 2026**.

Everything below has been checked in the codebase, not assumed. Earlier
versions of this file described an invented "OTB Constructions" site with
placeholder projects, invented statistics, fabricated vacancies and
placeholder director names. **None of that is still true** — it was replaced
when the LKMD brief and company profile landed, and the file had not kept up.
It is rewritten here so it stops misleading anyone reading it.

## Resolved — do not re-raise

| Was a problem | State now |
|---|---|
| Brand, contact, addresses | LKMD Construction, four SA offices + UK branch, all in `lib/brand.ts` |
| Placeholder projects | Seven real references in `lib/site.ts`, each with town and province |
| Invented statistics | Deleted. `/about-us` carries no unverified numbers; headcount is derived from the organogram so it cannot drift |
| Invented vacancies | Replaced by the roles LKMD recruits, with a comment saying why it is not a vacancy table |
| Placeholder directors + generated portraits | Gone. `/about-us/our-people` shows role titles only — no names, no faces |
| Unwritten "insights" articles | Section removed entirely |
| UK governing law on legal pages | Now POPIA and a PAIA manual, which is correct for a South African business |
| Affiliations and certifications | Built and hidden. `brand.registrations` (CIDB, B-BBEE, NHBRC, company no., VAT) are empty strings, and every render site is conditional — nothing is claimed |
| Canonical URLs / sitemap pointing at an unregistered domain | Fixed — see below |
| `npm run lint` calling a linter that was never installed | ESLint + `eslint-config-next` installed, `eslint.config.mjs` added, 0 errors |
| Next.js carrying critical advisories (ISR cache poisoning, image RCE) | Upgraded 16.3.4 → 16.4.6, `npm audit` clean |

## 1. The domain — one environment variable

`siteUrl` in `lib/brand.ts` is the single source of truth for the site's own
address, and `metadataBase`, `sitemap.ts` and `robots.ts` all read it.

It resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` — **set this the day `lkmd.co.za` resolves.** Every
   canonical URL, the sitemap and robots.txt follow it. Nothing else changes.
2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel's own production host, so a deploy
   always advertises the address it is actually served from.
3. `http://localhost:3000` for `next dev`.

Until step 1 happens the site correctly advertises its `.vercel.app` address.
**Do not submit the sitemap to Google Search Console before the domain is
live** — it would be asking Google to index a host that does not resolve.

## 2. Still genuinely outstanding

1. **Domain.** `lkmd.co.za` is not registered. Nothing resolves there.
2. **GA4 measurement ID.** `NEXT_PUBLIC_GA_ID` is unset, so no analytics ship
   at all. The gating is already built: the script loads only after a visitor
   accepts analytics cookies, and declining is a real decline.
3. **Resend key.** `RESEND_API_KEY`, `CONTACT_TO` and `CONTACT_FROM` are unset,
   so enquiries are validated and logged but **not emailed to anyone**. The
   form returns 200 either way, which means this failure is silent — set these
   before the site is promoted, or enquiries are lost. `CONTACT_FROM` must be
   on a domain verified in Resend.
4. **Phone and WhatsApp.** `brand.phone` and `brand.whatsapp` are empty and
   therefore hidden, per the brief's rule on `[To be supplied]` fields.
5. **CIDB grading, B-BBEE level, NHBRC, company and VAT numbers.** Empty and
   hidden. Each appears the moment it is filled in — no code change needed.
6. **Repo and Vercel project are still named for "dareweb"/"otb-constructions".**
   Cosmetic, but the public repo name is visible to anyone given the link.

## 3. Generated imagery — a decision, not a bug

Most infrastructure imagery and all film is generated (OpenAI for stills,
Runway image-to-video, ffmpeg assembly). The user's own photographs are used
where the content is about people. No generated frame contains a face, which
was a deliberate rule throughout.

Nothing on the site claims these are photographs of LKMD projects, and nobody
should later caption them that way. Before launch, pick one:

- **(a)** replace them with LKMD's own project photography,
- **(b)** keep them and add a short footer line noting illustrative imagery,
- **(c)** keep them silently — common for a contractor site, and the weakest
  of the three.

## 4. Supabase content

`lib/db.ts` serves projects, vacancies and settings from Supabase and falls
back to `lib/site.ts` whenever the database is unreachable. **That fallback is
load bearing** — the free tier pauses after about 7 days idle, and without it
the site would empty itself. Do not remove it as dead code.
