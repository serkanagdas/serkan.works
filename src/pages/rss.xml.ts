import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { posts } from '../lib/blog';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const items = (await posts())
    .map((p) => {
      const url = `${site.url}/blog/${p.id}`;
      return [
        '    <item>',
        `      <title>${esc(p.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${p.data.date.toUTCString()}</pubDate>`,
        `      <category>${p.data.tag}</category>`,
        `      <description>${esc(p.data.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)} — Blog</title>
    <link>${site.url}/blog</link>
    <description>Small things built, broken, fixed or learned.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
