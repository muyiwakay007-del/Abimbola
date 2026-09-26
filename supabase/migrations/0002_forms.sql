-- Newsletter sign-ups and contact-form messages.
-- Written only by the server (service-role key), so RLS is enabled with
-- NO public policies: nobody can read or write these tables from the browser.

create table if not exists public.subscribers (
  id          bigint generated always as identity primary key,
  email       text unique not null,
  name        text,
  created_at  timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  topic       text not null default 'General',
  message     text not null,
  created_at  timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.contact_messages enable row level security;

-- Optional: store alt text for post cover images (used by the site if present).
alter table public.posts add column if not exists cover_image_alt text;
