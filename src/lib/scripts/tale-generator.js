/**
 * Tale Generator Script
 *
 * This script helps create new tales with the proper structure.
 * It can be run from the command line to generate tale files and directories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../../');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Tale categories
const taleCategories = [
  { id: 'story', name: 'Stories' },
  { id: 'poem', name: 'Poems' },
  { id: 'song', name: 'Songs' },
  { id: 'video', name: 'Visual Chronicles' },
  { id: 'interactive', name: 'Interactive Tales' }
];

// Template for tale content
const taleContentTemplate = `This is a template for your tale content.

You can write multiple paragraphs separated by blank lines.

"This will appear as dialog thanks to the quotes."

- This will appear as a signature or attribution because it starts with a dash.

You can replace this text with your actual tale content.`;

/**
 * Convert a string to a slug format
 * @param {string} text Text to convert to slug
 * @returns {string} Slugified text
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Create a tale
 */
function createTale() {
  console.log('\n📖 Treasure Tavern Tale Generator 📖\n');
  console.log('This tool will help you create a new tale with the proper structure.\n');

  // Get tale information from user
  rl.question('Title of the tale: ', title => {
    const slug = slugify(title);

    rl.question('Author name: ', author => {
      rl.question('Brief excerpt/description: ', excerpt => {
        // Show categories
        console.log('\nCategories:');
        taleCategories.forEach((cat, index) => {
          console.log(`${index + 1}. ${cat.name}`);
        });

        rl.question('\nSelect category number: ', categoryNum => {
          let categoryIndex = parseInt(categoryNum, 10) - 1;
          if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= taleCategories.length) {
            console.log('Invalid category selection. Using Stories as default.');
            categoryIndex = 0;
          }

          const category = taleCategories[categoryIndex];

          rl.question('Date or season (e.g., "Winter Solstice", "Blood Moon"): ', date => {
            rl.question('Comma-separated tags (e.g., magic,adventure,quest): ', tagsInput => {
              const tags = tagsInput
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean);

              rl.question('Is this a featured tale? (y/n): ', isFeatured => {
                const featured = isFeatured.toLowerCase() === 'y';

                rl.question('Add media? (none/audio/video): ', mediaType => {
                  let mediaTypeValue = null;
                  let mediaContent = null;

                  if (['audio', 'video'].includes(mediaType.toLowerCase())) {
                    mediaTypeValue = mediaType.toLowerCase();
                    rl.question('Media content path: ', mediaPath => {
                      mediaContent = mediaPath;
                      createTaleFiles(
                        slug,
                        title,
                        author,
                        excerpt,
                        category,
                        date,
                        tags,
                        featured,
                        mediaTypeValue,
                        mediaContent
                      );
                    });
                  } else {
                    createTaleFiles(
                      slug,
                      title,
                      author,
                      excerpt,
                      category,
                      date,
                      tags,
                      featured,
                      mediaTypeValue,
                      mediaContent
                    );
                  }
                });
              });
            });
          });
        });
      });
    });
  });
}

/**
 * Create all necessary tale files
 */
function createTaleFiles(
  slug,
  title,
  author,
  excerpt,
  category,
  date,
  tags,
  featured,
  mediaType,
  mediaContent
) {
  // Create directories if they don't exist
  const taleDir = path.join(rootDir, 'static', 'tales', slug);
  fs.mkdirSync(taleDir, { recursive: true });

  // Create tale content file
  const contentFilePath = path.join(taleDir, `${slug}.txt`);
  fs.writeFileSync(contentFilePath, taleContentTemplate);

  // Create tale entry in tales.js
  const taleEntry = `    {
        slug: '${slug}',
        title: '${title.replace(/'/g, "\\'")}',
        type: '${category.name.slice(0, -1)}',
        category: '${category.id}',
        date: '${date.replace(/'/g, "\\'")}',
        author: '${author.replace(/'/g, "\\'")}',
        excerpt: '${excerpt.replace(/'/g, "\\'")}',
        coverImage: '/images/tales/${slug}.png',
        featured: ${featured},
        ${mediaType ? `mediaType: '${mediaType}',` : 'mediaType: null,'}
        ${mediaContent ? `mediaContent: '${mediaContent}',` : 'mediaContent: null,'}
        tags: [${tags.map(tag => `'${tag.replace(/'/g, "\\'")}'`).join(', ')}],
        useExternalContent: true
    }`;

  console.log('\n✨ Tale files created successfully! ✨\n');
  console.log(`Tale content file: ${contentFilePath}`);
  console.log('\nAdd this entry to the talesData array in src/lib/data/tales.js:');
  console.log('\n' + taleEntry + ',\n');
  console.log("Don't forget to create a cover image:");
  console.log(`/images/tales/${slug}.png`);

  rl.close();
}

// Start the program
createTale();

// Export for use in other scripts
export { createTale, slugify };
