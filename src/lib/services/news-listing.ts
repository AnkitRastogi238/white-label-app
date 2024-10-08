import { NEWS_LISTING_ENDPOINT } from "../config/api";

/**
 * Fetches product listings based on specified parameters.
 * @returns Promise resolving to the fetched product listing data.
 * @throws Error if the fetch request fails or returns a non-ok response.
 */
export async function fetchNewsListing() {
    const url = `${NEWS_LISTING_ENDPOINT}`;
    return await fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw errorData;
        }
        return await res.json();
      })
      .catch((err) => {
        throw err;
      });
  }
  