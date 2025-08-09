<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status}: {$page.error?.message || 'Error'}</title>
</svelte:head>

<div class="error-container">
  <div class="error-code">{$page.status}</div>

  <h1 class="error-title">
    {#if $page.status === 404}
      The Scroll You Seek Is Not In Our Archives
    {:else}
      A Magical Disturbance Has Occurred
    {/if}
  </h1>

  <p class="error-message">
    {#if $page.status === 404}
      The path you've wandered doesn't seem to lead anywhere in the Tavern's current layout. Perhaps
      the scroll was moved, or perhaps it exists only in another realm.
    {:else}
      {$page.error?.message ||
        "Something went wrong while accessing the Tavern's enchantments. The keeper is working to restore order."}
    {/if}
  </p>

  <a href="/" class="home-link">
    <i class="fas fa-home"></i> Return to the Tavern
  </a>

  <div class="mystical-element"></div>

  <div class="navigation-options">
    <h2 class="nav-title">Other Pathways Within the Tavern:</h2>

    <div class="nav-links">
      <a href="/tavern-tales" class="nav-link">
        <i class="fas fa-book-open"></i> Tavern Tales
      </a>
      <a href="/newsletter" class="nav-link">
        <i class="fas fa-scroll"></i> Chronicles
      </a>
      <a href="/announcements" class="nav-link">
        <i class="fas fa-bullhorn"></i> Announcements
      </a>
    </div>
  </div>

  <nav class="error-nav">
    <a href="/" class="nav-link">Home</a>
    <a href="/about" class="nav-link">About</a>
    <a href="/announcements" class="nav-link">Announcements</a>
  </nav>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #13111c 0%, #1f1b2d 60%, #2b1d34 100%);
    color: #f7e8d4;
    overflow-x: hidden;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  .error-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .error-code {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(6rem, 20vw, 12rem);
    margin: 0;
    line-height: 1;
    background: linear-gradient(135deg, #e7ce8f 0%, #bd9648 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    opacity: 0.8;
    text-shadow: 0 5px 30px rgba(189, 150, 72, 0.4);
  }

  .error-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin: 1rem 0;
    color: #bd9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .error-message {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    line-height: 1.5;
    margin-bottom: 2rem;
    color: rgba(247, 232, 212, 0.92);
    max-width: 600px;
  }

  .navigation-options {
    margin-top: 2rem;
    max-width: 800px;
  }

  .nav-title {
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    color: rgba(247, 232, 212, 0.8);
    margin-bottom: 1rem;
  }

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .nav-link {
    padding: 0.75rem 1.25rem;
    background: rgba(31, 27, 45, 0.6);
    color: #f7e8d4;
    text-decoration: none;
    border-radius: 6px;
    font-family: 'Inter', system-ui, sans-serif;
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-link:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .home-link {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    border: none;
    border-radius: 6px;
    color: #f7e8d4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .home-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .mystical-element {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(189, 150, 72, 0) 0%,
      rgba(189, 150, 72, 0.6) 50%,
      rgba(189, 150, 72, 0) 100%
    );
    margin: 2rem auto;
    overflow: visible;
  }

  .mystical-element::before {
    content: '✧';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #bd9648;
    font-size: 1.5rem;
    background: #1f1b2d;
    padding: 0 0.5rem;
  }
</style>
