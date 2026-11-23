-- Editable site content.
--
-- The brief requires LKMD staff to add and edit projects, vacancies and
-- office details without a developer, and to fill in the "[To be supplied]"
-- fields themselves. These three tables are that capability.
--
-- Access model, deliberately simple:
--   anon            may READ published rows only
--   authenticated   may read and write everything
-- So the public site reads with the publishable key and the admin writes as a
-- signed-in staff member. Nothing needs the service role key in the browser.

-- ── Projects ──────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  -- Required: the brief says a project page must work with only these.
  slug        text not null unique,
  title       text not null,
  town        text not null,
  summary     text not null,

  -- Optional. Every one of these hides on the page when empty.
  province    text,
  sector      text,
  service_slug text,
  client      text,
  our_role    text,
  contract_value text,
  years       text,
  status      text,
  about       text,
  scope       text[],            -- 4–6 bullets
  delivery    text,
  outcome     text,
  client_comment text,

  hero_image  text,
  gallery     jsonb not null default '[]'::jsonb,  -- [{url, caption}]

  on_home     boolean not null default false,
  published   boolean not null default false,
  sort_order  integer not null default 0
);

create index if not exists projects_published_idx on public.projects (published, sort_order);

-- ── Vacancies ─────────────────────────────────────────────
create table if not exists public.vacancies (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  title       text not null,
  location    text,
  employment_type text,          -- Full time / Contract / Internship
  description text,
  closes_on   date,

  published   boolean not null default false,
  sort_order  integer not null default 0
);

create index if not exists vacancies_published_idx on public.vacancies (published, sort_order);

-- ── Site settings ─────────────────────────────────────────
-- A key/value store for the scattered single values: CIDB grading, B-BBEE
-- level, phone numbers, office postal codes, LinkedIn. One table rather than
-- a column per field, so adding a new one never needs a migration.
create table if not exists public.site_settings (
  key         text primary key,
  value       text not null default '',
  label       text not null,      -- what the admin form shows
  "group"     text not null default 'General',
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

-- The fields the brief marks [To be supplied], seeded empty so the admin
-- screen lists them as things to fill in.
insert into public.site_settings (key, label, "group", sort_order) values
  ('cidb_grading',    'CIDB grading',            'Registrations', 1),
  ('bbbee_level',     'B-BBEE level',            'Registrations', 2),
  ('nhbrc',           'NHBRC registration',      'Registrations', 3),
  ('company_no',      'Company registration number', 'Registrations', 4),
  ('vat_no',          'VAT number',              'Registrations', 5),
  ('memberships',     'Industry memberships and certifications', 'Registrations', 6),
  ('phone_main',      'Main phone number',       'Contact', 1),
  ('phone_centurion', 'Centurion phone',         'Contact', 2),
  ('phone_cape_town', 'Cape Town phone',         'Contact', 3),
  ('phone_durban',    'Durban phone',            'Contact', 4),
  ('phone_east_london','East London phone',      'Contact', 5),
  ('postcode_cape_town','Cape Town postal code', 'Contact', 6),
  ('postcode_durban', 'Durban postal code',      'Contact', 7),
  ('postcode_east_london','East London postal code','Contact', 8),
  ('linkedin_url',    'LinkedIn address',        'Social', 1)
on conflict (key) do nothing;

-- ── Row level security ────────────────────────────────────
alter table public.projects      enable row level security;
alter table public.vacancies     enable row level security;
alter table public.site_settings enable row level security;

-- Public may read published rows, and settings (they are not secret —
-- a CIDB grading is printed on the site).
drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects
  for select to anon using (published = true);

drop policy if exists vacancies_public_read on public.vacancies;
create policy vacancies_public_read on public.vacancies
  for select to anon using (published = true);

drop policy if exists settings_public_read on public.site_settings;
create policy settings_public_read on public.site_settings
  for select to anon using (true);

-- Signed-in staff may do everything.
drop policy if exists projects_staff_all on public.projects;
create policy projects_staff_all on public.projects
  for all to authenticated using (true) with check (true);

drop policy if exists vacancies_staff_all on public.vacancies;
create policy vacancies_staff_all on public.vacancies
  for all to authenticated using (true) with check (true);

drop policy if exists settings_staff_all on public.site_settings;
create policy settings_staff_all on public.site_settings
  for all to authenticated using (true) with check (true);

-- Keep updated_at honest without the app having to remember.
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

drop trigger if exists vacancies_touch on public.vacancies;
create trigger vacancies_touch before update on public.vacancies
  for each row execute function public.touch_updated_at();

drop trigger if exists settings_touch on public.site_settings;
create trigger settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

comment on table public.projects      is 'Project pages, editable by LKMD staff in /admin.';
comment on table public.vacancies     is 'Careers vacancies, editable by LKMD staff in /admin.';
comment on table public.site_settings is 'Single values the brief marks [To be supplied].';
