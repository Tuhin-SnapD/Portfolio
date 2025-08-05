"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: "Building AI-Powered Applications with Python and Flask",
    excerpt: "Learn how to integrate machine learning models into web applications using Python, Flask, and modern AI libraries.",
    slug: "building-ai-powered-applications-python-flask",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "AI/ML",
    tags: ["Python", "Flask", "Machine Learning", "AI"]
  },
  {
    id: 2,
    title: "NLP Techniques for Text Processing and Analysis",
    excerpt: "Explore advanced Natural Language Processing techniques using spaCy, BERT, and other modern NLP libraries.",
    slug: "nlp-techniques-text-processing-analysis",
    date: "2024-01-10",
    readTime: "15 min read",
    category: "NLP",
    tags: ["NLP", "spaCy", "BERT", "Text Analysis"]
  },
  {
    id: 3,
    title: "Full-Stack Development with MERN and MEAN Stacks",
    excerpt: "Compare and implement full-stack applications using both MERN (MongoDB, Express, React, Node.js) and MEAN stacks.",
    slug: "fullstack-development-mern-mean-stacks",
    date: "2024-01-05",
    readTime: "18 min read",
    category: "Full-Stack",
    tags: ["MERN", "MEAN", "React", "Angular", "Node.js"]
  },
  {
    id: 4,
    title: "Real-Time Stock Trading Simulator with Python",
    excerpt: "Build a real-time stock trading simulator using yfinance, pandas, and SQLite for data analysis and strategy testing.",
    slug: "real-time-stock-trading-simulator-python",
    date: "2023-12-28",
    readTime: "20 min read",
    category: "Finance",
    tags: ["Python", "yfinance", "Trading", "Data Analysis"]
  },
  {
    id: 5,
    title: "Text Summarization with BART and Transformers",
    excerpt: "Implement advanced text summarization techniques using BART, TextRank, and Hugging Face Transformers library.",
    slug: "text-summarization-bart-transformers",
    date: "2023-12-20",
    readTime: "14 min read",
    category: "AI/ML",
    tags: ["BART", "Transformers", "Text Summarization", "PyTorch"]
  },
  {
    id: 6,
    title: "Building Scalable APIs with FastAPI and Python",
    excerpt: "Create high-performance, scalable APIs using FastAPI, async/await patterns, and modern Python best practices.",
    slug: "building-scalable-apis-fastapi-python",
    date: "2023-12-15",
    readTime: "10 min read",
    category: "Backend",
    tags: ["FastAPI", "Python", "APIs", "Async Programming"]
  }
]

export function BlogList() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="glass-effect h-full hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
              </div>
              <CardTitle className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full group"
                asChild
              >
                <Link href={`/blog/${post.slug}`}>
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 