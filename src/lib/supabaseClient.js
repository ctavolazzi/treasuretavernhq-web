import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

/**
 * Check if the Supabase connection is properly configured
 * @returns {boolean} Whether the connection is properly configured
 */
export function isSupabaseConfigured() {
  const url = env.PUBLIC_SUPABASE_URL;
  const key = env.PUBLIC_SUPABASE_ANON_KEY;
  return (
    typeof url === 'string' &&
    typeof key === 'string' &&
    url.includes('supabase.co') &&
    key.length > 10
  );
}

// Lazily create the client only when configuration exists to avoid SSR crashes in dev
export const supabase = isSupabaseConfigured()
  ? createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
  : null;
