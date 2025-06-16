import { error } from '@sveltejs/kit';

// This is where you would typically fetch from an API or database
// For this example, we're using the hard-coded announcements data
const announcements = [
  // Only keep factual news or updates, remove events, contests, magical experiences, and speculative content.
  // Example:
  {
    id: 1,
    slug: 'menu-expansion',
    date: 'April 8, 2025',
    title: 'New Spring Menu Items',
    category: 'News',
    type: 'news',
    content:
      'Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new seasonal dishes, available for a limited time.',
    mainImage: '/images/announcements/elves-in-the-kitchen.webp',
    fullContent: `
      <p>Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients. Try our new seasonal dishes, available for a limited time.</p>
    `,
    cta: {
      text: 'Learn More',
      link: '/about'
    },
    relatedAnnouncements: []
  }
];

export function load({ params }) {
  const announcement = announcements.find(a => a.slug === params.slug);

  if (!announcement) {
    throw error(404, {
      message: 'Announcement not found'
    });
  }

  // Get related announcements data
  const relatedAnnouncements = announcement.relatedAnnouncements
    ? announcement.relatedAnnouncements
        .map(id => announcements.find(a => a.id === id))
        .filter(Boolean)
    : [];

  return {
    announcement,
    relatedAnnouncements
  };
}
