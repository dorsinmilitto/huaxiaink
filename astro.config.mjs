import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://huaxiaink.com',
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
