import { PERSON } from '@/lib/site'
import { FaqJsonLd } from '@/components/structured-data'

/**
 * Rendered on the server (no animation, no client JS) so search engines always see
 * the full text. Each answer is factual and mirrors the resume.
 */
export const FAQ_ITEMS = [
  {
    question: 'Who is Tuhin Chakrabarty?',
    answer:
      'Tuhin Chakrabarty is a software engineer from India, currently a Software Engineer 2 at PayU in Bengaluru. He builds scalable backend and distributed systems with Python, C++, Django, Flask and React, and previously worked at Bank of America GIFT City on low-latency trading-platform services. He holds a B.Tech in Computer Science and Engineering from Vellore Institute of Technology (VIT), Vellore.',
  },
  {
    question: 'What does Tuhin Chakrabarty do at PayU?',
    answer:
      'At PayU he leads PRISM 2.0, a secure multi-tenant financial intelligence platform for large-scale SMS ingestion and analysis built on encrypted data pipelines, isolated processing and cloud-native deployments. He also led the user journey of a regulatory-compliant, multi-tenant Account Aggregator (AA) TSP consent platform, and owns the architecture and reliability of PRISM.',
  },
  {
    question: 'Which technologies does Tuhin Chakrabarty work with?',
    answer:
      'Python, C++, JavaScript, TypeScript, SQL and Perl on the backend; React on the frontend; Django, Flask, Tornado and Node.js for services; PostgreSQL, DynamoDB, MySQL, Oracle, Kafka, RabbitMQ and Amazon SQS for data and messaging; and AWS, Docker, Terraform, Jenkins, Signoz and Elastic for infrastructure, CI/CD and observability.',
  },
  {
    question: 'Where is Tuhin Chakrabarty based?',
    answer:
      'He is based in Bengaluru, Karnataka, India, and previously worked in GIFT City, Gujarat, at Bank of America.',
  },
  {
    question: 'What awards has Tuhin Chakrabarty received?',
    answer:
      'He received the 2x Global Gold Recognition Award at Bank of America for automating regression testing and reducing licence costs with Optimus, an internal automation platform, and the VIT University Merit Scholarship for academic performance in 2019-20.',
  },
  {
    question: 'How can I contact Tuhin Chakrabarty?',
    answer: `You can use the contact form on this site, email ${PERSON.email}, or reach him on GitHub (Tuhin-SnapD) and LinkedIn. He is open to conversations about backend engineering, distributed systems and fintech platforms.`,
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-background">
      <FaqJsonLd items={FAQ_ITEMS} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers about Tuhin Chakrabarty&apos;s work, background and experience.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group glass-effect rounded-lg border border-border/40 px-5 py-4 open:shadow-md transition-shadow"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  <h3 className="text-base md:text-lg">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-primary transition-transform group-open:rotate-45 text-xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
