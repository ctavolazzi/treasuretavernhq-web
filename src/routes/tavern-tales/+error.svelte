<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status === 404 ? 'Tale Not Found' : 'Error'} - Tavern Tales</title>
  <meta
    name="description"
    content="The chronicle you seek cannot be found in the Tavern's archives."
  />
</svelte:head>

<div class="error-container">
  <h1 class="error-title">The Tale Has Been Lost to Time</h1>

  <h2 class="error-subtitle">
    {#if $page.status === 404}
      This Path Leads to Nowhere
    {:else}
      A Magical Disturbance
    {/if}
  </h2>

  <div class="illustration"></div>

  <p class="error-message">
    {#if $page.status === 404}
      The chronicle you seek cannot be found in the Tavern's archives. Perhaps it was never written,
      or perhaps it exists only in a realm beyond our reach. The Tavern's keeper suggests exploring
      other tales that have been properly documented.
    {:else}
      {$page.error?.message ||
        'Something unexpected happened while accessing this tale. The mystical forces that maintain the archives are working to restore order.'}
    {/if}
  </p>

  <div class="decorative-divider"></div>

  <div class="error-nav">
    <a href="/tavern-tales" class="error-button primary-button">
      <i class="fas fa-book-open"></i> Browse All Chronicles
    </a>
    <a href="/" class="error-button">
      <i class="fas fa-home"></i> Return to Tavern
    </a>
  </div>
</div>

<style>
  .error-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: clamp(1rem, 3vw, 2rem);
    text-align: center;
    background: linear-gradient(145deg, #13111c 0%, #1f1b2d 60%, #2b1d34 100%);
    color: #f7e8d4;
    width: 100%;
    overflow-x: hidden;
  }

  .error-title {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(1.75rem, 5vw, 3.5rem);
    margin: 0 0 1rem;
    color: #bd9648;
    text-shadow: 0 0 15px rgba(189, 150, 72, 0.3);
    line-height: 1.2;
  }

  .error-subtitle {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.1rem, 3vw, 1.75rem);
    color: #9e61e3;
    margin-bottom: 2rem;
  }

  .error-message {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.6;
    margin-bottom: 2rem;
    color: rgba(247, 232, 212, 0.92);
    max-width: 700px;
    padding: 0 clamp(0.5rem, 2vw, 1rem);
  }

  .decorative-divider {
    width: 100%;
    max-width: 500px;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(189, 150, 72, 0) 0%,
      rgba(189, 150, 72, 0.6) 50%,
      rgba(189, 150, 72, 0) 100%
    );
    margin: clamp(1.5rem, 4vw, 2rem) auto;
    position: relative;
  }

  .decorative-divider::before {
    content: '✧';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1f1b2d;
    padding: 0 1rem;
    color: #bd9648;
  }

  .illustration {
    margin: clamp(1.5rem, 4vw, 2rem) 0;
    max-width: 100%;
    width: clamp(250px, 80vw, 350px);
    height: clamp(180px, 50vw, 250px);
    background: url('/images/lost-traveler.jpg') center/cover no-repeat;
    border-radius: 10px;
    border: 1px solid rgba(189, 150, 72, 0.3);
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .illustration::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(19, 17, 28, 0.3), rgba(19, 17, 28, 0.7));
  }

  .error-nav {
    display: flex;
    gap: clamp(1rem, 3vw, 1.5rem);
    margin-top: clamp(1.5rem, 4vw, 2rem);
    flex-wrap: wrap;
    justify-content: center;
  }

  .error-button {
    padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 6px;
    color: #f7e8d4;
    font-family: 'Cinzel', serif;
    font-size: clamp(0.9rem, 2vw, 1rem);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .error-button:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .primary-button {
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    border: none;
  }

  .primary-button:hover {
    box-shadow: 0 5px 15px rgba(158, 97, 227, 0.3);
  }

  @media (max-width: 480px) {
    .error-nav {
      flex-direction: column;
      width: 100%;
      max-width: 280px;
    }

    .error-button {
      width: 100%;
      justify-content: center;
    }
  }
</style>
