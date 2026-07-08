// Supported languages
export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

// Translation dictionaries
const translations = {
  en: {
    // Nav
    'nav.events': 'Events',
    'nav.games': 'Games',
    'nav.music': 'Music',
    'nav.travel': 'Travel',
    'nav.festivals': 'Festivals',
    'nav.food': 'Food',
    'nav.kung-fu': 'Kung Fu',

    // Hero
    'hero.title': 'Discover China Through Authentic Voices',
    'hero.tagline': 'Stories of Chinese culture, with context you won\'t find anywhere else',

    // Sections
    'section.featured': 'Featured',
    'section.latest': 'Latest Stories',
    'section.related': 'You May Also Like',
    'section.cultural_context': 'Cultural Context',
    'section.dive_deeper': 'Dive Deeper',
    'section.dive_deeper_desc': 'Explore related products handpicked for this topic:',
    'section.affiliate_disclosure': 'As an Amazon Associate, we earn from qualifying purchases.',
    'section.no_videos': 'No stories yet. Check back soon!',

    // Category headers
    'cat.events': 'Hot Events',
    'cat.events.desc': 'Viral trends, social phenomena, and cultural moments shaking China right now.',
    'cat.games': 'Games',
    'cat.games.desc': 'From Black Myth: Wukong to mobile esports — the Chinese gaming scene decoded.',
    'cat.music': 'Music',
    'cat.music.desc': 'Guzheng covers, C-pop hits, and the sounds of ancient instruments reborn.',
    'cat.travel': 'Travel',
    'cat.travel.desc': 'Breathtaking landscapes, hidden villages, and the real China off the tourist trail.',
    'cat.festivals': 'Festivals',
    'cat.festivals.desc': 'Spring Festival, Dragon Boat, Mid-Autumn — traditions explained and experienced.',
    'cat.food': 'Food',
    'cat.food.desc': 'Hotpot, dim sum, street snacks — the culinary soul of China.',
    'cat.kung-fu': 'Kung Fu',
    'cat.kung-fu.desc': 'Shaolin, Tai Chi, Wing Chun — the philosophy and power behind Chinese martial arts.',

    // Category seals
    'seal.events': '事',
    'seal.games': '游',
    'seal.music': '乐',
    'seal.travel': '行',
    'seal.festivals': '节',
    'seal.food': '食',
    'seal.kung-fu': '武',

    // Detail page
    'detail.source': 'Source:',
    'detail.video_analysis': 'Explore and learn about',
    'detail.on': 'on HuaxiaInk',

    // About
    'about.title': 'About',

    // Footer
    'footer.tagline': 'Discover China Through Authentic Voices',
    'footer.copy': 'All rights reserved.',

    // Language
    'lang.switch': '中文',

    // Breadcrumb
    'breadcrumb.home': 'Home',

    // Tag page
    'tag.title': 'Tag',
    'tag.desc': 'All stories tagged with',
    'tag.all': 'All Tags',
  },
  zh: {
    // Nav
    'nav.events': '热点',
    'nav.games': '游戏',
    'nav.music': '音乐',
    'nav.travel': '旅行',
    'nav.festivals': '节日',
    'nav.food': '美食',
    'nav.kung-fu': '功夫',

    // Hero
    'hero.title': '用当代视角，发现真实中国',
    'hero.tagline': '精选中国故事，附带你找不到的文化解读',

    // Sections
    'section.featured': '精选推荐',
    'section.latest': '最新发布',
    'section.related': '相关推荐',
    'section.cultural_context': '文化背景',
    'section.dive_deeper': '深入了解',
    'section.dive_deeper_desc': '为你精选的相关产品：',
    'section.affiliate_disclosure': '作为亚马逊联盟成员，我们通过符合条件的购买获得收益。',
    'section.no_videos': '暂无内容，敬请期待！',

    // Category headers
    'cat.events': '热点事件',
    'cat.events.desc': '刷屏中国的热门趋势、社会现象与文化时刻。',
    'cat.games': '游戏',
    'cat.games.desc': '从《黑神话：悟空》到移动电竞——解读中国游戏圈。',
    'cat.music': '音乐',
    'cat.music.desc': '古筝翻弹、国风摇滚、传统乐器的新生。',
    'cat.travel': '旅行',
    'cat.travel.desc': '壮美风光、隐世村落、旅游攻略外的真实中国。',
    'cat.festivals': '传统节日',
    'cat.festivals.desc': '春节、端午、中秋——传统节日的体验与解读。',
    'cat.food': '美食',
    'cat.food.desc': '火锅、早茶、街头小吃——中国人的味蕾地图。',
    'cat.kung-fu': '功夫',
    'cat.kung-fu.desc': '少林、太极、咏春——中国武术背后的哲学与力量。',

    // Category seals
    'seal.events': '事',
    'seal.games': '游',
    'seal.music': '乐',
    'seal.travel': '行',
    'seal.festivals': '节',
    'seal.food': '食',
    'seal.kung-fu': '武',

    // Detail page
    'detail.source': '来源：',
    'detail.video_analysis': '观看并了解',
    'detail.on': '来自华夏墨韵',

    // About
    'about.title': '关于',

    // Footer
    'footer.tagline': '用当代视角，发现真实中国',
    'footer.copy': '版权所有',

    // Language
    'lang.switch': 'EN',

    // Breadcrumb
    'breadcrumb.home': '首页',

    // Tag page
    'tag.title': '标签',
    'tag.desc': '所有标注了此标签的文章',
    'tag.all': '全部标签',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key] || key;
}

// Generate alternate language URL for the same page
export function getAlternateUrl(currentUrl: URL, targetLang: Lang): string {
  const pathname = currentUrl.pathname;
  const otherLang = targetLang;
  // Replace language prefix in path
  const newPath = pathname.replace(/^\/(en|zh)/, `/${otherLang}`);
  return new URL(newPath, currentUrl.origin).href;
}

// Get the lang from URL path
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return 'en';
}
