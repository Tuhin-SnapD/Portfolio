"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { User, Code, Rocket, Heart } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '2+', icon: User },
  { label: 'Projects Completed', value: '30+', icon: Code },
  { label: 'Technologies', value: '20+', icon: Rocket },
  { label: 'GitHub Stars', value: '150+', icon: Heart },
]

const interests = [
  'Web Development', 'AI/ML Engineering', 'Full-Stack Development', 'Cloud Computing',
  'Machine Learning', 'Open Source', 'NLP', 'DevOps', 'Trading Systems', 'Data Science',
  'Natural Language Processing', 'Deep Learning', 'API Development', 'System Architecture',
  'Computer Vision', 'Financial Technology', 'Automation', 'QA Testing', 'Data Analytics'
]

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate full-stack developer with a love for creating innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Image and stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-background overflow-hidden">
                  <Image 
                    src="https://avatars.githubusercontent.com/u/67930437?s=400&u=4540d1a397edad58b1fe72e3be0366811295a208&v=4" 
                    alt="Tuhin Chakrabarty" 
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">2+</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 glass-effect rounded-lg"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Who I Am
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m a passionate full-stack developer with expertise in modern web technologies, AI/ML, and scalable applications. 
                Currently working as a Software Engineer 1B at Bank of America in Gandhinagar, Gujarat, India, where I engineer core backend services 
                in C++10 and Python for the Apex/Martini Global Repo Trading Platform, enhancing global trade execution speed and stability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey spans from basic Python projects to advanced AI-driven solutions and financial trading systems, demonstrating continuous growth 
                and innovation in software development. I specialize in React, Angular, Node.js, Python, C++10, and cutting-edge AI/ML technologies including 
                BERT, Transformers, PyTorch, and computer vision applications.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                What I Do
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I help businesses and individuals bring their ideas to life through custom web 
                development solutions and AI-powered applications. From engineering high-performance trading systems and financial APIs 
                to developing advanced NLP systems, computer vision applications, and machine learning models, I handle every aspect of the development process, 
                ensuring high-quality, performant, and scalable applications that drive real business value and operational excellence.
              </p>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Areas of Interest
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  >
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {interest}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional info cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Full-stack development with modern frameworks and best practices.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Optimized applications for speed, scalability, and user experience.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Strong communication skills and experience working in agile teams.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 