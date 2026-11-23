import type { MetadataRoute } from 'next';

/** Everything is public; the sitemap is advertised here for crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://lkmd.co.za/sitemap.xml',
    host: 'https://lkmd.co.za',
  };
}
