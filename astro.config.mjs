import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://serkan.works',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
