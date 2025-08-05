import { Metadata } from 'next'
import { BlogList } from '@/components/blog-list'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about web development and technology.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog & <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sharing insights, tutorials, and thoughts about web development, technology, and design.
          </p>
        </div>
        
        <BlogList />
      </div>
    </div>
  )
} 