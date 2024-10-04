// external dependencies
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';
import { type ServerLoadEvent } from '@sveltejs/kit';

// internal dependencies
import * as constant from '$lib/config/constant';

/**
 * Load the Builder content for the page model
 * @param event The ServerLoadEvent object containing information about the request.
 * @returns An object containing the fetched Builder content for the footer and the page.
 */
export async function load(event: ServerLoadEvent) {
    // fetch your Builder content

    const path = event.url.pathname;
    const commonAttributes = {
        apiKey: constant.API_KEY,
        options: getBuilderSearchParams(event.url.searchParams),
        userAttributes: {
            urlPath: path || '/',
            query: {
                name: 'Footer Section',
            },
        },

        enrich: true,
    };

    const [content] = await Promise.all([
        fetchOneEntry({
            model: 'page',
            ...commonAttributes,
        }).catch((error) => console.log(error)),
    ]);
    return { content };
}