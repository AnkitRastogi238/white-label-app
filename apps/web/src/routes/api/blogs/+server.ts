import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { logger } from '@white-label/ui/services';

import {
    PUBLIC_NEWS_LISTING_API_KEY
} from '$env/static/public';
import { NEWS_API_BASE_URL } from '$lib/config/constant';

export const GET: RequestHandler = async ({ fetch }) => {

    // Construct the Salesforce API endpoint with the query parameters
    const endpoint = `${NEWS_API_BASE_URL}top-headlines?country=us&apiKey=${PUBLIC_NEWS_LISTING_API_KEY}`;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (response.ok) {
            const data = await response.json();
            return json(data);
        }
        else {
            throw new Error('Something went wrong while fetching the data!')
        }
    } catch (error) {
        logger.error('Error fetching data:', error);
        return json({ error: 'An error occurred while fetching data' }, { status: 500 });
    }
};
