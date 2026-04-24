import Parser from 'rss-parser';

import type { Route } from '@/types';

export const route: Route = {
    path: '/coachesvoice',
    categories: ['sports'],
    example: '/mpia/coachesvoice',
    name: "Coaches' Voice",
    maintainers: ['mpiafletcher'],
    handler: async () => {
        const parser = new Parser();
        const feed = await parser.parseURL('https://news.google.com/rss/search?q=site:coachesvoice.com+football&hl=en-GB&gl=GB&ceid=GB:en');

        return {
            title: "Coaches' Voice",
            link: 'https://www.coachesvoice.com/',
            item: feed.items.map((item) => ({
                title: item.title,
                link: item.link,
                description: item.contentSnippet ?? item.content ?? '',
                pubDate: item.pubDate,
            })),
        };
    },
};
