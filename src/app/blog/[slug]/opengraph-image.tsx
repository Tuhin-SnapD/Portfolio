import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'
import { PERSON, SITE_URL } from '@/lib/site'

export const alt = 'Article by Tuhin Chakrabarty'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// node runtime's bundled @vercel/og cannot resolve its wasm binary on Windows builds
export const runtime = 'edge'

export default function PostOpengraphImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const host = new URL(SITE_URL).host.replace(/^www\./, '')
  const title = post?.title ?? PERSON.name
  const category = post?.category ?? 'Engineering'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(140deg, #060a18 0%, #121c3d 60%, #241046 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#a5b4fc', letterSpacing: 2 }}>
            {category.toUpperCase()}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#94a3b8' }}>{host}</div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 62 : 76,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 28,
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            TC
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 26, fontWeight: 600 }}>{PERSON.name}</span>
            <span style={{ fontSize: 22, color: '#94a3b8' }}>
              {PERSON.jobTitle} at {PERSON.employer}
            </span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
