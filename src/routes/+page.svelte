<script lang="ts">
  import ExplorationSection from '$lib/components/homepage/ExplorationSection.svelte';
  import TalesPromotion from '$lib/components/homepage/TalesPromotion.svelte';
  import TavernAtmosphere from '$lib/components/homepage/TavernAtmosphere.svelte';
  import WelcomeSection from '$lib/components/homepage/WelcomeSection.svelte';
  import ImageModal from '$lib/components/ImageModal.svelte';
  import { onMount } from 'svelte';
  let scrollModalOpen = false;
  let supportsWebP = true;
  const scrollImgWebpSrc = '/images/tavern-song-scroll-transparent.webp';
  const scrollImgSrc = '/images/tavern-song-scroll-transparent.png';
  onMount(() => {
    // Check for WebP support
    const webpSupport =
      document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    supportsWebP = webpSupport;
  });
</script>

<svelte:head>
  <title>Treasure Tavern - Immersive Fantasy Tales & Adventures</title>
  <meta
    name="description"
    content="Discover immersive fantasy stories, interactive adventures, and a vibrant community of storytellers at Treasure Tavern."
  />
</svelte:head>

<main>
  <!-- Image Modal -->
  <ImageModal
    bind:open={scrollModalOpen}
    imgSrc={supportsWebP ? scrollImgWebpSrc : scrollImgSrc}
    altText="The Tavern Oak - A tavern song written on a scroll"
  />

  <div class="container">
    <h1>
      <div class="welcome-wrapper">
        <span class="welcome-medium">Welcome</span><br />
        <span class="welcome-small">to the</span><br />
        <span class="welcome-large">Treasure</span><br />
        <span class="welcome-large">Tavern</span>
      </div>
    </h1>

    <!-- Welcome to the Tavern Section -->
    <WelcomeSection />

    <!-- Benefits Section (left inline for now; safe extraction later) -->

    <!-- Exploration Section -->
    <ExplorationSection />

    <!-- Tavern Atmosphere Section -->
    <TavernAtmosphere
      {scrollImgWebpSrc}
      {scrollImgSrc}
      onOpenModal={() => (scrollModalOpen = true)}
    />

    <!-- Tavern Tales Promotion Section -->
    <TalesPromotion />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #13111c 0%, #1f1b2d 60%, #2b1d34 100%);
    color: #f7e8d4;
    overflow-x: hidden;
    line-height: 1.4;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.75rem;
    padding-top: 0;
    text-align: center;
    position: relative;
  }

  .container {
    max-width: 700px;
    width: 100%;
    z-index: 2;
    position: relative;
    text-align: center;
    padding-top: 0.25rem; /* Reduced from 0.5rem to half the space */
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    margin: 0 auto 1.5rem;
    font-weight: 700;
    line-height: 0.85;
    color: #f7e8d4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    letter-spacing: 0.02em;
    text-align: center;
    width: 100%;
    overflow: visible;
    padding: 0;
  }

  .welcome-wrapper {
    display: inline-block;
    width: auto;
    margin: 0 auto;
    text-align: center;
    line-height: 0.85; /* Tighter line-height (was 1) */
  }

  .welcome-medium {
    font-size: clamp(1.75rem, 4vw, 3rem);
    letter-spacing: 0.05em;
    font-weight: 600;
    display: block;
    margin-bottom: -0.35em; /* More negative margin to pull up (was -0.25em) */
    padding-top: 0.2em; /* Reduced top padding (was 0.3em) */
    line-height: 0.9; /* Tighter line-height (was 1) */
    white-space: nowrap;
  }

  .welcome-small {
    font-size: clamp(1.1rem, 2.5vw, 1.8rem);
    letter-spacing: 0.12em;
    opacity: 0.85;
    font-weight: 400;
    display: block;
    margin-bottom: -0.35em; /* More negative margin to pull up (was -0.25em) */
    line-height: 0.9; /* Tighter line-height (was 1) */
    white-space: nowrap;
  }

  .welcome-large {
    font-size: clamp(3.2rem, 7vw, 5rem);
    letter-spacing: 0.04em;
    line-height: 0.9; /* Tighter line-height (was 1) */
    display: block;
    margin-top: 0;
    margin-bottom: -0.1em; /* More negative margin (was -0.05em) */
    color: #d5a44c; /* Warmer gold color */
    text-shadow:
      0 0 15px rgba(213, 164, 76, 0.5),
      0 0 30px rgba(213, 164, 76, 0.3);
    font-weight: 800;
    white-space: nowrap;
  }

  /* Removed unused .brand-heading styles */

  /* Removed unused generic paragraph styles */

  /* Removed unused .subheading styles */

  /* Removed unused .cta-form styles */

  /* Removed unused .input-wrapper styles */

  /* Removed unused input styles */

  /* Removed unused input:focus styles */

  /* Removed unused input::placeholder styles */

  /* Removed unused input:last-of-type styles */

  /* Removed unused button styles */

  /* Removed unused button:hover styles */

  /* Removed unused button:active styles */

  /* Removed unused button:disabled styles */

  /* Removed unused .success-message styles */

  /* Removed unused .announcement-button styles */

  /* Removed unused fadeIn keyframes */

  /* Removed unused .loading styles */

  /* Removed unused spin keyframes */

  /* Removed unused .error-message styles */

  /* Removed unused .checkbox-wrapper styles */

  /* Removed unused .checkbox-text styles */

  /* Removed unused .form-actions styles */

  /* Removed unused .form-intro styles */

  /* Removed unused .cta-form media rules for >=640px */

  @media (min-width: 768px) {
    main {
      padding: 2rem;
    }

    h1 {
      font-size: clamp(3.5rem, 6vw, 4.75rem);
      margin-bottom: 0.25rem; /* Minimal margin */
    }

    /* ADDED */
    h1 .welcome-wrapper {
      line-height: 0.65; /* Tighter spacing (was 0.75) */
    }
    /* END ADDED */

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
      margin-bottom: -0.35em; /* More negative margin (was -0.25em) */
    }
    /* END ADDED */

    /* Removed unused .subheading media rules */
  }

  @media (min-width: 1024px) {
    main {
      padding: 2.5rem;
    }

    /* ADDED */
    h1 {
      margin-bottom: 0; /* Remove bottom margin (was 0.1rem) */
    }

    h1 .welcome-wrapper {
      line-height: 0.6; /* Tighter spacing (was 0.7) */
    }

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
      margin-bottom: -0.4em; /* More negative margin (was -0.3em) */
    }
    /* END ADDED */
    /* END ADDED */

    /* Removed unused .cta-form media rules */
  }

  /* ADDED NEW BLOCK */
  @media (min-width: 1200px) {
    .container {
      max-width: 1100px; /* Increase max-width for larger screens */
    }

    main {
      padding: 3rem 4rem; /* Adjust padding for larger screens */
    }

    h1 {
      margin-bottom: 0; /* Zero margin */
    }

    h1 .welcome-wrapper {
      line-height: 0.55; /* Tighter spacing (was 0.65) */
    }

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
      margin-bottom: -0.45em; /* More negative margin (was -0.35em) */
    }
    /* END ADDED */
    /* Removed unused width adjustments for child component classes */
  }
  /* END ADDED NEW BLOCK */

  @media (max-width: 767px) {
    main {
      justify-content: flex-start;
      padding-top: 2rem;
    }

    .container {
      padding-top: 0;
    }
  }

  /* Removed unused lantern container styles */

  /* Removed unused lantern animations */

  /* Removed unused pulse keyframes */

  /* Removed unused flicker keyframes */

  /* Exploration styles moved to src/lib/components/homepage/ExplorationSection.svelte */

  /* Tavern Atmosphere styles moved to src/lib/components/homepage/TavernAtmosphere.svelte */

  /* Removed unused glow keyframes */

  /* Welcome navigation/button styles live in src/lib/components/homepage/WelcomeSection.svelte */
</style>
