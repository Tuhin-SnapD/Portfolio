import { Metadata } from 'next'
import { BlogList } from '@/components/blog-list'
import { getAllPosts, getCategories } from '@/lib/blog'
import { BreadcrumbJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Engineering Blog - Backend, Distributed Systems & AI/ML',
  description:
    'Technical articles by Tuhin Chakrabarty, Software Engineer 2 at PayU, on backend engineering, distributed systems, AI/ML, and full-stack development - each one written from a real project repository.',
  keywords: [
    'Tuhin Chakrabarty blog',
    'backend engineering articles',
    'distributed systems articles',
    'Python tutorials',
    'C++ systems programming',
    'React and Django projects',
    'AI/ML projects',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Engineering Blog - Tuhin Chakrabarty',
    description:
      'Articles on backend engineering, distributed systems, AI/ML, and full-stack development by Tuhin Chakrabarty.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog - Tuhin Chakrabarty',
    description:
      'Articles on backend engineering, distributed systems, AI/ML, and full-stack development.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog & <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {posts.length} write-ups on backend engineering, distributed systems, AI/ML, and full-stack
            development — each one built from a real project repository.
          </p>
        </div>

        <BlogList posts={posts} categories={categories} />
      </div>
    </div>
  )
}
