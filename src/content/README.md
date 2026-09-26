# Website content: edit here

Everything important about the site lives in this folder. You never need to touch the components in `src/components/` to change your information.

| I want to change… | File | What to edit |
|---|---|---|
| My name, bio, photo, email | `author.ts` | `name`, `intro`, `bio`, `photo`, `email` |
| The About page's "My story" text | `author.ts` | `myStory` (one string per paragraph, shown exactly as written) |
| Social links (Instagram, Facebook, YouTube, LinkedIn, TikTok, X, others) | `author.ts` | `social` |
| Which YouTube videos show | `author.ts` | `youtube` (`channelId`, `featuredVideoIds`, `hiddenVideoIds`) |
| A book's title, subtitle, description, cover | `books.ts` | that book's entry |
| A price | `books.ts` | `formats` → `price` |
| Amazon / Barnes & Noble / Apple Books / other links | `books.ts` | `retailers` |
| The "Read a Sample" link | `books.ts` | `sample`: `{ kind: "amazon-look-inside" }` (uses the Amazon link), `{ kind: "pdf", url }` or `{ kind: "link", url }` |
| "Peek Inside" images | `books.ts` | `previewImages` |
| ISBN, publisher, publication date, pages | `books.ts` | `isbn`, `publisher`, `publicationDate`, `pages` |
| Show / hide a book, or the order of books | `books.ts` | `visible`, and `bookOrder` at the bottom |
| Kiddies Daily Devotional marketing wording | `kiddies-daily-devotional.ts` | headlines, "Why Parents Love This Format", "Perfect For"… |
| Music: songs, artwork, audio previews, streaming links, status | `music.ts` | `releases` (and see `MUSIC.md`) |
| Blog posts | `blog.ts` (new posts) and `blog/posts.json` (saved WordPress posts) | see below |
| Reader reviews / testimonials | `testimonials.ts` | `testimonials` |
| Site address, home page SEO title/description, menu, contact topics | `site.ts` | |

The exact meaning of every field is written in `types.ts`. Your editor (VS Code) also shows those notes when you hover over a field, and it underlines mistakes in red.

## One fact, one place

Each fact is stored once and read everywhere it's needed. For example:

- **Price**: change `formats[0].price` for a book and the book cards, the volume cards, the book page, the comparison table and the search-engine data all update.
- **Amazon link**: change `retailers.amazon` and every "Buy Now" / "Buy on Amazon" button for that book updates, along with the "Where to Get the Book" section and the Amazon "Look inside" sample link.
- **Number of devotionals** (`devotionalCount`): the "183 days" labels, the "365" total, the timeline and the comparison table are all calculated from it.
- **Pages, publisher, publication date, reading age**: the fact boxes on the product page are built from the volumes.

## Missing information is fine

Use `null` for anything you don't have yet (never `""` or "TBD"). The site adapts:

| Missing | What visitors see |
|---|---|
| `sample: null` | No "Read a Sample" button for that book |
| A retailer link is `null` | That retailer's button and card simply don't appear |
| No retailer links at all | No buy buttons; "Retail links coming soon" |
| `price: null` | "See price on Amazon" (or whichever retailer is listed) |
| `cover: null` | A tasteful "cover coming soon" design with the title |
| `isbn`, `publisher`, `pages`… `null` | That row is left out of "Book details" |
| No testimonials | No fake reviews: an invitation to share, or "Reader reviews coming soon" |
| A social link is `null` | No icon, no broken link |
| `email: null` | Email isn't shown on the Contact page |
| `social.youtube: null` | YouTube menu item and subscribe buttons disappear |
| `photo: null` | An elegant monogram instead of a photo |
| `previewImages: []` | Labelled "Interior pages · Preview coming soon" frames |

While running `npm run dev`, small yellow **Placeholder** notes point to anything still missing. They never appear on the live site.

## Adding a book

1. Copy the `nextBook` template at the bottom of `books.ts` (or any existing entry).
2. Give it a unique key and `slug` (its page will be `/books/<slug>`).
3. Put the cover image in `public/images/books/` and set `cover`.
4. Set `visible: true` and add it to `bookOrder`.

## Adding a blog post

Add an entry to `newPosts` in `blog.ts`:

```ts
{
  slug: "my-new-post",
  title: "My New Post",
  date: "2026-10-01",
  category: "blog",          // or "book-review"
  image: { src: "/images/posts/my-new-post.jpg", alt: "Describe the image" },
  excerpt: null,             // null = use the first lines of the post
  content: "<p>First paragraph.</p><p>Second paragraph.</p>",
},
```

## Adding a testimonial

Only add real reviews, with the reader's permission, in `testimonials.ts`:

```ts
{ quote: "…", name: "Sarah O.", role: "Mum of two", rating: 5, bookSlug: "kiddies-daily-devotional-volume-1" },
```

## Images

Put image files in `public/images/…` and refer to them as `/images/…`. Always write a short `alt` description.

After editing, run `npm run dev` to preview. If something is wrong, VS Code (or `npx tsc --noEmit`) points to the exact line.
