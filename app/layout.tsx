import type { Metadata } from 'next';
import { Inter, Archivo } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { brand } from '@/lib/brand';

// Body — Inter's tall x-height holds up through the long technical
// copy a contractor site carries on its sector and project pages.
const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Headings — Archivo is a tight industrial grotesque. It gives the
// uppercase, engineered feel the UK tier-one contractors use without
// tipping into the soft geometric look of a tech brand.
const fontHeading = Archivo({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

const SITE_URL = 'https://otbconstructions.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brand.full} | ${brand.tagline}`,
    template: `%s | ${brand.full}`,
  },
  description:
    'Civil engineering, mining infrastructure, roads and earthworks across Southern Africa and the UK. Shaft services, processing plants, bulk water and power infrastructure delivered to international standard.',
  keywords: [
    'civil engineering contractor',
    'mining infrastructure contractor',
    'roads and earthworks',
    'shaft sinking services',
    'mineral processing plant construction',
    'bulk earthworks Namibia',
    'construction company Southern Africa',
    'desalination plant construction',
    'tailings storage facility',
    'beneficiation plant contractor',
    'local content mining Namibia',
    'OTB Constructions',
  ],
  openGraph: {
    type: 'website',
    siteName: brand.full,
    title: `${brand.full} | ${brand.tagline}`,
    description:
      'Civil engineering, mining infrastructure, roads and earthworks across Southern Africa and the UK.',
    images: ['/hero-headgear.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <head>
        {/* Scroll reveal is a JS effect. Without JS the page must still be
            readable, so neutralise the pre-reveal state entirely. */}
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          style={{
            position: 'absolute', left: -9999, top: 0, zIndex: 999,
            background: '#fff', padding: '12px 20px',
          }}
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
