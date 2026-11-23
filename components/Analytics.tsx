'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const KEY = 'lkmd-analytics-consent';

/**
 * Google Analytics 4, loaded ONLY after a visitor accepts analytics cookies —
 * which is what the brief requires, and the whole point of the banner.
 *
 * Nothing here runs until consent exists. The component listens for the
 * banner's event so accepting takes effect immediately rather than on the
 * next page load, and a stored acceptance is honoured on return visits.
 *
 * With no measurement ID configured the component renders nothing at all, so
 * the site ships without analytics until LKMD supplies one.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);
  const id = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === 'accepted') setConsented(true);
    } catch {
      /* private window or blocked storage — stay off */
    }

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<{ analytics: boolean }>).detail;
      setConsented(Boolean(detail?.analytics));
    };
    window.addEventListener('lkmd:consent', onConsent);
    return () => window.removeEventListener('lkmd:consent', onConsent);
  }, []);

  if (!id || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
