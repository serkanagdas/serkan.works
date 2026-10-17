import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    year: z.string(),
    stack: z.array(z.string()).default([]),
    cover: z.string().optional(),          // gerçek ekran görüntüsü: /covers/xxx.(png|jpg|webp|svg)
    coverHue: z.enum(['blue', 'purple', 'green', 'amber']).optional(), // cover yoksa gradient + monogram
    featured: z.boolean().default(false),  // anasayfadaki 2 büyük kart
    wip: z.boolean().optional(),           // geliştirme aşamasında rozeti
    links: z
      .object({
        github: z.string().url().optional(),
        live: z.string().url().optional(),
      })
      .optional(),
    order: z.number().default(99),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
