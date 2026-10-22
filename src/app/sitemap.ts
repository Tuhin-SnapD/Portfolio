import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

const toDate = (value: string, fallback: Date) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? fallback : date
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const posts = getAllPosts()
  const newestPost = posts.reduce(
    (latest, post) => {
      const date = toDate(post.date, now)
      return date > latest ? date : latest
    },
    new Date(0)
  )

  return [
    {
      url: absoluteUrl('/'),
      lastModified: posts.length ? newestPost : now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/resume'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: newestPost,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: toDate(post.date, now),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
