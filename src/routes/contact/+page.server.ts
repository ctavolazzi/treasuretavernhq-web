import type { Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      // Get form data
      const formData = await request.formData();
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      const captcha = formData.get('captcha') as string;

      // Basic validation
      if (!name || !email || !message || !captcha) {
        return {
          success: false,
          error: 'All fields are required'
        };
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: 'Please enter a valid email address'
        };
      }

      // Validate captcha answer
      const captchaAnswer = parseInt(captcha);
      if (isNaN(captchaAnswer)) {
        return {
          success: false,
          error: 'Please enter a valid number for the anti-spam check'
        };
      }

      // Store in Supabase 'contact_requests' table
      try {
        const { error } = await supabase
          .from('contact_requests')
          .insert([
            {
              name,
              email,
              message,
              created_at: new Date().toISOString(),
              user_id: null // Set user_id to null for public submissions
            }
          ]);

        if (error) {
          console.error('Error storing contact request:', error);
          return {
            success: false,
            error: 'There was an error sending your message. Please try again later.'
          };
        }
      } catch (err) {
        console.error('Error with Supabase:', err);
        return {
          success: false,
          error: 'There was an error sending your message. Please try again later.'
        };
      }

      return {
        success: true
      };
    } catch (err) {
      console.error('Error processing contact form:', err);
      return {
        success: false,
        error: 'There was an error processing your message. Please try again later.'
      };
    }
  }
};