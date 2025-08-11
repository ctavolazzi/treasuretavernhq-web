import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = locals.session;
  if (!session) {
    throw redirect(302, `/login`);
  }

  // Optional: restrict to allowlist emails
  // const allowlist = ['you@example.com'];
  // if (!locals.user || !allowlist.includes(locals.user.email ?? '')) {
  //   throw error(403, 'Not authorized');
  // }

  return {
    userEmail: locals.user?.email ?? null
  };
};

export const actions: Actions = {
  // placeholder for future: create draft tale
};
