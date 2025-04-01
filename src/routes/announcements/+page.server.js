// Import only gray-matter which is a dependency we have
import matter from 'gray-matter';

// This is where you would typically fetch from an API or database
// For this example, we're using hard-coded announcements data
const hardcodedAnnouncements = [
  {
    id: 1,
    slug: "goblin-infestation-cleanup",
    date: "March 10, 2025",
    title: "Goblin Infestation Cleanup Complete",
    category: "Event",
    type: "event",
    content: "After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware.",
    mainImage: "/images/tales/goblin-infestation.webp"
  },
  {
    id: 2,
    slug: "machine-elves-strike-resolved",
    date: "March 15, 2025",
    title: "Machine Elves Strike Resolved",
    category: "News",
    type: "news",
    content: "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality.",
    mainImage: "/images/announcements/machine-elves-strike.webp"
  },
  {
    id: 3,
    slug: "dragon-mating-season",
    date: "March 22, 2025",
    title: "Warning: Dragon Mating Season",
    category: "Alert",
    type: "alert",
    content: "Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check.",
    mainImage: "/images/tales/dragon-wizard-music.webp"
  },
  {
    id: 4,
    slug: "bardic-competition",
    date: "April 5, 2025",
    title: "Annual Bardic Competition",
    category: "Event",
    type: "event",
    content: "Calling all bards, minstrels, and musical enthusiasts! The annual Bardic Competition will be held in the Great Hall next month. Categories include traditional ballads, magical music, instrumental innovation, and comedy. Grand prize is a masterwork instrument crafted by the legendary luthier Harmonius Strings.",
    mainImage: "/images/tales/scrolls-of-the-hollow-choir.webp"
  },
  {
    id: 5,
    slug: "menu-expansion",
    date: "April 8, 2025",
    title: "New Spring Menu Items",
    category: "News",
    type: "news",
    content: "Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new Fey-Touched Mushroom Stew, Unicorn Tear Tea, or the popular Phoenix Egg Benedict. Available for a limited time while magical ingredients last.",
    mainImage: "/images/announcements/elves-in-the-kitchen.webp"
  }
];

export async function load() {
  try {
    // For Cloudflare deployment, we'll use only hardcoded announcements
    // In a production environment, you would fetch from a database like Supabase

    // Sort by date (newest first)
    const allAnnouncements = [...hardcodedAnnouncements];
    allAnnouncements.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    // Get unique categories for filtering
    const categories = ["All", ...new Set(allAnnouncements.map(a => a.category))];

    return {
      announcements: allAnnouncements,
      categories
    };
  } catch (err) {
    console.error("Error loading announcements:", err);
    return {
      announcements: hardcodedAnnouncements,
      categories: ["All", ...new Set(hardcodedAnnouncements.map(a => a.category))]
    };
  }
}