import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    // Etsy listing ids to show as "Patterns from this post" under the article.
    patterns: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const freebies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/freebies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string(), // e.g. /images/freebies/little-ghost.jpg
    pdf: z.string(), // e.g. /patterns/little-ghost.pdf
    size: z.string().optional(), // e.g. "40 x 40 stitches"
    colors: z.number().optional(), // number of DMC colors
    level: z.enum(['Beginner', 'Easy', 'Intermediate']).default('Beginner'),
    // When true the PDF is only sent by email; the page shows the signup form instead of a download button.
    emailOnly: z.boolean().default(false),
    // Etsy listing ids to suggest next to the freebie.
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, freebies };
