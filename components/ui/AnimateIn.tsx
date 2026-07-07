"use client"

import React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface AnimateInProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
}

export function AnimateIn({
  children, delay=0, duration=0.7, y=28, className="", style, once=true,
}: AnimateInProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-60px 0px" })
  const reduce = useReducedMotion()
  if (reduce) {
    return <div ref={ref} className={className} style={style}>{children}</div>
  }
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Container-level scroll reveal. Children are rendered untouched (no wrapper per
// child) so grid/flex layouts, equal-height cards and column spans keep working —
// per-child stagger would require injecting wrappers between the grid container
// and its items, which breaks stretch alignment in the card grids this is used on.
export function AnimateStagger({
  children, staggerDelay=0.1, className="",
}: { children: ReactNode; staggerDelay?: number; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px 0px" })
  const reduce = useReducedMotion()
  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>
  }
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: Math.min(staggerDelay, 0.15), ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
