import { defineCollection, z } from 'astro:content';

const contentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  youtubeId: z.string().optional(),
  coverImage: z.string().optional(),
  channel: z.string(),
  duration: z.string().optional(),
  publishedAt: z.date(),
  lang: z.enum(['en', 'zh']).default('en'),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  affiliate: z.array(z.object({
    title: z.string(),
    asin: z.string().optional(),
    url: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.string().optional(),
  })).default([]),
});

const events = defineCollection({ type: 'content', schema: contentSchema });
const games = defineCollection({ type: 'content', schema: contentSchema });
const music = defineCollection({ type: 'content', schema: contentSchema });
const travel = defineCollection({ type: 'content', schema: contentSchema });
const festivals = defineCollection({ type: 'content', schema: contentSchema });
const food = defineCollection({ type: 'content', schema: contentSchema });

export const collections = { events, games, music, travel, festivals, food };
