import { Metadata } from 'next'
import { ResumeContent } from '@/components/resume-content'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional resume and work experience of Tuhin Chakrabarty - Software Engineer at Bank of America.',
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Resume & <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey, skills, and achievements in web development.
          </p>
        </div>
        
        <ResumeContent />
      </div>
    </div>
  )
} 