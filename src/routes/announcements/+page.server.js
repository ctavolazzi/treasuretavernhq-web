import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build path to the content directory
const contentDir = path.resolve(__dirname, '../../lib/content/announcements');

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
    content: "After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware."
  },
  {
    id: 2,
    slug: "machine-elves-strike-resolved",
    date: "March 15, 2025",
    title: "Machine Elves Strike Resolved",
    category: "News",
    type: "news",
    content: "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality."
  },
  {
    id: 3,
    slug: "dragon-mating-season",
    date: "March 22, 2025",
    title: "Warning: Dragon Mating Season",
    category: "Alert",
    type: "alert",
    content: "Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check."
  },
  {
    id: 4,
    slug: "bardic-competition",
    date: "April 5, 2025",
    title: "Annual Bardic Competition",
    category: "Event",
    type: "event",
    content: "Calling all bards, minstrels, and musical enthusiasts! The annual Bardic Competition will be held in the Great Hall next month. Categories include traditional ballads, magical music, instrumental innovation, and comedy. Grand prize is a masterwork instrument crafted by the legendary luthier Harmonius Strings."
  },
  {
    id: 5,
    slug: "menu-expansion",
    date: "April 8, 2025",
    title: "New Spring Menu Items",
    category: "News",
    type: "news",
    content: "Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new Fey-Touched Mushroom Stew, Unicorn Tear Tea, or the popular Phoenix Egg Benedict. Available for a limited time while magical ingredients last."
  }
];

export async function load() {
  try {
    // Get all available markdown files from the content directory
    let mdAnnouncements = [];

    try {
      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir);
        const mdFiles = files.filter(file => file.endsWith('.md'));

        // Process each markdown file
        for (const file of mdFiles) {
          try {
            const filePath = path.join(contentDir, file);
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            const { data: frontmatter, content } = matter(fileContents);
            const slug = file.replace('.md', '');

            mdAnnouncements.push({
              slug,
              date: frontmatter.date,
              title: frontmatter.title,
              category: frontmatter.category,
              type: frontmatter.type || frontmatter.category.toLowerCase(),
              content: frontmatter.excerpt || content.slice(0, 150) + "...",
              author: frontmatter.author || "Tavern Management",
              isMarkdown: true
            });
          } catch (err) {
            console.error(`Error processing markdown file ${file}:`, err);
          }
        }
      }
    } catch (err) {
      console.error("Error reading markdown directory:", err);
    }

    // Merge hardcoded and markdown announcements, preferring markdown if duplicate slug
    const slugsFromMd = mdAnnouncements.map(a => a.slug);
    const filteredHardcoded = hardcodedAnnouncements.filter(a => !slugsFromMd.includes(a.slug));

    const allAnnouncements = [...mdAnnouncements, ...filteredHardcoded];

    // Sort by date (newest first)
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