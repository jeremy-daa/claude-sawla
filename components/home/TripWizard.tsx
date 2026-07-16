"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { trackTripWizardCompleted } from "@/lib/conversionTracking"

const steps = [
  {
    q: "When are you planning to travel?",
    hint: "Ethiopian seasons shape every journey",
    options: [
      { label: "Jan – Mar", sub: "Dry & warm" },
      { label: "Apr – Jun", sub: "Green & lush" },
      { label: "Jul – Sep", sub: "Highlands cool" },
      { label: "Oct – Dec", sub: "Peak season" },
      { label: "Flexible", sub: "We will advise" },
    ],
  },
  {
    q: "How long do you have?",
    hint: "Longer stays unlock Ethiopia’s remote wonders",
    options: [
      { label: "1 – 5 days", sub: "City + one highlight" },
      { label: "6 – 10 days", sub: "Northern circuit" },
      { label: "11 – 15 days", sub: "Deep immersion" },
      { label: "16+ days", sub: "Full Ethiopia" },
    ],
  },
  {
    q: "What draws you to Ethiopia?",
    hint: "Select all that speak to you",
    multi: true,
    options: [
      { label: "Historic & Cultural", sub: "Lalibela, Gondar, Axum" },
      { label: "Wildlife & Birding", sub: "Ethiopian wolf, gelada" },
      { label: "Omo Valley", sub: "Tribal encounters" },
      { label: "Danakil Expedition", sub: "Volcanic extremes" },
      { label: "Photography", sub: "Cinematic landscapes" },
      { label: "Festival Immersion", sub: "Timkat, Meskel" },
    ],
  },
  {
    q: "How many travelers?",
    hint: "Group size shapes logistics and pricing",
    options: [
      { label: "Solo", sub: "Private guide included" },
      { label: "2 people", sub: "Couple or friends" },
      { label: "3 – 5", sub: "Small group" },
      { label: "6+", sub: "Family or group" },
    ],
  },
  {
    q: "What level of comfort are you looking for?",
    hint: "All options include private guiding and vehicle",
    options: [
      { label: "Comfortable", sub: "Mid-range comfort" },
      { label: "Boutique", sub: "Boutique lodges" },
      { label: "Luxury", sub: "Luxury throughout" },
      { label: "No Compromise", sub: "The finest available" },
      { label: "Prefer to discuss", sub: "We will advise" },
    ],
  },
]

export default function TripWizard() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [done, setDone] = useState(false)
  const reduce = useReducedMotion() ?? false

  const current = steps[step]

  function toggle(option: string) {
    setAnswers(prev => {
      const existing = prev[step] ?? []
      if (current.multi) {
        const next = existing.includes(option)
          ? existing.filter(x => x !== option)
          : [...existing, option]
        return { ...prev, [step]: next }
      }
      return { ...prev, [step]: [option] }
    })
    if (!current.multi) {
      setTimeout(() => {
        if (step < steps.length - 1) setStep(s => s + 1)
        else setDone(true)
      }, 280)
    }
  }

  function isSelected(option: string) {
    return (answers[step] ?? []).includes(option)
  }

  function buildWhatsAppMsg() {
    const nl = String.fromCharCode(10)
    const lines = steps.map((s, i) => s.q + ": " + (answers[i] ?? []).join(", ")).join(nl)
    return encodeURIComponent("Hi Sawla Tours," + nl + "I used the Trip Wizard:" + nl + nl + lines + nl + nl + "Please help me plan my Ethiopia journey.")
  }

  // Carry the wizard's answers into the enquiry form so nobody re-types what
  // they just told us — the single biggest drop-off risk in a two-step funnel.
  function buildEnquireHref() {
    const p = new URLSearchParams({ src: "wizard" })
    const [when] = answers[0] ?? []
    const [len] = answers[1] ?? []
    const interests = answers[2] ?? []
    const [party] = answers[3] ?? []
    const [comfort] = answers[4] ?? []
    if (when) p.set("when", when)
    if (len) p.set("len", len)
    if (interests.length) p.set("interests", interests.join("|"))
    if (party) p.set("party", party)
    if (comfort) p.set("comfort", comfort)
    return "/enquire?" + p.toString()
  }

  // Fires once when the wizard reaches its completion screen.
  useEffect(() => {
    if (!done) return
    trackTripWizardCompleted({
      when: (answers[0] ?? []).join(","),
      duration: (answers[1] ?? []).join(","),
      interests: (answers[2] ?? []).join(","),
      party: (answers[3] ?? []).join(","),
      comfort: (answers[4] ?? []).join(","),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  if (done) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={reduce ? false : { opacity:0, scale:0.95 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
        >
          <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l5 5L19 7" stroke="#c9941a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="font-display text-volcanic mb-3" style={{fontSize:"clamp(1.5rem,3vw,2rem)"}}>
            Perfect. We have everything we need.
          </h3>
          <p className="text-warmgrey mb-8 max-w-md mx-auto font-body">
            Send your preferences to our team on WhatsApp or complete the full enquiry form for the most detailed response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={"https://wa.me/25170578306?text=" + buildWhatsAppMsg()}
              target="_blank" rel="noopener noreferrer"
              className="btn-gold"
            >
              Send via WhatsApp
            </a>
            <Link href={buildEnquireHref()} className="btn-ghost">
              Full Enquiry Form
            </Link>
          </div>
          <button
            className="mt-6 text-warmgrey text-sm font-body hover:text-gold-ink transition-colors cursor-pointer"
            onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
          >
            Start over
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div
        className="flex gap-1.5 mb-10"
        role="progressbar"
        aria-label="Step progress"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
      >
        {steps.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 rounded-full overflow-hidden bg-sand">
            <motion.div
              className="h-full bg-gold rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
              transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      {/* Step counter */}
      <p className="label-eyebrow mb-2">Step {step + 1} of {steps.length}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -20 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-display text-volcanic mb-2 leading-tight"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.015em" }}>
            {current.q}
          </h3>
          <p className="text-warmgrey font-body mb-8" style={{ fontSize: "0.9375rem" }}>
            {current.hint}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {current.options.map(opt => (
              <button
                key={opt.label}
                onClick={() => toggle(opt.label)}
                className={[
                  "text-left p-4 rounded-[12px] border transition-colors duration-200 cursor-pointer",
                  isSelected(opt.label)
                    ? "border-gold bg-gold/10 text-volcanic"
                    : "border-sand bg-ivory hover:border-gold/50 text-volcanic",
                ].join(" ")}
              >
                <span className="block font-body font-medium text-[14px] leading-snug">{opt.label}</span>
                <span className="block font-body text-[12px] text-warmgrey mt-0.5 leading-snug">{opt.sub}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          className={["font-body text-sm tracking-wide text-warmgrey hover:text-gold-ink transition-colors cursor-pointer", step === 0 ? "invisible" : ""].join(" ")}
        >
          &#8592; Back
        </button>
        {current.multi && (
          <button
            onClick={() => { if (step < steps.length - 1) setStep(s => s + 1); else setDone(true); }}
            className="btn-primary text-[12px] py-3 px-6"
          >
            {step === steps.length - 1 ? "See My Journey" : "Next"}
          </button>
        )}
      </div>
    </div>
  )
}
