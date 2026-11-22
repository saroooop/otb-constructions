# Infrastructure setup

Everything for this project lives under **saprojectdare@gmail.com**. Nothing
here shares an account with any other OTB or BootHop project — that separation
is deliberate, so keep it.

The three sign-ups below need a human: each one sends a verification link to
that inbox and asks for a password. Once they exist, the rest is automated.

---

## 1. GitHub

GitHub has no Google sign-in, so this one is a real form.

1. <https://github.com/signup> — sign up with `saprojectdare@gmail.com`.
2. Verify from the email, pick a username, choose the **Free** plan.
3. Create the repository: <https://github.com/new>
   - Name: `otb-constructions`
   - Visibility: **Public**
   - Do **not** add a README, .gitignore or licence — this repo already has
     three commits and an initial file would force a merge.
4. Create a token so the push can be scripted:
   <https://github.com/settings/tokens?type=beta> → *Generate new token*
   - Repository access: *Only select repositories* → `otb-constructions`
   - Permissions → Repository permissions → **Contents: Read and write**
   - Expiry: 90 days is plenty

Then the push is:

```bash
cd ~/Desktop/dareweb
git remote add origin https://github.com/<username>/otb-constructions.git
git push -u origin main
```

## 2. Supabase

1. <https://supabase.com/dashboard/sign-up> → **Continue with Google**, pick
   `saprojectdare@gmail.com`. One click, no password.
2. New project:
   - Name: `otb-constructions`
   - Region: **eu-west-2 (London)** — closest to both the UK office and
     Vercel's default London edge, and it keeps enquiry data in the UK/EU.
   - Database password: generate one and save it; you will not need it for the
     site, only for direct psql access.
3. Wait for provisioning (~2 min), then run the migration:
   Dashboard → **SQL Editor** → New query → paste the whole of
   `supabase/migrations/0001_enquiries.sql` → Run.
4. Collect two values from Project Settings → **API**:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`

> The `service_role` key bypasses row-level security. It is server-only. Never
> prefix it `NEXT_PUBLIC_`, never paste it into a client component, and never
> commit it. The `anon` key is not needed at all — this site has no
> browser-side database reads.

## 3. Vercel

1. <https://vercel.com/signup> → **Continue with Google**, same address.
   - If it offers to continue with an existing session, sign out first. This
     must not land on the `daddyoba12` account.
2. Connect the GitHub account created in step 1 when prompted.
3. Import `otb-constructions`. Framework detects as Next.js; no build settings
   need changing.
4. Add the environment variables (Settings → Environment Variables), for
   Production, Preview and Development. See `.env.example` for the full list.
5. Optional, for a scripted deploy instead of the dashboard:
   <https://vercel.com/account/tokens> → create a token.

---

## Environment variables

| Key | Required | Where it comes from |
|---|---|---|
| `SUPABASE_URL` | for enquiry storage | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | for enquiry storage | same page, `service_role` |
| `RESEND_API_KEY` | for notification email | <https://resend.com> |
| `CONTACT_TO` | for notification email | the inbox that receives enquiries |
| `CONTACT_FROM` | for notification email | must be on a domain verified in Resend |
| `IP_HASH_SALT` | no | any long random string |

Nothing is strictly required. With none of it set the contact form still works
and logs the enquiry — that is what makes a preview deploy useful before any of
the accounts exist.

**One behaviour worth knowing:** once Supabase *or* Resend is configured and
then fails, the endpoint returns 502 and tells the sender to email directly,
rather than showing a success screen for an enquiry that went nowhere. Silence
is the worst outcome for a contact form, so it is engineered against.

## Verifying it end to end

After the first deploy with Supabase configured:

1. Submit the form on the live site.
2. Supabase → Table Editor → `enquiries` — the row should be there with
   `ip_hash` populated (or null if no salt is set) and the raw IP nowhere.
3. If `RESEND_API_KEY` and `CONTACT_TO` are set, the email should have arrived.
4. Submit with a deliberately bad payload (empty message) and confirm you get a
   400 with a readable message, not a 500.

## What is deliberately NOT shared with other projects

- No account, token or key from `boothop`, `otb-midas` or `OTB_Pipeline` is
  used by this project at runtime.
- The media generation scripts in `scripts/` did read the pipeline's API keys
  once, at build time, to produce the images and film now committed to
  `public/`. Nothing at runtime needs them, and no key is referenced anywhere
  in `app/`, `lib/` or `components/`.
