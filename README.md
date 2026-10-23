# serkan.works

Personal site. Astro, hand-written CSS, no UI framework.

```
npm install
npm run dev      # localhost:4321
npm run build    # static output in dist/
```

## Where things live

- `src/data/site.ts`: all copy (about, now, work, links). The home page, `/llms.txt` and the sitemap read from here.
- `src/data/pictures.ts`: the pictures page. Put photos in `public/pictures/` and add a `src` to an entry;
  it gets converted to ASCII in the browser and develops into the photo on hover or tap.
- `src/components/AsciiHero.astro`: the ASCII sea and the glass lens (circuit board underneath).
  Real refraction is Chromium-only (SVG `backdrop-filter`); other browsers get a clear lens over the same board.
- `src/components/Footer.astro`: the block-letter wordmark; the letters live in `src/lib/wordmark.ts`.
- `public/robots.txt`, `public/humans.txt`, `src/pages/llms.txt.ts`, `src/pages/sitemap.xml.ts`: for crawlers and models.
