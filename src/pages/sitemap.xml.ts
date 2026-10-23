import type { APIRoute } from 'astro';
import { site, work } from '../data/site';
import { posts, tags } from '../lib/blog';

export const GET: APIRoute = async () => {
  const pages = [
    '/',
    '/about',
    '/work',
    '/pictures',
    '/blog',
    ...work.map((w) => `/work/${w.slug}`),
    ...tags.map((t) => `/blog/tag/${t}`),
    ...(await posts()).map((p) => `/blog/${p.id}`),
  ];
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p, site.url).href}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
