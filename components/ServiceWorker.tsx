'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker, and nothing else.
 *
 * Registration waits for `load` so it never competes with the hero film and
 * the first paint for bandwidth — the worker is for the *second* visit, so
 * costing the first one anything would be backwards.
 *
 * Localhost is skipped: a stale worker caching a dev build is a genuinely
 * confusing hour to debug.
 */
export default function ServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return;

    const register = () => {
      navigator.serviceWorker.register('/sw.js').then(
        reg => {
          // A new worker is waiting because the user has an old page open.
          // Take over straight away rather than leaving them a version behind
          // until every tab is closed.
          if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');

          reg.addEventListener('updatefound', () => {
            const incoming = reg.installing;
            if (!incoming) return;
            incoming.addEventListener('statechange', () => {
              if (incoming.state === 'installed' && navigator.serviceWorker.controller) {
                incoming.postMessage('SKIP_WAITING');
              }
            });
          });
        },
        err => console.warn('[sw] registration failed', err),
      );
    };

    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register);

    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
