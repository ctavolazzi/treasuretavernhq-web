import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build path to the content directory (this is relative to the current file)
const contentDir = path.resolve(__dirname, '../../lib/content/test');

// Configure the marked renderer to customize code blocks
const renderer = new marked.Renderer();

// Original code function for reference
const originalCodeRenderer = renderer.code.bind(renderer);

// Override code rendering
renderer.code = function(code, language) {
  // Extract code from object if needed
  let codeContent;
  if (typeof code === 'object' && code !== null && code.text) {
    codeContent = code.text;
    if (!language && code.lang) {
      language = code.lang;
    }
  } else if (typeof code === 'string') {
    codeContent = code;
  } else {
    codeContent = String(code || '');
  }

  // Escape HTML entities to prevent rendering issues
  const escapedCode = codeContent
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  // Generate a unique ID for the code block
  const id = `code-${Math.random().toString(36).substring(2, 9)}`;

  // Standard code block with copy button
  return `
    <div class="code-block">
      <pre><code id="${id}" class="language-${language || 'javascript'}">${escapedCode}</code></pre>
      <button class="copy-button" onclick="copyCode('${id}')">Copy</button>
    </div>
    <script>
      function copyCode(id) {
        const code = document.getElementById(id).textContent;
        navigator.clipboard.writeText(code)
          .then(() => {
            const button = document.getElementById(id).closest('.code-block').querySelector('.copy-button');
            button.textContent = 'Copied!';
            setTimeout(() => {
              button.textContent = 'Copy';
            }, 1500);
          })
          .catch(() => {
            // Silently fail
          });
      }
      // Trigger Prism highlighting for the new code block
      if (typeof Prism !== 'undefined') {
        Prism.highlightElement(document.getElementById('${id}'));
      }
    </script>
  `;
};

export async function load({ url }) {
  try {
    // Get the slug from the query parameter, default to test-markdown
    const slug = url.searchParams.get('slug') || 'test-markdown';

    // Build the file path
    const contentPath = path.join(contentDir, `${slug}.md`);

    // Read the markdown file
    const fileContents = fs.readFileSync(contentPath, 'utf-8');

    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContents);

    // Convert markdown to HTML with custom renderer
    const html = marked.parse(content, { renderer });

    // Return data for the page
    return {
      frontmatter,
      content: html,
      slug
    };
  } catch (error) {
    console.error('Error loading markdown:', error);
    return {
      frontmatter: { title: 'Error Loading Content' },
      content: `<p>There was an error loading the content: ${error.message}. Please try again later.</p>`,
      slug: 'error'
    };
  }
}