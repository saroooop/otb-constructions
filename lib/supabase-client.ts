'use client';

import { createClient } from '@supabase/supabase-js';

/**
 * Browser Supabase client for the admin screens.
 *
 * It carries the PUBLISHABLE key only. Everything an editor can do is granted
 * by row-level security to the `authenticated` role, so the browser never
 * needs — and never receives — the service role key. Signing out removes the
 * ability to write, rather than merely hiding the buttons.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(url && key);

export const supabase = supabaseConfigured
  ? createClient(url!, key!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;
