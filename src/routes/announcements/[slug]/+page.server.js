import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import { marked } from 'marked';

// Hardcoded announcements data for Cloudflare compatibility
const hardcodedAnnouncements = [
  {
    slug: 'goblin-infestation-cleanup',
    date: 'March 10, 2025',
    title: 'Goblin Infestation Cleanup Complete',
    category: 'Event',
    type: 'event',
    content:
      'After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware.',
    author: 'Tavern Management',
    mainImage: '/images/tales/goblin-infestation.webp'
  },
  {
    slug: 'machine-elves-strike-resolved',
    date: 'March 15, 2025',
    title: 'Machine Elves Strike Resolved',
    category: 'News',
    type: 'news',
    content:
      "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality.",
    author: 'Tavern Management',
    mainImage: '/images/announcements/machine-elves-strike.webp'
  },
  {
    slug: 'dragon-mating-season',
    date: 'March 22, 2025',
    title: 'Warning: Dragon Mating Season',
    category: 'Alert',
    type: 'alert',
    content:
      'Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check.',
    author: 'Tavern Management',
    mainImage: '/images/tales/dragon-wizard-music.webp'
  },
  {
    slug: 'bardic-competition',
    date: 'April 5, 2025',
    title: 'Annual Bardic Competition',
    category: 'Event',
    type: 'event',
    content:
      'Calling all bards, minstrels, and musical enthusiasts! The annual Bardic Competition will be held in the Great Hall next month. Categories include traditional ballads, magical music, instrumental innovation, and comedy. Grand prize is a masterwork instrument crafted by the legendary luthier Harmonius Strings.',
    author: 'Tavern Management',
    mainImage: '/images/tales/scrolls-of-the-hollow-choir.webp'
  },
  {
    slug: 'menu-expansion',
    date: 'April 8, 2025',
    title: 'New Spring Menu Items',
    category: 'News',
    type: 'news',
    content:
      'Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new Fey-Touched Mushroom Stew, Unicorn Tear Tea, or the popular Phoenix Egg Benedict. Available for a limited time while magical ingredients last.',
    author: 'Tavern Management',
    mainImage: '/images/announcements/elves-in-the-kitchen.webp'
  }
];

export async function load({ params }) {
  try {
    const { slug } = params;

    // Find the announcement by slug
    const announcement = hardcodedAnnouncements.find(a => a.slug === slug);

    if (!announcement) {
      throw error(404, `Announcement "${slug}" not found`);
    }

    return {
      announcement,
      content: announcement.content,
      title: announcement.title,
      date: announcement.date,
      category: announcement.category,
      author: announcement.author || 'Tavern Management',
      mainImage: announcement.mainImage
    };
  } catch (err) {
    console.error(`Error loading announcement "${params.slug}":`, err);
    throw error(500, 'Internal server error');
  }
}
