<script lang="ts">
  export let data: { userEmail: string | null; categories: Array<{ id: string; name: string }> };

  // form state
  let title = '';
  let author = '';
  let dateOrSeason = '';
  let category = data.categories?.[0]?.id || 'story';
  let tagsInput = '';
  let excerpt = '';
  let featured = false;
  let mediaType: 'audio' | 'video' | 'interactive' | null = null;
  let mediaContent = '';
  let content = '';

  // derived
  $: slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  $: tags = tagsInput
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  function buildTalesJsSnippet() {
    return `{
  slug: '${slug}',
  title: '${title.replace(/'/g, "\\'")}',
  type: '${category === 'poem' ? 'Poem' : category === 'song' ? 'Song' : 'Story'}',
  category: '${category}',
  date: '${dateOrSeason}',
  author: '${author.replace(/'/g, "\\'")}',
  excerpt: '${excerpt.replace(/'/g, "\\'")}',
  coverImage: '/images/tales/${slug}.png',
  featured: ${featured},
  mediaType: ${mediaType ? `'${mediaType}'` : 'null'},
  mediaContent: ${mediaContent ? `'${mediaContent}'` : 'null'},
  tags: [${tags.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
  useExternalContent: true
}`;
  }

  function downloadContentTxt() {
    const filename = `${slug || 'new-tale'}.txt`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<main class="new-tale">
  <h1>Start a new tale</h1>
  <p>Signed in as {data.userEmail}</p>

  <section class="card">
    <h2>Metadata</h2>
    <div class="grid">
      <label>
        <span>Title</span>
        <input bind:value={title} placeholder="The Glass Sorceress" />
      </label>
      <label>
        <span>Author</span>
        <input bind:value={author} placeholder="Author Name" />
      </label>
      <label>
        <span>Date/Season</span>
        <input bind:value={dateOrSeason} placeholder="Hollow Moon" />
      </label>
      <label>
        <span>Category</span>
        <select bind:value={category}>
          {#each data.categories as c}
            <option value={c.id}>{c.name}</option>
          {/each}
        </select>
      </label>
      <label>
        <span>Tags (comma-separated)</span>
        <input bind:value={tagsInput} placeholder="magic, sorceress, glass" />
      </label>
      <label class="checkbox">
        <input type="checkbox" bind:checked={featured} /> Feature on homepage
      </label>
      <label>
        <span>Media Type</span>
        <select bind:value={mediaType}>
          <option value={null}>None</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="interactive">Interactive</option>
        </select>
      </label>
      <label>
        <span>Media Content (URL or path)</span>
        <input bind:value={mediaContent} placeholder="/audio/my-tale.mp3 or https://..." />
      </label>
      <label class="full">
        <span>Excerpt</span>
        <textarea bind:value={excerpt} rows={3} placeholder="1–2 sentence teaser"></textarea>
      </label>
    </div>

    <p class="muted">Slug preview: <code>{slug}</code></p>
  </section>

  <section class="card">
    <h2>Story Content</h2>
    <textarea bind:value={content} rows={12} placeholder="Write your tale in Markdown..."
    ></textarea>
    <div class="row">
      <button on:click={downloadContentTxt} class="btn">Download {slug || 'new-tale'}.txt</button>
    </div>
  </section>

  <section class="card">
    <h2>tales.js Snippet</h2>
    <pre class="snippet"><code>{buildTalesJsSnippet()}</code></pre>
    <p class="muted">
      Save your content to <code>static/tales/{slug}/{slug}.txt</code>, add a cover image at
      <code>static/images/tales/{slug}.png</code>, and paste this snippet into
      <code>src/lib/data/tales.js</code>.
    </p>
  </section>
</main>

<style>
  .new-tale {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
  }
  .card {
    padding: 1rem;
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
  .grid label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .grid label.checkbox {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  .grid label.full {
    grid-column: 1 / -1;
  }
  input,
  select,
  textarea {
    padding: 0.5rem;
  }
  .row {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .snippet {
    background: rgba(19, 17, 28, 0.6);
    padding: 0.75rem;
    border-radius: 6px;
    overflow: auto;
  }
  .muted {
    color: rgba(247, 232, 212, 0.7);
  }
  code {
    background: rgba(0, 0, 0, 0.2);
    padding: 0 0.25rem;
    border-radius: 3px;
  }
  @media (max-width: 720px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
