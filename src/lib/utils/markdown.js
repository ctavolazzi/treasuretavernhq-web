/**
 * Lightweight Markdown parser optimized for Cloudflare compatibility
 * Handles basic Markdown syntax without external dependencies
 */

// Process Markdown text into HTML
export function parseMarkdown(text) {
  if (!text) return '';

  // Process blocks first (paragraphs, headers, lists, etc.)
  const blocks = splitIntoBlocks(text);
  const processedBlocks = blocks.map(block => processBlock(block));

  return processedBlocks.join('\n');
}

// Split text into logical blocks for processing
function splitIntoBlocks(text) {
  // Split by double newlines to separate paragraphs
  return text.split(/\n\n+/).map(block => block.trim()).filter(Boolean);
}

// Process a single block of text
function processBlock(block) {
  // Check for block-level elements

  // Headers
  const headerMatch = block.match(/^(#{1,6})\s+(.+)$/);
  if (headerMatch) {
    const level = headerMatch[1].length;
    const content = processInline(headerMatch[2]);
    return `<h${level} class="tale-h${level}">${content}</h${level}>`;
  }

  // Horizontal rule
  if (block.match(/^(\*{3,}|-{3,}|_{3,})$/)) {
    return '<hr class="tale-divider" />';
  }

  // Unordered lists
  if (block.match(/^[*\-+]\s+/m)) {
    const items = block.split(/\n/).map(line => {
      const match = line.match(/^[*\-+]\s+(.+)$/);
      return match ? `<li>${processInline(match[1])}</li>` : '';
    }).filter(Boolean);

    return `<ul class="tale-list">${items.join('')}</ul>`;
  }

  // Ordered lists
  if (block.match(/^\d+\.\s+/m)) {
    const items = block.split(/\n/).map(line => {
      const match = line.match(/^\d+\.\s+(.+)$/);
      return match ? `<li>${processInline(match[1])}</li>` : '';
    }).filter(Boolean);

    return `<ol class="tale-list">${items.join('')}</ol>`;
  }

  // Blockquotes
  if (block.startsWith('>')) {
    const content = block.replace(/^>\s?/gm, '');
    return `<blockquote class="tale-blockquote">${processInline(content)}</blockquote>`;
  }

  // Code blocks
  if (block.startsWith('```')) {
    const match = block.match(/^```(?:(\w+))?\n([\s\S]+?)\n```$/);
    if (match) {
      const language = match[1] || '';
      const code = match[2];
      return `<pre class="tale-pre"><code class="tale-code ${language ? `language-${language}` : ''}">${escapeHtml(code)}</code></pre>`;
    }
  }

  // Special paragraphs for our tale system
  if (block.startsWith('- ')) {
    return `<p class="signature">${processInline(block.substring(2))}</p>`;
  }

  if (block.startsWith('"') && block.endsWith('"')) {
    return `<p class="dialog">${processInline(block)}</p>`;
  }

  // Default to paragraph
  return `<p>${processInline(block)}</p>`;
}

// Process inline Markdown elements within a block
function processInline(text) {
  // Bold (** or __)
  text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

  // Italic (* or _)
  text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

  // Code (`code`)
  text = text.replace(/`([^`]+)`/g, '<code class="tale-code">$1</code>');

  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="tale-link">$1</a>');

  // Images ![alt](url)
  text = text.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="tale-image" />');

  // Strikethrough (~~text~~)
  text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');

  return text;
}

// Helper function to escape HTML in code blocks
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Export a function to process tale content
export function formatTaleContent(rawText) {
  try {
    // Split text by newlines and filter out empty lines
    const paragraphs = rawText.split('\n\n').filter(line => line.trim().length > 0);

    // Use our Markdown parser to process the content
    return parseMarkdown(rawText);
  } catch (error) {
    console.error('Error formatting tale content:', error);
    return `<p>Error formatting tale content: ${error.message}. Please try again later.</p>`;
  }
}