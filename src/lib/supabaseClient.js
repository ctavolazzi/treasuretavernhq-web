import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

/**
 * Check if the Supabase connection is properly configured
 * @returns {boolean} Whether the connection is properly configured
 */
export function isSupabaseConfigured() {
  return (
    typeof PUBLIC_SUPABASE_URL === 'string' &&
    typeof PUBLIC_SUPABASE_ANON_KEY === 'string' &&
    PUBLIC_SUPABASE_URL.includes('supabase.co') &&
    PUBLIC_SUPABASE_ANON_KEY.length > 10
  );
}
