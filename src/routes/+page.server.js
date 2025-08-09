import { supabase, isSupabaseConfigured } from '$lib/supabaseClient';

export async function load() {
  // Avoid server errors during local dev when Supabase env vars are not set
  if (!isSupabaseConfigured()) {
    return { emails: [] };
  }

  try {
    if (!supabase) {
      return { emails: [] };
    }
    const { data, error } = await supabase.from('public.emails').select();
    if (error) {
      console.error('Supabase error fetching emails:', error);
      return { emails: [] };
    }
    return { emails: data ?? [] };
  } catch (err) {
    console.error('Unexpected error fetching emails:', err);
    return { emails: [] };
  }
}
