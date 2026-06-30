import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://www.huaxiaink.com',
  compressHTML: true,
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer', 'nofollow'] }],
    ],
  },
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en-US', zh: 'zh-CN' },
    },
  })],
  build: {
    format: 'directory',
  },
});
