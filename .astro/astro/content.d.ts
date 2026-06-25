declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"events": {
"chinese-new-year-lion-dance-hong-kong-zh.md": {
	id: "chinese-new-year-lion-dance-hong-kong-zh.md";
  slug: "chinese-new-year-lion-dance-hong-kong-zh";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"chinese-new-year-lion-dance-hong-kong.md": {
	id: "chinese-new-year-lion-dance-hong-kong.md";
  slug: "chinese-new-year-lion-dance-hong-kong";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"dragon-boat-festival-traditions-liziqi.md": {
	id: "dragon-boat-festival-traditions-liziqi.md";
  slug: "dragon-boat-festival-traditions-liziqi";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"dragon-boat-races-ancient-china-zh.md": {
	id: "dragon-boat-races-ancient-china-zh.md";
  slug: "dragon-boat-races-ancient-china-zh";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"dragon-boat-races-ancient-china.md": {
	id: "dragon-boat-races-ancient-china.md";
  slug: "dragon-boat-races-ancient-china";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"nien-legend-spring-festival-zh.md": {
	id: "nien-legend-spring-festival-zh.md";
  slug: "nien-legend-spring-festival-zh";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"nien-legend-spring-festival.md": {
	id: "nien-legend-spring-festival.md";
  slug: "nien-legend-spring-festival";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"spring-festival-traditions-zh.md": {
	id: "spring-festival-traditions-zh.md";
  slug: "spring-festival-traditions-zh";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"spring-festival-traditions.md": {
	id: "spring-festival-traditions.md";
  slug: "spring-festival-traditions";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};
"festivals": {
"dragon-boat-festival-zh.md": {
	id: "dragon-boat-festival-zh.md";
  slug: "dragon-boat-festival-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"dragon-boat-festival.md": {
	id: "dragon-boat-festival.md";
  slug: "dragon-boat-festival";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"lantern-festival-zh.md": {
	id: "lantern-festival-zh.md";
  slug: "lantern-festival-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"lantern-festival.md": {
	id: "lantern-festival.md";
  slug: "lantern-festival";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"mid-autumn-festival-zh.md": {
	id: "mid-autumn-festival-zh.md";
  slug: "mid-autumn-festival-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"mid-autumn-festival.md": {
	id: "mid-autumn-festival.md";
  slug: "mid-autumn-festival";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
};
"food": {
"art-chinese-dumplings-zh.md": {
	id: "art-chinese-dumplings-zh.md";
  slug: "art-chinese-dumplings-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"art-chinese-dumplings.md": {
	id: "art-chinese-dumplings.md";
  slug: "art-chinese-dumplings";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"gong-fu-tea-ceremony-zh.md": {
	id: "gong-fu-tea-ceremony-zh.md";
  slug: "gong-fu-tea-ceremony-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"gong-fu-tea-ceremony.md": {
	id: "gong-fu-tea-ceremony.md";
  slug: "gong-fu-tea-ceremony";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"sichuan-spice-story-zh.md": {
	id: "sichuan-spice-story-zh.md";
  slug: "sichuan-spice-story-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"sichuan-spice-story.md": {
	id: "sichuan-spice-story.md";
  slug: "sichuan-spice-story";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
};
"games": {
"black-myth-wukong-zh.md": {
	id: "black-myth-wukong-zh.md";
  slug: "black-myth-wukong-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"black-myth-wukong.md": {
	id: "black-myth-wukong.md";
  slug: "black-myth-wukong";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"where-winds-meet-zh.md": {
	id: "where-winds-meet-zh.md";
  slug: "where-winds-meet-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"where-winds-meet.md": {
	id: "where-winds-meet.md";
  slug: "where-winds-meet";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
};
"music": {
"big-fish-erhu-zh.md": {
	id: "big-fish-erhu-zh.md";
  slug: "big-fish-erhu-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"big-fish-erhu.md": {
	id: "big-fish-erhu.md";
  slug: "big-fish-erhu";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"buran-guqin-zh.md": {
	id: "buran-guqin-zh.md";
  slug: "buran-guqin-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"buran-guqin.md": {
	id: "buran-guqin.md";
  slug: "buran-guqin";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"dangchao-guzheng-zh.md": {
	id: "dangchao-guzheng-zh.md";
  slug: "dangchao-guzheng-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"dangchao-guzheng.md": {
	id: "dangchao-guzheng.md";
  slug: "dangchao-guzheng";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"inuyasha-erhu-zh.md": {
	id: "inuyasha-erhu-zh.md";
  slug: "inuyasha-erhu-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"inuyasha-erhu.md": {
	id: "inuyasha-erhu.md";
  slug: "inuyasha-erhu";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"lemon-tree-guzheng-cello-zh.md": {
	id: "lemon-tree-guzheng-cello-zh.md";
  slug: "lemon-tree-guzheng-cello-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"lemon-tree-guzheng-cello.md": {
	id: "lemon-tree-guzheng-cello.md";
  slug: "lemon-tree-guzheng-cello";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"quan-yu-tianxia-zh.md": {
	id: "quan-yu-tianxia-zh.md";
  slug: "quan-yu-tianxia-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"quan-yu-tianxia.md": {
	id: "quan-yu-tianxia.md";
  slug: "quan-yu-tianxia";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"shanghai-bund-live-zh.md": {
	id: "shanghai-bund-live-zh.md";
  slug: "shanghai-bund-live-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"shanghai-bund-live.md": {
	id: "shanghai-bund-live.md";
  slug: "shanghai-bund-live";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"sound-of-silence-folk-zh.md": {
	id: "sound-of-silence-folk-zh.md";
  slug: "sound-of-silence-folk-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"sound-of-silence-folk.md": {
	id: "sound-of-silence-folk.md";
  slug: "sound-of-silence-folk";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
};
"travel": {
"forbidden-city-beijing-zh.md": {
	id: "forbidden-city-beijing-zh.md";
  slug: "forbidden-city-beijing-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"forbidden-city-beijing.md": {
	id: "forbidden-city-beijing.md";
  slug: "forbidden-city-beijing";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"secrets-great-wall-zh.md": {
	id: "secrets-great-wall-zh.md";
  slug: "secrets-great-wall-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"secrets-great-wall.md": {
	id: "secrets-great-wall.md";
  slug: "secrets-great-wall";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"zhangjiajie-avatar-mountains-zh.md": {
	id: "zhangjiajie-avatar-mountains-zh.md";
  slug: "zhangjiajie-avatar-mountains-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"zhangjiajie-avatar-mountains.md": {
	id: "zhangjiajie-avatar-mountains.md";
  slug: "zhangjiajie-avatar-mountains";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
