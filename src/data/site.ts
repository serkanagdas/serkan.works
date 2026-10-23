// Single source of truth for the copy. The pages, llms.txt and the
// sitemap all read from here, so edit once and everything stays in sync.

export const site = {
  name: 'Serkan Ağdaş',
  domain: 'serkan.works',
  url: 'https://serkan.works',
  location: 'İstanbul',
  timezone: 'Europe/Istanbul',
  role: 'Software engineer',
  tagline:
    'Software engineer in İstanbul. I write the code, set up the machines it runs on, and lately teach agents to take the night shift.',
  description:
    'Serkan Ağdaş — software engineer in İstanbul working on applied AI and full-stack development. Agentic prospecting infrastructure at E Dijital Bilişim Hizmetleri.',
};

export const about = [
  'Software engineer based in İstanbul, currently building agentic AI-based prospecting infrastructure at <a href="https://edoor.com.tr" rel="noopener">E Dijital Bilişim Hizmetleri</a>.',
  'Lately, I’ve been focused on applied AI and full-stack development. Most of my projects start the same way: something around me is slow, manual or noisy, and I can’t leave it alone. The fix usually takes a bit of code, a bit of hardware and, more and more, an agent that keeps at it after I’ve logged off.',
  'Off the clock, I’m into video games, cycling, kickboxing and Lego. The <a href="/pictures">pictures page</a> has some of the better photos of my hobbies. Feel free to check them out.',
];

export const now = [
  'Building prospecting agents at E Dijital.',
  'Wiring CI and deploys into the office server.',
  'Kickboxing on Mondays and Wednesdays.',
];

export type Work = {
  title: string;
  context: string;
  line: string;
  body: string;
  stack: string[];
};

export const work: Work[] = [
  {
    title: 'Prospecting infrastructure',
    context: 'E Dijital · now',
    line: 'Agents for the slowest part of sales.',
    body: 'Agentic systems that find the right companies, read up on them and hand people a head start instead of a blank spreadsheet. Most of my working hours go here right now.',
    stack: ['agents', 'llms', 'full-stack'],
  },
  {
    title: 'Pitchdeck',
    context: 'side project',
    line: 'Booking software for five-a-side football pitches.',
    body: 'Started as a favour for someone who had just taken over a pitch and was still taking bookings over WhatsApp. It grew into a multi-tenant product: double-booking is ruled out by the database itself, plus a CRM, a cash ledger, roles, an MCP server and an assistant that flags regulars who stopped showing up. 761 tests. Most of the code was written by agents working through issues; I wrote the plans and reviewed every merge.',
    stack: ['next.js', 'typescript', 'drizzle', 'postgres', 'better-auth', 'mcp'],
  },
  {
    title: 'Eser Tarama',
    context: 'client work',
    line: 'A digitisation line for rare manuscripts.',
    body: 'Scans arrive from several sites over connections nobody would call reliable, so uploads are chunked, checksummed and resumable. Reviewers accept or reject page by page, every action lands in an append-only log, and approved batches leave with a sha256 manifest. Shipped as v1 with a full three-person run-through tested end to end.',
    stack: ['laravel', 'postgres', 'blade', 'tailwind', 'queues'],
  },
  {
    title: 'E-DOOR',
    context: 'client work',
    line: 'Archive and conservation management for a manuscript institution.',
    body: 'Modules for conservation tracking, staffing and HR, and training programmes on a large, server-rendered PHP system used by libraries across Türkiye. Much of the job is making careful changes in places where one wrong line reaches every library at once.',
    stack: ['php', 'postgres', 'jquery', 'tailwind'],
  },
  {
    title: 'ajana-gönder',
    context: 'internal tool',
    line: 'Put a label on an issue, walk away.',
    body: 'Tag a Linear issue and a coordinator agent picks it up within the hour, hands it to a coding agent that opens a branch and a pull request, never main, and reports back in Turkish. A Telegram digest goes out every fifteen minutes so nobody has to go looking.',
    stack: ['hermes', 'openhands', 'linear', 'telegram'],
  },
  {
    title: 'The rack',
    context: 'infra',
    line: 'Office server, home server, and a laptop that never sleeps.',
    body: 'An office server split by blast radius: what is public, what is private, and where the agents are allowed to misbehave. GitLab, a model gateway and the coding agents live behind Tailscale with nothing exposed that does not need to be. At home, a retired 2014 laptop runs the coordinator agent around the clock.',
    stack: ['docker', 'proxmox', 'tailscale', 'gitlab', 'litellm'],
  },
];

export const smaller = [
  'Debloated a 2 GB Mi Box over ADB. 28 packages off, every one reversible, RAM measured before and after.',
  'A teardown of a legacy WebForms attendance system, written up as a blueprint for rebuilding it properly.',
  'A bilingual company site in Astro, plus a Remotion pipeline that renders the product videos.',
  'Dedicated game servers, whenever friends want to play something that needs one.',
];

export const links = [
  { label: 'email', value: 'hello@serkan.works', href: 'mailto:hello@serkan.works' },
  { label: 'github', value: 'serkanagdas', href: 'https://github.com/serkanagdas' },
  { label: 'linkedin', value: 'in/serkanagdas', href: 'https://www.linkedin.com/in/serkanagdas' },
  { label: 'instagram', value: 'sekoinx', href: 'https://www.instagram.com/sekoinx' },
];
