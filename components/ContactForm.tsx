'use client';

import { useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { brand } from '@/lib/brand';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const enquiryTypes = [
  'Tender / pre-qualification',
  'Project enquiry',
  'Subcontract or supply',
  'Careers',
  'Media',
  'Other',
];

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid var(--line)',
  borderRadius: 2,
  background: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.94rem',
  color: 'var(--ink)',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.13em',
  color: '#5C6B7A',
  marginBottom: 9,
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Please try again.');

      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div
        style={{
          border: `1px solid ${brand.color.line}`,
          borderLeft: `4px solid ${brand.color.red}`,
          padding: '48px 44px',
          background: '#fff',
        }}
      >
        <Check size={30} strokeWidth={2.2} color={brand.color.red} />
        <h3 style={{ fontSize: '1.3rem', margin: '20px 0 12px' }}>Enquiry received.</h3>
        <p style={{ fontSize: '0.95rem', color: '#5C6B7A', lineHeight: 1.85, marginBottom: 24 }}>
          A member of the team will come back to you. If it is urgent, call{' '}
          <a href={`tel:${brand.phone.replace(/\s/g, '')}`} style={{ color: brand.color.red, fontWeight: 600 }}>
            {brand.phone}
          </a>{' '}
          rather than waiting on email.
        </p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline" type="button">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* Honeypot — bots fill it, people never see it. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        <div>
          <label htmlFor="name" style={labelStyle}>Name *</label>
          <input id="name" name="name" required maxLength={120} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="company" style={labelStyle}>Company</label>
          <input id="company" name="company" maxLength={160} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input id="email" name="email" type="email" required maxLength={180} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone</label>
          <input id="phone" name="phone" type="tel" maxLength={40} style={fieldStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="type" style={labelStyle}>Enquiry type</label>
          <select id="type" name="type" defaultValue={enquiryTypes[1]} style={fieldStyle}>
            {enquiryTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="message" style={labelStyle}>What are you building? *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={4000}
            placeholder="Scope, location, indicative programme — as much or as little as you have."
            style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.7 }}
          />
        </div>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            marginTop: 20, fontSize: '0.88rem', color: brand.color.red, lineHeight: 1.6,
          }}
        >
          <AlertCircle size={16} strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
          {error}
        </p>
      )}

      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          {status !== 'sending' && <ArrowRight size={14} strokeWidth={2.4} />}
        </button>
        <p style={{ fontSize: '0.78rem', color: '#8A99A8', maxWidth: 320, lineHeight: 1.6 }}>
          We use your details to answer your enquiry and nothing else.
        </p>
      </div>

      <style>{`
        input:focus, select:focus, textarea:focus {
          border-color: ${brand.color.navy700} !important;
          box-shadow: 0 0 0 3px rgba(16,58,97,0.1);
        }
        button[disabled] { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 680px) { .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
}
