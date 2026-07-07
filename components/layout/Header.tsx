"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS, SITE } from "@/data/siteData"
import clsx from "clsx"

/* ── Icons ── */
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg className={clsx("w-2.5 h-2.5 transition-transform duration-200", open ? "rotate-180" : "")} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
    <line x1="0" y1="1"  x2="24" y2="1"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="4" y1="9"  x2="24" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="0" y1="17" x2="24" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

/* ── Real Sawla Tours Logo (PNG) ── */
function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex items-center group" aria-label="Sawla Tours Home">
      <Image
        src="/brand/logo-white.png"
        alt="Sawla Tours"
        width={120}
        height={112}
        priority
        className="object-contain transition-[height] duration-300"
        style={{ height: scrolled ? "46px" : "56px", width: "auto" }}
      />
    </Link>
  )
}

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeNav,  setActiveNav]  = useState<string|null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string|null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const open  = useCallback((href: string) => { if (timer.current) clearTimeout(timer.current); setActiveNav(href) }, [])
  const close = useCallback(() => { timer.current = setTimeout(() => setActiveNav(null), 130) }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className={clsx("fixed top-0 left-0 right-0 z-50 transition duration-400",
        scrolled ? "bg-[#2a2724] shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "bg-transparent")}>

        <div className="container-max flex items-center justify-between h-16 md:h-20">
          <Logo scrolled={scrolled} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <div key={link.href} className="relative" onMouseEnter={() => open(link.href)} onMouseLeave={close}>
                <Link href={link.href}
                  className={clsx("flex items-center gap-1.5 font-body font-medium transition-colors duration-200",
                    "text-[12.5px] tracking-[0.07em] uppercase",
                    activeNav === link.href ? "text-gold" : "text-ivory/80 hover:text-ivory")}
                >
                  {link.label}
                  {link.children && <ChevronDown open={activeNav === link.href} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeNav === link.href && (
                    <motion.div
                      initial={{ opacity:0, y:8 }}
                      animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:6 }}
                      transition={{ duration:0.2, ease:[0.16,1,0.3,1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 min-w-[240px] z-50"
                      onMouseEnter={() => open(link.href)}
                      onMouseLeave={close}
                    >
                      <div className="bg-volcanic border border-white/10 rounded-[12px] shadow-2xl py-2 overflow-hidden">
                        {link.children.map(child => (
                          <Link key={child.href} href={child.href}
                            onClick={() => setActiveNav(null)}
                            className="block px-5 py-2.5 font-body text-[12.5px] text-ivory/65 hover:text-gold hover:bg-white/5 transition-colors tracking-wide cursor-pointer">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a href={"tel:" + SITE.phoneE164} className="text-ivory/45 hover:text-gold font-body transition-colors cursor-pointer" style={{fontSize:"12px",letterSpacing:"0.08em"}}>{SITE.phone}</a>
            <Link href="/enquire" className="btn-gold" style={{fontSize:"11.5px",padding:"0.625rem 1.5rem"}}>Start Planning</Link>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 -mr-2 text-ivory cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[320px] max-w-[90vw] bg-volcanic flex flex-col overflow-y-auto lg:hidden"
            role="dialog" aria-label="Mobile navigation" aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 flex-shrink-0">
              <span className="font-display text-ivory text-lg font-light tracking-wider">Sawla Tours</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close" className="text-ivory/70 hover:text-ivory p-1 cursor-pointer"><CloseIcon /></button>
            </div>
            <nav className="flex-1 px-4 pt-4 pb-6">
              {NAV_LINKS.map(link => (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link href={link.href}
                      onClick={() => { if (!link.children) setMobileOpen(false) }}
                      className="flex-1 py-3.5 font-body text-[13px] text-ivory/80 hover:text-gold tracking-[0.06em] uppercase border-b border-white/10 transition-colors cursor-pointer">
                      {link.label}
                    </Link>
                    {link.children && (
                      <button onClick={() => setExpandedMobile(expandedMobile === link.href ? null : link.href)}
                        className="py-3.5 pl-3 border-b border-white/10 text-ivory/40 hover:text-gold transition-colors cursor-pointer">
                        <ChevronDown open={expandedMobile === link.href} />
                      </button>
                    )}
                  </div>
                  {link.children && expandedMobile === link.href && (
                    <div className="bg-white/5 rounded-sm my-1 py-1">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                          className="block px-5 py-2.5 font-body text-[12.5px] text-ivory/55 hover:text-gold transition-colors cursor-pointer">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex-shrink-0 px-6 pt-4 pb-8 border-t border-white/10 space-y-3">
              <Link href="/enquire" onClick={() => setMobileOpen(false)} className="btn-gold justify-center w-full cursor-pointer">Start Planning</Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-white/20 rounded-sm text-ivory/70 text-[12.5px] font-body tracking-wider uppercase hover:border-[#25D366] hover:text-[#25D366] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
              <p className="text-center text-ivory/30 font-body" style={{fontSize:"11px",letterSpacing:"0.12em"}}>{SITE.phone} &middot; Addis Ababa</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
