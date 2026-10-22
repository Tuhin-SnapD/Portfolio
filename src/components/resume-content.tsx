"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Download,
  Mail,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Trophy,
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react'

const summary =
  "Software Engineer experienced in building scalable backend and full-stack systems using Python, C++, React, Django, Flask, and SQL. Skilled in API design, distributed systems, cloud development, automation, and production engineering, with a strong foundation in DSA, software design, testing, and delivery."

const experience = [
  {
    id: 1,
    title: "Software Engineer 2",
    company: "PayU",
    location: "Bengaluru, India",
    period: "Dec 2025 - Present",
    highlights: [
      "Led PRISM 2.0, architecting a secure, multi-tenant financial intelligence platform for large-scale SMS ingestion and analysis, with encrypted data pipelines, isolated processing, ML-driven workflows, and cloud-native deployments.",
      "Led development of a regulatory-compliant, multi-tenant AA TSP consent platform User Journey, enabling automated credit and risk decisions through secure data-access workflows, consent lifecycle management, monitoring, and audit capabilities.",
      "Owned the architecture and reliability of PRISM, designing distributed, event-driven systems for low-latency, fault-tolerant processing of large-scale transaction and messaging workloads, improving performance, resilience, automation, observability, and security."
    ],
    technologies: [
      "Python", "Distributed Systems", "Event-Driven Architecture", "Multi-Tenancy",
      "AWS", "Docker", "Terraform", "PostgreSQL", "Kafka", "Observability"
    ]
  },
  {
    id: 2,
    title: "Software Engineer 1",
    company: "Bank of America",
    location: "GIFT City, India",
    period: "Jul 2023 - Nov 2025",
    highlights: [
      "Developed and supported low-latency C++ and Python services for the Apex/Martini Global Repo Trading Platform, supporting critical trading workflows and production stability.",
      "Designed Optimus, a Python/Tornado support automation platform with RASA NLU, replacing licensed third-party solutions and streamlining operational workflows.",
      "Built a React + Flask automated regression framework, reducing manual QA effort by approximately 90% and accelerating release validation."
    ],
    technologies: [
      "C++", "Python", "React", "Flask", "Tornado", "NLU", "REST APIs",
      "Trading Systems", "Automation", "Testing"
    ],
    awards: [
      "2x Global Gold Recognition Award - recognized for automating regression and saving license costs with Optimus, bypassing the APEX login dependency."
    ]
  }
]

const earlierExperience = [
  {
    id: 3,
    title: "Student Intern",
    company: "Pantech ProEd Pvt Ltd",
    location: "India",
    period: "Jan 2022 - Jun 2023",
    description:
      "Progressed from Python fundamentals to end-to-end AI solutions and data pipelines: machine-learning models (logistic regression, SVM, Random Forest, ensembles, reinforcement learning), data analytics with Excel automation, SQL/NoSQL, Tableau and Power BI, plus computer vision, deep learning, and edge deployment on Raspberry Pi.",
    technologies: ["Python", "Machine Learning", "OpenCV", "Deep Learning", "Tableau", "Power BI", "SQL", "Raspberry Pi"]
  },
  {
    id: 4,
    title: "Django Developer",
    company: "Able",
    location: "India",
    period: "Feb 2022 - Apr 2022",
    description:
      "Built and hosted a lead management / CRM web application using Django, Python, Jinja, Tailwind CSS, and SQLite3, with analytics-driven workflows to qualify, analyze, and nurture incoming leads.",
    technologies: ["Django", "Python", "Jinja", "Tailwind CSS", "SQLite3", "CRM Systems"]
  },
  {
    id: 5,
    title: "JavaScript Developer",
    company: "Foxmula - The Smart Way",
    location: "Bangalore, India",
    period: "Nov 2021 - Jan 2022",
    description:
      "Engineered a real-time group chat application with socket.io on Node.js, supporting anonymous multi-room conversations for concurrent users.",
    technologies: ["JavaScript", "Node.js", "Socket.IO", "Real-time Communication"]
  }
]

const projects = [
  {
    id: 1,
    title: "PricePilot - Intelligent Pricing Dashboard",
    link: "https://github.com/Tuhin-SnapD/PricePilot-Intelligent-Pricing-Dashboard",
    description:
      "Full-stack pricing intelligence platform built with Python, Django, React, and TypeScript, combining demand forecasting, price elasticity, Random Forest optimization, inventory constraints, and A/B simulations to generate data-driven pricing recommendations through REST APIs and interactive analytics.",
    technologies: ["Python", "Django", "React", "TypeScript", "Random Forest", "REST APIs"]
  },
  {
    id: 2,
    title: "Fullstack Restaurant App",
    link: "https://github.com/Tuhin-SnapD/Fullstack-Restaurant-App",
    description:
      "Full-stack restaurant management platform using Node.js, Express, MongoDB, React, Angular, and TypeScript, featuring a shared REST API architecture with JWT/OAuth authentication, RBAC, validation, and secure service-driven workflows across multiple frontend clients.",
    technologies: ["Node.js", "Express", "MongoDB", "React", "Angular", "TypeScript", "JWT/OAuth", "RBAC"]
  }
]

const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science & Engineering",
    school: "Vellore Institute of Technology, Vellore",
    location: "Vellore, India",
    period: "2019 - 2023",
    description:
      "GPA: 8.6/10.0 - Merit Holder. Coursework: Advanced Algorithms & Data Structures, Operating Systems, Computer Networks, Distributed Systems, DBMS, Software Engineering."
  }
]

const skills = {
  "Languages": ["Python", "C++", "JavaScript", "SQL", "Perl"],
  "Frontend": ["React.js", "Vite", "MUI", "Tailwind CSS", "HTML"],
  "Backend & APIs": ["Django", "Flask", "Tornado", "Gunicorn", "REST APIs", "Microservices"],
  "Cloud & Infrastructure": ["AWS", "Docker", "Amazon ECR", "Terraform", "Linux"],
  "Databases & Messaging": ["PostgreSQL", "DynamoDB", "MySQL", "SQLite", "Oracle", "Kafka", "RabbitMQ", "Amazon SQS"],
  "DevOps & Observability": ["Jenkins", "Signoz", "Elastic", "AutoSys", "CI/CD"],
  "Engineering": [
    "Distributed Systems", "API Design", "DSA", "LLD", "HLD", "Testing",
    "Code Review", "Agile", "Automation", "Mentoring"
  ]
}

const achievements = [
  "Awarded the 2x Global Gold Recognition Award at Bank of America for automating regression and saving license costs using Optimus, bypassing the APEX login dependency.",
  "Recipient of the VIT University Merit Scholarship for academic performance, 2019-20."
]

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'tuhinchakrabarty14@gmail.com', href: 'mailto:tuhinchakrabarty14@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Bengaluru, India', href: '#' },
  { icon: ExternalLink, label: 'GitHub', value: 'github.com/Tuhin-SnapD', href: 'https://github.com/Tuhin-SnapD' },
  { icon: ExternalLink, label: 'LinkedIn', value: 'linkedin.com/in/tuhin-chakrabarty', href: 'https://www.linkedin.com/in/tuhin-chakrabarty-1074aa19b/' }
]

export function ResumeContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const downloadResume = () => {
    // Download the most recent resume
    const link = document.createElement('a')
    link.href = '/Tuhin_Chakrabarty_Resume.pdf'
    link.download = 'Tuhin_Chakrabarty_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto space-y-16">
      {/* Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button
          onClick={downloadResume}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF Resume
        </Button>
      </motion.div>

      {/* Professional Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Professional Summary
        </h2>
        <Card className="glass-effect">
          <CardContent className="py-6">
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {contactDetails.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  target={detail.href.startsWith('http') ? '_blank' : undefined}
                  rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <detail.icon className="w-4 h-4" />
                  {detail.value}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-primary" />
          Work Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-semibold text-primary">
                        {job.title}, {job.company}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.period}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {job.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {job.awards && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        Awards & Recognition
                      </h4>
                      {job.awards.map((award, awardIndex) => (
                        <p key={awardIndex} className="text-sm text-yellow-700 dark:text-yellow-300">
                          {award}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FolderGit2 className="w-8 h-8 text-primary" />
          Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-xl font-semibold text-primary">
                      {project.title}
                    </CardTitle>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          Education
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {edu.degree}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {edu.school}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <Card className="glass-effect h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          Achievements
        </h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardContent className="p-4 flex gap-3 items-start">
                  <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">{achievement}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Earlier Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Building className="w-8 h-8 text-primary" />
          Earlier Experience
        </h2>
        <div className="space-y-6">
          {earlierExperience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {job.title} · {job.company}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {job.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="text-center"
      >
        <Card className="glass-effect">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m always interested in new opportunities and exciting projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = 'mailto:tuhinchakrabarty14@gmail.com'}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button
                onClick={() => window.location.href = '/#contact'}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                View Contact Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
