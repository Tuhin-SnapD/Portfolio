"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Code,
  Database,
  Cloud,
  Palette,
  Zap,
  Circle,
  Square,
  Triangle,
  Octagon,
  Server,
  Layers,
  Activity,
  Cpu,
  Boxes,
  Terminal,
  Container
} from 'lucide-react'

const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['Python', 'C++', 'JavaScript', 'SQL', 'Perl']
  },
  {
    title: 'Frontend',
    icon: Palette,
    skills: ['React.js', 'TypeScript', 'Vite', 'MUI', 'Tailwind CSS', 'HTML']
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    skills: ['Django', 'Flask', 'Tornado', 'Gunicorn', 'REST APIs', 'Microservices']
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: ['AWS', 'Docker', 'Amazon ECR', 'Terraform', 'Linux']
  },
  {
    title: 'Databases & Messaging',
    icon: Layers,
    skills: ['PostgreSQL', 'DynamoDB', 'MySQL', 'SQLite', 'Oracle', 'Kafka', 'RabbitMQ', 'Amazon SQS']
  },
  {
    title: 'DevOps & Observability',
    icon: Activity,
    skills: ['Jenkins', 'CI/CD', 'Signoz', 'Elastic', 'AutoSys', 'Monitoring']
  },
  {
    title: 'Engineering Practices',
    icon: Cpu,
    skills: ['Distributed Systems', 'API Design', 'DSA', 'LLD', 'HLD', 'Testing', 'Code Review', 'Agile', 'Automation', 'Mentoring']
  }
]

const technologies = [
  { name: 'Python', icon: Triangle, color: 'text-yellow-600' },
  { name: 'C++', icon: Code, color: 'text-blue-600' },
  { name: 'JavaScript', icon: Square, color: 'text-yellow-500' },
  { name: 'React', icon: Circle, color: 'text-blue-500' },
  { name: 'Django', icon: Database, color: 'text-green-700' },
  { name: 'Flask', icon: Octagon, color: 'text-black dark:text-white' },
  { name: 'Tornado', icon: Zap, color: 'text-blue-400' },
  { name: 'PostgreSQL', icon: Database, color: 'text-blue-700' },
  { name: 'DynamoDB', icon: Database, color: 'text-orange-600' },
  { name: 'Kafka', icon: Layers, color: 'text-gray-700 dark:text-gray-300' },
  { name: 'RabbitMQ', icon: Boxes, color: 'text-orange-500' },
  { name: 'AWS', icon: Cloud, color: 'text-orange-500' },
  { name: 'Docker', icon: Container, color: 'text-blue-400' },
  { name: 'Terraform', icon: Boxes, color: 'text-purple-600' },
  { name: 'Jenkins', icon: Server, color: 'text-red-600' },
  { name: 'Gunicorn', icon: Server, color: 'text-green-700' },
  { name: 'MySQL', icon: Database, color: 'text-blue-600' },
  { name: 'Linux', icon: Terminal, color: 'text-yellow-700' }
]

const additionalSkills = [
  'Distributed Systems', 'Event-Driven Architecture', 'REST APIs', 'Microservices', 'API Design',
  'HLD', 'LLD', 'DSA', 'Testing', 'Code Review', 'Agile', 'Automation', 'Mentoring',
  'CI/CD', 'Observability', 'Multi-Tenancy', 'Consent Lifecycles', 'Audit & Compliance',
  'AWS ECR', 'Amazon SQS', 'DynamoDB', 'PostgreSQL', 'Oracle', 'Perl', 'Gunicorn',
  'TypeScript', 'Vite', 'MUI', 'Tornado', 'Flask', 'Django', 'Linux', 'Signoz', 'Elastic',
  'AutoSys', 'Jenkins', 'Terraform', 'Security', 'Production Engineering'
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
            The stack I use to design, build, and run production systems
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05
                        }}
                      >
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
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
                transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
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
            {additionalSkills.map((skill, index) => (
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
