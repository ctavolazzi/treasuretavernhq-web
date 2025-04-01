// Import marked for markdown parsing
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

// Create a simple hardcoded markdown example that works on Cloudflare
const TEST_MARKDOWN = `---
title: Test Markdown Page
date: March 31, 2025
author: Tavern Management
---

# Test Markdown Page

This is a test markdown page to demonstrate rendering markdown content in SvelteKit.

## Features

- Heading support (H1-H6)
- Lists (ordered and unordered)
- **Bold** and *italic* text
- \`Inline code\` formatting
- Code blocks

\`\`\`javascript
// Example code block
function greet() {
  return "Welcome to the Tavern!";
}
\`\`\`

## Next Steps

1. First item
2. Second item
3. Third item

> This is a blockquote that demonstrates formatting options.

For more information, visit [the documentation](https://marked.js.org/).
`;

export async function load() {
  try {
    // For Cloudflare compatibility, use a hardcoded markdown example
    // In a production app, you would fetch this from a database/API

    // Extract frontmatter manually (simplified approach)
    const parts = TEST_MARKDOWN.split('---');
    let frontmatter = {};

    if (parts.length >= 3) {
      // Basic frontmatter parsing
      const frontmatterText = parts[1];
      frontmatterText.split('\n').forEach(line => {
        if (line.trim() && line.includes(':')) {
          const [key, value] = line.split(':', 2);
          frontmatter[key.trim()] = value.trim();
        }
      });
    }

    // Get content (everything after the second ---)
    const content = parts.length >= 3 ? parts.slice(2).join('---') : TEST_MARKDOWN;

    // Parse markdown to HTML
    const htmlContent = marked.parse(content);

    return {
      content: htmlContent,
      frontmatter
    };
  } catch (err) {
    console.error('Error loading markdown:', err);
    throw error(500, 'Failed to load markdown');
  }
}