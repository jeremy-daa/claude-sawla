'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SITE } from '@/data/siteData'

/**
 * Persistent mobile conversion bar.
 * Mobile-only (lg:hidden). Slides up once the user scrolls past the hero,
 * giving a permanent "Start Planning" + WhatsApp pair — the single highest-
 * impact mobile conversion pattern used across luxury travel operators.
 * Hidden on the enquiry page itself (the form is already the primary action).
 */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't compete with the form on the enquiry page
  if (pathname === '/enquire') return null

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-400 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="bg-volcanic/97 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/enquire"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gold text-ivory font-body font-medium rounded-sm py-3"
            style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Start Planning
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Sawla Tours on WhatsApp"
            className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#25D366] text-white flex-shrink-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
        <p className="text-center text-ivory/40 font-body mt-1.5" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
          No booking fee · Reply within 24 hours · Ethiopia-based team
        </p>
      </div>
    </div>
  )
}
