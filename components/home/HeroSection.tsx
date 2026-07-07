"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import HeroVideo from "@/components/ui/HeroVideo"

const ease = [0.16, 1, 0.3, 1] as const

function ScrollIndicator({ reduce }: { reduce: boolean }) {
  // With reduced motion the infinite pulse would be exactly the kind of
  // perpetual movement the preference asks to remove — show a static cue.
  if (reduce) {
    return (
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" aria-hidden="true">
        <span className="text-ivory/55 font-body" style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase" }}>
          Scroll
        </span>
        <div className="w-px h-14 bg-ivory/30 rounded-full" />
      </div>
    )
  }
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      <span className="text-ivory/55 font-body" style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase" }}>
        Scroll
      </span>
      <div className="w-px h-14 bg-ivory/20 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gold rounded-full"
          initial={{ height: "0%", top: "0%" }}
          animate={{ height: "50%", top: ["0%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

interface HeroSectionProps {
  /** Passed from the server page so the 500KB+ data files never enter the client bundle. */
  destinationCount: number
  itineraryCount: number
}

export default function HeroSection({ destinationCount, itineraryCount }: HeroSectionProps) {
  const reduce = useReducedMotion() ?? false
  // Under reduced motion every element renders in place with no entrance choreography.
  const enter = (delay: number, y = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        }
  return (
    <section className="hero-video-container" aria-labelledby="hero-heading">

      {/* ── SAWLA FILMS HERO VIDEO (poster-first, lazy, cache-shared) ── */}
      <HeroVideo
        poster="home-hero-poster.jpg"
        posterCategory="home"
        src="/videos/sawla-hero.mp4"
        overlayClassName="hero-overlay-dark"
      />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        {/* Eyebrow label */}
        <motion.span
          className="label-eyebrow text-gold"
          style={{ letterSpacing: "0.26em", marginBottom: "1.5rem" }}
          {...enter(0.4, 12)}
        >
          Ethiopia &middot; Designed From the Inside
        </motion.span>

        {/* Main headline — Cormorant at maximum scale.
            Rendered immediately (no entrance animation): this is the LCP element,
            and fading it in via JS after a delay directly inflates LCP timing. */}
        <h1
          id="hero-heading"
          className="heading-display text-ivory max-w-5xl"
          style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}
        >
          Ethiopia, Crafted by the
          <em className="block font-light" style={{ fontStyle: "italic" }}>
            People Who Know It Best.
          </em>
        </h1>

        {/* Sub-headline */}
        <motion.p
          className="text-ivory/75 font-body max-w-2xl leading-relaxed"
          style={{ marginTop: "1.75rem", fontSize: "clamp(1rem,1.5vw,1.2rem)" }}
          {...enter(1.0, 20)}
        >
          Private journeys across Ethiopia, shaped with honest local insight,
          thoughtful service and exceptional care for every detail.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          style={{ marginTop: "2.5rem" }}
          {...enter(1.3, 16)}
        >
          <Link href="/enquire" className="btn-gold">
            Start Planning Your Journey
          </Link>
          <a href="#signature-journeys" className="btn-ghost-light">
            Explore Signature Journeys
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-8 md:gap-14"
          style={{ marginTop: "3.5rem" }}
          {...enter(1.8)}
        >
          {[
            { n: "2009", l: "Established" },
            { n: String(destinationCount), l: "Destinations" },
            { n: String(itineraryCount),   l: "Itineraries" },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <div className="font-display font-light text-ivory"
                style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em" }}>
                {n}
              </div>
              <div className="text-ivory/50 font-body mt-1"
                style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator reduce={reduce} />
    </section>
  )
}