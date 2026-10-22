"use client"

import dynamic from 'next/dynamic'

/**
 * The WebGL scene pulls in three.js / @react-three/fiber (~450 kB). Loading it through
 * next/dynamic keeps it out of the initial bundles and off the server render entirely,
 * so first paint is not blocked by 3D code that only becomes visible after hydration.
 */
const Background3D = dynamic(
  () => import('@/components/background-3d').then((mod) => mod.Background3D),
  { ssr: false, loading: () => null }
)

export function Background3DLazy() {
  return <Background3D />
}
