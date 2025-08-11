import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize Supabase server client with SvelteKit cookies API
  const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key: string) => event.cookies.get(key),
      set: (key: string, value: string, options: Record<string, any>) => {
        event.cookies.set(key, value, { path: '/', ...options });
      },
      remove: (key: string, options: Record<string, any>) => {
        event.cookies.delete(key, { path: '/', ...options });
      }
    }
  });

  event.locals.supabase = supabase as unknown as any;

  // Attach session and user to locals for easy route protection
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    event.locals.session = session ?? null;
    event.locals.user = session?.user ?? null;
  } catch {
    event.locals.session = null;
    event.locals.user = null;
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      // Allow Supabase headers to pass through when present
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};
