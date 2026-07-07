// Topographic footer art — two server-rendered SVGs, zero JS shipped.
//
// TopoContours: a whisper-quiet contour field (gold at ~6% on charcoal). Two
// generated contour clusters are defined once and reused via <use>, keeping the
// per-page HTML cost to a few KB. Deterministic seeded generation = stable output
// across builds.
//
// ElevationProfile: a stylized cross-section of Ethiopia's real elevation range —
// the Danakil Depression at −116m (below the dotted sea-level line) rising to
// Ras Dashen at 4,533m. The numbers are the site's own verified facts; no other
// operator can honestly draw this line.

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// One cluster = nested rings sharing the same angular distortion, so they nest
// like real contours without crossing.
function contourCluster(seed: number, rings: number, spacing: number): string[] {
  const rand = mulberry32(seed)
  const harmonics = [
    { k: 2, amp: 0.06 + rand() * 0.05, phase: rand() * Math.PI * 2 },
    { k: 3, amp: 0.05 + rand() * 0.05, phase: rand() * Math.PI * 2 },
    { k: 5, amp: 0.03 + rand() * 0.03, phase: rand() * Math.PI * 2 },
  ]
  const paths: string[] = []
  const SAMPLES = 44
  for (let i = 0; i < rings; i++) {
    const base = spacing * (i + 1.4)
    const pts: [number, number][] = []
    for (let s = 0; s < SAMPLES; s++) {
      const th = (s / SAMPLES) * Math.PI * 2
      let r = base
      for (const h of harmonics) r += base * h.amp * Math.sin(h.k * th + h.phase)
      pts.push([Math.round(Math.cos(th) * r * 10) / 10, Math.round(Math.sin(th) * r * 10) / 10])
    }
    paths.push('M' + pts.map(p => p.join(' ')).join('L') + 'Z')
  }
  return paths
}

export function TopoContours({ className = '' }: { className?: string }) {
  const a = contourCluster(20260706, 7, 26)
  const b = contourCluster(4533116, 6, 30)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <g id="topo-a" stroke="#c9941a" strokeWidth="1" strokeLinejoin="round">
            {a.map((d, i) => <path key={i} d={d} />)}
          </g>
          <g id="topo-b" stroke="#c9941a" strokeWidth="1" strokeLinejoin="round">
            {b.map((d, i) => <path key={i} d={d} />)}
          </g>
        </defs>
        <g opacity="0.06">
          <use href="#topo-a" transform="translate(210 130)" />
          <use href="#topo-b" transform="translate(1180 90) scale(1.25)" />
          <use href="#topo-a" transform="translate(760 560) scale(1.5) rotate(140)" />
          <use href="#topo-b" transform="translate(80 620) scale(0.9) rotate(-70)" />
          <use href="#topo-a" transform="translate(1350 520) scale(0.8) rotate(60)" />
        </g>
      </svg>
    </div>
  )
}

export function ElevationProfile() {
  // Stylized west-of-page → east-of-page ascent: Danakil floor below sea level,
  // Rift shoulder, highland plateaus, Simien massif peaking at Ras Dashen.
  const profile =
    'M0 46 L60 47 L130 48.5 L200 47.5 L260 44 L330 38 L390 34 L440 35 L500 30 ' +
    'L560 26 L620 27.5 L680 23 L740 24 L800 20 L870 21.5 L930 17 L990 18 ' +
    'L1050 14 L1110 15 L1170 10 L1230 6 L1268 4 L1300 8 L1360 12 L1440 16'
  return (
    <div className="relative" aria-hidden="true">
      <svg className="w-full block" viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none" style={{ height: '56px' }}>
        {/* sea level */}
        <line x1="0" y1="44" x2="1440" y2="44" stroke="#f8f6f1" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 6" />
        {/* the ascent */}
        <path d={profile} stroke="#c9941a" strokeOpacity="0.45" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="absolute left-4 sm:left-8 bottom-1 font-body text-ivory/35" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Danakil −116m
      </span>
      <span className="absolute right-4 sm:right-8 top-0 font-body text-ivory/35" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Ras Dashen 4,533m
      </span>
    </div>
  )
}
