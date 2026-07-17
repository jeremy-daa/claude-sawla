import type { Metadata, Viewport } from "next"
import "./globals.css"
// Self-hosted fonts via @fontsource — no Google Fonts dependency, GDPR-clean
import "@fontsource/cormorant-garamond/300.css"
import "@fontsource/cormorant-garamond/400.css"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/300-italic.css"
import "@fontsource/cormorant-garamond/400-italic.css"
import "@fontsource/cormorant-garamond/500-italic.css"
import "@fontsource/cormorant-garamond/600-italic.css"
import "@fontsource/dm-sans/300.css"
import "@fontsource/dm-sans/400.css"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/600.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import AppShell from "@/components/layout/AppShell";
import SchemaScript from "@/components/ui/SchemaScript";
import { homepageSchema } from "@/lib/schema";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a2724",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sawlatours.com"),
  title: {
    default: "Sawla Tours | Private Ethiopia Tours Crafted by Local Experts",
    template: "%s | Sawla Tours",
  },
  description:
    "Sawla Tours is an Ethiopia-based tour operator designing private, tailor-made journeys across Lalibela, Simien, Omo Valley, Bale, Danakil, festivals, wildlife, and cultural regions.",
  alternates: { canonical: "https://www.sawlatours.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.sawlatours.com",
    siteName: "Sawla Tours",
    title: "Sawla Tours | Private Ethiopia Tours Crafted by Local Experts",
    description:
      "Ethiopia-based tour operator designing private, tailor-made journeys.",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Sawla Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sawla Tours | Private Ethiopia Tours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaScript schema={homepageSchema} />
      </head>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
