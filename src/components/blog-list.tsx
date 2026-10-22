"use client"

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, ArrowRight, Search, Star, FileCode2 } from 'lucide-react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export function BlogList({ posts, categories }: { posts: BlogPostMeta[]; categories: string[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      if (!matchesCategory) return false
      if (!term) return true
      return (
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.repo.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
      )
    })
  }, [posts, query, activeCategory])

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="flex flex-col gap-6">
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, projects, and technologies…"
            aria-label="Search articles"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {['All', ...categories].map((category) => (
            <Button
              key={category}
              size="sm"
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        {query ? ` matching “${query}”` : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No articles match your search.</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setQuery('')
              setActiveCategory('All')
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="glass-effect h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[2/1] overflow-hidden">
                  {/* Locally rendered cover - no remote image request, so cards never appear empty
                      (the GitHub OG endpoint rate-limits with HTTP 429). */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-700/90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <span className="text-white/95 font-semibold text-sm line-clamp-2">{post.repo}</span>
                    <span className="text-white/70 text-xs uppercase tracking-wide">{post.language}</span>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur">
                    {post.category}
                  </Badge>
                </Link>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileCode2 className="w-3 h-3" />
                      {post.language}
                    </span>
                    {post.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {post.stars}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" className="w-full group mt-auto" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
