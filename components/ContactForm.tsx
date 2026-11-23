'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { enquiryTypes, formMessages } from '@/lib/site';
import { brand } from '@/lib/brand';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The enquiry form exactly as the brief specifies: seven fields, a consent
 * checkbox, and the system messages written in the document.
 *
 * `?enquiry=` preselects a type so a button elsewhere on the site can open
 * the form with "Supplying or subcontracting" or "Property development
 * support" already chosen, which is what the brief asks for.
 */
const PRESELECT: Record<string, string> = {
  supplier:    'Supplying or subcontracting',
  development: 'Property development support',
  refurb:      'Refurbishment, repairs or maintenance',
  project:     'A new construction project',
};

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px',
  border: '1px solid var(--line)', borderRadius: 2,
  background: '#fff', fontFamily: 'inherit', fontSize: '0.94rem',
  color: 'var(--ink)', outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.13em',
  color: '#5C6B7A', marginBottom: 9,
};

function FormBody() {
  const params = useSearchParams();
  const preset = PRESELECT[params.get('enquiry') ?? ''] ?? enquiryTypes[0];

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
      if (!res.ok) throw new Error(body.error || formMessages.error);
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : formMessages.error);
    }
  }

  if (status === 'sent') {
    return (
      <div
        style={{
          border: `1px solid ${brand.color.line}`,
          borderLeft: `4px solid ${brand.color.red}`,
          padding: '48px 44px', background: '#fff',
        }}
      >
        <Check size={30} strokeWidth={2.2} color={brand.color.red} />
        <h3 style={{ fontSize: '1.3rem', margin: '20px 0 12px' }}>Enquiry sent</h3>
        <p style={{ fontSize: '0.95rem', color: '#5C6B7A', lineHeight: 1.85, marginBottom: 24 }}>
          {formMessages.sent}
        </p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline" type="button">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Honeypot — bots fill it, people never see it. */}
      <input
        type="text" name="company_website" tabIndex={-1}
        autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="type" style={labelStyle}>What can we help with? *</label>
          <select id="type" name="type" required defaultValue={preset} style={fieldStyle}>
            {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="name" style={labelStyle}>Full name *</label>
          <input id="name" name="name" required maxLength={120} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="company" style={labelStyle}>Company or organisation</label>
          <input id="company" name="company" maxLength={160} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email address *</label>
          <input id="email" name="email" type="email" required maxLength={180} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone number</label>
          <input id="phone" name="phone" type="tel" maxLength={40} style={fieldStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="location" style={labelStyle}>Where is the project?</label>
          <input
            id="location" name="location" maxLength={120}
            placeholder="Town or city" style={fieldStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="message" style={labelStyle}>Your message *</label>
          <textarea
            id="message" name="message" required rows={6} maxLength={4000}
            style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.7 }}
          />
        </div>
      </div>

      <label
        style={{
          display: 'flex', gap: 12, alignItems: 'flex-start',
          marginTop: 22, fontSize: '0.88rem', color: '#44576A', lineHeight: 1.7,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox" name="consent" required
          style={{ marginTop: 4, width: 16, height: 16, flexShrink: 0, accentColor: brand.color.red }}
        />
        <span>
          {formMessages.consent.replace(', as set out in the Privacy Notice.', ', as set out in the ')}
          <a href="/privacy-notice" style={{ color: brand.color.red, fontWeight: 600 }}>Privacy Notice</a>.
        </span>
      </label>

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

      <div style={{ marginTop: 26 }}>
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Submit enquiry'}
          {status !== 'sending' && <ArrowRight size={14} strokeWidth={2.4} />}
        </button>
      </div>

      <style>{`
        input:focus, select:focus, textarea:focus {
          border-color: ${brand.color.navy700} !important;
          box-shadow: 0 0 0 3px rgba(34,64,111,0.12);
        }
        button[disabled] { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 680px) { .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
}

export default function ContactForm() {
  // useSearchParams needs a Suspense boundary during static generation.
  return (
    <Suspense fallback={<div style={{ minHeight: 480 }} />}>
      <FormBody />
    </Suspense>
  );
}
