import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import postsData from '@/data/github-posts.json'

const OWNER = 'Tuhin-SnapD'

export type BlogPost = {
  slug: string
  title: string
  repo: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  language: string
  stars: number
  forks: number
  repoUrl: string
  homepage: string
  image: string
  content: string
}

/** Everything the blog listing needs - no article bodies, so the client bundle stays small. */
export type BlogPostMeta = Omit<BlogPost, 'content'>

const posts = (postsData as BlogPost[]).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

const editCopy = (value: string) => value
  .replace(/\bunlock(?:s|ed|ing)?\b/gi, 'explore')
  .replace(/\bempower(?:s|ed|ing)?\b/gi, 'help')
  .replace(/\bseamless(?:ly)?\b/gi, 'direct')
  .replace(/\bleverage(?:s|d)?\b/gi, 'use')
  .replace(/\bstreamline(?:s|d|ing)?\b/gi, 'simplify')
  .replace(/\brobust(?:ly)?\b/gi, 'reliable')
  .replace(/\bcutting-edge\b/gi, 'current')
  .replace(/\belevate(?:s|d)?\b/gi, 'improve')
  .replace(/\bharness(?:es|ed)?\b/gi, 'use')
  .replace(/\bdelve(?:s|d|ing)?\b/gi, 'examine')
const meta = (post: BlogPost): BlogPostMeta => {
  const { content: _content, ...rest } = post
  return { ...rest, title: editCopy(rest.title), excerpt: editCopy(rest.excerpt) }
}

export function getAllPosts(): BlogPostMeta[] {
  return posts.map(meta)
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((post) => post.category))).sort()
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = posts.find((item) => item.slug === slug)
  return post ? { ...post, title: editCopy(post.title), excerpt: editCopy(post.excerpt) } : undefined
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  return posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = (a.category === current.category ? 2 : 0) + a.tags.filter((t) => current.tags.includes(t)).length
      const bScore = (b.category === current.category ? 2 : 0) + b.tags.filter((t) => current.tags.includes(t)).length
      return bScore - aScore
    })
    .slice(0, limit)
    .map(meta)
}

/* ------------------------------------------------------------------ markdown */

const isExternal = (url: string) => /^(https?:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('#')

/**
 * Applies `transform` to prose only, leaving fenced code blocks untouched so code
 * samples keep their `<tags>`, `[links](url)` and image syntax intact.
 */
function mapOutsideCode(markdown: string, transform: (chunk: string) => string): string {
  const parts = markdown.split(/(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~)/gm)
  return parts.map((part, index) => (index % 2 === 1 ? part : transform(part))).join('')
}

/**
 * READMEs reference images and files with repo-relative paths (`landing.png`, `./docs/x.md`).
 * Those break on the site, so rewrite them to raw.githubusercontent.com / github.com URLs.
 */
function absolutizeUrls(markdown: string, repo: string): string {
  const toRaw = (path: string) =>
    `https://raw.githubusercontent.com/${OWNER}/${repo}/HEAD/${path.replace(/^\.?\//, '')}`
  const toBlob = (path: string) =>
    `https://github.com/${OWNER}/${repo}/blob/HEAD/${path.replace(/^\.?\//, '')}`

  return mapOutsideCode(markdown, (chunk) => {
    const withImages = chunk.replace(
      /(!\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g,
      (match, open: string, url: string, close: string) =>
        `${open}${isExternal(url) ? url : toRaw(url)}${close}`
    )

    return withImages.replace(
      /(^|[^!])(\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g,
      (match, prefix: string, open: string, url: string, close: string) =>
        `${prefix}${open}${isExternal(url) ? url : toBlob(url)}${close}`
    )
  })
}

/** READMEs are noisy: drop comments, stray HTML and badge-only lines before rendering. */
function cleanMarkdown(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, '\n')
  const cleaned = mapOutsideCode(normalized, (chunk) =>
    editCopy(chunk)
      .replace(/^(#{1,4})\s+\*{0,2}Features\*{0,2}\s*$/gim, '$1 Project details')
      .replace(/^(#{1,4})\s+\*{0,2}Overview\*{0,2}\s*$/gim, '$1 What this project does')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^\s*\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*$/gm, '')
  )
  return cleaned.replace(/\n{3,}/g, '\n\n').trim()
}

export async function markdownToHtml(markdown: string, repo: string): Promise<string> {
  const prepared = cleanMarkdown(absolutizeUrls(markdown, repo))
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(prepared)
  return addHeadingIds(processed.toString())
}

/**
 * README table-of-contents links point at GitHub anchors (#key-features). The rendered
 * headings need matching ids, otherwise every TOC link in a long README does nothing.
 * Slugs follow GitHub's rules closely: strip markup, lowercase, drop punctuation, spaces
 * to hyphens, and de-duplicate repeats.
 */
function addHeadingIds(html: string): string {
  const seen = new Map<string, number>()

  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (match, level: string, inner: string) => {
    const text = inner
      .replace(/<[^>]+>/g, '')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .normalize('NFKD')

    const base =
      text
        .normalize('NFKD')
        // strip combining accents so "Café" and "Cafe" slug the same way
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s_-]/g, '')
        .trim()
        .replace(/\s+/g, '-') || 'section'

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    return `<h${level} id="${id}">${inner}</h${level}>`
  })
}
