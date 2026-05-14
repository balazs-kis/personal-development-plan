import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const materials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/materials' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { materials };
