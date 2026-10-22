import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ExternalLink, Github, Star, FileCode2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { getAllPosts, getPostBySlug, getRelatedPosts, markdownToHtml } from '@/lib/blog'
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/structured-data'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Article not found' }

  const published = new Date(post.date)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.language, post.category, 'Tuhin Chakrabarty'],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: 'Tuhin Chakrabarty',
      publishedTime: published.toISOString(),
      modifiedTime: published.toISOString(),
      authors: ['Tuhin Chakrabarty'],
      tags: post.tags,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const [html, related] = [await markdownToHtml(post.content, post.repo), getRelatedPosts(post.slug)]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <BlogPostingJsonLd post={post} />
        <BreadcrumbJsonLd
          trail={[
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
        <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto mb-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground line-clamp-1">{post.title}</li>
          </ol>
        </nav>
        <article className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2 group" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              All articles
            </Link>
          </Button>

          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4" />
              {post.language}
            </span>
            {post.stars > 0 && (
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4" />
                {post.stars} stars
              </span>
            )}
          </div>

          <div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl border border-border/40 mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-700/90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-white font-semibold text-lg md:text-2xl">{post.repo}</span>
              <span className="text-white/70 text-xs md:text-sm uppercase tracking-widest">
                {post.language} · {post.category}
              </span>
            </div>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-img:rounded-lg prose-pre:bg-muted"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="flex flex-wrap gap-2 mt-10">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-border/40">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <a href={post.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View source on GitHub
              </a>
            </Button>
            {post.homepage && (
              <Button variant="outline" asChild>
                <a href={post.homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live demo
                </a>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/#contact">Get in touch</Link>
            </Button>
          </div>
        </article>

        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related <span className="gradient-text">Articles</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Card key={item.slug} className="glass-effect hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 space-y-3">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <CardTitle className="text-base font-semibold line-clamp-2">
                      <Link href={`/blog/${item.slug}`} className="hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
