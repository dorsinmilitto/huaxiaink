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
"dragon-boat-festival-traditions-liziqi-zh.md": {
	id: "dragon-boat-festival-traditions-liziqi-zh.md";
  slug: "dragon-boat-festival-traditions-liziqi-zh";
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
"europe-heatwave-chinese-cooling-zh.md": {
	id: "europe-heatwave-chinese-cooling-zh.md";
  slug: "europe-heatwave-chinese-cooling-zh";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"europe-heatwave-chinese-cooling.md": {
	id: "europe-heatwave-chinese-cooling.md";
  slug: "europe-heatwave-chinese-cooling";
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
"saturation-rescue-china-earthquake-zh.md": {
	id: "saturation-rescue-china-earthquake-zh.md";
  slug: "saturation-rescue-china-earthquake-zh";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"saturation-rescue-china-earthquake.md": {
	id: "saturation-rescue-china-earthquake.md";
  slug: "saturation-rescue-china-earthquake";
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
"chongyang-double-ninth-zh.md": {
	id: "chongyang-double-ninth-zh.md";
  slug: "chongyang-double-ninth-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"chongyang-double-ninth.md": {
	id: "chongyang-double-ninth.md";
  slug: "chongyang-double-ninth";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
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
"ghost-festival-zhongyuan-zh.md": {
	id: "ghost-festival-zhongyuan-zh.md";
  slug: "ghost-festival-zhongyuan-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"ghost-festival-zhongyuan.md": {
	id: "ghost-festival-zhongyuan.md";
  slug: "ghost-festival-zhongyuan";
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
"qingming-tomb-sweeping-zh.md": {
	id: "qingming-tomb-sweeping-zh.md";
  slug: "qingming-tomb-sweeping-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"qingming-tomb-sweeping.md": {
	id: "qingming-tomb-sweeping.md";
  slug: "qingming-tomb-sweeping";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"qixi-chinese-valentine-zh.md": {
	id: "qixi-chinese-valentine-zh.md";
  slug: "qixi-chinese-valentine-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"qixi-chinese-valentine.md": {
	id: "qixi-chinese-valentine.md";
  slug: "qixi-chinese-valentine";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"twenty-four-solar-terms-zh.md": {
	id: "twenty-four-solar-terms-zh.md";
  slug: "twenty-four-solar-terms-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"twenty-four-solar-terms.md": {
	id: "twenty-four-solar-terms.md";
  slug: "twenty-four-solar-terms";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"winter-solstice-dongzhi-zh.md": {
	id: "winter-solstice-dongzhi-zh.md";
  slug: "winter-solstice-dongzhi-zh";
  body: string;
  collection: "festivals";
  data: InferEntrySchema<"festivals">
} & { render(): Render[".md"] };
"winter-solstice-dongzhi.md": {
	id: "winter-solstice-dongzhi.md";
  slug: "winter-solstice-dongzhi";
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
"chinese-bbq-chuanr-zh.md": {
	id: "chinese-bbq-chuanr-zh.md";
  slug: "chinese-bbq-chuanr-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"chinese-bbq-chuanr.md": {
	id: "chinese-bbq-chuanr.md";
  slug: "chinese-bbq-chuanr";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"chinese-hot-pot-communal-zh.md": {
	id: "chinese-hot-pot-communal-zh.md";
  slug: "chinese-hot-pot-communal-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"chinese-hot-pot-communal.md": {
	id: "chinese-hot-pot-communal.md";
  slug: "chinese-hot-pot-communal";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"chongqing-hotpot-spicy-soul-zh.md": {
	id: "chongqing-hotpot-spicy-soul-zh.md";
  slug: "chongqing-hotpot-spicy-soul-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"chongqing-hotpot-spicy-soul.md": {
	id: "chongqing-hotpot-spicy-soul.md";
  slug: "chongqing-hotpot-spicy-soul";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"dim-sum-morning-tea-zh.md": {
	id: "dim-sum-morning-tea-zh.md";
  slug: "dim-sum-morning-tea-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"dim-sum-morning-tea.md": {
	id: "dim-sum-morning-tea.md";
  slug: "dim-sum-morning-tea";
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
"hand-pulled-noodles-lamian-zh.md": {
	id: "hand-pulled-noodles-lamian-zh.md";
  slug: "hand-pulled-noodles-lamian-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"hand-pulled-noodles-lamian.md": {
	id: "hand-pulled-noodles-lamian.md";
  slug: "hand-pulled-noodles-lamian";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"mapo-tofu-history-zh.md": {
	id: "mapo-tofu-history-zh.md";
  slug: "mapo-tofu-history-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"mapo-tofu-history.md": {
	id: "mapo-tofu-history.md";
  slug: "mapo-tofu-history";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"peking-duck-imperial-cuisine-zh.md": {
	id: "peking-duck-imperial-cuisine-zh.md";
  slug: "peking-duck-imperial-cuisine-zh";
  body: string;
  collection: "food";
  data: InferEntrySchema<"food">
} & { render(): Render[".md"] };
"peking-duck-imperial-cuisine.md": {
	id: "peking-duck-imperial-cuisine.md";
  slug: "peking-duck-imperial-cuisine";
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
"chinese-mahjong-culture-zh.md": {
	id: "chinese-mahjong-culture-zh.md";
  slug: "chinese-mahjong-culture-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chinese-mahjong-culture.md": {
	id: "chinese-mahjong-culture.md";
  slug: "chinese-mahjong-culture";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chinese-shadow-puppetry-piying-zh.md": {
	id: "chinese-shadow-puppetry-piying-zh.md";
  slug: "chinese-shadow-puppetry-piying-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chinese-shadow-puppetry-piying.md": {
	id: "chinese-shadow-puppetry-piying.md";
  slug: "chinese-shadow-puppetry-piying";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"jianzi-shuttlecock-kicking-zh.md": {
	id: "jianzi-shuttlecock-kicking-zh.md";
  slug: "jianzi-shuttlecock-kicking-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"jianzi-shuttlecock-kicking.md": {
	id: "jianzi-shuttlecock-kicking.md";
  slug: "jianzi-shuttlecock-kicking";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tangram-seven-boards-zh.md": {
	id: "tangram-seven-boards-zh.md";
  slug: "tangram-seven-boards-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tangram-seven-boards.md": {
	id: "tangram-seven-boards.md";
  slug: "tangram-seven-boards";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"weiqi-ancient-game-of-go-zh.md": {
	id: "weiqi-ancient-game-of-go-zh.md";
  slug: "weiqi-ancient-game-of-go-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"weiqi-ancient-game-of-go.md": {
	id: "weiqi-ancient-game-of-go.md";
  slug: "weiqi-ancient-game-of-go";
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
"xiangqi-chinese-chess-zh.md": {
	id: "xiangqi-chinese-chess-zh.md";
  slug: "xiangqi-chinese-chess-zh";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"xiangqi-chinese-chess.md": {
	id: "xiangqi-chinese-chess.md";
  slug: "xiangqi-chinese-chess";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
};
"kung-fu": {
"chinese-kung-fu-films-zh.md": {
	id: "chinese-kung-fu-films-zh.md";
  slug: "chinese-kung-fu-films-zh";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"chinese-kung-fu-films.md": {
	id: "chinese-kung-fu-films.md";
  slug: "chinese-kung-fu-films";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"shaolin-temple-birth-of-kung-fu-zh.md": {
	id: "shaolin-temple-birth-of-kung-fu-zh.md";
  slug: "shaolin-temple-birth-of-kung-fu-zh";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"shaolin-temple-birth-of-kung-fu.md": {
	id: "shaolin-temple-birth-of-kung-fu.md";
  slug: "shaolin-temple-birth-of-kung-fu";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"shaolin-vs-wudang-zh.md": {
	id: "shaolin-vs-wudang-zh.md";
  slug: "shaolin-vs-wudang-zh";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"shaolin-vs-wudang.md": {
	id: "shaolin-vs-wudang.md";
  slug: "shaolin-vs-wudang";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"tai-chi-philosophy-movement-zh.md": {
	id: "tai-chi-philosophy-movement-zh.md";
  slug: "tai-chi-philosophy-movement-zh";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"tai-chi-philosophy-movement.md": {
	id: "tai-chi-philosophy-movement.md";
  slug: "tai-chi-philosophy-movement";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"wing-chun-wooden-dummy-zh.md": {
	id: "wing-chun-wooden-dummy-zh.md";
  slug: "wing-chun-wooden-dummy-zh";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"wing-chun-wooden-dummy.md": {
	id: "wing-chun-wooden-dummy.md";
  slug: "wing-chun-wooden-dummy";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"wudang-mountain-sword-zh.md": {
	id: "wudang-mountain-sword-zh.md";
  slug: "wudang-mountain-sword-zh";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
} & { render(): Render[".md"] };
"wudang-mountain-sword.md": {
	id: "wudang-mountain-sword.md";
  slug: "wudang-mountain-sword";
  body: string;
  collection: "kung-fu";
  data: InferEntrySchema<"kung-fu">
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
"chinese-drum-heartbeat-zh.md": {
	id: "chinese-drum-heartbeat-zh.md";
  slug: "chinese-drum-heartbeat-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"chinese-drum-heartbeat.md": {
	id: "chinese-drum-heartbeat.md";
  slug: "chinese-drum-heartbeat";
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
"dizi-bamboo-flute-zh.md": {
	id: "dizi-bamboo-flute-zh.md";
  slug: "dizi-bamboo-flute-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"dizi-bamboo-flute.md": {
	id: "dizi-bamboo-flute.md";
  slug: "dizi-bamboo-flute";
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
"kunqu-opera-peony-pavilion-zh.md": {
	id: "kunqu-opera-peony-pavilion-zh.md";
  slug: "kunqu-opera-peony-pavilion-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"kunqu-opera-peony-pavilion.md": {
	id: "kunqu-opera-peony-pavilion.md";
  slug: "kunqu-opera-peony-pavilion";
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
"peking-opera-face-of-china-zh.md": {
	id: "peking-opera-face-of-china-zh.md";
  slug: "peking-opera-face-of-china-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"peking-opera-face-of-china.md": {
	id: "peking-opera-face-of-china.md";
  slug: "peking-opera-face-of-china";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"pipa-chinese-lute-zh.md": {
	id: "pipa-chinese-lute-zh.md";
  slug: "pipa-chinese-lute-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"pipa-chinese-lute.md": {
	id: "pipa-chinese-lute.md";
  slug: "pipa-chinese-lute";
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
"suona-chinese-trumpet-zh.md": {
	id: "suona-chinese-trumpet-zh.md";
  slug: "suona-chinese-trumpet-zh";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
"suona-chinese-trumpet.md": {
	id: "suona-chinese-trumpet.md";
  slug: "suona-chinese-trumpet";
  body: string;
  collection: "music";
  data: InferEntrySchema<"music">
} & { render(): Render[".md"] };
};
"travel": {
"chongqing-8d-mountain-city-zh.md": {
	id: "chongqing-8d-mountain-city-zh.md";
  slug: "chongqing-8d-mountain-city-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"chongqing-8d-mountain-city.md": {
	id: "chongqing-8d-mountain-city.md";
  slug: "chongqing-8d-mountain-city";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
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
"fujian-tulou-earth-building-zh.md": {
	id: "fujian-tulou-earth-building-zh.md";
  slug: "fujian-tulou-earth-building-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"fujian-tulou-earth-building.md": {
	id: "fujian-tulou-earth-building.md";
  slug: "fujian-tulou-earth-building";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"hanging-temple-xuankong-si-zh.md": {
	id: "hanging-temple-xuankong-si-zh.md";
  slug: "hanging-temple-xuankong-si-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"hanging-temple-xuankong-si.md": {
	id: "hanging-temple-xuankong-si.md";
  slug: "hanging-temple-xuankong-si";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"li-river-guilin-karst-zh.md": {
	id: "li-river-guilin-karst-zh.md";
  slug: "li-river-guilin-karst-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"li-river-guilin-karst.md": {
	id: "li-river-guilin-karst.md";
  slug: "li-river-guilin-karst";
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
"suzhou-classical-gardens-zh.md": {
	id: "suzhou-classical-gardens-zh.md";
  slug: "suzhou-classical-gardens-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"suzhou-classical-gardens.md": {
	id: "suzhou-classical-gardens.md";
  slug: "suzhou-classical-gardens";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"terracotta-warriors-xian-zh.md": {
	id: "terracotta-warriors-xian-zh.md";
  slug: "terracotta-warriors-xian-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"terracotta-warriors-xian.md": {
	id: "terracotta-warriors-xian.md";
  slug: "terracotta-warriors-xian";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"three-gorges-yangtze-river-zh.md": {
	id: "three-gorges-yangtze-river-zh.md";
  slug: "three-gorges-yangtze-river-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"three-gorges-yangtze-river.md": {
	id: "three-gorges-yangtze-river.md";
  slug: "three-gorges-yangtze-river";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"yellow-mountain-huangshan-zh.md": {
	id: "yellow-mountain-huangshan-zh.md";
  slug: "yellow-mountain-huangshan-zh";
  body: string;
  collection: "travel";
  data: InferEntrySchema<"travel">
} & { render(): Render[".md"] };
"yellow-mountain-huangshan.md": {
	id: "yellow-mountain-huangshan.md";
  slug: "yellow-mountain-huangshan";
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
