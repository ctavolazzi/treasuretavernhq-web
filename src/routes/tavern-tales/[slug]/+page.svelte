<script>
  import { onMount } from 'svelte';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';

  // Get the data from the loader
  export let data;
  const { tale, relatedTales } = data;

  // For handling the interactive media component if applicable
  let showRiddleAnswers = false;

  // Handle media display
  let mediaReady = false;

  onMount(() => {
    // Handle any client-side initialization
    mediaReady = true;
  });
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #13111C 0%, #1F1B2D 60%, #2B1D34 100%);
    color: #F7E8D4;
    overflow-x: hidden;
    line-height: 1.4;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .tale-header {
    position: relative;
    padding: 4rem 2rem 2rem;
    text-align: center;
    background: rgba(19, 17, 28, 0.8);
    border-bottom: 1px solid rgba(189, 150, 72, 0.2);
  }

  .tale-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .tale-meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.7);
  }

  .meta-icon {
    color: #9E61E3;
  }

  .tale-type {
    padding: 0.3rem 0.8rem;
    background: rgba(158, 97, 227, 0.15);
    border-radius: 20px;
    font-weight: 500;
    color: #9E61E3;
  }

  .header-decor {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 15px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 15" preserveAspectRatio="none"><path d="M0,15 L1000,15 L1000,0 C900,10 800,15 700,5 C600,-5 500,10 400,15 C300,20 200,10 100,5 L0,15 Z" fill="%231F1B2D"/></svg>');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .tale-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin: 0 0 1rem;
    font-weight: 700;
    line-height: 1.2;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    margin: 3rem 0 1.5rem;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  h3 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.35rem, 2vw, 1.8rem);
    color: #BD9648;
    margin: 2rem 0 1rem;
  }

  .tale-content {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.2rem);
    line-height: 1.6;
    color: rgba(247, 232, 212, 0.92);
  }

  .tale-content :global(p) {
    margin-bottom: 1.5rem;
  }

  .tale-content :global(.journal-entry) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    border-left: 3px solid rgba(158, 97, 227, 0.4);
  }

  .tale-content :global(.signature) {
    text-align: right;
    font-style: italic;
    margin-top: 2rem;
  }

  .tale-content :global(.poem) {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: rgba(31, 27, 45, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tale-content :global(.verse) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  .tale-content :global(.note) {
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: 0.95em;
  }

  .tale-content :global(.warning) {
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: 0.95em;
    border-left: 3px solid #FF6B6B;
  }

  .tale-content :global(.final-note) {
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: 0.95em;
  }

  .tale-content :global(.closing-note) {
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: 0.95em;
  }

  .tale-content :global(.song-entry) {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tale-content :global(.song-description) {
    font-style: italic;
    color: rgba(247, 232, 212, 0.85);
  }

  .tale-content :global(.music-player) {
    padding: 1rem;
    margin: 1rem 0;
    background: rgba(19, 17, 28, 0.6);
    border-radius: 8px;
    text-align: center;
  }

  .tale-content :global(.collector-notes) {
    font-size: 0.95em;
    color: rgba(247, 232, 212, 0.75);
    padding-left: 1rem;
    border-left: 3px solid rgba(189, 150, 72, 0.3);
  }

  .tale-content :global(.riddle) {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: rgba(31, 27, 45, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tale-content :global(.riddle-text) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-style: italic;
  }

  .tale-content :global(.riddle-hint) {
    color: rgba(158, 97, 227, 0.9);
    font-size: 0.95em;
  }

  .tale-content :global(.hidden) {
    display: none;
  }

  .media-container {
    margin: 3rem 0;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .audio-container {
    padding: 1.5rem;
    background: rgba(19, 17, 28, 0.6);
    text-align: center;
  }

  .audio-message {
    font-style: italic;
    margin-bottom: 1rem;
  }

  audio {
    width: 100%;
    max-width: 500px;
  }

  .interactive-container {
    padding: 1.5rem;
    background: rgba(19, 17, 28, 0.6);
    text-align: center;
  }

  .reveal-button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border: none;
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .reveal-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .related-tales {
    margin: 4rem 0;
  }

  .related-tales-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .related-tale-card {
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: all 0.3s ease;
  }

  .related-tale-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .related-tale-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  .related-tale-content {
    padding: 1rem;
  }

  .related-tale-title {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    margin: 0 0 0.5rem;
    color: #BD9648;
  }

  .related-tale-type {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.7);
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  }

  .nav-button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 6px;
    background: rgba(31, 27, 45, 0.6);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .nav-button:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .footer {
    background: rgba(19, 17, 28, 1);
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(189, 150, 72, 0.2);
  }

  .footer-text {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .divider {
    width: 100%;
    max-width: 600px;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0) 0%, rgba(189, 150, 72, 0.6) 50%, rgba(189, 150, 72, 0) 100%);
    margin: 4rem auto;
  }

  @media (max-width: 768px) {
    .tale-container {
      padding: 2rem 1.5rem;
    }

    .tale-header {
      padding: 3rem 1.5rem 1.5rem;
    }

    .tale-meta {
      gap: 1rem;
    }

    .related-tales-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<svelte:head>
  <title>{tale.title} - Tavern Tales - Treasure Tavern</title>
  <meta name="description" content={tale.excerpt} />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<div class="page-container">
  <header class="tale-header">
    <div class="tale-meta">
      <div class="tale-meta-item">
        <i class="fas fa-quill meta-icon"></i>
        <span>{tale.author}</span>
      </div>
      <div class="tale-meta-item">
        <i class="fas fa-moon meta-icon"></i>
        <span>{tale.date}</span>
      </div>
      <div class="tale-type">{tale.type}</div>
    </div>
    <h1>{tale.title}</h1>
    <div class="header-decor"></div>
  </header>

  <main class="tale-container">
    <!-- Media display, if applicable -->
    {#if tale.mediaType === 'video' && mediaReady}
      <div class="media-container">
        <div class="video-container">
          <iframe
            src={tale.mediaContent}
            title={tale.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    {:else if tale.mediaType === 'audio' && mediaReady}
      <div class="media-container">
        <div class="audio-container">
          <p class="audio-message">Listen to the audio accompaniment while reading:</p>
          <audio controls>
            <source src={tale.mediaContent} type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    {:else if tale.mediaType === 'interactive'}
      <div class="media-container">
        <div class="interactive-container">
          <p>This tale contains interactive elements. {tale.mediaContent === 'riddles' ? 'Try to solve the riddles before revealing the answers!' : ''}</p>
          {#if tale.mediaContent === 'riddles'}
            <button class="reveal-button" on:click={() => {
              // This would toggle the visibility of answers in a real implementation
              document.querySelectorAll('.riddle-answer').forEach(el => {
                el.classList.toggle('hidden');
              });
              showRiddleAnswers = !showRiddleAnswers;
            }}>
              {showRiddleAnswers ? 'Hide Answers' : 'Reveal Answers'}
            </button>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Tale content -->
    <div class="tale-content">
      {@html tale.content}
    </div>

    <!-- Related tales section -->
    {#if relatedTales.length > 0}
      <div class="related-tales">
        <h2>Related Chronicles</h2>
        <div class="related-tales-grid">
          {#each relatedTales as relatedTale}
            <a href={`/tavern-tales/${relatedTale.slug}`} class="related-tale-card">
              <img src={relatedTale.coverImage} alt={relatedTale.title} class="related-tale-image">
              <div class="related-tale-content">
                <h3 class="related-tale-title">{relatedTale.title}</h3>
                <p class="related-tale-type">{relatedTale.type}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <div class="divider"></div>

    <!-- CTA Section -->
    <AnnouncementCta
      title="Share Your Own Tale"
      description="The Tavern welcomes stories from travelers far and wide. Perhaps you have encountered something strange on your journeys worth recording in our archives?"
      buttonText="Return to Chronicles"
      demoLink="/tavern-tales"
    />

    <div class="navigation">
      <a href="/tavern-tales" class="nav-button">
        <i class="fas fa-arrow-left" style="margin-right: 0.5rem;"></i>
        All Chronicles
      </a>
      <a href="/" class="nav-button">
        Return to Tavern
        <i class="fas fa-home" style="margin-left: 0.5rem;"></i>
      </a>
    </div>
  </main>

  <footer class="footer">
    <p class="footer-text">© {new Date().getFullYear()} Treasure Tavern. All rights reserved.</p>
  </footer>
</div>