import { remark } from 'remark'
import remarkHtml from 'remark-html'
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

const meta = (post: BlogPost): BlogPostMeta => {
  const { content: _content, ...rest } = post
  return rest
}

export function getAllPosts(): BlogPostMeta[] {
  return posts.map(meta)
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((post) => post.category))).sort()
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
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
 * READMEs reference images and files with repo-relative paths (`landing.png`, `./docs/x.md`).
 * Those break on the site, so rewrite them to raw.githubusercontent.com / github.com URLs.
 */
function absolutizeUrls(markdown: string, repo: string): string {
  const toRaw = (path: string) =>
    `https://raw.githubusercontent.com/${OWNER}/${repo}/HEAD/${path.replace(/^\.?\//, '')}`
  const toBlob = (path: string) =>
    `https://github.com/${OWNER}/${repo}/blob/HEAD/${path.replace(/^\.?\//, '')}`

  const withImages = markdown.replace(
    /(!\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g,
    (match, open: string, url: string, close: string) =>
      `${open}${isExternal(url) ? url : toRaw(url)}${close}`
  )

  return withImages.replace(
    /(^|[^!])(\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g,
    (match, prefix: string, open: string, url: string, close: string) =>
      `${prefix}${open}${isExternal(url) ? url : toBlob(url)}${close}`
  )
}

/** READMEs are noisy: drop badge-only lines and stray HTML before rendering. */
function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/^\s*\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function markdownToHtml(markdown: string, repo: string): Promise<string> {
  const prepared = cleanMarkdown(absolutizeUrls(markdown, repo))
  // remark@15 runs on unified@11, but remark-html@15 still publishes unified@10 types,
  // so the plugin instance cannot be typed against this processor. The runtime contract
  // is unchanged; the cast only bridges the two typings.
  const htmlPlugin = remarkHtml as unknown as Parameters<ReturnType<typeof remark>['use']>[0]
  const processed = await remark().use(htmlPlugin).process(prepared)
  return processed.toString()
}
