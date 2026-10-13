// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import remarkRewriteMdLinks from './src/lib/remarkRewriteMdLinks.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  markdown: {
    remarkPlugins: [remarkRewriteMdLinks],
  },
  vite: {
    server: {
      // In dev, forward backend routes to the ASP.NET app so the browser sees a single origin,
      // exactly like production where one container serves both. The Host header is kept as
      // localhost:4321, so OAuth callbacks come back through this proxy too.
      // (The string shorthand would set changeOrigin: true and break that.)
      proxy: {
        '/api': { target: 'http://localhost:5099', changeOrigin: false },
        '/auth': { target: 'http://localhost:5099', changeOrigin: false },
      },
    },
  },
});
