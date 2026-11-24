import type { MetadataRoute } from 'next';
import { services, projects } from '@/lib/site';

/**
 * XML sitemap listing every page and every project page, which the brief
 * requires for submission to Google Search Console.
 *
 * Generated from lib/site.ts rather than typed out, so adding a service or a
 * project puts it in the sitemap automatically and it can never fall behind
 * the navigation.
 */
const BASE = 'https://lkmd.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed = [
    { path: '',                          priority: 1.0,  freq: 'monthly' as const },
    { path: '/about-us',                 priority: 0.9,  freq: 'monthly' as const },
    { path: '/about-us/our-people',      priority: 0.7,  freq: 'yearly'  as const },
    { path: '/about-us/health-safety',   priority: 0.7,  freq: 'yearly'  as const },
    { path: '/about-us/lkmd-cares',      priority: 0.7,  freq: 'yearly'  as const },
    { path: '/services',                 priority: 0.9,  freq: 'monthly' as const },
    { path: '/mining',                   priority: 0.8,  freq: 'monthly' as const },
    { path: '/projects',                 priority: 0.9,  freq: 'monthly' as const },
    { path: '/careers',                  priority: 0.8,  freq: 'weekly'  as const },
    { path: '/contact',                  priority: 0.8,  freq: 'yearly'  as const },
    { path: '/market',                   priority: 0.5,  freq: 'yearly'  as const },
    { path: '/privacy-notice',           priority: 0.3,  freq: 'yearly'  as const },
    { path: '/paia-manual',              priority: 0.3,  freq: 'yearly'  as const },
    { path: '/cookie-notice',            priority: 0.3,  freq: 'yearly'  as const },
  ];

  return [
    ...fixed.map(f => ({
      url: `${BASE}${f.path}`,
      lastModified: now,
      changeFrequency: f.freq,
      priority: f.priority,
    })),
    ...services.map(s => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...projects.map(p => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
