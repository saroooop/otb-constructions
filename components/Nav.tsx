'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { brand } from '@/lib/brand';

const links = [
  { href: '/group',          label: 'The Group' },
  { href: '/services',       label: 'What We Do' },
  { href: '/sectors',        label: 'Sectors' },
  { href: '/market',         label: 'The Market' },
  { href: '/projects',       label: 'Projects' },
  { href: '/sustainability', label: 'Safety' },
  { href: '/about',          label: 'About' },
];

/**
 * Transparent over the hero, solid once you leave it — WBHO's full-bleed
 * header with a UK tier-one's hairline border and red active marker.
 * Pages without a dark hero opt out of transparency via `solidRoutes`.
 */
const solidRoutes = ['/contact', '/privacy-policy', '/terms', '/cookie-policy'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const forceSolid = solidRoutes.includes(pathname);
  const solid = scrolled || open || forceSolid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation and lock the body while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const tone = solid ? 'dark' : 'light';

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: solid ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: solid ? 'saturate(180%) blur(14px)' : 'none',
        borderBottom: solid ? '1px solid var(--line)' : '1px solid rgba(255,255,255,0.14)',
        transition: 'background .4s var(--ease), border-color .4s var(--ease)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', height: 'var(--nav-h)', gap: 28 }}
      >
        <Link href="/" aria-label={`${brand.full} home`} style={{ textDecoration: 'none' }}>
          <Logo tone={tone} size={40} />
        </Link>

        <div style={{ flex: 1 }} />

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  position: 'relative',
                  padding: '10px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  color: solid ? (active ? 'var(--ink)' : '#56687A') : 'rgba(255,255,255,0.88)',
                  transition: 'color .2s var(--ease)',
                }}
              >
                {l.label}
                <span
                  style={{
                    position: 'absolute', left: 14, right: 14, bottom: 2, height: 2,
                    background: 'var(--red)',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform .3s var(--ease)',
                  }}
                />
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ marginLeft: 16, padding: '13px 24px', fontSize: '0.72rem' }}
          >
            Enquire
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', padding: 8,
            color: solid ? 'var(--ink)' : '#fff',
          }}
        >
          {open ? <X size={26} strokeWidth={1.8} /> : <Menu size={26} strokeWidth={1.8} />}
        </button>
      </div>

      {open && (
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid var(--line)',
            padding: '14px 22px 34px',
            height: 'calc(100vh - var(--nav-h))',
            overflowY: 'auto',
          }}
        >
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 0',
                borderBottom: '1px solid var(--line)',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading), system-ui, sans-serif',
                fontSize: '1.15rem', fontWeight: 700,
                color: pathname === l.href ? 'var(--red)' : 'var(--ink)',
              }}
            >
              {l.label}
              <ArrowRight size={18} strokeWidth={2} color="#93A4B4" />
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ marginTop: 28, width: '100%' }}
          >
            Enquire
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1150px) {
          .desktop-nav   { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
