import { getTaleBySlug, getRelatedTales } from '$lib/data/tales';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    // Get the tale by slug
    const tale = await getTaleBySlug(params.slug, fetch);

    if (!tale) {
        throw error(404, {
            message: 'Tale not found'
        });
    }

    // Get related tales
    const relatedTales = await getRelatedTales(params.slug);

    return {
        tale,
        relatedTales
    };
}