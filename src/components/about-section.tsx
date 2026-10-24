import { ArrowUpRight } from 'lucide-react'

const milestones = [
  { period: '2025 — now', role: 'Software Engineer 2', company: 'PayU', note: 'Leading PRISM 2.0 and building secure, multi-tenant financial data services.' },
  { period: '2023 — 2025', role: 'Software Engineer 1', company: 'Bank of America', note: 'Worked on low-latency C++ and Python services for the Global Repo Trading Platform.' },
  { period: '2019 — 2023', role: 'B.Tech, Computer Science', company: 'Vellore Institute of Technology', note: 'Graduated with an 8.6 GPA and a university merit scholarship.' },
]

export function AboutSection() {
  return (
    <section id="about" className="editorial-rule py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="eyebrow">01 / Background</p>
            <h2 className="section-heading mt-5">Work built for the real world.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">I care about the details behind dependable software: clear interfaces, careful data handling, and systems that are easier to operate.</p>
            <div className="mt-9 border-t border-border pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em]">Based in Bengaluru, India</p>
              <p className="mt-2 text-sm text-muted-foreground">Python · C++ · Distributed systems</p>
            </div>
          </div>
          <div>
            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>I currently work at PayU, where I lead development on PRISM 2.0, a financial intelligence platform for large-scale SMS ingestion and analysis. My work includes encrypted data pipelines, isolated processing, and the services needed to operate the platform reliably.</p>
              <p>Before that, I spent more than two years at Bank of America working on trading-platform services and internal automation. I build primarily with Python and C++, and work across React, SQL, Kafka, AWS, and the surrounding delivery stack.</p>
            </div>
            <div className="mt-12 border-t border-border">
              {milestones.map((item) => (
                <article key={item.company} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="text-sm tabular-nums text-muted-foreground">{item.period}</p>
                  <div>
                    <h3 className="text-xl">{item.role} <span className="text-primary">·</span> {item.company}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
                  </div>
                </article>
              ))}
            </div>
            <a className="text-link mt-6" href="/resume">See my full experience <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
