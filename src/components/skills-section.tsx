"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Palette, 
  Zap,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Star
} from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code,
    skills: [
      { name: 'React', level: 90, icon: Circle },
      { name: 'Angular', level: 85, icon: Code },
      { name: 'JavaScript', level: 92, icon: Square },
      { name: 'HTML/CSS', level: 88, icon: Palette },
      { name: 'Tailwind CSS', level: 85, icon: Palette },
    ]
  },
  {
    title: 'Backend Development',
    icon: Database,
    skills: [
      { name: 'Python', level: 95, icon: Triangle },
      { name: 'C++10', level: 85, icon: Code },
      { name: 'Node.js', level: 85, icon: Hexagon },
      { name: 'Django', level: 80, icon: Database },
      { name: 'Flask', level: 85, icon: Database },
      { name: 'FastAPI', level: 80, icon: Database },
      { name: 'Tornado', level: 75, icon: Zap },
    ]
  },
  {
    title: 'AI/ML & Data Science',
    icon: Cloud,
    skills: [
      { name: 'Machine Learning', level: 90, icon: Octagon },
      { name: 'NLP', level: 85, icon: Cloud },
      { name: 'PyTorch', level: 80, icon: Zap },
      { name: 'Transformers', level: 85, icon: Cloud },
      { name: 'BERT', level: 80, icon: Star },
      { name: 'OpenCV', level: 75, icon: Circle },
      // { name: 'Deep Learning', level: 85, icon: Star },
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: Smartphone,
    skills: [
      { name: 'Docker', level: 80, icon: Circle },
      { name: 'AWS', level: 75, icon: Smartphone },
      { name: 'MongoDB', level: 85, icon: Palette },
      { name: 'MySQL', level: 80, icon: Cloud },
      { name: 'Git', level: 90, icon: Cloud },
      { name: 'Trading Systems', level: 85, icon: Zap },
      // { name: 'Tableau', level: 75, icon: Palette },
    ]
  }
]

const technologies = [
  { name: 'Python', icon: Triangle, color: 'text-yellow-600' },
  { name: 'C++10', icon: Code, color: 'text-blue-600' },
  { name: 'React', icon: Circle, color: 'text-blue-500' },
  { name: 'Angular', icon: Code, color: 'text-red-600' },
  { name: 'Node.js', icon: Hexagon, color: 'text-green-600' },
  { name: 'Django', icon: Database, color: 'text-green-700' },
  { name: 'Flask', icon: Octagon, color: 'text-black dark:text-white' },
  { name: 'FastAPI', icon: Database, color: 'text-green-600' },
  { name: 'PyTorch', icon: Zap, color: 'text-orange-500' },
  { name: 'BERT', icon: Star, color: 'text-blue-600' },
  { name: 'OpenCV', icon: Circle, color: 'text-green-500' },
  { name: 'Docker', icon: Cloud, color: 'text-blue-400' },
  { name: 'AWS', icon: Cloud, color: 'text-orange-500' },
  { name: 'MongoDB', icon: Database, color: 'text-green-500' },
  { name: 'Tableau', icon: Palette, color: 'text-blue-700' },
]

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              <Card className="glass-effect h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-6 h-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.1 
                      }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-8">
            Technology <span className="gradient-text">Stack</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-3 p-4 glass-effect rounded-lg hover:shadow-lg transition-all"
              >
                <tech.icon className={`w-8 h-8 ${tech.color}`} />
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">
            Additional <span className="gradient-text">Skills</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Git & GitHub', 'REST APIs', 'FastAPI', 'PyTorch', 'spaCy',
              'BERT', 'Transformers', 'scikit-learn', 'pandas', 'NumPy',
              'MongoDB', 'MySQL', 'SQLite', 'Redis', 'Socket.IO',
              'Express.js', 'JWT', 'Docker', 'AWS', 'Machine Learning',
              'LLaMA', 'NetworkX', 'TextRank',
              'BART', 'OpenAI API', 'Tailwind CSS', 'Bootstrap',
              'C++10', 'Tornado', 'OpenCV', 'CNNs', 'RNNs', 'LSTMs',
              'Computer Vision',
              'Excel VBA', 'Power Query', 'Trading Systems', 'Financial APIs',
              'NLU', 'Automation', 'QA Testing', 'Raspberry Pi'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.02 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 