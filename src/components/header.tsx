"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navigation = [
  { name: 'About', href: '/#about' },
  { name: 'Tools', href: '/#skills' },
  { name: 'Work', href: '/#projects' },
  { name: 'Writing', href: '/blog' },
  { name: 'Resume', href: '/resume' },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (event: React.MouseEvent, href: string) => {
    setMobileMenuOpen(false)
    if (!href.startsWith('/#')) return
    const element = document.querySelector(href.substring(1))
    if (!element) return
    event.preventDefault()
    element.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', href)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled ? 'border-border bg-background/95 backdrop-blur' : 'border-transparent bg-background/80'}`}>
      <div className="section-shell">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label="Tuhin Chakrabarty home" className="flex min-h-11 items-center font-display text-xl tracking-tight">TC<span className="text-primary">.</span></Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={(event) => handleNavClick(event, item.href)} className="text-sm text-muted-foreground transition-colors hover:text-primary">{item.name}</Link>
            ))}
            <a href="/#contact" onClick={(event) => handleNavClick(event, '/#contact')} className="inline-flex min-h-11 items-center border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme" className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border transition-colors hover:border-primary hover:text-primary">
              {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button variant="outline" size="icon" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-border md:hidden" aria-label="Mobile">
              <div className="grid py-2">
                {[...navigation, { name: 'Contact', href: '/#contact' }].map((item) => (
                  <Link key={item.name} href={item.href} onClick={(event) => handleNavClick(event, item.href)} className="flex min-h-12 items-center border-b border-border/70 text-base hover:text-primary">{item.name}</Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
