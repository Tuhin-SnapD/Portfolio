"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { User, Code, Rocket, Heart } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '3+', icon: User },
  { label: 'Global Gold Awards', value: '2x', icon: Heart },
  { label: 'Technologies', value: '30+', icon: Rocket },
  { label: 'Companies', value: '3', icon: Code },
]

const interests = [
  'Distributed Systems', 'Backend Engineering', 'API Design', 'Cloud-Native Development',
  'Full-Stack Development', 'High-Level Design', 'Low-Level Design', 'Microservices',
  'Event-Driven Architecture', 'FinTech', 'Data Engineering', 'DevOps',
  'Observability', 'Automation', 'Testing & Code Review', 'Agile Delivery',
  'Mentoring', 'Performance Engineering', 'Security', 'Scalability'
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
            Software engineer building scalable backend and full-stack systems
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
                    src="/tuhin-avatar.jpg" 
                    alt="Tuhin Chakrabarty" 
                    width={320}
                    height={320}
                    sizes="320px"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">3+</span>
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
                I&apos;m a software engineer experienced in building scalable backend and full-stack systems.
                Currently a Software Engineer 2 at PayU in Bengaluru, India, where I lead PRISM 2.0 — a secure,
                multi-tenant financial intelligence platform for large-scale SMS ingestion and analysis, built on
                encrypted data pipelines, isolated processing, and cloud-native deployments.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Before PayU, I spent over two years at Bank of America GIFT City, developing low-latency C++ and
                Python services for the Apex/Martini Global Repo Trading Platform and designing Optimus, a
                Python/Tornado support automation platform with RASA NLU. My toolkit spans Python, C++, JavaScript,
                SQL, and Perl on the backend; React on the frontend; and AWS, Docker, Terraform, Kafka, and Jenkins
                for delivery and operations.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                What I Do
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I design and ship distributed, event-driven systems that stay fast and reliable under large transaction
                and messaging workloads. That means API design, high-level and low-level design, encrypted multi-tenant
                data flows, consent and audit lifecycles, and the observability and automation needed to run them in
                production. I also build the full stack around them — React and TypeScript frontends on top of Django,
                Flask, Tornado, and Node.js services, backed by PostgreSQL, DynamoDB, MySQL, Kafka, RabbitMQ, and SQS.
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
                Backend Engineering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                REST APIs, microservices, and event-driven systems built with Python, C++, Django, Flask, and Tornado.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Scale & Reliability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Low-latency, fault-tolerant processing with observability, CI/CD, and cloud-native deployment on AWS.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Collaboration & Mentoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Agile delivery, code review, testing culture, and mentoring engineers across the team.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 