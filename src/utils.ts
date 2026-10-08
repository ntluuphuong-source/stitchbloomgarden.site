import { getCollection } from 'astro:content';

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFreebies() {
  const freebies = await getCollection('freebies', ({ data }) => !data.draft);
  return freebies.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
