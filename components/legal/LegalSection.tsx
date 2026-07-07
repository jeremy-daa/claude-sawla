import type { ReactNode } from "react"

interface LegalSectionProps {
  n: number | string
  title: string
  children: ReactNode
}

export function LegalSection({ n, title, children }: LegalSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-volcanic font-normal mb-4" style={{ fontSize: "clamp(1.25rem,2vw,1.5rem)" }}>
        {n}. {title}
      </h2>
      {children}
    </section>
  )
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-warmgrey font-body mb-4" style={{ fontSize: "0.9375rem" }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="text-gold-ink mt-1.5 flex-shrink-0">–</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="text-warmgrey font-body leading-relaxed mb-4" style={{ fontSize: "0.9375rem" }}>
      {children}
    </p>
  )
}

export function LegalContactBlock({ email, address }: { email: string; address: string }) {
  return (
    <div className="p-5 bg-gold-faint rounded-card border border-gold/20">
      <div className="font-body font-semibold text-volcanic mb-1">Sawla Tours</div>
      <div className="text-warmgrey font-body text-sm">{address}</div>
      <a href={`mailto:${email}`} className="text-gold-ink hover:underline font-body text-sm mt-1 block">{email}</a>
    </div>
  )
}
