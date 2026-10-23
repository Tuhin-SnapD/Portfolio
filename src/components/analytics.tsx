"use client"

import { useEffect } from 'react'

/**
 * Plausible is only loaded when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set to the domain
 * registered in the Plausible dashboard. Previously it always loaded with a
 * hard-coded old domain, so every visitor paid for a third-party request that
 * ad-blockers cancelled anyway (net::ERR_BLOCKED_BY_CLIENT) and any data that did
 * arrive was attributed to the wrong site.
 */
export function Analytics() {
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
    if (!domain) return

    const script = document.createElement('script')
    script.defer = true
    script.setAttribute('data-domain', domain)
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}
