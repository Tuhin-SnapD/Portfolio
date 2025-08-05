"use client"

import { useEffect } from 'react'

export function Analytics() {
  useEffect(() => {
    // Plausible Analytics
    const script = document.createElement('script')
    script.defer = true
    script.setAttribute('data-domain', 'tuhin-dev.lovable.app')
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
} 