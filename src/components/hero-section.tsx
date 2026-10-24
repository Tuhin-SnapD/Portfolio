import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, Download, Mail } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="section-shell">
        <div className="grid items-end gap-14 lg:grid-cols-[1.45fr_0.55fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-7">Tuhin Chakrabarty <span className="mx-2 text-muted-foreground">/</span> Software Engineer 2, PayU</p>
            <h1 className="font-display max-w-4xl text-6xl leading-[1.1] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]">
              I build systems<br className="hidden sm:block" /> that hold up.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              I build backend and distributed systems for financial platforms, data pipelines, and the services that keep them dependable in production.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:tuhinchakrabarty14@gmail.com" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background">
                <Mail className="h-4 w-4" /> Email me
              </a>
              <a href="/Tuhin_Chakrabarty_Resume.pdf" download className="inline-flex min-h-12 items-center justify-center gap-2 border border-border px-6 font-semibold transition-colors hover:border-primary hover:text-primary">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>
          </div>

          <aside className="border-l border-border pl-6 sm:pl-8 lg:mb-2">
            <p className="eyebrow">Currently</p>
            <h2 className="mt-4 text-2xl">Building at PayU</h2>
            <p className="mt-3 text-muted-foreground">
              Leading work on PRISM 2.0, a multi-tenant financial intelligence platform built around secure data handling and reliable services.
            </p>
            <div className="mt-8 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between gap-6"><span className="text-muted-foreground">Focus</span><span>Backend · Distributed systems</span></div>
              <div className="flex justify-between gap-6"><span className="text-muted-foreground">Based in</span><span>Bengaluru, India</span></div>
            </div>
            <a href="#about" className="text-link mt-7" aria-label="Continue to the about section">A little more about me <ArrowDownRight className="h-4 w-4" /></a>
          </aside>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -z-0 h-full w-[22%] border-l border-border/50 opacity-40" />
    </section>
  )
}
