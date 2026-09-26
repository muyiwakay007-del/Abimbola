# abimbolaolumuyiwa.com

Author website for Abimbola Olumuyiwa: Kiddies Daily Devotional, Built for More, blog and YouTube.
Next.js 16 (App Router) · CSS Modules + design tokens · Supabase (optional backend).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where to edit content

**See [`src/content/README.md`](src/content/README.md).** Everything you'd want to change lives in `src/content/`:

| File | Contents |
|---|---|
| `author.ts` | Name, bio, photo, email, social links, YouTube |
| `books.ts` | Every book: titles, covers, prices, ISBN, dates, retailer links, samples, preview images |
| `kiddies-daily-devotional.ts` | Wording for the Kiddies Daily Devotional series pages |
| `blog.ts` + `blog/posts.json` | Blog posts |
| `testimonials.ts` | Reader reviews (real ones only) |
| `site.ts` | Site URL, home page SEO, menu, contact topics |
| `types.ts` | What each field means (strongly typed, so mistakes are caught before publishing) |

In `npm run dev`, yellow "Placeholder" notes show where content is still missing. They never appear in production.

## Backend

- **Blog**: reads the Supabase `posts` table when configured and reachable; otherwise uses `src/content/blog/posts.json`.
  Load posts into Supabase with `npm run snapshot:wp && npm run import:wp`. Otherwise posts come from `src/content/blog/posts.json` plus `newPosts` in `src/content/blog.ts`.
- **Newsletter & contact forms**: `src/lib/forms.ts`. Choose a provider in `.env.local`
  (see `.env.local.example`): Brevo, Mailchimp, ConvertKit, any webhook (e.g. Formspree), or Supabase
  (`supabase/migrations/0002_forms.sql`). Until one is set, the forms say honestly that sign-ups aren't open yet.
- **YouTube**: latest uploads come from the channel's public RSS feed (refreshed every 6 hours).

## House style

No em dashes anywhere in the copy.
