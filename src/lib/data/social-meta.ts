/**
 * Configuration file for social sharing metadata
 * This provides a centralized place to define how tales appear when shared in messages, DMs, or social media
 */

/**
 * Interface for social sharing metadata - simplified for clean implementation
 */
export interface SocialMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
}

/**
 * Interface for a tale object with minimal required properties
 */
export interface TaleSummary {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  url?: string;
}

/**
 * Get social sharing metadata for a tale
 * @param {TaleSummary} tale - The tale object
 * @returns {SocialMetadata} Social sharing metadata for the tale
 */
export function getTaleSocialMeta(tale: TaleSummary): SocialMetadata {
  if (!tale) {
    return getDefaultSocialMeta();
  }

  // Create a clean structure focused only on the tale's image
  return {
    title: tale.title,
    description: tale.excerpt || 'A tale from Treasure Tavern',
    // Use the tale's cover image directly
    image: tale.coverImage || '/images/tales/default-tale.png',
    // Use provided URL if available, otherwise construct one
    url: tale.url || `https://treasuretavernhq.com/tavern-tales/${tale.slug}`
  };
}

/**
 * Default social metadata for when a specific tale isn't provided
 * @returns {SocialMetadata} Default social sharing metadata
 */
export function getDefaultSocialMeta(): SocialMetadata {
  return {
    title: 'Tavern Tales',
    description: 'Explore stories from the Treasure Tavern archives.',
    image: '/images/tales/default-tale.png',
    url: 'https://treasuretavernhq.com/tavern-tales'
  };
}
