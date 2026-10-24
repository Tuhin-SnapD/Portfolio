"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'PricePilot',
    kind: 'Pricing & forecasting',
    description: 'A pricing dashboard that combines demand forecasts, price elasticity, inventory constraints, and A/B simulations to explain each recommendation.',
    image: '/images/projects/pricepilot.webp',
    technologies: 'Python · Django · React · TypeScript',
    category: 'Product',
    url: 'https://github.com/Tuhin-SnapD/PricePilot-Intelligent-Pricing-Dashboard',
  },
  {
    title: 'NewsMelt',
    kind: 'News analysis',
    description: 'A news research tool that groups related stories and brings topic summaries and network visualisations into one workspace.',
    image: '/images/projects/newsmelt.webp',
    technologies: 'Python · spaCy · NetworkX · PyTorch',
    category: 'Research',
    url: 'https://github.com/Tuhin-SnapD/NewsMelt-Advance-News-Finder',
  },
]

const filters = ['All work', 'Product', 'Research']

export function ProjectsSection() {
  const [filter, setFilter] = useState('All work')
  const visible = filter === 'All work' ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="editorial-rule py-20 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-7 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">03 / Selected work</p>
            <h2 className="section-heading mt-5">Things I have built.</h2>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter projects">
            {filters.map((item) => (
              <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`min-h-11 px-4 text-sm font-semibold transition-colors ${filter === item ? 'bg-foreground text-background' : 'border border-border hover:border-primary hover:text-primary'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {visible.map((project, index) => (
            <article key={project.title} className={index % 2 === 1 ? 'md:mt-14' : ''}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`View ${project.title} on GitHub`}>
                <div className="relative aspect-[1.7/1] overflow-hidden bg-secondary">
                  <Image src={project.image} alt={`${project.title} project interface`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{project.kind}</p>
                    <h3 className="mt-2 text-3xl">{project.title}</h3>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{project.technologies}</p>
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
