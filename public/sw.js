/* Service worker — OTB Constructions.
 *
 * Hand-rolled rather than Workbox: the whole policy is forty lines, and a
 * build-time dependency that generates a worker nobody reads is a poor trade
 * for a site this size.
 *
 * Policy, by request type:
 *   navigations      network-first, falling back to cache, then /offline
 *   immutable assets cache-first (hashed JS/CSS, generated imagery, icons)
 *   the hero film    cache-first, but ONLY once it has been fetched normally.
 *                    It is 4.6MB — precaching it would spend a phone's data
 *                    on a visitor who may never scroll.
 *   /api/*           network only. A contact POST must never be served from
 *                    a cache, and a stale 200 would be worse than an error.
 *
 * Bump CACHE_VERSION to invalidate everything on the next deploy.
 */

const CACHE_VERSION = 'v1';
const CACHE = `otb-${CACHE_VERSION}`;

// Deliberately small. The app shell plus the offline page — not the site.
const PRECACHE = [
  '/',
  '/offline',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/apple-touch-icon.png',
];

const IMMUTABLE = [/^\/_next\/static\//, /^\/icons\//, /^\/disciplines\//, /^\/sectors\//];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll is atomic: one 404 would reject the whole install and leave the
      // site with no worker at all. Add individually and tolerate misses.
      .then(cache => Promise.allSettled(PRECACHE.map(url => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function isImmutable(pathname) {
  return IMMUTABLE.some(re => re.test(pathname));
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return (await caches.match('/offline')) || Response.error();
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;

  // Only GET is cacheable. POSTs to /api/contact fall straight through.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never touch cross-origin (fonts are self-hosted by next/font, so this is
  // mostly third-party noise) or the API.
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  if (isImmutable(url.pathname) || url.pathname.startsWith('/video/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
  }
});

// Lets the page tell a waiting worker to take over immediately.
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
