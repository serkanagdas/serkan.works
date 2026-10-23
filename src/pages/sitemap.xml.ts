import type { APIRoute } from 'astro';
import { site, work } from '../data/site';

const pages = ['/', '/about', '/work', '/pictures', ...work.map((w) => `/work/${w.slug}`)];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p, site.url).href}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
