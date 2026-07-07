import type { Metadata } from 'next'
import { Suspense } from 'react'
import ThankYouContent from '@/components/forms/ThankYouContent'

export const metadata: Metadata = {
  title: 'Thank You | Sawla Tours',
  description: 'Your Ethiopia journey enquiry has been received.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <section className="section-padding min-h-[70vh] flex items-center">
      <div className="container-max">
        <Suspense fallback={null}>
          <ThankYouContent />
        </Suspense>
      </div>
    </section>
  )
}
