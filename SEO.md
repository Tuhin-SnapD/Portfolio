# SEO setup

Everything social networks and search engines read lives in one place: `src/lib/site.ts`.

## What is already implemented

| Feature | Where |
| --- | --- |
| Canonical URLs on every page | `metadata.alternates.canonical` in each page + `layout.tsx` |
| Title template (`%s \| Tuhin Chakrabarty`) | `src/app/layout.tsx` |
| Per-page titles, descriptions, keywords | `layout.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `resume/page.tsx` |
| Open Graph + Twitter cards (1200×630) | `src/app/opengraph-image.tsx`, `src/app/blog/[slug]/opengraph-image.tsx` |
| Person / WebSite / ProfilePage JSON-LD | `src/components/structured-data.tsx` |
| BlogPosting + BreadcrumbList JSON-LD | blog article pages |
| FAQPage JSON-LD with visible Q&A | `src/components/faq-section.tsx` on the home page |
| `sitemap.xml` (all pages + 50 articles) | `src/app/sitemap.ts` |
| `robots.txt` referencing the sitemap | `src/app/robots.ts` |
| Web app manifest | `src/app/manifest.ts` |
| Favicon (SVG, TC monogram) | `src/app/icon.svg` |
| `<link rel="me">` identity links | `layout.tsx` |
| `rel="author"` + resume PDF alternate link | `layout.tsx` |

## Required before launch

Set the production domain. All canonicals, the sitemap, `robots.txt`, Open Graph URLs and
JSON-LD are built from it:

```bash
# .env.local / Vercel / Netlify environment variables
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If the variable is unset, the site falls back to `https://tuhin-dev.lovable.app`, and on
Vercel/Netlify it auto-detects `VERCEL_PROJECT_PRODUCTION_URL` / `URL`.

## Google Search Console (do this once)

1. Open <https://search.google.com/search-console> → **Add property** → **URL prefix** with your domain.
2. Choose **HTML tag** verification, copy only the `content` value, and set it as
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (or verify by DNS, which needs no code change).
3. Deploy, then **Sitemaps → Add** `sitemap.xml`.
4. **URL Inspection** → paste the home page URL → **Request indexing**.
5. Submit the resume page and your three best articles the same way.

## Off-site signals (they matter more than on-page tweaks for a name query)

Google decides "Tuhin Chakrabarty" → this site mostly from corroborating links. Add the URL to:

- GitHub profile **Website** field and repos' homepage field
- LinkedIn **Contact info → Website**
- X/Twitter bio, and any HackerRank / LeetCode / Dev.to / Medium profile
- Your email signature and resume PDF footer

Keep the name spelling consistent: **Tuhin Chakrabarty**.

## Note on competition

There is another well-indexed person with the same name (an ML researcher). Entity
disambiguation is handled by: the `Person` schema with `worksFor` PayU, `alumniOf` VIT,
`address` Bengaluru, and `sameAs` links to your GitHub/LinkedIn/HackerRank, plus the FAQ
section that spells out "Tuhin Chakrabarty is a software engineer at PayU in Bengaluru".
