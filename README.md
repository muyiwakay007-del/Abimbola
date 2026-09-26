# abimbolaolumuyiwa.com

Author website for Abimbola Olumuyiwa: Kiddies Daily Devotional, Built for More, blog and YouTube.
Next.js 16 (App Router) · CSS Modules + design tokens · Supabase (optional backend).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where to edit content (no layout code needed)

| What | File |
|---|---|
| Books: titles, covers, prices, retailer links, samples, preview images, details | `src/content/books.ts` |
| Site name, SEO text, email, social links, YouTube settings, author bio & photo | `src/content/site.ts` |
| Reader testimonials | `src/content/testimonials.ts` |
| Blog posts (fallback snapshot of the WordPress posts) | `src/content/posts.json` (`npm run snapshot:wp`) |
| Images | `public/images/…` |

In `npm run dev`, yellow "Placeholder" notes show where content is still missing. They never appear in production.

## Backend

- **Blog**: reads the Supabase `posts` table when configured and reachable; otherwise uses `src/content/posts.json`.
  Load posts into Supabase with `npm run snapshot:wp && npm run import:wp`.
- **Newsletter & contact forms**: `src/lib/forms.ts`. Choose a provider in `.env.local`
  (see `.env.local.example`): Brevo, Mailchimp, ConvertKit, any webhook (e.g. Formspree), or Supabase
  (`supabase/migrations/0002_forms.sql`). Until one is set, the forms say honestly that sign-ups aren't open yet.
- **YouTube**: latest uploads come from the channel's public RSS feed (refreshed every 6 hours).

## House style

No em dashes anywhere in the copy.
