import { TALES_ALLOWLIST_EMAILS } from '$env/static/private';
import { getCategories } from '$lib/data/tales.js';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = locals.session;
  if (!session) {
    throw redirect(302, `/login`);
  }

  // Optional allowlist: if TALES_ALLOWLIST_EMAILS is set, restrict access to listed emails
  const rawAllowlist = TALES_ALLOWLIST_EMAILS || '';
  if (rawAllowlist.trim().length > 0) {
    const allowlist = rawAllowlist
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);
    const userEmail = (locals.user?.email || '').toLowerCase();
    if (!userEmail || !allowlist.includes(userEmail)) {
      throw error(403, 'Not authorized');
    }
  }

  const categories = await getCategories();
  return {
    userEmail: locals.user?.email ?? null,
    categories
  };
};

export const actions: Actions = {
  // placeholder for future: create draft tale
};
