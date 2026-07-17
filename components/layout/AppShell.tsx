'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import MobileCtaBar from '@/components/layout/MobileCtaBar';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ReadingProgress from '@/components/ui/ReadingProgress';

const HIDDEN_CHROME_PATHS = ['/asset-labeler'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHideChrome = HIDDEN_CHROME_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <>
      <ReadingProgress />
      {!shouldHideChrome && <Header />}
      <main id="main-content">{children}</main>
      {!shouldHideChrome && <Footer />}
      {!shouldHideChrome && <WhatsAppButton />}
      {!shouldHideChrome && <MobileCtaBar />}
      <ScrollToTop />
    </>
  );
}
