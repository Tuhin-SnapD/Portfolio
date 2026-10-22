import { Metadata } from 'next'
import { ResumeContent } from '@/components/resume-content'
import { BreadcrumbJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Resume & Experience - Software Engineer 2 at PayU',
  description:
    'Resume of Tuhin Chakrabarty, Software Engineer 2 at PayU in Bengaluru: distributed systems, financial platforms, Python and C++ services, plus earlier experience at Bank of America, VIT B.Tech CSE, projects and awards. Download the PDF.',
  keywords: [
    'Tuhin Chakrabarty resume',
    'Tuhin Chakrabarty CV',
    'Tuhin Chakrabarty PayU',
    'Tuhin Chakrabarty Bank of America',
    'Tuhin Chakrabarty VIT',
    'software engineer resume Bengaluru',
  ],
  alternates: { canonical: '/resume' },
  openGraph: {
    type: 'profile',
    url: '/resume',
    title: 'Resume & Experience - Tuhin Chakrabarty',
    description:
      'Software Engineer 2 at PayU. Backend, distributed systems, Python, C++, React. Download the PDF resume.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume & Experience - Tuhin Chakrabarty',
    description: 'Software Engineer 2 at PayU. Backend, distributed systems, Python, C++, React.',
  },
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Resume & <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey, skills, projects, and achievements in backend and full-stack engineering.
          </p>
        </div>
        
        <ResumeContent />
      </div>
    </div>
  )
}
