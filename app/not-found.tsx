import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <div className="font-display text-gold/20 text-[8rem] font-light leading-none select-none">404</div>
        <h1 className="font-display text-charcoal text-display-md font-light -mt-4 mb-4">
          This Page Is Somewhere in Ethiopia
        </h1>
        <p className="text-warmgrey text-body-lg mb-10">
          We cannot find what you are looking for — but Ethiopia itself is very findable. Let us help you start there.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">Return Home</Link>
          <Link href="/enquire" className="btn-ghost">Plan a Journey</Link>
        </div>
        <div className="mt-12 text-warmgrey text-sm">
          Or explore:{' '}
          <Link href="/ethiopias-popular-destinations" className="text-gold hover:underline">Destinations</Link>
          {' · '}
          <Link href="/tours-by-experience" className="text-gold hover:underline">Tour styles</Link>
          {' · '}
          <Link href="/ethiopia-travel-guide" className="text-gold hover:underline">Travel guide</Link>
        </div>
      </div>
    </div>
  )
}
