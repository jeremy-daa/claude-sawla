'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`
        hidden lg:flex
        fixed bottom-8 left-8 z-40
        w-10 h-10 rounded-sm
        bg-charcoal/80 backdrop-blur-sm border border-white/10
        text-ivory/70 hover:text-gold hover:border-gold/40
        items-center justify-center
        transition duration-300
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
