"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Mail, MapPin, Calendar, Building, GraduationCap } from 'lucide-react'

const experience = [
  {
    id: 1,
    title: "Software Engineer 1B",
    company: "Bank of America",
    location: "Gandhinagar, Gujarat, India",
    period: "Jul 2023 - Present",
    description: "Engineered core backend services in C++10 and Python for the Apex/Martini Global Repo Trading Platform, enhancing the speed and stability of global trade execution. Contributed to cross-border repo trade lifecycle logic, with code directly impacting revenue-generating desks across regions. Designed a Tornado-based API to expose live Martini data to Optimus (trader chatbot), and built a pipeline to integrate gmt_chatbot with LOB-specific natural language understanding (NLU), enabling smarter query handling and reducing reliance on licensed systems—resulting in significant operational cost savings. Automated regression testing workflows and UI, developing a React + Python framework, cutting QA time by 90% and streamlining release cycles.",
    technologies: ["C++10", "Python", "React", "Tornado", "NLU", "Trading Systems", "Financial APIs", "Automation", "QA Testing"],
    awards: ["Global Gold Recognition Award, Bank of America - Honored for delivering significant cost savings and driving operational excellence through the development of automation tools and trading platform enhancements."]
  },
  {
    id: 2,
    title: "Student Intern",
    company: "Pantech ProEd Pvt Ltd",
    location: "India",
    period: "Jan 2022 - Jun 2023",
    description: "Progressed from mastering Python fundamentals to architecting end-to-end AI solutions and data pipelines. Built robust machine-learning models including logistic regression for sales forecasting, SVM and Random Forest classifiers for digit and cancer detection, ensemble and regression techniques for price and trend predictions, and reinforcement-learning agents for web-ad optimization and an AI-powered Snake Game. Honed data-analytics expertise by automating complex Excel workflows (Power Query, VBA macros, pivot dashboards), querying SQL/NoSQL databases, crafting interactive Tableau and Power BI visualizations. Developed end-to-end chatbot development, real-time computer-vision applications (OpenCV-based detection, recognition, OCR, emotion analysis), deep-learning architectures (CNNs, transfer learning, RNNs/LSTMs) and edge-deployment on Raspberry Pi.",
    technologies: ["Python", "Machine Learning", "OpenCV", "Deep Learning", "CNNs", "RNNs", "LSTMs", "Tableau", "Power BI", "SQL", "NoSQL", "Excel VBA", "Raspberry Pi", "Computer Vision", "NLP"]
  },
  {
    id: 3,
    title: "Django Developer",
    company: "Able",
    location: "India",
    period: "Feb 2022 - Apr 2022",
    description: "Completed comprehensive development of an advanced lead management web application leveraging Django, Python, Jinja and Tailwind CSS. Successfully hosted a dynamic CRM/Lead Management System, integrating Django and SQLite3 in the backend for optimal performance. This cutting-edge CRM/Lead management system goes beyond basic functionalities, equipping organizations with powerful tools to qualify, analyze, and nurture incoming leads. Through intricate algorithms and data analytics, the system facilitates the transformation of leads into lucrative business opportunities.",
    technologies: ["Django", "Python", "Jinja", "Tailwind CSS", "SQLite3", "CRM Systems", "Data Analytics", "Lead Management"]
  },
  {
    id: 4,
    title: "Javascript Developer",
    company: "Foxmula - The Smart Way",
    location: "Bangalore, India",
    period: "Nov 2021 - Jan 2022",
    description: "Engineered a comprehensive chat application employing socket.io on Node.js—a sophisticated and fully functional Omegle clone crafted explicitly for group conversations. This innovative platform prioritizes user anonymity, providing the unique ability to engage in multiple simultaneous conversations with an expansive and limitless community. Experience seamless and dynamic group interactions, all within a secure and user-friendly environment.",
    technologies: ["JavaScript", "Node.js", "Socket.IO", "Real-time Communication", "Web Application Development", "Group Chat Systems"]
  }
]

const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science & Engineering",
    school: "Vellore Institute of Technology, Vellore",
    location: "Vellore, India",
    period: "2019 - 2023",
    description: "CGPA: 8.6. Specialized in Advanced Algorithms, Data Structures, OS, DBMS, Computer Networks, Distributed Systems."
  }
]

const skills = {
  "Frontend": ["React", "Angular", "JavaScript", "HTML/CSS", "Tailwind CSS", "Bootstrap", "D3.js"],
  "Backend": ["Python", "C++10", "Node.js", "Django", "Flask", "FastAPI", "Express.js", "Socket.IO", "Tornado"],
  "AI/ML": ["Machine Learning", "NLP", "PyTorch", "scikit-learn", "spaCy", "BERT", "Transformers", "LLaMA", "TextRank", "BART", "OpenCV", "CNNs", "RNNs", "LSTMs", "Computer Vision", "Deep Learning"],
  "Data & Analytics": ["Tableau", "Power BI", "Excel VBA", "Power Query", "SQL", "NoSQL", "Data Analytics", "Statistical Analysis"],
  "DevOps & Tools": ["Docker", "AWS", "MongoDB", "MySQL", "SQLite3", "Git", "CI/CD", "Redis", "Raspberry Pi", "Trading Systems", "Financial APIs"]
}

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
    <div ref={ref} className="max-w-4xl mx-auto space-y-12">
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

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Building className="w-8 h-8 text-primary" />
          Work Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-semibold text-primary">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground mt-2">
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
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
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
                        <span className="text-yellow-600">🏆</span>
                        Awards & Recognition
                      </h4>
                      {job.awards.map((award, index) => (
                        <p key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
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
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {edu.degree}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground mt-2">
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
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <Card className="glass-effect">
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
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
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