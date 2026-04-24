import type { Route } from '@/types';
import ofetch from '@/utils/ofetch';

export const route: Route = {
    path: '/ucl',
    categories: ['sports'],
    example: '/mpia/ucl',
    radar: [
        {
            source: ['https://www.tntsports.co.uk/football/champions-league/'],
        },
    ],
    name: 'Champions League News',
    maintainers: ['mpiafletcher'],
    handler: async () => {
        const url = 'https://www.tntsports.co.uk/football/champions-league/';
        const response = await ofetch(url);
        const html = response as string;

        const matches = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/g)];

        const items = matches
            .slice(0, 20)
            .map((match, index) => {
                const link = match[1].startsWith('http') ? match[1] : `https://www.uefa.com${match[1]}`;
                const rawTitle = match[2].replaceAll(/<[^>]+>/g, '').trim();

                return {
                    title: rawTitle || `Item ${index + 1}`,
                    link,
                    guid: link,
                    description: '',
                };
            })
            .filter((item) => item.title && item.link);

        return {
            title: 'UEFA Champions League News',
            link: url,
            item: items,
        };
    },
};
