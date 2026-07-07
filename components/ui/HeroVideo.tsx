"use client"

import { useEffect, useState } from "react"
import PlaceholderImage, { type Category } from "@/components/ui/PlaceholderImage"

interface HeroVideoProps {
  /** Poster image filename (rendered immediately = the LCP element). */
  poster: string
  /** PlaceholderImage category for the poster. */
  posterCategory?: Category
  /** Video source. Defaults to the shared, cache-friendly hero clip. */
  src?: string
  /** Overlay layer className (gradient or solid) for text legibility. */
  overlayClassName?: string
  /** Object position for both poster and video. */
  objectPosition?: string
}

/**
 * HeroVideo — a performance-safe cinematic background.
 *
 * Expert behaviour:
 *  - Poster image paints instantly (good LCP); video is enhancement only.
 *  - preload="none" + idle-mount: zero video bytes until after first paint.
 *  - Same shared /videos file => cached across every page after first load.
 *  - Honours prefers-reduced-motion and Save-Data / slow connections
 *    (those users get the poster only, never the 14MB download).
 *  - Video fades in on canplay, so there is never a broken/empty flash.
 */
export default function HeroVideo({
  poster,
  posterCategory = "home",
  src = "/videos/sawla-hero.mp4",
  overlayClassName = "hero-overlay-dark",
  objectPosition = "center",
}: HeroVideoProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 1. Respect reduced-motion: poster only.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // 2. Respect Save-Data and slow connections: poster only.
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (conn?.saveData) return
    if (conn?.effectiveType && /^(slow-2g|2g)$/.test(conn.effectiveType)) return

    // 3. Mount the video after first paint, on an idle tick, so it never
    //    blocks the poster (the LCP element). Heroes are above the fold by
    //    definition, so this is the correct, bulletproof lazy strategy.
    type IdleWin = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const w = window as IdleWin
    const schedule = w.requestIdleCallback
      ? (cb: () => void) => w.requestIdleCallback!(cb, { timeout: 1200 })
      : (cb: () => void) => window.setTimeout(cb, 200)
    const cancel = w.cancelIdleCallback
      ? (id: number) => w.cancelIdleCallback!(id)
      : (id: number) => window.clearTimeout(id)
    const id = schedule(() => setShowVideo(true))
    return () => cancel(id as number)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Poster — paints immediately (LCP). Swap to a real still when available. */}
      <PlaceholderImage filename={poster} width={1920} height={1080} category={posterCategory} fill className="object-cover" />

      {/* Video — lazy-mounted, fades in once it can actually play. */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ objectPosition, opacity: ready ? 1 : 0, willChange: "opacity" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Overlay for text legibility. */}
      <div className={"absolute inset-0 " + overlayClassName} />
    </div>
  )
}
