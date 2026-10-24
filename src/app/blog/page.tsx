import { Metadata } from 'next'
import { BlogList } from '@/components/blog-list'
import { getAllPosts, getCategories } from '@/lib/blog'
import { BreadcrumbJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Engineering Notes - Tuhin Chakrabarty',
  description: 'Project notes and technical write-ups by Tuhin Chakrabarty on backend engineering, distributed systems, and full-stack development.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getCategories()

  return (
    <main className="min-h-screen pt-28 pb-20 sm:pt-36">
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Writing', path: '/blog' }]} />
      <div className="section-shell">
        <header className="mb-12 max-w-3xl border-b border-border pb-9">
          <p className="eyebrow">Notes from the workbench</p>
          <h1 className="section-heading mt-5">Engineering notes.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Project write-ups, implementation details, and lessons from building software.</p>
        </header>
        <BlogList posts={posts} categories={categories} />
      </div>
    </main>
  )
}
