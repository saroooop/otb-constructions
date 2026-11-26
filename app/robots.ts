import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/brand';

/**
 * Everything is public; the sitemap is advertised here for crawlers.
 *
 * The host comes from `siteUrl` rather than a literal, so robots.txt can
 * never point crawlers at a domain that is not serving the site yet.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
