import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { SkillsSection } from '@/components/skills-section'
import { FaqSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Background3DLazy } from '@/components/background-3d-lazy'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background - lazily loaded, desktop only, skipped for reduced motion */}
      <Background3DLazy />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <FaqSection />
        <ContactSection />
      </div>
    </div>
  )
}
