"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadResume = () => {
    // Download the most recent resume
    const link = document.createElement('a')
    link.href = '/Tuhin_Chakrabarty_Resume.pdf'
    link.download = 'Tuhin_Chakrabarty_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Simplified animation variants for better performance
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.1
      }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" />
      
      {/* Floating elements - simplified for better performance */}
      {!isReducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float-slow" />
          <div className="absolute top-40 right-4 md:right-20 w-16 md:w-32 h-16 md:h-32 bg-purple-500/10 rounded-full blur-xl animate-float-medium" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-float-fast" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-4"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="gradient-text">Tuhin Chakrabarty</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-8 px-4"
            >
              Full-Stack Developer | AI/ML Engineer | Software Engineer at Bank of America
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Software Engineer at Bank of America, passionate about modern web technologies, AI/ML, and scalable applications. 
              From basic Python projects to advanced AI-driven solutions like PricePilot and NewsMelt, demonstrating continuous growth and innovation in full-stack development and machine learning.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4"
            >
              <Button
                onClick={scrollToContact}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <Mail className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                onClick={downloadResume}
                variant="outline"
                size="lg"
                className="group px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold border-2 hover:bg-accent w-full sm:w-auto transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Download Resume
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                </span>
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            {!isReducedMotion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
                  <span className="text-sm">Scroll to explore</span>
                  <ArrowDown className="h-6 w-6" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Glassmorphic cards - simplified */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-2 md:right-10 w-32 md:w-64 h-20 md:h-40 glass-effect rounded-2xl hidden sm:block opacity-0 animate-fade-in" />
          <div className="absolute bottom-1/4 left-2 md:left-10 w-24 md:w-48 h-16 md:h-32 glass-effect rounded-2xl hidden sm:block opacity-0 animate-fade-in-delayed" />
        </div>
      )}
    </section>
  )
} 