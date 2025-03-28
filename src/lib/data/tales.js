// Mock data for Tavern Tales
import { parseMarkdown } from '$lib/utils/markdown';

// Categories of tales
const taleCategories = [
    { id: 'story', name: 'Stories' },
    { id: 'poem', name: 'Poems' },
    { id: 'song', name: 'Songs' },
    { id: 'video', name: 'Visual Chronicles' },
    { id: 'interactive', name: 'Interactive Tales' }
];

// Helper function to load tale content from file and format it
async function loadTaleContentFromFile(slug, fetchFn) {
    try {
        // Use the provided fetch function or fall back to global fetch
        const fetchToUse = fetchFn || fetch;

        // Files in static folder are served at the root path
        const response = await fetchToUse(`/tales/${slug}/${slug}.txt`);
        if (!response.ok) {
            throw new Error(`Failed to load tale content: ${response.status}`);
        }

        const rawText = await response.text();

        // Use our Markdown parser to process the content
        const htmlContent = parseMarkdown(rawText);

        return htmlContent;
    } catch (error) {
        console.error(`Error loading tale content for ${slug}:`, error);
        return `<p>Error loading tale content: ${error.message}. Please try again later.</p>`;
    }
}

// Helper function to format markdown inline elements
function formatMarkdown(text) {
    // Handle bold (**text** or __text__)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Handle italic (*text* or _text_)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');

    // Handle links [text](url)
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="tale-link">$1</a>');

    // Handle inline code (`code`)
    text = text.replace(/`(.*?)`/g, '<code class="tale-code">$1</code>');

    return text;
}

// Mock tales data with content directly embedded
const talesData = [
    {
        slug: 'the-glass-sorceress',
        title: 'The Glass Sorceress',
        type: 'Story',
        category: 'story',
        date: 'Winter Solstice',
        author: 'The Archive Keeper',
        excerpt: 'In the gleaming city of Vitralis, a young apprentice glassblower discovers her mentor holds a dangerous secret—the ability to trap souls within her delicate creations.',
        coverImage: '/images/tales/the-glass-sorceress.png',
        featured: true,
        mediaType: 'audio',
        mediaContent: '/audio/ElevenLabs_the-glass-sorceress.mp3',
        tags: ['sorceress', 'glass', 'souls', 'apprentice', 'magic'],
        useExternalContent: true
    },
    {
        slug: 'the-sorceress-of-storms',
        title: 'The Sorceress of Storms',
        type: 'Story',
        category: 'story',
        date: 'Thunder Moon',
        author: 'The Weather-Watcher',
        excerpt: 'When a desperate village makes a bargain with the notorious Sorceress of Storms to end a devastating drought, a young apprentice discovers the true price of commanding the weather.',
        coverImage: '/images/tales/sorceress-of-storms.png',
        featured: true,
        tags: ['sorceress', 'storms', 'bargain', 'weather', 'magic'],
        mediaType: null,
        mediaContent: null,
        useExternalContent: true
    },
    {
        slug: 'the-bone-kingdom',
        title: 'The Bone Kingdom',
        type: 'Story',
        category: 'story',
        date: 'Hollow Moon',
        author: 'Ellara Moonquill',
        excerpt: 'Far beneath the living world lies the Bone Kingdom, where a silent ruler passes judgment on the dead and living alike, and a traveler seeks what was stolen.',
        coverImage: '/images/tales/the-bone-kingdom.png',
        featured: true,
        tags: ['undead', 'king', 'judgment', 'souls', 'necropolis'],
        mediaType: null,
        mediaContent: null,
        useExternalContent: true
    },
    // Other tales kept with content embedded directly

    // Keep all other tales with their embedded content
];

/**
 * Get all available tales
 * @returns {Promise<Array>} List of all tales
 */
export const getAllTales = async () => {
    // In a real app, this would fetch from a database
    return talesData.map(tale => ({
        slug: tale.slug,
        title: tale.title,
        type: tale.type,
        category: tale.category,
        date: tale.date,
        author: tale.author,
        excerpt: tale.excerpt,
        coverImage: tale.coverImage,
        tags: tale.tags
    }));
};

/**
 * Get featured tales
 * @returns {Promise<Array>} List of featured tales
 */
export const getFeaturedTales = async () => {
    // In a real app, this would use a database query
    return talesData
        .filter(tale => tale.featured)
        .map(tale => ({
            slug: tale.slug,
            title: tale.title,
            type: tale.type,
            date: tale.date,
            author: tale.author,
            excerpt: tale.excerpt,
            coverImage: tale.coverImage
        }));
};

/**
 * Get recent tales
 * @param {number} limit Number of tales to return
 * @returns {Promise<Array>} List of recent tales
 */
export const getRecentTales = async (limit = 3) => {
    // In a real app, this would sort by date in the database
    // Here we'll just take the last few items
    return talesData.slice(-limit).map(tale => ({
        slug: tale.slug,
        title: tale.title,
        type: tale.type,
        date: tale.date,
        author: tale.author,
        excerpt: tale.excerpt,
        coverImage: tale.coverImage
    }));
};

/**
 * Get all tale categories
 * @returns {Promise<Array>} List of categories
 */
export const getCategories = async () => {
    return taleCategories;
};

/**
 * Get a tale by its slug
 * @param {string} slug The tale's slug
 * @param {Function} fetchFn Optional fetch function to use (for server-side rendering)
 * @returns {Promise<Object|null>} The tale or null if not found
 */
export const getTaleBySlug = async (slug, fetchFn) => {
    const tale = talesData.find(t => t.slug === slug);

    if (!tale) return null;

    // If the tale uses external content, load it from file
    if (tale.useExternalContent) {
        const content = await loadTaleContentFromFile(slug, fetchFn);
        return {
            ...tale,
            content
        };
    }

    // Otherwise return the tale with its embedded content
    return tale;
};

/**
 * Get related tales to a specific tale
 * @param {string} slug The current tale's slug
 * @param {number} limit Maximum number of related tales to return
 * @returns {Promise<Array>} List of related tales
 */
export const getRelatedTales = async (slug, limit = 3) => {
    // Find the current tale
    const currentTale = talesData.find(t => t.slug === slug);

    if (!currentTale) {
        return [];
    }

    // Find tales that are in the same category or share tags
    const relatedTales = talesData
        .filter(t => {
            // Don't include the current tale
            if (t.slug === slug) return false;

            // Check if it's in the same category
            const sameCategory = t.category === currentTale.category;

            // Check if it shares at least one tag
            const hasSharedTag = t.tags.some(tag => currentTale.tags.includes(tag));

            return sameCategory || hasSharedTag;
        })
        .map(tale => ({
            slug: tale.slug,
            title: tale.title,
            type: tale.type,
            coverImage: tale.coverImage
        }))
        .slice(0, limit);

    return relatedTales;
};