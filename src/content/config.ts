import { defineCollection, z } from 'astro:content';

const videoSchema = z.object({
  title: z.string(),
  youtubeId: z.string(),
  channel: z.string(),
  duration: z.string(),
  publishedAt: z.date(),
  lang: z.enum(['en', 'zh']).default('en'),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  affiliate: z.array(z.object({
    title: z.string(),
    asin: z.string().optional(),
    url: z.string().optional(),
  })).default([]),
});

const events = defineCollection({ type: 'content', schema: videoSchema });
const games = defineCollection({ type: 'content', schema: videoSchema });
const music = defineCollection({ type: 'content', schema: videoSchema });
const travel = defineCollection({ type: 'content', schema: videoSchema });
const festivals = defineCollection({ type: 'content', schema: videoSchema });
const food = defineCollection({ type: 'content', schema: videoSchema });

export const collections = { events, games, music, travel, festivals, food };
