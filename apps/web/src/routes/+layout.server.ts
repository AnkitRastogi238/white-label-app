// external dependencies
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';
import { type ServerLoadEvent } from '@sveltejs/kit';

import { logger } from '@white-label/ui/services';

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
        },
        enrich: true,
    };
    const navbarAttributes = {
        apiKey: constant.API_KEY,
        options: getBuilderSearchParams(event.url.searchParams),
        enrich: true,
    }

    const [navBar, footerContent, content] = await Promise.all([
        fetchOneEntry({
            model: 'navbar',
            ...navbarAttributes,
            cacheSeconds: 300,
        }).catch((error) => logger.log(error)),
        fetchOneEntry({
            model: 'common-section',
            ...commonAttributes,
            cacheSeconds: 300,
        }).catch((error) => logger.log(error)),
        fetchOneEntry({
            model: 'page',
            ...commonAttributes,
        }).catch((error) => logger.log(error)),
    ]);
    return { content, footerContent, navBar };
}