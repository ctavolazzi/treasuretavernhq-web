import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

/**
 * Submit an email to the Supabase 'emails' table
 * @param {string} email - The email address to subscribe
 * @param {boolean} [newsletterOptIn=true] - Whether the user opted in to the newsletter
 * @param {string} [name=''] - The user's name (optional)
 * @returns {Promise<{success: boolean, error: string|null}>} Result object
 */
export async function subscribeEmail(email, newsletterOptIn = true, name = '') {
  try {
    const { error } = await supabase
      .from('emails')
      .insert([
        {
          email,
          name: name.trim(), // Store the trimmed name if provided
          created_at: new Date().toISOString(),
          source: 'splash_page',
          newsletter_opt_in: newsletterOptIn
        }
      ]);

    if (error) {
      console.error('Error subscribing email:', error);
      return {
        success: false,
        error: error.message || 'Error subscribing email'
      };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Unexpected error during email subscription:', err);
    return {
      success: false,
      error: 'There was an error subscribing. Please try again later.'
    };
  }
}

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
