import Parser from 'rss-parser';

import type { Route } from '@/types';

export const route: Route = {
    path: '/athletic-football',
    categories: ['sports'],
    example: '/mpia/athletic-football',
    name: 'The Athletic Football',
    maintainers: ['mpiafletcher'],
    handler: async () => {
        const parser = new Parser();
        const feed = await parser.parseURL('https://news.google.com/rss/search?q=site:nytimes.com/athletic+football&hl=en-GB&gl=GB&ceid=GB:en');

        return {
            title: 'The Athletic Football',
            link: 'https://www.nytimes.com/athletic/football/',
            item: feed.items.map((item) => ({
                title: item.title,
                link: item.link,
                description: item.contentSnippet ?? item.content ?? '',
                pubDate: item.pubDate,
            })),
        };
    },
};
