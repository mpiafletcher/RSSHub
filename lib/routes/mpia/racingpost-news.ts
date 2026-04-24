import Parser from 'rss-parser';

import type { Route } from '@/types';

export const route: Route = {
    path: '/racingpost-news',
    categories: ['sports'],
    example: '/mpia/racingpost-news',
    name: 'Racing Post News',
    maintainers: ['mpiafletcher'],
    handler: async () => {
        const parser = new Parser();
        const feed = await parser.parseURL('https://news.google.com/rss/search?q=site:racingpost.com+horse+racing&hl=en-GB&gl=GB&ceid=GB:en');

        return {
            title: 'Racing Post News',
            link: 'https://www.racingpost.com/news/',
            item: feed.items.map((item) => ({
                title: item.title,
                link: item.link,
                description: item.contentSnippet ?? item.content ?? '',
                pubDate: item.pubDate,
            })),
        };
    },
};
