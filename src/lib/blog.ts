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

const removeDecorativeEmoji = (value: string) =>
  value.replace(
    /(?:[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF])(?:\uFE0F|\uFE0E)?(?:\u200D(?:[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF])(?:\uFE0F|\uFE0E)?)*/g,
    ''
  )

const cleanDisplayCopy = (value: string) => removeDecorativeEmoji(editCopy(value))

const oneSentence = (value: string) => {
  const protectedText = value.replace(
    /\b(e\.g|i\.e|etc|mr|mrs|ms|dr|vs|u\.s|u\.k)\./gi,
    '$1\uE000'
  )
  const firstSentence = protectedText.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? protectedText
  return firstSentence.replace(/\uE000/g, '.').trim()
}

const meta = (post: BlogPost): BlogPostMeta => {
  const { content: _content, ...rest } = post
  return { ...rest, title: cleanDisplayCopy(rest.title), excerpt: oneSentence(cleanDisplayCopy(rest.excerpt)) }
}

export function getAllPosts(): BlogPostMeta[] {
  return posts.map(meta)
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((post) => post.category))).sort()
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = posts.find((item) => item.slug === slug)
  return post
    ? { ...post, title: cleanDisplayCopy(post.title), excerpt: oneSentence(cleanDisplayCopy(post.excerpt)) }
    : undefined
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
  const parts = markdown.split(/(^[ \t]{0,3}(?:```|~~~)[\s\S]*?^[ \t]{0,3}(?:```|~~~)[ \t]*$)/gm)
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

function normalizeHeadingTitle(rawTitle: string): string {
  let title = rawTitle.trim().replace(/^\*{1,2}(.+?)\*{1,2}$/, '$1').trim()
  title = title.replace(/^(?:[^\w\s]+\s*)+/, '').trim()
  title = title.replace(/^\*{1,2}(.+?)\*{1,2}$/, '$1').trim()

  if (/^(?:core|key|main) features$/i.test(title)) return 'Core workflows'
  if (/^advanced features$/i.test(title)) return 'Advanced workflows'
  if (/^features$/i.test(title)) return 'What the project includes'
  if (/^overview$/i.test(title)) return 'What this project does'
  if (/^key capabilities$/i.test(title)) return 'What the system can do'
  if (/^business logic(?: & value proposition)?$/i.test(title)) return 'How the project works'
  if (/^core business problem$/i.test(title)) return 'The problem this project addresses'
  if (/^business solution$/i.test(title)) return 'How the project addresses it'
  if (/^architecture$/i.test(title)) return 'How the system is built'
  if (/^(?:project|product) overview$/i.test(title)) return 'What this project does'
  if (/^project structure$/i.test(title)) return 'How files are organized'
  if (/^technology stack$/i.test(title)) return 'Tools and libraries'
  if (/^advantages$/i.test(title)) return 'Why this approach helps'
  if (/^benefits$/i.test(title)) return 'What this improves'
  if (/^use cases?$/i.test(title)) return 'When to use it'
  if (/^purpose$/i.test(title)) return 'What the project does'
  if (/^introduction$/i.test(title)) return 'Project summary'
  if (/^solution$/i.test(title)) return 'How the project solves it'

  return title
}

function normalizeHeadings(markdown: string): string {
  const atxHeadings = markdown.replace(
    /^([ \t]{0,3}#{1,6}[ \t]+)(.+)$/gm,
    (_line, prefix: string, rawTitle: string) => `${prefix}${normalizeHeadingTitle(rawTitle)}`
  )

  return atxHeadings.replace(
    /^([^\n]+)\n([=-]{2,})[ \t]*$/gm,
    (_heading, rawTitle: string, underline: string) => `${normalizeHeadingTitle(rawTitle)}\n${underline}`
  )
}

/** READMEs are noisy: drop comments, stray HTML and badge-only lines before rendering. */
function cleanMarkdown(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, '\n')
  const cleaned = mapOutsideCode(normalized, (chunk) => {
    const prose = removeDecorativeEmoji(editCopy(chunk)).replace(/\bMade with\s+by\b/gi, 'Made by')
    return normalizeHeadings(prose)
      .replace(/^(#{1,6}\s+)(?:[^\w\s]+\s*)+\*{0,2}Features\*{0,2}\s*$/gim, '$1What the project includes')
      .replace(/^(#{1,6}\s+)(?:[^\w\s]+\s*)+\*{0,2}Overview\*{0,2}\s*$/gim, '$1What this project does')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^\s*\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*$/gm, '')
  })
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
  const legacyAnchors: Record<string, string> = {
    'what-the-project-includes': 'features',
    'what-this-project-does': 'overview',
    'core-workflows': 'core-features',
    'advanced-workflows': 'advanced-features',
    'what-the-system-can-do': 'key-capabilities',
    'how-the-project-works': 'business-logic-value-proposition',
    'the-problem-this-project-addresses': 'core-business-problem',
    'how-the-project-addresses-it': 'pricepilots-business-solution',
    'how-the-system-is-built': 'architecture',
    'how-files-are-organized': 'project-structure',
    'tools-and-libraries': 'technology-stack',
    'why-this-approach-helps': 'advantages',
    'what-this-improves': 'benefits',
    'when-to-use-it': 'use-cases',
    'what-the-project-does': 'purpose',
    'project-summary': 'introduction',
    'how-the-project-solves-it': 'solution',
  }

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
    const legacyId = legacyAnchors[base]
    const anchor = legacyId && !seen.has(legacyId) ? `<span id="${legacyId}" aria-hidden="true"></span>` : ''
    if (anchor) seen.set(legacyId, 1)

    return `<h${level} id="${id}">${anchor}${inner}</h${level}>`
  })
}
