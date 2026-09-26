import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Abort slow/unreachable Supabase requests so pages never hang. */
const fetchWithTimeout: typeof fetch = (input, init) =>
  fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(4000) });

const options = {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: fetchWithTimeout },
};

/** Read-only public client (respects Row Level Security). Null when not configured. */
export function publicClient(): SupabaseClient | null {
  return url && anonKey ? createClient(url, anonKey, options) : null;
}

/** Server-only privileged client for writes from route handlers. Null when not configured. */
export function adminClient(): SupabaseClient | null {
  return url && serviceKey ? createClient(url, serviceKey, options) : null;
}
