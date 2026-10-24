const groups = [
  { area: 'Languages', list: 'Python, C++, JavaScript, TypeScript, SQL, Perl' },
  { area: 'Services', list: 'Django, Flask, Tornado, Node.js, REST APIs, microservices' },
  { area: 'Data & messaging', list: 'PostgreSQL, DynamoDB, MySQL, Oracle, Kafka, RabbitMQ, Amazon SQS' },
  { area: 'Cloud & delivery', list: 'AWS, Docker, Terraform, Jenkins, Linux, CI/CD' },
  { area: 'Frontend', list: 'React, Vite, MUI, Tailwind CSS, HTML' },
  { area: 'Engineering', list: 'Distributed systems, API design, testing, observability, automation, mentoring' },
]

export function SkillsSection() {
  return (
    <section id="skills" className="bg-secondary/55 py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="eyebrow">02 / Tools & practice</p>
            <h2 className="section-heading mt-5">What I work with.</h2>
            <p className="mt-6 max-w-sm leading-7 text-muted-foreground">A practical toolkit shaped by the systems I have built and supported.</p>
          </div>
          <dl className="border-t border-border">
            {groups.map((group) => (
              <div key={group.area} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="font-semibold">{group.area}</dt>
                <dd className="leading-7 text-muted-foreground">{group.list}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
