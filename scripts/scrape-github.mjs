#!/usr/bin/env node
/**
 * Scrapes the GitHub profile (repos + READMEs) and generates src/data/github-posts.json,
 * which powers the /blog listing and /blog/[slug] post pages.
 *
 * Usage:  npm run scrape:github
 *
 * Notes:
 *  - Repo metadata uses the GitHub REST API (unauthenticated: 60 req/hr for this one call).
 *    Set GITHUB_TOKEN to raise the limit and include private repos.
 *  - README files are fetched from raw.githubusercontent.com, which does not consume API quota.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OWNER = 'Tuhin-SnapD'
const OUT_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'github-posts.json')
const MAX_CONTENT_CHARS = 30000
const README_CANDIDATES = ['README.md', 'readme.md', 'Readme.md', 'README.MD', 'README.rst', 'README.txt', 'README']

const token = process.env.GITHUB_TOKEN
const apiHeaders = {
  'User-Agent': 'tuhin-portfolio-scraper',
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

/* ------------------------------------------------------------------ helpers */

const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}\u{20E3}\u{200D}\u{2700}-\u{27BF}]/gu

function stripFormatting(text = '') {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~#>|]/g, '')
    .replace(EMOJI, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function truncate(text, max) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trim()}…`
}

function readingTime(words) {
  return `${Math.max(1, Math.round(words / 200))} min read`
}

/** Resolve a relative README path against the repo's raw default branch. */
function rawUrl(repo, path) {
  return `https://raw.githubusercontent.com/${OWNER}/${repo}/HEAD/${path.replace(/^\.?\//, '')}`
}

/** Turn raw HTML that lives inside READMEs into equivalent markdown. */
function normalizeHtml(markdown) {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi, (_m, src) => `![](${src})`)
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_m, href, text) => `[${text.trim()}](${href})`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|tr|details|summary)>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<h([1-6])[^>]*>/gi, (_m, lvl) => `\n${'#'.repeat(Number(lvl))} `)
    .replace(/<[^>]+>/g, '')
}

/** Extract the leading H1 as the post title and remove it from the body. */
function extractTitle(markdown) {
  const lines = markdown.split('\n')
  let inFence = false

  for (let i = 0; i < Math.min(lines.length, 60); i += 1) {
    const line = lines[i]
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = line.match(/^\s*#\s+(.+?)\s*$/)
    if (match) {
      const title = stripFormatting(match[1])
      const body = [...lines.slice(0, i), ...lines.slice(i + 1)].join('\n').trimStart()
      return { title, body }
    }
  }

  return { title: null, body: markdown }
}

function firstParagraph(markdown) {
  const blocks = markdown
    .replace(/^\s*#{1,6}\s+.*$/gm, '')
    .split(/\n\s*\n/)
    .map((block) => stripFormatting(block))
    .filter((block) => block.length > 60)
  return blocks[0] || ''
}

/* --------------------------------------------------------------- categories */

const CATEGORY_RULES = [
  {
    name: 'AI/ML & Data Science',
    keywords: ['machine learning', 'deep learning', 'neural', 'cnn', 'rnn', 'lstm', 'bert', 'bart', 'pegasus', 'transformer', 'nlp', 'natural language', 'computer vision', 'opencv', 'tensorflow', 'pytorch', 'keras', 'summariz', 'summaris', 'sentiment', 'emotion', 'recommendation', 'model', 'data science', 'face', 'ocr', 'prediction'],
  },
  {
    name: 'DevOps & Cloud',
    keywords: ['kubernetes', 'docker', 'terraform', 'devops', 'aws', 'cloud', 'ci/cd', 'jenkins', 'infrastructure', 'provision', 'self-healing', 'monitor', 'observability', 'automation toolkit', 'bash scripts', 'deploy'],
  },
  {
    name: 'Backend & APIs',
    keywords: ['flask', 'django', 'fastapi', 'express', 'tornado', 'rest', 'api', 'backend', 'server', 'node.js', 'socket.io', 'celery', 'jwt', 'authentication', 'oauth', 'microservice', 'mongoose', 'crud'],
  },
  {
    name: 'Frontend & UI',
    keywords: ['react', 'angular', 'vue', 'next.js', 'tailwind', 'bootstrap', 'css', 'frontend', 'vite', 'astro', 'redux', 'styled-components', 'scss', 'responsive', 'landing page', 'website'],
  },
  {
    name: 'Systems & Security',
    keywords: ['c++', 'c#', 'intrusion', 'detection', 'blockchain', 'steganography', 'security', 'cryptograph', 'benchmark', 'scheduling', 'algorithm', 'dsa', 'data structures', 'interview', 'operating system', 'go ', 'golang', 'tamper', 'anomaly'],
  },
  {
    name: 'Data & Analytics',
    keywords: ['pandas', 'numpy', 'analytics', 'analysis', 'visualization', 'dashboard', 'tableau', 'power bi', 'budget', 'inventory', 'crawler', 'crawling', 'scraping', 'news', 'report', 'jupyter', 'notebook'],
  },
  {
    name: 'Full-Stack Applications',
    keywords: ['full-stack', 'fullstack', 'mern', 'mean', 'e-commerce', 'management system', 'portal', 'tracker', 'banking', 'inventory manager', 'dashboard app', 'system'],
  },
]

const LANGUAGE_FALLBACK = {
  Python: 'AI/ML & Data Science',
  'Jupyter Notebook': 'AI/ML & Data Science',
  TypeScript: 'Frontend & UI',
  JavaScript: 'Frontend & UI',
  CSS: 'Frontend & UI',
  HTML: 'Frontend & UI',
  SCSS: 'Frontend & UI',
  Astro: 'Frontend & UI',
  Go: 'Backend & APIs',
  PHP: 'Backend & APIs',
  'C++': 'Systems & Security',
  'C#': 'Systems & Security',
  Shell: 'DevOps & Cloud',
}

function categorize({ name, description, topics, language, readme }) {
  const haystack = [name, description, ...topics, readme.slice(0, 4000)].join(' ').toLowerCase()
  let best = null
  for (const rule of CATEGORY_RULES) {
    const score = rule.keywords.reduce((total, kw) => (haystack.includes(kw) ? total + 1 : total), 0)
    if (!best || score > best.score) best = { name: rule.name, score }
  }
  if (best && best.score >= 2) return best.name
  return LANGUAGE_FALLBACK[language] || 'Software Engineering'
}

/* ------------------------------------------------------------------ fetching */

async function fetchJson(url) {
  const res = await fetch(url, { headers: apiHeaders })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

async function listRepos() {
  const repos = []
  for (let page = 1; page <= 5; page += 1) {
    const batch = await fetchJson(
      `https://api.github.com/users/${OWNER}/repos?per_page=100&page=${page}&sort=pushed&type=owner`
    )
    repos.push(...batch)
    if (batch.length < 100) break
  }
  return repos
}

async function fetchReadme(repo) {
  for (const filename of README_CANDIDATES) {
    const res = await fetch(rawUrl(repo, filename))
    if (res.ok) return await res.text()
  }
  return ''
}

/* ---------------------------------------------------------------------- main */

async function main() {
  console.log(`Fetching repositories for ${OWNER}…`)
  const repos = await listRepos()
  console.log(`Found ${repos.length} repositories`)

  const candidates = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .filter((repo) => repo.name.toLowerCase() !== OWNER.toLowerCase())
    .filter((repo) => !repo.name.toLowerCase().endsWith('.github.io') || repo.name.toLowerCase() === `${OWNER.toLowerCase()}.github.io`)

  const posts = []
  for (const repo of candidates) {
    const readme = await fetchReadme(repo.name)
    const normalized = normalizeHtml(readme)
    const { title, body: rawBody } = extractTitle(normalized)
    const topics = Array.isArray(repo.topics) ? repo.topics : []
    const words = rawBody.split(/\s+/).filter(Boolean).length

    // Some repos ship no README (or a very short one). Fall back to the repo metadata
    // so the post page always has real, readable content instead of an empty article.
    let body = rawBody
    if (words < 40) {
      if (!repo.description) {
        console.log(`  - skipping ${repo.name} (no README and no description)`)
        continue
      }
      body = [
        repo.description.trim(),
        '',
        '## Repository details',
        '',
        `- **Primary language:** ${repo.language || 'Not specified'}`,
        topics.length ? `- **Topics:** ${topics.join(', ')}` : null,
        `- **Repository:** [${repo.name}](${repo.html_url})`,
        repo.homepage ? `- **Live demo:** ${repo.homepage}` : null,
      ]
        .filter(Boolean)
        .join('\n')
    }

    const category = categorize({
      name: repo.name,
      description: repo.description || '',
      topics,
      language: repo.language,
      readme: body,
    })

    const excerpt = repo.description?.trim()
      ? truncate(repo.description.trim(), 220)
      : truncate(firstParagraph(body), 220)

    const post = {
      slug: slugify(repo.name),
      title: truncate(title || repo.name.replace(/[-_]+/g, ' '), 120),
      repo: repo.name,
      excerpt,
      date: (repo.pushed_at || repo.updated_at || repo.created_at).slice(0, 10),
      readTime: readingTime(body.split(/\s+/).filter(Boolean).length),
      category,
      tags: [...new Set([...topics.slice(0, 4), ...(repo.language ? [repo.language] : [])])],
      language: repo.language || 'Markdown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      repoUrl: repo.html_url,
      homepage: repo.homepage || '',
      image: `https://opengraph.githubassets.com/1/${OWNER}/${repo.name}`,
      content: body.slice(0, MAX_CONTENT_CHARS),
    }

    posts.push(post)
    console.log(`  ✓ ${repo.name.padEnd(42)} ${post.category.padEnd(28)} ${post.readTime}`)
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)))

  await mkdir(dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, `${JSON.stringify(posts, null, 2)}\n`, 'utf8')

  console.log(`\nWrote ${posts.length} posts to ${OUT_FILE}`)
}

main().catch((error) => {
  console.error('Scrape failed:', error.message)
  process.exit(1)
})
