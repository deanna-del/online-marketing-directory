import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://onlinemarketingdirectory.com',
  integrations: [sitemap()],
  output: 'static',
  vite: {
    build: {
      // Disable source maps in production — prevents exposing server-side
      // logic and file paths to end users via browser DevTools
      sourcemap: false,
    },
  },
});
