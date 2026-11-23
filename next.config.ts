import type { NextConfig } from 'next';

/**
 * The site map moved every page to the addresses in the brief. Old addresses
 * are permanently redirected rather than left to 404, so any link already
 * shared still lands somewhere sensible — which is also what the brief asks
 * for if an older site exists on the domain.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about',            destination: '/about-us',                   permanent: true },
      { source: '/group',            destination: '/about-us/our-people',        permanent: true },
      { source: '/sustainability',   destination: '/about-us/health-safety',     permanent: true },
      { source: '/privacy-policy',   destination: '/privacy-notice',             permanent: true },
      { source: '/cookie-policy',    destination: '/cookie-notice',              permanent: true },
      { source: '/terms',            destination: '/paia-manual',                permanent: true },
      // Pages that no longer exist in the site map go to their nearest home.
      { source: '/sectors',          destination: '/services',                   permanent: true },
      { source: '/market',           destination: '/',                           permanent: true },
      { source: '/insights',         destination: '/',                           permanent: true },
    ];
  },
};

export default nextConfig;
