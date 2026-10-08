import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The visual editor (Pages CMS) can save empty fields as ""; treat those as missing.
const blank = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((v) => (v === '' ? null : v), schema);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().nullish(),
    // Etsy links or listing ids to show as "Patterns from this post" under the article.
    patterns: z.array(z.string()).nullish().transform((v) => v ?? []),
    draft: z.boolean().nullish().transform((v) => v ?? false),
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
    size: z.string().nullish(), // e.g. "40 x 40 stitches"
    colors: blank(z.number().nullish()), // number of DMC colors
    level: blank(z.enum(['Beginner', 'Easy', 'Intermediate']).nullish()).transform((v) => v ?? 'Beginner'),
    // When true the PDF is only sent by email; the page shows the signup form instead of a download button.
    emailOnly: blank(z.boolean().nullish()).transform((v) => v ?? false),
    // Etsy links or listing ids to suggest next to the freebie.
    related: z.array(z.string()).nullish().transform((v) => v ?? []),
    draft: z.boolean().nullish().transform((v) => v ?? false),
  }),
});

export const collections = { blog, freebies };
