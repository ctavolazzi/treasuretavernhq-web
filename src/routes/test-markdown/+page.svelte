<script>
  export let data;
  import './code-block-styles.css';
</script>

<svelte:head>
  <title>{data.frontmatter.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Prism CSS and JS for syntax highlighting -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
</svelte:head>

<div class="tale-container">
  <article class="tale-content">
    <header class="tale-header">
      <h1 class="tale-title">{data.frontmatter.title}</h1>
      <p class="tale-meta">
        {data.frontmatter.date}
        {#if data.frontmatter.author}
          • By {data.frontmatter.author}
        {/if}
      </p>
    </header>

    <div class="markdown-content">
      {@html data.content}
    </div>

    <footer class="tale-footer">
      <div class="tale-nav">
        <a href="/test-markdown" class="tale-nav-link">Reload Test Page</a>
      </div>
      <p>This is a test page for Markdown rendering.</p>
    </footer>
  </article>
</div>

<style>
  /* Mystical Tavern styling */
  .tale-container {
    color: #e2d9c2;
    background-color: #141418;
    background-image: url('/images/tavern-tales-bg.jpg');
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    padding: 2rem 1rem;
  }

  .tale-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: rgba(20, 20, 24, 0.9);
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  .tale-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .tale-title {
    font-family: 'Cinzel', serif;
    color: #c19a49; /* Richer gold color to match main site */
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .tale-meta {
    font-style: italic;
    color: #a08e65;
    font-size: 1rem;
  }

  .tale-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #3a3a43;
    text-align: center;
    font-style: italic;
    color: #a08e65;
  }

  .tale-nav {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .tale-nav-link {
    color: #c19a49;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 1px solid #c19a49;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
  }

  .tale-nav-link:hover {
    background-color: rgba(193, 154, 73, 0.2);
    color: #d6b978;
  }

  /* Markdown content styling */
  .markdown-content :global(h1),
  .markdown-content :global(h2) {
    font-family: 'Cinzel', serif;
    color: #c19a49; /* Richer gold color to match main site */
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .markdown-content :global(h1) {
    font-size: 2.2rem;
  }

  .markdown-content :global(h2) {
    font-size: 1.8rem;
  }

  .markdown-content :global(h3) {
    font-family: 'Cinzel', serif;
    color: #c19a49; /* Lighter gold */
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .markdown-content :global(p) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .markdown-content :global(strong) {
    color: #c19a49; /* Updated gold for consistency */
    font-weight: bold;
  }

  .markdown-content :global(em) {
    color: #c9b68d;
  }

  .markdown-content :global(blockquote) {
    border-left: 4px solid #c19a49;
    padding: 0.5rem 0 0.5rem 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #c9b68d;
  }

  .markdown-content :global(img) {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  }

  .markdown-content :global(ul),
  .markdown-content :global(ol) {
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }

  .markdown-content :global(li) {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .markdown-content :global(a) {
    color: #c19a49;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .markdown-content :global(a:hover) {
    color: #d6b978;
    text-decoration: underline;
  }

  .markdown-content :global(hr) {
    border: none;
    height: 1px;
    background-image: linear-gradient(to right, rgba(193, 154, 73, 0), rgba(193, 154, 73, 0.75), rgba(193, 154, 73, 0));
    margin: 2rem 0;
  }

  /* Non-highlighted inline code */
  .markdown-content :global(p code),
  .markdown-content :global(li code) {
    background-color: #0a0a0a;
    color: #5ccc63;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
    border: 1px solid #2a623c;
    text-shadow: 0 0 3px rgba(76, 175, 80, 0.5);
    letter-spacing: 0.5px;
    font-family: 'Courier New', monospace;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.1);
  }
</style>