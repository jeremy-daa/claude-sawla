'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Thin gold reading-progress bar fixed to the very top of the viewport.
 * Shown only on long-form content pages (articles, guides, itineraries,
 * destinations) — a deliberate editorial signal, not a blog tell on the
 * homepage. Tracks scroll position through the document.
 */
function isArticleRoute(pathname: string): boolean {
  // Match the deep content pages only (a slug below a section hub)
  const patterns = [
    /^\/sawla-moments\/[^/]+$/,
    /^\/ethiopia-travel-guide\/[^/]+$/,
    /^\/ethiopias-popular-destinations\/[^/]+$/,
    /^\/tours-by-experience\/[^/]+\/[^/]+$/,
    /^\/ethiopia-wildlife\/[^/]+$/,
  ]
  return patterns.some((re) => re.test(pathname))
}

export default function ReadingProgress() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const active = isArticleRoute(pathname)

  useEffect(() => {
    if (!active) return
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [active, pathname])

  if (!active) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-gold transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
