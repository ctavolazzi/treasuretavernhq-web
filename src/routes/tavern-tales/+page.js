import { getAllTales, getFeaturedTales, getRecentTales, getCategories } from '$lib/data/tales';

/** @type {import('./$types').PageLoad} */
export async function load() {
    // Fetch all necessary data
    const allTales = await getAllTales();
    const featuredTales = await getFeaturedTales();
    const recentTales = await getRecentTales(6); // Limit to 6 recent tales
    const categories = await getCategories();

    return {
        allTales,
        featuredTales,
        recentTales,
        categories
    };
}