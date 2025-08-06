"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Eye } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: "PricePilot - Intelligent Pricing Dashboard",
    description: "AI-driven pricing optimization dashboard with ML models and price elasticity forecasting. Features include predictive analytics, real-time pricing recommendations, and comprehensive data visualization.",
    image: "https://raw.githubusercontent.com/Tuhin-SnapD/PricePilot-Intelligent-Pricing-Dashboard/main/landing.png",
    technologies: ["Python", "ML", "Flask", "React", "D3.js", "scikit-learn"],
    category: "ai-ml",
    liveUrl: "https://github.com/Tuhin-SnapD/PricePilot-Intelligent-Pricing-Dashboard",
    githubUrl: "https://github.com/Tuhin-SnapD/PricePilot-Intelligent-Pricing-Dashboard",
    featured: true
  },
  {
    id: 2,
    title: "NewsMelt - Advanced News Finder",
    description: "NLP-powered news processing tool with graph-based summarization, topic modeling, and visualization. Uses BERT, spaCy, and NetworkX for advanced text analysis.",
    image: "https://raw.githubusercontent.com/Tuhin-SnapD/NewsMelt-Advance-News-Finder/main/landing.png",
    technologies: ["Python", "NLP", "NetworkX", "spaCy", "BERT", "PyTorch"],
    category: "ai-ml",
    liveUrl: "https://github.com/Tuhin-SnapD/NewsMelt-Advance-News-Finder",
    githubUrl: "https://github.com/Tuhin-SnapD/NewsMelt-Advance-News-Finder",
    featured: true
  },
  {
    id: 3,
    title: "Todos-List - AI-First Task Manager",
    description: "AI-first task manager using LLaMA models and Flask backend for natural language workflow generation. Integrates OpenAI API for intelligent task management.",
    image: "https://raw.githubusercontent.com/Tuhin-SnapD/Todos-List/main/landing.png",
    technologies: ["Python", "LLaMA", "Flask", "React", "OpenAI API"],
    category: "ai-ml",
    liveUrl: "https://github.com/Tuhin-SnapD/Todos-List",
    githubUrl: "https://github.com/Tuhin-SnapD/Todos-List",
    featured: true
  },
  {
    id: 4,
    title: "Fullstack Restaurant App",
    description: "Full-stack restaurant management app with both MERN and MEAN implementations. Features include order management, inventory tracking, and customer analytics.",
    image: "https://raw.githubusercontent.com/Tuhin-SnapD/Fullstack-Restaurant-App/main/landing.png",
    technologies: ["MERN Stack", "MEAN Stack", "Docker", "MongoDB", "Express"],
    category: "fullstack",
    liveUrl: "https://github.com/Tuhin-SnapD/Fullstack-Restaurant-App",
    githubUrl: "https://github.com/Tuhin-SnapD/Fullstack-Restaurant-App",
    featured: false
  },
  {
    id: 5,
    title: "Real-Time Stock Trading Simulator",
    description: "Real-time stock trading simulator using yfinance with moving average strategy and SQLite logging. Features live market data and trading analytics.",
    image: "https://raw.githubusercontent.com/Tuhin-SnapD/Real-Time-Stock-Trading-Simulator/main/landing.png",
    technologies: ["Python", "yfinance", "pandas", "SQLite", "Trading Strategy"],
    category: "ai-ml",
    liveUrl: "https://github.com/Tuhin-SnapD/Real-Time-Stock-Trading-Simulator",
    githubUrl: "https://github.com/Tuhin-SnapD/Real-Time-Stock-Trading-Simulator",
    featured: false
  },
  {
    id: 6,
    title: "Text Summarization Models",
    description: "Repository of summarization models using BART, TextRank, and other NLP techniques. Comprehensive collection of text processing and summarization algorithms.",
    image: "https://raw.githubusercontent.com/Tuhin-SnapD/Text-Summarization-Models/main/landing.png",
    technologies: ["Python", "Transformers", "BART", "TextRank", "PyTorch"],
    category: "ai-ml",
    liveUrl: "https://github.com/Tuhin-SnapD/Text-Summarization-Models",
    githubUrl: "https://github.com/Tuhin-SnapD/Text-Summarization-Models",
    featured: false
  }
]

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'ai-ml', name: 'AI/ML' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'mobile', name: 'Mobile' }
]

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const filterProjects = (category: string) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === category))
    }
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and technical expertise
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => filterProjects(category.id)}
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="glass-effect h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                      onError={() => {
                        // Fallback to placeholder if image fails to load
                        const imgElement = document.querySelector(`[alt="${project.title}"]`) as HTMLImageElement;
                        if (imgElement) {
                          imgElement.style.display = 'none';
                          imgElement.nextElementSibling?.classList.remove('hidden');
                        }
                      }}
                    />
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center hidden">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-muted-foreground mb-2">
                          {project.title.split(' ').slice(0, 2).join(' ')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Project Screenshot
                        </div>
                      </div>
                    </div>
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Live
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="flex items-center gap-2 flex-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="flex items-center gap-2 flex-1"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('https://github.com/Tuhin-SnapD', '_blank')}
            className="flex items-center gap-2 mx-auto"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 