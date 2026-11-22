-- Enquiries captured by the website contact form.
--
-- Email is not durable storage: a bounced sender domain, a rate limit or a
-- full inbox loses the enquiry silently. This table is the record; email is
-- the notification. The API route writes here first and emails second.

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  name        text not null,
  email       text not null,
  company     text,
  phone       text,
  type        text,
  message     text not null,

  -- Where it came from, for spotting a bot run or a bad campaign.
  source      text not null default 'website',
  user_agent  text,
  ip_hash     text,          -- hashed, never the raw address

  -- Workflow
  status      text not null default 'new'
                check (status in ('new', 'read', 'replied', 'spam', 'archived')),
  notes       text,

  -- Did the notification email actually go out?
  emailed_at  timestamptz
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx     on public.enquiries (status);

-- Lock it down. RLS on with no policies means anon and authenticated roles can
-- do nothing at all; the service role key used by the API route bypasses RLS.
-- That is the whole access model — there is no browser-side read path, so a
-- leaked anon key cannot expose a single enquiry.
alter table public.enquiries enable row level security;

comment on table  public.enquiries is
  'Contact form submissions. Written by the server only, via the service role key.';
comment on column public.enquiries.ip_hash is
  'SHA-256 of the client IP plus a server salt. Never store the raw address.';
