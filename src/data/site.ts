// All of the site's words live here. Pages, /llms.txt and the sitemap read from this file.

export const site = {
  name: 'Serkan Ağdaş',
  domain: 'serkan.works',
  url: 'https://serkan.works',
  location: 'İstanbul',
  role: 'Software engineer',
  description:
    'Serkan Ağdaş is a software engineer in İstanbul working on applied AI and full-stack development, currently building agentic prospecting infrastructure at E Dijital Bilişim Hizmetleri.',
};

export const about = [
  'Software engineer based in İstanbul, currently building agentic AI-based prospecting infrastructure at <a href="https://edoor.com.tr">E Dijital Bilişim Hizmetleri</a>.',
  'Lately, I’ve been focused on applied AI and full-stack development. I tend to think most problems are unfinished projects: give them a weekend, a bit of code and sometimes a screwdriver, and they come around. More and more, the last piece is an agent that keeps going after I’ve logged off.',
  'Off the clock, I’m into video games, cycling, kickboxing and Lego. The <a href="/pictures">pictures page</a> has some of the better photos of my hobbies. Feel free to check them out.',
];

export type Work = {
  slug: string;
  title: string;
  context: string;
  year: string;
  line: string;
  body: string[];
  notes: string[];
  stack: string[];
};

export const work: Work[] = [
  {
    slug: 'prospecting',
    title: 'Prospecting',
    context: 'E Dijital',
    year: 'now',
    line: 'Agents for the slowest part of sales.',
    body: [
      'Before anyone sells anything, someone has to find the right companies and learn enough about them to start a good conversation. It is slow, careful work, and it is exactly the kind of work agents are getting good at.',
      'I’m building the infrastructure that lets them do it well: finding, reading, qualifying, and handing people a head start instead of a blank spreadsheet.',
    ],
    notes: ['Agentic pipelines from search to a qualified lead.', 'Built to be checked by people, not to replace them.'],
    stack: ['Agents', 'LLMs', 'Full-stack'],
  },
  {
    slug: 'pitchdeck',
    title: 'Pitchdeck',
    context: 'Side project',
    year: '2026',
    line: 'Booking software for five-a-side football pitches.',
    body: [
      'It started as a favour for someone who had just taken over a pitch and was still taking bookings over WhatsApp. It grew into a proper multi-tenant product, the kind a second and third pitch could sign up for tomorrow.',
      'Most of the code was written by agents working through issues. I wrote the plans, set the rules and reviewed every merge.',
    ],
    notes: [
      'Double-booking isn’t unlikely, it’s impossible: the database itself refuses overlapping slots.',
      'Every write carries its tenant, every read is scoped to it.',
      'A CRM, a cash ledger, roles, recurring slots and a three-step booking flow.',
      'An MCP server and an assistant that notices regulars who stopped showing up.',
      'Ten phases, 761 tests green at the end.',
    ],
    stack: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL', 'Better Auth', 'MCP'],
  },
  {
    slug: 'eser-tarama',
    title: 'Eser Tarama',
    context: 'Client work',
    year: '2026',
    line: 'A digitisation line for rare manuscripts.',
    body: [
      'Old books are scanned in several places, page by page, and every page matters. The software’s job is to make sure none of them get lost on the way to the archive.',
      'Uploads survive bad connections, reviewers judge each page on its own, and every step leaves a trace someone can check years later.',
    ],
    notes: [
      'Chunked uploads that resume where they stopped; a damaged piece is simply sent again.',
      'Page-level review, so one bad page never holds back a whole volume.',
      'An append-only log of every decision.',
      'Approved batches leave with a sha256 manifest.',
    ],
    stack: ['Laravel', 'PostgreSQL', 'Blade', 'Tailwind'],
  },
  {
    slug: 'e-door',
    title: 'E-DOOR',
    context: 'Client work',
    year: '2026',
    line: 'Archive and conservation management for manuscript libraries.',
    body: [
      'A large, long-lived system that libraries across Türkiye use every day to track their collections, restoration work and staff.',
      'I build new modules and improve old ones, in a codebase where a careful change reaches every library at once. That is the fun part.',
    ],
    notes: [
      'Conservation dashboards where each library sees its own work.',
      'A staffing and HR module, built while the schema was still taking shape.',
      'Training and events modules for the institution’s programmes.',
    ],
    stack: ['PHP', 'PostgreSQL', 'jQuery', 'Tailwind'],
  },
  {
    slug: 'ajana-gonder',
    title: 'ajana-gönder',
    context: 'Internal tool',
    year: '2026',
    line: 'Put a label on an issue, then go have lunch.',
    body: [
      'The name means “send it to the agent”. Anyone on the team can tag an issue, and the work starts without anyone opening a terminal.',
      'A coordinator agent picks it up within the hour, a coding agent does the work on its own branch, and a report comes back in Turkish, written for the person who asked.',
    ],
    notes: [
      'Issue to branch to pull request, never straight to main.',
      'Reports land on the issue, in plain Turkish.',
      'A short Telegram digest every fifteen minutes.',
    ],
    stack: ['Hermes', 'OpenHands', 'Linear', 'Telegram'],
  },
  {
    slug: 'the-rack',
    title: 'The rack',
    context: 'Infrastructure',
    year: '2026',
    line: 'An office server, a home server and a laptop that never sleeps.',
    body: [
      'Everything above runs somewhere, and I like knowing exactly where. The office server is split by how far trouble could spread: what is public, what is private, and where the agents are free to experiment.',
      'At home, a 2014 laptop that was about to be retired now runs the coordinator agent around the clock. It seems happier for it.',
    ],
    notes: [
      'Public, private and agent zones, each with its own walls.',
      'Source code and business data reachable only over Tailscale.',
      'Git hosting, a model gateway and coding agents, all self-hosted.',
    ],
    stack: ['Docker', 'Proxmox', 'Tailscale', 'GitLab', 'LiteLLM'],
  },
];

export const links = [
  { label: 'Email', value: 'hello@serkan.works', href: 'mailto:hello@serkan.works' },
  { label: 'GitHub', value: 'serkanagdas', href: 'https://github.com/serkanagdas' },
  { label: 'LinkedIn', value: 'serkanagdas', href: 'https://www.linkedin.com/in/serkanagdas' },
  { label: 'Instagram', value: 'sekoinx', href: 'https://www.instagram.com/sekoinx' },
];
