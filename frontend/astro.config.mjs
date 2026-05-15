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
});
