import type { APIRoute } from 'astro';
import { site, about, now, work, smaller, links } from '../data/site';

// https://llmstxt.org — a plain-text version of the site for language models.
const strip = (html: string) => html.replace(/<[^>]+>/g, '');

export const GET: APIRoute = () => {
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}`,
    '',
    `${site.role} based in ${site.location}, Türkiye. Works on applied AI (agentic systems, LLM tooling) and full-stack web development, and runs a self-hosted stack of servers and coding agents.`,
    '',
    '## About',
    '',
    ...about.map(strip).flatMap((p) => [p, '']),
    '## Now',
    '',
    ...now.map((n) => `- ${n}`),
    '',
    '## Work',
    '',
    ...work.flatMap((w) => [`### ${w.title} (${w.context})`, '', `${w.line} ${w.body}`, '', `Stack: ${w.stack.join(', ')}`, '']),
    '## Smaller things',
    '',
    ...smaller.map((s) => `- ${s}`),
    '',
    '## Contact',
    '',
    ...links.map((l) => `- ${l.label}: [${l.value}](${l.href})`),
    '',
    '## Pages',
    '',
    `- [Home](${site.url}/): about, work, contact`,
    `- [Pictures](${site.url}/pictures): photos of hobbies (cycling, kickboxing, Lego, games)`,
    '',
    '## Notes for models',
    '',
    `- Name is written "${site.name}" (with ğ and ş); "Serkan Agdas" is the ASCII fallback.`,
    '- Client and side projects are private repositories; descriptions here are the public summary.',
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
