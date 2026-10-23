# serkan.works

Personal site. Astro, hand-written CSS.

This branch (`alt/plaintext`) is the plain-text direction: one column, system fonts, greys on white, a blog, and pages that slide in and out with Astro view transitions.

```
npm install
npm run dev      # localhost:4321
npm run build    # static output in dist/
```

## Where things live

- `src/data/site.ts`: all copy (about, work, links). The home page, `/llms.txt` and the sitemap read from here.
- `src/data/pictures.ts`: the pictures page. Put photos in `public/pictures/` and add `src` to an entry.
- `src/content/blog/*.md`: blog posts. Add a Markdown file with `title`, `description`, `date`, `tag` (`notes`, `hardware` or `software`) and optionally `draft: true`. The file name is the URL. `/rss.xml` is generated from them.
- `src/pages/work/[slug].astro`: one page per project, generated from `work` in `site.ts`.
- `public/robots.txt`, `src/pages/llms.txt.ts`, `src/pages/sitemap.xml.ts`: for crawlers and language models.

Design directions live on separate branches: `main` (horizon-ascii + blog), `alt/ascii-sea` (ASCII + liquid glass), `alt/plein-air`, `alt/horizon`, `alt/horizon-ascii` (horizon with animated ASCII scenes, see `src/lib/scenes/`), `alt/figure`.
