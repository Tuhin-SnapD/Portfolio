/**
 * Single source of truth for everything search engines and social networks need.
 *
 * The canonical origin is resolved from the environment so the same build works on
 * Vercel, Netlify and any self-hosted domain. Set NEXT_PUBLIC_SITE_URL to the
 * production domain to make canonicals, sitemap and JSON-LD point at it.
 */
const FALLBACK_URL = 'https://tuhinc-portfolio.netlify.app'

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  // Vercel exposes the production domain at build time.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  // Netlify exposes the primary site URL.
  if (process.env.URL) return process.env.URL
  return FALLBACK_URL
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, '')

export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).toString()

export const PERSON = {
  name: 'Tuhin Chakrabarty',
  givenName: 'Tuhin',
  familyName: 'Chakrabarty',
  jobTitle: 'Software Engineer 2',
  employer: 'PayU',
  location: 'Bengaluru, Karnataka, India',
  email: 'tuhinchakrabarty14@gmail.com',
  image: '/tuhin-avatar.jpg',
  resume: '/Tuhin_Chakrabarty_Resume.pdf',
  github: 'https://github.com/Tuhin-SnapD',
  linkedin: 'https://www.linkedin.com/in/tuhin-chakrabarty-1074aa19b/',
  hackerrank: 'https://www.hackerrank.com/profile/tuhinchakrabart1',
  alumniOf: 'Vellore Institute of Technology',
} as const

export const SITE_NAME = `${PERSON.name} - Software Engineer`

export const SITE_TITLE =
  'Tuhin Chakrabarty - Software Engineer at PayU | Backend & Distributed Systems'

export const SITE_DESCRIPTION =
  'Tuhin Chakrabarty is a Software Engineer 2 at PayU in Bengaluru, India. He builds scalable backend and distributed systems with Python, C++, Django, Flask, React, Kafka, and AWS, and leads PRISM 2.0 — a multi-tenant financial intelligence platform.'

export const SITE_KEYWORDS = [
  'Tuhin Chakrabarty',
  'Tuhin Chakrabarty PayU',
  'Tuhin Chakrabarty portfolio',
  'Tuhin Chakrabarty software engineer',
  'Tuhin Chakrabarty Bengaluru',
  'Tuhin Chakrabarty VIT',
  'Tuhin-SnapD',
  'Software Engineer 2 PayU',
  'Backend Engineer',
  'Distributed Systems',
  'Python Developer',
  'C++ Developer',
  'React Developer',
  'Django',
  'Flask',
  'Kafka',
  'AWS',
  'API Design',
  'FinTech Engineering',
  'Full-Stack Developer',
]

export const PERSON_KNOWS_ABOUT = [
  'Distributed Systems',
  'Backend Engineering',
  'API Design',
  'Event-Driven Architecture',
  'High-Level Design',
  'Low-Level Design',
  'Python',
  'C++',
  'JavaScript',
  'SQL',
  'Perl',
  'React',
  'TypeScript',
  'Django',
  'Flask',
  'Tornado',
  'Node.js',
  'REST APIs',
  'Microservices',
  'AWS',
  'Docker',
  'Terraform',
  'PostgreSQL',
  'DynamoDB',
  'Kafka',
  'RabbitMQ',
  'Amazon SQS',
  'Jenkins',
  'CI/CD',
  'Observability',
  'Data Structures and Algorithms',
  'System Design',
]

export const SOCIAL_PROFILES = [PERSON.github, PERSON.linkedin, PERSON.hackerrank]
