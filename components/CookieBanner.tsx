'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cookieBanner } from '@/lib/site';
import { brand } from '@/lib/brand';

const KEY = 'lkmd-analytics-consent';

/**
 * Cookie banner, with the wording the brief gives.
 *
 * The important behaviour is what it gates: analytics must load ONLY after a
 * visitor accepts. So nothing is loaded here at all — the choice is recorded
 * and broadcast, and the analytics script (when it is added) subscribes to
 * that. Declining is a real decline, not a dismissed banner.
 *
 * localStorage can throw in a private window or with site data blocked, so
 * every read and write is guarded; a failure just means the banner asks again.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(KEY, accepted ? 'accepted' : 'declined');
    } catch {
      /* private window — the choice holds for this page view only */
    }
    window.dispatchEvent(
      new CustomEvent('lkmd:consent', { detail: { analytics: accepted } }),
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 300,
        background: brand.color.navy900, color: '#fff',
        borderTop: `3px solid ${brand.color.red}`,
        boxShadow: '0 -16px 50px -20px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="container cookie-row"
        style={{
          padding: '22px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 28, flexWrap: 'wrap',
        }}
      >
        <p style={{ fontSize: '0.88rem', color: '#C7D6E4', lineHeight: 1.7, maxWidth: 760 }}>
          {cookieBanner.text}{' '}
          <Link
            href={cookieBanner.link.href}
            style={{ color: '#fff', textDecoration: 'underline' }}
          >
            {cookieBanner.link.label}
          </Link>
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => choose(true)}
            className="btn btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.72rem' }}
          >
            {cookieBanner.accept}
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            className="btn btn-light"
            style={{ padding: '12px 24px', fontSize: '0.72rem' }}
          >
            {cookieBanner.decline}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .cookie-row { padding: 18px 22px !important; }
          .cookie-row > div { width: 100%; }
          .cookie-row button { flex: 1; }
        }
      `}</style>
    </div>
  );
}
