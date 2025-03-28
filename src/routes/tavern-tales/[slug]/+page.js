import { getTaleBySlug, getRelatedTales } from '$lib/data/tales';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, url }) {
    // Get the tale by slug
    const tale = await getTaleBySlug(params.slug, fetch);

    if (!tale) {
        throw error(404, {
            message: 'Tale not found'
        });
    }

    // Get related tales
    const relatedTales = await getRelatedTales(params.slug);

    // Build the base URL for the site
    const baseUrl = `${url.protocol}//${url.host}`;

    // Add the absolute URL to the tale data for social sharing
    const absoluteUrl = new URL(url);
    absoluteUrl.pathname = `/tavern-tales/${params.slug}`;

    // Make sure image URLs are absolute for social sharing
    const coverImage = tale.coverImage;
    const absoluteCoverImage = coverImage?.startsWith('http')
        ? coverImage
        : `${baseUrl}${coverImage}`;

    // The tale object will now have all needed metadata for social sharing
    return {
        tale: {
            ...tale,
            url: absoluteUrl.toString(),
            coverImage: absoluteCoverImage
        },
        relatedTales
    };
}