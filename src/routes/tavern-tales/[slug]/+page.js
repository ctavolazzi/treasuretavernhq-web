import { error } from '@sveltejs/kit';
import { getTaleBySlug, getRelatedTales } from '$lib/data/tales';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { slug } = params;

    // Fetch the tale by slug
    const tale = await getTaleBySlug(slug);

    // If no tale is found, throw a 404 error
    if (!tale) {
        throw error(404, {
            message: 'Tale not found'
        });
    }

    // Get related tales if any
    const relatedTales = await getRelatedTales(slug);

    return {
        tale,
        relatedTales
    };
}