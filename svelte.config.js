import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Use the Cloudflare adapter with Node.js compatibility enabled
    adapter: adapter({
      // Required configuration for node compatibility on Cloudflare
      compatibility_date: '2023-11-21',
      compatibility_flags: ['nodejs_compat'],
      // Mark Node.js built-in modules as external so they will use compatibility mode
      external: ['fs', 'path', 'url']
    })
  }
};

export default config;
