import {
    PUBLIC_BUILDER_API_KEY,
    PUBLIC_NEWS_LISTING_API_KEY
} from '$env/static/public';


export const API_KEY = PUBLIC_BUILDER_API_KEY || '7953d2f708184128b6bfffe7ceb85eea';
export const NEWS_LISTING_API_KEY = PUBLIC_NEWS_LISTING_API_KEY || 'abc';

export const NEWS_API_BASE_URL = 'https://newsapi.org/v2/'

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
