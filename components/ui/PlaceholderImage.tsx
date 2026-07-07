// components/ui/PlaceholderImage.tsx
// Replace with next/image when real photos are ready

export type Category = 'home' | 'destination' | 'tour' | 'guide' | 'species' | 'about' | 'camp' | 'moments' | 'general'

const CAT_STYLES: Record<Category, { bg: string; border: string; text: string; label: string }> = {
  home:        { bg: '#FCEBEB', border: '#F09595', text: '#791F1F', label: 'Homepage' },
  destination: { bg: '#E6F1FB', border: '#85B7EB', text: '#0C447C', label: 'Destination' },
  tour:        { bg: '#EAF3DE', border: '#97C459', text: '#27500A', label: 'Tour' },
  guide:       { bg: '#EEEDFE', border: '#AFA9EC', text: '#3C3489', label: 'Field Guide' },
  species:     { bg: '#FAEEDA', border: '#EF9F27', text: '#633806', label: 'Species' },
  about:       { bg: '#FAECE7', border: '#F0997B', text: '#712B13', label: 'About Us' },
  camp:        { bg: '#E1F5EE', border: '#5DCAA5', text: '#085041', label: 'Camp' },
  moments:     { bg: '#FBEAF0', border: '#ED93B1', text: '#72243E', label: 'Sawla Moments' },
  general:     { bg: '#F1EFE8', border: '#B4B2A9', text: '#444441', label: 'General' },
}

interface PlaceholderImageProps {
  filename: string
  width: number
  height: number
  category: Category
  className?: string
  fill?: boolean
  label?: string
}

// "dest-lalibela-hero.jpg" → "Lalibela hero" — a raw filename is a poor accessible
// name for screen readers and crawlers, so when no authored label is provided we
// derive a readable one. Authored labels (entity-rich alt text) always win.
function humanizeFilename(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
    .replace(/^(dest|tour|guide|home|about|camp|moments|species|contact|pricing)-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export default function PlaceholderImage({
  filename, width, height, category, className = '', fill = false, label,
}: PlaceholderImageProps) {
  const s = CAT_STYLES[category]
  const displayLabel = label ?? humanizeFilename(filename)

  // Rendered locally (no placehold.co request, no giant auto-sized text) so the label
  // never collides with headings/badges overlaid on top of image cards elsewhere on
  // the site. The filename shows as a small corner tag purely for dev/QA identification.
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${displayLabel}`}
      className={`${fill ? 'absolute inset-0 w-full h-full' : 'w-full'} ${className} relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, ${s.bg} 0%, ${s.border}33 100%)`,
        border: `1px solid ${s.border}55`,
        aspectRatio: fill ? undefined : `${width} / ${height}`,
      }}
    >
      <span
        className="absolute bottom-1.5 left-2 right-2 truncate"
        style={{ color: s.text, opacity: 0.45, fontSize: '9px', letterSpacing: '0.02em', fontFamily: 'monospace' }}
      >
        {filename}
      </span>
    </div>
  )
}

/*
HOW TO SWAP TO REAL IMAGE:

Before:
<PlaceholderImage filename="dest-lalibela-hero.jpg" width={1920} height={1080} category="destination" />

After:
import Image from 'next/image'
<Image
  src="/images/destinations/lalibela/dest-lalibela-hero.jpg"
  alt="Rock-hewn churches of Lalibela, Ethiopia"
  width={1920}
  height={1080}
  priority
  className="object-cover w-full h-full"
/>
*/
