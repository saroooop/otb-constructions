import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';

/**
 * Web app manifest.
 *
 * Next generates this at /manifest.webmanifest and links it automatically, so
 * the brand name and colours stay sourced from lib/brand.ts rather than being
 * duplicated into a static JSON file that would drift at the first rebrand.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.full,
    short_name: brand.name,
    description: brand.tagline,

    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',

    background_color: brand.color.navy900,
    theme_color: brand.color.navy900,

    categories: ['business', 'productivity'],
    lang: 'en-GB',
    dir: 'ltr',

    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Maskable variants carry the 40% safe zone Android needs, or the mark
      // gets clipped when the launcher crops it to a circle or squircle.
      { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],

    shortcuts: [
      { name: 'What we do', url: '/services' },
      { name: 'Projects',   url: '/projects' },
      { name: 'Enquire',    url: '/contact' },
    ],
  };
}
