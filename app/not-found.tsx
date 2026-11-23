import Link from 'next/link';
import { notFound as copy } from '@/lib/site';
import { brand } from '@/lib/brand';

/** The 404 page, with the heading, text and three links the brief specifies. */
export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '72svh', display: 'flex', alignItems: 'center',
        paddingTop: 'calc(var(--nav-h) + 56px)', paddingBottom: 90,
        background: brand.color.navy900, color: '#fff',
      }}
    >
      <div className="container-tight" style={{ textAlign: 'center' }}>
        <p className="eyebrow eyebrow-light" style={{ marginBottom: 24, justifyContent: 'center' }}>
          404
        </p>
        <h1 className="display-sm" style={{ color: '#fff', marginBottom: 20 }}>
          {copy.heading}
        </h1>
        <p className="lede-dark" style={{ maxWidth: 520, margin: '0 auto 36px' }}>
          {copy.body}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {copy.links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={i === 0 ? 'btn btn-primary' : 'btn btn-light'}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
