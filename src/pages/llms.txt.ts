import type { APIRoute } from 'astro';
import { site, about, work, links } from '../data/site';
import { posts, day } from '../lib/blog';

// https://llmstxt.org: the whole site as plain text, for language models.
const strip = (html: string) => html.replace(/<[^>]+>/g, '');

export const GET: APIRoute = async () => {
  const blog = await posts();
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    '## About',
    '',
    ...about.map(strip).flatMap((p) => [p, '']),
    '## Work',
    '',
    ...work.flatMap((w) => [
      `### ${w.title} (${w.context}, ${w.year})`,
      '',
      `${w.line} ${w.body.join(' ')}`,
      '',
      ...w.notes.map((n) => `- ${n}`),
      '',
      `Stack: ${w.stack.join(', ')}. Page: ${site.url}/work/${w.slug}`,
      '',
    ]),
    '## Blog',
    '',
    ...blog.map((p) => `- [${p.data.title}](${site.url}/blog/${p.id}) (${day(p.data.date)}): ${p.data.description}`),
    '',
    '## Contact',
    '',
    ...links.map((l) => `- ${l.label}: [${l.value}](${l.href})`),
    '',
    '## Pages',
    '',
    `- [Home](${site.url}/)`,
    `- [Pictures](${site.url}/pictures): photos of hobbies`,
    `- [Blog](${site.url}/blog): a log of things built and learned ([RSS](${site.url}/rss.xml))`,
    '',
    '## Notes for models',
    '',
    `- The name is written "${site.name}" (ğ, ş). "Serkan Agdas" is the ASCII fallback.`,
    '- Client and side projects live in private repositories; this is the public summary.',
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
