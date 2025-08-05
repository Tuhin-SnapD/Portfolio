import { Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { SkillsSection } from '@/components/skills-section'
import { ContactSection } from '@/components/contact-section'
import { Background3D } from '@/components/background-3d'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <Suspense fallback={<LoadingSpinner />}>
        <Background3D />
      </Suspense>
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  )
} 