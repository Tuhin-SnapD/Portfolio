import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Calendar, Clock, FileCode2, Github, Star } from 'lucide-react'
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
    openGraph: { type: 'article', title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, siteName: 'Tuhin Chakrabarty', publishedTime: published.toISOString(), modifiedTime: published.toISOString(), authors: ['Tuhin Chakrabarty'], tags: post.tags, section: post.category },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  }
}

const formatDate = (value: string) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const [html, related] = [await markdownToHtml(post.content, post.repo), getRelatedPosts(post.slug)]

  return (
    <main className="min-h-screen pt-28 pb-20 sm:pt-36">
      <div className="section-shell">
        <BlogPostingJsonLd post={post} />
        <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Writing', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} />
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-link mb-8"><ArrowLeft className="h-4 w-4" /> All notes</Link>
          <p className="eyebrow mb-4">{post.category} <span className="mx-2 text-muted-foreground">/</span> {post.repo}</p>
          <h1 className="section-heading">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
            <span className="inline-flex items-center gap-1.5"><FileCode2 className="h-4 w-4" />{post.language}</span>
            {post.stars > 0 && <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4" />{post.stars} stars</span>}
          </div>
          <details className="mt-10 border-y border-border py-5">
            <summary className="min-h-11 cursor-pointer font-semibold text-primary">Open the full technical write-up</summary>
            <div className="prose mt-6 max-w-none prose-headings:scroll-mt-24 prose-headings:font-display prose-headings:font-normal prose-a:text-primary prose-img:rounded-sm prose-pre:bg-secondary prose-p:leading-8 prose-li:leading-8" dangerouslySetInnerHTML={{ __html: html }} />
          </details>
          <div className="mt-10 border-t border-border pt-7">
            <a className="text-link" href={post.repoUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /> View source on GitHub <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl border-t border-border pt-10">
            <h2 className="section-heading mb-8">Related notes</h2>
            <div className="grid gap-x-8 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="border-t border-border py-5">
                  <p className="eyebrow text-[10px]">{item.category}</p>
                  <h3 className="mt-3 text-xl"><Link href={`/blog/${item.slug}`} className="inline-flex min-h-11 items-center hover:text-primary">{item.title}</Link></h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-3">{item.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
