"use client"

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Search } from 'lucide-react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
const PAGE_SIZE = 6

export function BlogList({ posts, categories }: { posts: BlogPostMeta[]; categories: string[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (activeCategory !== 'All' && post.category !== activeCategory) return false
      if (!term) return true
      return post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term) || post.repo.toLowerCase().includes(term) || post.tags.some((tag) => tag.toLowerCase().includes(term))
    })
  }, [posts, query, activeCategory])
  const visible = filtered.slice(0, visibleCount)

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 border-b border-border pb-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder="Search writing" aria-label="Search articles" className="min-h-12 pl-11" />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filter articles">
          {['All', ...categories].map((category) => (
            <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setVisibleCount(PAGE_SIZE) }} className={`min-h-11 px-4 text-sm font-semibold transition-colors ${activeCategory === category ? 'bg-foreground text-background' : 'border border-border hover:border-primary hover:text-primary'}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">Showing {visible.length} of {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p>
      {visible.length === 0 ? (
        <div className="border-y border-border py-16 text-center">
          <p className="text-lg">No articles match that search.</p>
          <Button variant="outline" className="mt-5" onClick={() => { setQuery(''); setActiveCategory('All'); setVisibleCount(PAGE_SIZE) }}>Clear search</Button>
        </div>
      ) : (
        <div className="grid gap-x-10 lg:grid-cols-2">
          {visible.map((post) => (
            <article key={post.slug} className="border-t border-border py-7">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                <span>{post.category}</span><span aria-hidden="true">/</span><span>{post.language}</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl"><Link href={`/blog/${post.slug}`} className="inline-flex min-h-11 items-center transition-colors hover:text-primary">{post.title}</Link></h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground line-clamp-3">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {visibleCount < filtered.length && (
        <div className="mt-8 border-t border-border pt-7 text-center">
          <Button variant="outline" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show 6 more articles</Button>
        </div>
      )}
    </div>
  )
}
