/**
 * Configuration file for social sharing metadata
 * This provides a centralized place to define how tales appear when shared in messages, DMs, or social media
 */

/**
 * Interface for social sharing metadata
 */
export interface SocialMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  imageWidth: number;
  imageHeight: number;
  author: string;
  siteName: string;
  publishedTime?: string;
  tags: string[];
  articleSection?: string;
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
  date?: string;
  type?: string;
  tags?: string[];
  publishedTime?: string;
  url?: string; // Optional URL that may be provided
}

/**
 * Get social sharing metadata for a tale
 * @param {TaleSummary} tale - The tale object
 * @returns {SocialMetadata} Social sharing metadata for the tale
 */
export function getTaleSocialMeta(tale: TaleSummary): SocialMetadata {
  if (!tale) return getDefaultSocialMeta();

  // Create a consistent structure for social sharing
  return {
    title: `${tale.title} - Tavern Tales`,
    description: tale.excerpt || 'Discover enchanting stories from the Treasure Tavern',
    // Use the existing image directly - no special formatting needed
    image: tale.coverImage || '/images/tales/default-tale.png',
    // Use provided URL if available, otherwise construct one
    url: tale.url || `https://treasuretavernhq.com/tavern-tales/${tale.slug}`,
    type: 'article',
    imageWidth: 1200, // Standard OG image dimensions
    imageHeight: 630,
    author: tale.author || 'Treasure Tavern',
    siteName: 'Treasure Tavern',
    // Additional metadata specific to the tale
    publishedTime: tale.publishedTime || tale.date || '',
    tags: tale.tags || [],
    articleSection: tale.type || 'Story',
  };
}

/**
 * Default social metadata for when a specific tale isn't provided
 * @returns {SocialMetadata} Default social sharing metadata
 */
export function getDefaultSocialMeta(): SocialMetadata {
  return {
    title: 'Tavern Tales - Treasure Tavern',
    description: 'Explore magical stories, legends, and songs from the Treasure Tavern archives.',
    image: '/images/tales/default-tale.png',
    url: 'https://treasuretavernhq.com/tavern-tales',
    type: 'website',
    imageWidth: 1200,
    imageHeight: 630,
    author: 'Treasure Tavern',
    siteName: 'Treasure Tavern',
    tags: []
  };
}