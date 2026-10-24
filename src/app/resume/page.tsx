import { Metadata } from 'next'
import { Download, ArrowUpRight } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Experience and selected work by Tuhin Chakrabarty, Software Engineer 2 at PayU in Bengaluru.',
  alternates: { canonical: '/resume' },
}

const roles = [
  {
    company: 'PayU', title: 'Software Engineer 2', period: 'Dec 2025 — Present',
    summary: 'Leading PRISM 2.0, a multi-tenant financial intelligence platform for large-scale SMS ingestion and analysis.',
    details: 'Own architecture and reliability across encrypted data pipelines, isolated processing, event-driven services, and cloud deployments.',
  },
  {
    company: 'Bank of America', title: 'Software Engineer 1', period: 'Jul 2023 — Nov 2025',
    summary: 'Built low-latency C++ and Python services for the Apex/Martini Global Repo Trading Platform.',
    details: 'Designed an internal Python/Tornado support platform and a React + Flask regression framework that cut manual QA effort by about 90%. Received two Global Gold Recognition Awards.',
  },
  {
    company: 'Pantech ProEd', title: 'Student Intern', period: 'Jan 2022 — Jun 2023',
    summary: 'Worked across Python, machine learning, data pipelines, computer vision, and edge deployment.',
    details: 'Projects included model development, Excel automation, SQL/NoSQL work, Tableau and Power BI reports, and Raspberry Pi deployment.',
  },
  { company: 'Able', title: 'Django Developer', period: 'Feb 2022 — Apr 2022', summary: 'Built a lead-management application using Django, Python, Jinja, Tailwind CSS, and SQLite.', details: 'Added analytics workflows to qualify and track incoming leads.' },
  { company: 'Foxmula', title: 'JavaScript Developer', period: 'Nov 2021 — Jan 2022', summary: 'Built a real-time group chat app with Socket.IO and Node.js.', details: 'Supported anonymous multi-room conversations for concurrent users.' },
]

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-28 pb-20 sm:pt-36">
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume' }]} />
      <div className="section-shell">
        <header className="grid gap-8 border-b border-border pb-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="eyebrow">Experience & selected work</p>
            <h1 className="section-heading mt-5">Resume.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Backend and distributed systems engineer at PayU, based in Bengaluru.</p>
          </div>
          <a href="/Tuhin_Chakrabarty_Resume.pdf" download className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 font-semibold text-primary-foreground hover:bg-foreground hover:text-background"><Download className="h-4 w-4" /> Download PDF</a>
        </header>

        <section className="mt-12 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="eyebrow">Profile</p>
            <p className="mt-4 text-lg leading-8">I build backend services and distributed systems with Python and C++, and work across React, SQL, Kafka, AWS, and cloud delivery.</p>
            <div className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
              <p>B.Tech, Computer Science & Engineering</p>
              <p>Vellore Institute of Technology · 2019 — 2023</p>
              <p>GPA 8.6 / 10 · Merit Scholarship</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Career</p>
            <div className="border-t border-border">
              {roles.map((role) => (
                <details key={role.company} className="group border-b border-border py-5">
                  <summary className="flex min-h-12 cursor-pointer list-none flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span><span className="font-semibold">{role.title}</span> <span className="text-primary">·</span> {role.company}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">{role.period}</span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{role.summary} {role.details}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 border-t border-border pt-7">
              <p className="eyebrow">Selected projects</p>
              <div className="mt-4 flex flex-col items-start gap-3">
                <a href="https://github.com/Tuhin-SnapD/PricePilot-Intelligent-Pricing-Dashboard" target="_blank" rel="noopener noreferrer" className="text-link">PricePilot <ArrowUpRight className="h-4 w-4" /></a>
                <a href="https://github.com/Tuhin-SnapD/NewsMelt-Advance-News-Finder" target="_blank" rel="noopener noreferrer" className="text-link">NewsMelt <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
