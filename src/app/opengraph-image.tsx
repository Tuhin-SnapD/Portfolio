import { ImageResponse } from 'next/og'
import { PERSON, SITE_URL } from '@/lib/site'

export const alt =
  'Tuhin Chakrabarty - Software Engineer 2 at PayU, backend and distributed systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// node runtime's bundled @vercel/og cannot resolve its wasm binary on Windows builds
export const runtime = 'edge'

export default function OpengraphImage() {
  const host = new URL(SITE_URL).host.replace(/^www\./, '')

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
          background: 'linear-gradient(135deg, #050814 0%, #101a3a 55%, #1b1140 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            TC
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#a5b4fc', letterSpacing: 1 }}>
            {host}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            {PERSON.name}
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: '#c7d2fe' }}>
            {PERSON.jobTitle} at {PERSON.employer}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#94a3b8' }}>
            <span>Backend</span>
            <span>·</span>
            <span>Distributed Systems</span>
            <span>·</span>
            <span>Python · C++ · React</span>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#94a3b8' }}>{PERSON.location}</div>
        </div>
      </div>
    ),
    size
  )
}
