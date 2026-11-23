'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { LogOut, Save, Plus, Trash2, Check, AlertCircle, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { supabase, supabaseConfigured } from '@/lib/supabase-client';
import { brand } from '@/lib/brand';

/**
 * The editor LKMD staff use. Same app, same stack — no separate CMS.
 *
 * Everything it can do is granted by row-level security to signed-in users,
 * so this screen holds no secret: it carries the publishable key and nothing
 * more. Sign out and the writes genuinely stop working, rather than the
 * buttons merely disappearing.
 *
 * Sign-in is a magic link, so there is no password for a site office to lose.
 */

type Project = {
  id?: string; slug: string; title: string; town: string; summary: string;
  province: string; sector: string; service_slug: string; hero_image: string;
  on_home: boolean; published: boolean; sort_order: number;
};

type Vacancy = {
  id?: string; title: string; location: string; employment_type: string;
  description: string; published: boolean; sort_order: number;
};

type Setting = { key: string; label: string; group: string; value: string; sort_order: number };

const input: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid var(--line)',
  borderRadius: 2, fontFamily: 'inherit', fontSize: '0.88rem', background: '#fff',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: '0.12em', color: '#5C6B7A', marginBottom: 6,
};

const blankProject = (): Project => ({
  slug: '', title: '', town: '', summary: '', province: '', sector: '',
  service_slug: '', hero_image: '', on_home: false, published: false, sort_order: 99,
});
const blankVacancy = (): Vacancy => ({
  title: '', location: '', employment_type: 'Full time',
  description: '', published: false, sort_order: 99,
});

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<'projects' | 'vacancies' | 'settings'>('projects');
  const [note, setNote] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);

  /* ── Auth ───────────────────────────────────────────── */
  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    if (!supabase || !session) return;
    const [p, v, s] = await Promise.all([
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('vacancies').select('*').order('sort_order'),
      supabase.from('site_settings').select('*').order('group').order('sort_order'),
    ]);
    if (p.data) setProjects(p.data as Project[]);
    if (v.data) setVacancies(v.data as Vacancy[]);
    if (s.data) {
      setSettings(
        (s.data as Record<string, unknown>[]).map(r => ({
          key: String(r.key), label: String(r.label),
          group: String(r.group), value: String(r.value ?? ''),
          sort_order: Number(r.sort_order ?? 0),
        })),
      );
    }
  }, [session]);

  useEffect(() => { void load(); }, [load]);

  const flash = (kind: 'ok' | 'err', text: string) => {
    setNote({ kind, text });
    window.setTimeout(() => setNote(null), 4000);
  };

  /* ── Saving ─────────────────────────────────────────── */
  async function saveProject(p: Project) {
    if (!supabase) return;
    if (!p.slug || !p.title || !p.town || !p.summary) {
      flash('err', 'Slug, title, town and summary are required.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.from('projects').upsert(p, { onConflict: 'slug' });
    setBusy(false);
    if (error) flash('err', error.message);
    else { flash('ok', `Saved ${p.title}`); void load(); }
  }

  async function removeProject(p: Project) {
    if (!supabase || !p.id) return;
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    setBusy(true);
    const { error } = await supabase.from('projects').delete().eq('id', p.id);
    setBusy(false);
    if (error) flash('err', error.message);
    else { flash('ok', 'Deleted'); void load(); }
  }

  async function saveVacancy(v: Vacancy) {
    if (!supabase) return;
    if (!v.title) { flash('err', 'A vacancy needs a title.'); return; }
    setBusy(true);
    const { error } = v.id
      ? await supabase.from('vacancies').update(v).eq('id', v.id)
      : await supabase.from('vacancies').insert(v);
    setBusy(false);
    if (error) flash('err', error.message);
    else { flash('ok', `Saved ${v.title}`); void load(); }
  }

  async function removeVacancy(v: Vacancy) {
    if (!supabase || !v.id) return;
    if (!window.confirm(`Delete "${v.title}"?`)) return;
    setBusy(true);
    const { error } = await supabase.from('vacancies').delete().eq('id', v.id);
    setBusy(false);
    if (error) flash('err', error.message);
    else { flash('ok', 'Deleted'); void load(); }
  }

  async function saveSettings() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert(settings.map(s => ({ key: s.key, value: s.value })), { onConflict: 'key' });
    setBusy(false);
    if (error) flash('err', error.message);
    else flash('ok', 'Settings saved. The site picks them up within a minute.');
  }

  /* ── Not configured ─────────────────────────────────── */
  if (!supabaseConfigured) {
    return (
      <Shell>
        <p className="lede">
          The admin is not connected yet. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> in the environment and redeploy.
        </p>
      </Shell>
    );
  }

  if (!ready) return <Shell><Loader2 className="spin" /></Shell>;
  if (!session) return <Shell><SignIn onFlash={flash} /></Shell>;

  return (
    <Shell>
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap', marginBottom: 28,
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Site admin</p>
          <p style={{ fontSize: '0.86rem', color: '#5C6B7A' }}>
            Signed in as {session.user.email}
          </p>
        </div>
        <button
          onClick={() => supabase?.auth.signOut()}
          className="btn btn-outline"
          style={{ padding: '11px 20px', fontSize: '0.7rem' }}
        >
          <LogOut size={14} strokeWidth={2.2} /> Sign out
        </button>
      </div>

      {note && (
        <div
          role="status"
          style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22,
            padding: '12px 16px', fontSize: '0.86rem',
            background: note.kind === 'ok' ? '#EDF7EF' : '#FDEDED',
            border: `1px solid ${note.kind === 'ok' ? '#BBE0C2' : '#F3C2C2'}`,
            color: note.kind === 'ok' ? '#1E6B2C' : brand.color.red,
          }}
        >
          {note.kind === 'ok' ? <Check size={15} /> : <AlertCircle size={15} />}
          {note.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: 2, marginBottom: 26, flexWrap: 'wrap' }}>
        {(['projects', 'vacancies', 'settings'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '11px 20px', border: '1px solid var(--line)',
              borderBottom: tab === t ? `3px solid ${brand.color.red}` : '1px solid var(--line)',
              background: tab === t ? '#fff' : brand.color.concrete,
              fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', cursor: 'pointer',
              color: tab === t ? 'var(--ink)' : '#5C6B7A',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'projects' && (
        <Section
          title="Projects"
          hint="Slug, title, town and summary are required. Everything else is optional and hides on the page when empty. Nothing appears on the site until Published is ticked."
          onAdd={() => setProjects([blankProject(), ...projects])}
        >
          {projects.map((p, i) => (
            <Card key={p.id ?? `new-${i}`}>
              <Grid>
                <F label="Title *"><input style={input} value={p.title} onChange={e => upd(setProjects, projects, i, { title: e.target.value })} /></F>
                <F label="Slug *"><input style={input} value={p.slug} placeholder="athlone-girls-high-school-johannesburg" onChange={e => upd(setProjects, projects, i, { slug: e.target.value })} /></F>
                <F label="Town *"><input style={input} value={p.town} onChange={e => upd(setProjects, projects, i, { town: e.target.value })} /></F>
                <F label="Province"><input style={input} value={p.province ?? ''} onChange={e => upd(setProjects, projects, i, { province: e.target.value })} /></F>
                <F label="Sector"><input style={input} value={p.sector ?? ''} onChange={e => upd(setProjects, projects, i, { sector: e.target.value })} /></F>
                <F label="Service slug"><input style={input} value={p.service_slug ?? ''} placeholder="building-construction" onChange={e => upd(setProjects, projects, i, { service_slug: e.target.value })} /></F>
                <F label="Hero image path" wide><input style={input} value={p.hero_image ?? ''} placeholder="/lkmd/concrete.jpg" onChange={e => upd(setProjects, projects, i, { hero_image: e.target.value })} /></F>
                <F label="Summary *" wide><textarea style={{ ...input, minHeight: 72, resize: 'vertical' }} value={p.summary} onChange={e => upd(setProjects, projects, i, { summary: e.target.value })} /></F>
              </Grid>
              <Row>
                <Toggle label="Published" on={p.published} onChange={v => upd(setProjects, projects, i, { published: v })} />
                <Toggle label="Show on home page" on={p.on_home} onChange={v => upd(setProjects, projects, i, { on_home: v })} />
                <F label="Order"><input type="number" style={{ ...input, width: 90 }} value={p.sort_order} onChange={e => upd(setProjects, projects, i, { sort_order: Number(e.target.value) })} /></F>
                <div style={{ flex: 1 }} />
                <button onClick={() => saveProject(p)} disabled={busy} className="btn btn-primary" style={{ padding: '11px 20px', fontSize: '0.7rem' }}>
                  <Save size={14} strokeWidth={2.2} /> Save
                </button>
                {p.id && (
                  <button onClick={() => removeProject(p)} disabled={busy} className="btn btn-outline" style={{ padding: '11px 16px', fontSize: '0.7rem' }}>
                    <Trash2 size={14} strokeWidth={2.2} />
                  </button>
                )}
              </Row>
            </Card>
          ))}
        </Section>
      )}

      {tab === 'vacancies' && (
        <Section
          title="Vacancies"
          hint="Only published vacancies appear on the Careers page. With none published, the page shows the roles LKMD recruits and the application address instead."
          onAdd={() => setVacancies([blankVacancy(), ...vacancies])}
        >
          {vacancies.map((v, i) => (
            <Card key={v.id ?? `new-${i}`}>
              <Grid>
                <F label="Title *"><input style={input} value={v.title} onChange={e => upd(setVacancies, vacancies, i, { title: e.target.value })} /></F>
                <F label="Location"><input style={input} value={v.location ?? ''} onChange={e => upd(setVacancies, vacancies, i, { location: e.target.value })} /></F>
                <F label="Type"><input style={input} value={v.employment_type ?? ''} onChange={e => upd(setVacancies, vacancies, i, { employment_type: e.target.value })} /></F>
                <F label="Description" wide><textarea style={{ ...input, minHeight: 90, resize: 'vertical' }} value={v.description ?? ''} onChange={e => upd(setVacancies, vacancies, i, { description: e.target.value })} /></F>
              </Grid>
              <Row>
                <Toggle label="Published" on={v.published} onChange={x => upd(setVacancies, vacancies, i, { published: x })} />
                <F label="Order"><input type="number" style={{ ...input, width: 90 }} value={v.sort_order} onChange={e => upd(setVacancies, vacancies, i, { sort_order: Number(e.target.value) })} /></F>
                <div style={{ flex: 1 }} />
                <button onClick={() => saveVacancy(v)} disabled={busy} className="btn btn-primary" style={{ padding: '11px 20px', fontSize: '0.7rem' }}>
                  <Save size={14} strokeWidth={2.2} /> Save
                </button>
                {v.id && (
                  <button onClick={() => removeVacancy(v)} disabled={busy} className="btn btn-outline" style={{ padding: '11px 16px', fontSize: '0.7rem' }}>
                    <Trash2 size={14} strokeWidth={2.2} />
                  </button>
                )}
              </Row>
            </Card>
          ))}
        </Section>
      )}

      {tab === 'settings' && (
        <Section
          title="Site details"
          hint="These are the fields marked [To be supplied] in the brief. Each one stays hidden on the site until it has a value here — leave anything blank that you do not have yet."
        >
          {Array.from(new Set(settings.map(s => s.group))).map(group => (
            <Card key={group}>
              <h3 style={{ fontSize: '0.96rem', marginBottom: 18 }}>{group}</h3>
              <Grid>
                {settings.filter(s => s.group === group).map(s => {
                  const idx = settings.findIndex(x => x.key === s.key);
                  return (
                    <F key={s.key} label={s.label}>
                      <input
                        style={input}
                        value={s.value}
                        onChange={e => {
                          const next = [...settings];
                          next[idx] = { ...next[idx], value: e.target.value };
                          setSettings(next);
                        }}
                      />
                    </F>
                  );
                })}
              </Grid>
            </Card>
          ))}
          <Row>
            <div style={{ flex: 1 }} />
            <button onClick={saveSettings} disabled={busy} className="btn btn-primary">
              <Save size={14} strokeWidth={2.2} /> Save all details
            </button>
          </Row>
        </Section>
      )}
    </Shell>
  );
}

/* ── Small building blocks ──────────────────────────────── */

function upd<T>(set: (v: T[]) => void, list: T[], i: number, patch: Partial<T>) {
  const next = [...list];
  next[i] = { ...next[i], ...patch };
  set(next);
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 56px)', paddingBottom: 90, minHeight: '70svh' }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        <div style={{ marginBottom: 30 }}><Logo tone="dark" size={30} /></div>
        {children}
      </div>
      <style>{`.spin { animation: spin 1s linear infinite } @keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </main>
  );
}

function Section({
  title, hint, onAdd, children,
}: { title: string; hint: string; onAdd?: () => void; children: React.ReactNode }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{title}</h2>
          <p style={{ fontSize: '0.85rem', color: '#5C6B7A', lineHeight: 1.7 }}>{hint}</p>
        </div>
        {onAdd && (
          <button onClick={onAdd} className="btn btn-outline" style={{ padding: '11px 18px', fontSize: '0.7rem' }}>
            <Plus size={14} strokeWidth={2.4} /> Add
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#fff', border: '1px solid var(--line)',
        borderTop: `3px solid ${brand.color.line}`, padding: '24px 22px', marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="adm-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {children}
      <style>{`@media (max-width: 760px) { .adm-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginTop: 18 }}>
      {children}
    </div>
  );
}

function F({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div style={wide ? { gridColumn: '1 / -1' } : undefined}>
      <label style={lbl}>{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.84rem', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={on}
        onChange={e => onChange(e.target.checked)}
        style={{ width: 16, height: 16, accentColor: brand.color.red }}
      />
      {label}
    </label>
  );
}

function SignIn({ onFlash }: { onFlash: (k: 'ok' | 'err', t: string) => void }) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setSending(false);
    if (error) onFlash('err', error.message);
    else setSent(true);
  }

  if (sent) {
    return (
      <div style={{ maxWidth: 440 }}>
        <Check size={28} strokeWidth={2.2} color={brand.color.red} />
        <h1 style={{ fontSize: '1.4rem', margin: '18px 0 12px' }}>Check your email</h1>
        <p className="lede">
          We have sent a sign-in link to {email}. Open it on this device and you
          will land back here, signed in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={send} style={{ maxWidth: 420 }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Site admin</h1>
      <p className="lede" style={{ marginBottom: 26 }}>
        Enter your LKMD email address and we will send you a sign-in link. There
        is no password to remember.
      </p>
      <label style={lbl}>Email address</label>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ ...input, marginBottom: 18 }}
      />
      <button type="submit" disabled={sending} className="btn btn-primary">
        {sending ? 'Sending…' : 'Send sign-in link'}
      </button>
    </form>
  );
}
