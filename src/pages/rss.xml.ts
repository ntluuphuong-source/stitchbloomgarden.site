import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getPosts, getFreebies } from '../utils';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  const freebies = await getFreebies();
  const items = [
    ...posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}/` })),
    ...freebies.map((f) => ({ title: `Free pattern: ${f.data.title}`, description: f.data.description, pubDate: f.data.date, link: `/free-patterns/${f.id}/` })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return rss({ title: SITE.name, description: SITE.description, site: context.site!, items });
}
