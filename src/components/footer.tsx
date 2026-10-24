"use client"

import Link from 'next/link'
import { Github, Linkedin, ArrowUpRight } from 'lucide-react'

const profiles = [
  { label: 'GitHub', href: 'https://github.com/Tuhin-SnapD', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tuhin-chakrabarty-1074aa19b/', icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="editorial-rule py-12">
      <div className="section-shell">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-2xl">Tuhin Chakrabarty<span className="text-primary">.</span></p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">Software Engineer 2 at PayU, working on backend services and distributed financial systems.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/resume" className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary">Resume</Link>
            <Link href="/blog" className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary">Writing</Link>
            {profiles.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} profile`} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <Icon className="h-4 w-4" />{label}<ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Tuhin Chakrabarty</p>
          <p>Bengaluru, India</p>
        </div>
      </div>
    </footer>
  )
}
