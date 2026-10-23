import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts are Markdown files in src/content/blog. The file name is the URL.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tag: z.enum(['notes', 'hardware', 'software']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
