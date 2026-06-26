-- Initial schema for abimbolaolumuyiwa.com rebuild
-- A single "posts" table covers both Blog Posts and Book Reviews,
-- distinguished by the `category` column.

create table if not exists public.posts (
  id            bigint primary key,            -- reuse the original WordPress post id
  slug          text unique not null,
  title         text not null,
  content       text,                          -- rendered HTML body
  excerpt       text,                          -- short summary for list pages
  category      text not null default 'blog',  -- 'blog' | 'book-review'
  cover_image_url text,
  published_at  timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists posts_category_published_idx
  on public.posts (category, published_at desc);

-- Row Level Security: the public site only needs to READ posts.
-- Writes happen through the service-role key (the import script), which
-- bypasses RLS, so we only add a public read policy here.
alter table public.posts enable row level security;

drop policy if exists "Public can read posts" on public.posts;
create policy "Public can read posts"
  on public.posts
  for select
  using (true);
