import Parser from 'rss-parser';

import type { Route } from '@/types';

export const route: Route = {
    path: '/sport-training',
    categories: ['sports'],
    example: '/mpia/sport-training',
    name: 'Sport Training & Performance',
    maintainers: ['mpiafletcher'],
    handler: async () => {
        const parser = new Parser();
        const feed = await parser.parseURL('https://news.google.com/rss/search?q=%22sports+science%22+OR+%22strength+and+conditioning%22&hl=en-GB&gl=GB&ceid=GB:en');

        return {
            title: 'Sport Training & Performance',
            link: 'https://news.google.com/',
            item: feed.items.map((item) => ({
                title: item.title,
                link: item.link,
                description: item.contentSnippet ?? item.content ?? '',
                pubDate: item.pubDate,
            })),
        };
    },
};
