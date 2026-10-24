import {
  PERSON,
  PERSON_KNOWS_ABOUT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from '@/lib/site'

type Json = Record<string, unknown>

/** JSON-LD must not be able to break out of the script tag it is embedded in. */
function serialize(data: Json): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function JsonLd({ data }: { data: Json }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
}

const personId = `${SITE_URL}/#person`
const websiteId = `${SITE_URL}/#website`

export function personSchema(): Json {
  return {
    '@type': 'Person',
    '@id': personId,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    url: SITE_URL,
    image: absoluteUrl(PERSON.image),
    jobTitle: PERSON.jobTitle,
    description: SITE_DESCRIPTION,
    email: `mailto:${PERSON.email}`,
    worksFor: {
      '@type': 'Organization',
      name: PERSON.employer,
      url: 'https://payu.in',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PERSON.alumniOf,
      sameAs: 'https://vit.ac.in',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    knowsAbout: PERSON_KNOWS_ABOUT,
    sameAs: SOCIAL_PROFILES,
  }
}

/** Site + person + profile page graph for the home page. */
export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      personSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${PERSON.name} - Software Engineer at ${PERSON.employer}`,
        description: SITE_DESCRIPTION,
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
      },
    ],
  }
}

export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function blogPostingSchema(post: {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  language: string
  repoUrl: string
}): Json {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    inLanguage: 'en',
    keywords: post.tags.join(', '),
    about: post.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
    programmingLanguage: post.language,
    isBasedOn: post.repoUrl,
    author: { '@type': 'Person', '@id': personId, name: PERSON.name, url: SITE_URL },
    publisher: { '@id': personId },
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
  }
}

export function WebsiteJsonLd() {
  return <JsonLd data={websiteSchema()} />
}



export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  return <JsonLd data={breadcrumbSchema(trail)} />
}

export function BlogPostingJsonLd({
  post,
}: {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    language: string
    repoUrl: string
  }
}) {
  return <JsonLd data={blogPostingSchema(post)} />
}
