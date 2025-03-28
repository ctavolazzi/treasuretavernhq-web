import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

/**
 * Submit an email to the Supabase 'account_creation_waitlist' table
 * @param {string} email - The email address to subscribe
 * @param {string} [name=''] - The user's name (optional)
 * @returns {Promise<{success: boolean, error: string|null}>} Result object
 */
async function subscribeEmail(email, name = '') {
  try {
    const { error } = await supabase
      .from('account_creation_waitlist')
      .insert([
        {
          email,
          name: name.trim(),
          created_at: new Date().toISOString()
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

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');

    // Validate inputs
    if (!email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }

    // Submit to Supabase
    const result = await subscribeEmail(email.toString(), name ? name.toString() : '');

    if (!result.success) {
      // Check for duplicate emails (common error)
      if (result.error?.includes('duplicate key') || result.error?.includes('unique constraint')) {
        return {
          success: true, // Still return success to user
          message: 'You\'re already on our waitlist!'
        };
      }

      return {
        success: false,
        error: result.error
      };
    }

    return {
      success: true,
      message: 'Thanks for joining our waitlist!'
    };
  }
};