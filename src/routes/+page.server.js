import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data } = await supabase.from('public.emails').select();
  return {
    emails: data ?? []
  };
}
