'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { brand } from '@/lib/brand';
import { mainNav } from '@/lib/site';

/**
 * Six menu sections, with drop-downs under About Us and Services, exactly as
 * the site map specifies. Transparent over a dark hero, solid once you leave
 * it — the look is unchanged; only the structure underneath it grew.
 *
 * The drop-downs open on hover for pointers and on click for touch and
 * keyboard, because a hover-only menu is unreachable on a phone.
 */
const solidRoutes = ['/contact', '/privacy-notice', '/paia-manual', '/cookie-notice'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<number | undefined>(undefined);

  const forceSolid = solidRoutes.some(r => pathname.startsWith(r));
  const solid = scrolled || open || openMenu !== null || forceSolid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setOpenMenu(null); setMobileOpen(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape closes whichever menu is showing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenMenu(null); setOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // A short delay on leaving, so crossing the gap to the panel does not close it.
  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

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
        style={{ display: 'flex', alignItems: 'center', height: 'var(--nav-h)', gap: 24 }}
      >
        <Link href="/" aria-label={`${brand.full} home`} style={{ textDecoration: 'none' }}>
          <Logo tone={tone} size={34} />
        </Link>

        <div style={{ flex: 1 }} />

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {mainNav.map(item => {
            const active = isActive(item.href);
            const hasChildren = Boolean(item.children?.length);
            const panelOpen = openMenu === item.label;

            return (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => hasChildren && hoverOpen(item.label)}
                onMouseLeave={() => hasChildren && hoverClose()}
              >
                <Link
                  href={item.href}
                  aria-haspopup={hasChildren || undefined}
                  aria-expanded={hasChildren ? panelOpen : undefined}
                  onClick={e => {
                    // On touch, the first tap opens the panel rather than navigating.
                    if (hasChildren && !panelOpen && window.matchMedia('(hover: none)').matches) {
                      e.preventDefault();
                      setOpenMenu(item.label);
                    }
                  }}
                  style={{
                    position: 'relative',
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '10px 13px',
                    fontSize: '0.78rem', fontWeight: 600,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    color: solid ? (active ? 'var(--ink)' : '#56687A') : 'rgba(255,255,255,0.88)',
                    transition: 'color .2s var(--ease)',
                  }}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      size={13}
                      strokeWidth={2.4}
                      style={{
                        transform: panelOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform .25s var(--ease)',
                      }}
                    />
                  )}
                  <span
                    style={{
                      position: 'absolute', left: 13, right: hasChildren ? 24 : 13, bottom: 2, height: 2,
                      background: 'var(--red)',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform .3s var(--ease)',
                    }}
                  />
                </Link>

                {hasChildren && panelOpen && (
                  <div
                    style={{
                      position: 'absolute', top: '100%', left: 0, minWidth: 286,
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderTop: `3px solid ${brand.color.red}`,
                      boxShadow: '0 18px 50px -22px rgba(16,28,51,0.3)',
                      padding: '8px 0',
                    }}
                  >
                    {item.children!.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        style={{
                          display: 'block', padding: '11px 20px',
                          fontSize: '0.84rem', fontWeight: 500,
                          textDecoration: 'none', lineHeight: 1.4,
                          color: pathname === c.href ? brand.color.red : '#44576A',
                        }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ marginLeft: 14, padding: '13px 22px', fontSize: '0.72rem' }}
          >
            Start a project
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

      {/* ── Mobile drawer ───────────────────────────────── */}
      {open && (
        <div
          style={{
            background: '#fff', borderTop: '1px solid var(--line)',
            padding: '10px 22px 34px',
            height: 'calc(100vh - var(--nav-h))', overflowY: 'auto',
          }}
        >
          {mainNav.map(item => {
            const hasChildren = Boolean(item.children?.length);
            const expanded = mobileOpen === item.label;
            return (
              <div key={item.label} style={{ borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    href={item.href}
                    style={{
                      flex: 1, padding: '18px 0', textDecoration: 'none',
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.1rem', fontWeight: 700,
                      color: isActive(item.href) ? brand.color.red : 'var(--ink)',
                    }}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => setMobileOpen(expanded ? null : item.label)}
                      aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                      aria-expanded={expanded}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '14px 4px 14px 16px', color: '#93A4B4',
                      }}
                    >
                      <ChevronDown
                        size={20}
                        strokeWidth={2}
                        style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}
                      />
                    </button>
                  )}
                </div>

                {hasChildren && expanded && (
                  <div style={{ paddingBottom: 12 }}>
                    {item.children!.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        style={{
                          display: 'block', padding: '11px 0 11px 16px',
                          fontSize: '0.92rem', textDecoration: 'none',
                          borderLeft: `2px solid ${brand.color.line}`,
                          color: pathname === c.href ? brand.color.red : '#5C6B7A',
                        }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link href="/contact" className="btn btn-primary" style={{ marginTop: 26, width: '100%' }}>
            Start a project
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
