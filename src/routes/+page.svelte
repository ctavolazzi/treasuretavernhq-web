<script lang="ts">
  import { onMount } from 'svelte';
  import { subscribeEmail, isSupabaseConfigured, supabase } from '$lib/supabaseClient';
  import ImageModal from '$lib/components/ImageModal.svelte'; // Import the modal component
  import ImageCarousel from '$lib/components/ImageCarousel.svelte'; // Import the new carousel component
  import ClientOnly from '$lib/components/ClientOnly.svelte'; // Import the ClientOnly wrapper

  let email = '';
  let name = '';
  let subscribed = false;
  let loading = false;
  let error = '';
  let supabaseConfigured = true;
  let newsletterOptIn = true; // Default to checked for better conversion
  let scrollModalOpen = false; // Track if the scroll modal is open
  let scrollImgSrc = '/images/tavern-song-scroll-transparent.png'; // Image source for the modal
  let scrollImgWebpSrc = '/images/tavern-song-scroll-transparent.webp'; // WebP version

  // Carousel images
  const carouselImages = [
    {
      src: '/images/tales/the-bone-kingdom.png',
      webpSrc: '/images/tales/the-bone-kingdom.webp',
      alt: 'The Bone Kingdom - A mysterious realm built from bones that serves as an archive of memories'
    },
    {
      src: '/images/tales/dragon-wizard-music.png',
      webpSrc: '/images/tales/dragon-wizard-music.webp',
      alt: 'Dragon Wizard Music - A magical composition that bridges worlds'
    },
    {
      src: '/images/tales/the-void-boy.png',
      webpSrc: '/images/tales/the-void-boy.webp',
      alt: 'The Void Boy - A tale from the darker corners of the Treasure Tavern universe'
    },
    {
      src: '/images/tales/sorceress-of-storms.png',
      webpSrc: '/images/tales/sorceress-of-storms.webp',
      alt: 'Sorceress of Storms - A powerful mage who commands the elements'
    },
    {
      src: '/images/tales/the-goblin-kings-bet.png',
      webpSrc: '/images/tales/the-goblin-kings-bet.webp',
      alt: 'The Goblin King\'s Bet - A tale of risk and reward in the goblin realm'
    }
  ];

  // Lantern animation
  let lanternState: 'out' | 'animate' | 'success' = 'out';
  let subscriptionSucceeded = false; // Track if user has successfully subscribed

  // URLs for the lantern GIFs and static images
  let lanternAnimationGif = '/gifs/tavern-lantern-animation.gif';
  let lanternSuccessGif = '/gifs/tavern-lantern-success.gif';
  let lanternStaticImage = '/images/tavern-lantern.webp';

  // Fallbacks for browsers that don't support WebP
  let lanternStaticImageFallback = '/images/tavern-lantern.png';

  // Track what image is currently displayed
  let currentLanternImage = lanternAnimationGif;
  let isTouch = false; // Track if the device primarily uses touch
  let supportsWebP = true; // Will be set in onMount
  let isMuted = true; // This will be removed but kept to avoid errors elsewhere
  let audioInitialized = false; // This will be removed but kept to avoid errors elsewhere

  // Handle form submission
  async function handleSubmit() {
    loading = true;
    error = '';

    if (!validateEmail(email)) {
      error = 'Please enter a valid email address';
      loading = false;
      return;
    }

    try {
      // Use the Supabase client function with newsletter opt-in state and optional name
      const result = await subscribeEmail(email, newsletterOptIn, name);

      if (result.success) {
        // Set lantern to success state
        lanternState = 'success';
        currentLanternImage = lanternSuccessGif;
        subscriptionSucceeded = true;
        subscribed = true;
      } else {
        error = result.error || 'Unknown error occurred';
      }
    } catch (err) {
      console.error('Error submitting email:', err);
      error = 'There was an error subscribing. Please try again later.';
    } finally {
      loading = false;
    }
  }

  // Validate email format with proper typing
  function validateEmail(emailToCheck: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailToCheck);
  }

  // Simple event handlers for lantern hover/touch interaction
  function handlePointerEnter(event: PointerEvent) {
    // No action needed - animation is handled by the GIF
    if (lanternState === 'success') {
      currentLanternImage = lanternSuccessGif;
    }
  }

  function handlePointerLeave(event: PointerEvent) {
    // No action needed - animation is handled by the GIF
    if (lanternState === 'success') {
      currentLanternImage = lanternSuccessGif;
    }
  }

  // Event handlers for touch
  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    // No action needed - animation is handled by the GIF
  }

  function handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    // No action needed - animation is handled by the GIF
  }

  // Function to smoothly scroll to the newsletter signup form
  function scrollToNewsletterForm() {
    // Get the newsletter signup form element
    const newsletterForm = document.getElementById('newsletter-signup');
    if (newsletterForm) {
      // Calculate position to ensure form is fully visible
      const rect = newsletterForm.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Get viewport height to ensure proper positioning on different devices
      const viewportHeight = window.innerHeight;
      const formHeight = rect.height;

      // Calculate ideal scroll position:
      // - On small screens, position at the top with padding
      // - On larger screens, center the form if it's small enough
      let targetPosition;

      if (formHeight > viewportHeight * 0.8) {
        // Form is large compared to viewport, position at top with small padding
        targetPosition = rect.top + scrollTop - 30;
      } else {
        // Form can be centered or positioned with more padding
        targetPosition = rect.top + scrollTop - ((viewportHeight - formHeight) / 3);
      }

      // Ensure we don't scroll past the top
      targetPosition = Math.max(0, targetPosition);

      // Smooth scroll to the target position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  onMount(() => {
    // Check if Supabase is configured properly
    supabaseConfigured = isSupabaseConfigured();
    if (!supabaseConfigured) {
      console.warn('Supabase is not properly configured. Email submission will be simulated.');
    }

    // We don't need to set isTouch to true for all devices with touch capability
    // Just detect if touch is being used actively, which happens in handleTouchStart
    isTouch = false;

    // Check for WebP support
    const webpSupport = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;

    supportsWebP = webpSupport;

    // Begin with the static lantern image
    currentLanternImage = lanternAnimationGif;

    // Add Font Awesome for icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  });
</script>

<svelte:head>
  <title>Treasure Tavern - Immersive Fantasy Tales & Adventures</title>
  <meta name="description" content="Discover immersive fantasy stories, interactive adventures, and a vibrant community of storytellers at Treasure Tavern." />
</svelte:head>

<main>
  <!-- Image Modal -->
  <ImageModal
    bind:open={scrollModalOpen}
    imgSrc={supportsWebP ? scrollImgWebpSrc : scrollImgSrc}
    altText="The Tavern Oak - A tavern song written on a scroll"
  />

  <div class="container">
    <!-- Hero Carousel -->
    <div class="hero-carousel">
      <ClientOnly --height="auto" --aspect-ratio="21:9">
        <ImageCarousel
          images={carouselImages}
          aspectRatio="21:9"
          autoplayInterval={6000}
        />
      </ClientOnly>
    </div>

    <h1>
      <div class="welcome-wrapper">
        <span class="welcome-medium">Welcome</span><br>
        <span class="welcome-small">to the</span><br>
        <span class="welcome-large">Treasure</span><br>
        <span class="welcome-large">Tavern</span>
      </div>
    </h1>

    <!-- Welcome to the Tavern Section -->
    <div class="welcome-section">
      <div class="welcome-image-container">
        <a href="/tavern-tales">
          <picture>
            <!-- Desktop (landscape) version -->
            <source
              media="(min-width: 768px)"
              srcset="/images/tavern-90s-main-ad-landscape.webp"
              type="image/webp"
            >
            <source
              media="(min-width: 768px)"
              srcset="/images/tavern-90s-main-ad-landscape.png"
              type="image/png"
            >
            <!-- Mobile (portrait) version -->
            <source
              srcset="/images/tavern-90s-main-ad.webp"
              type="image/webp"
            >
            <img
              src="/images/tavern-90s-main-ad.png"
              alt="Welcome to Treasure Tavern - A fantastical tavern where adventures await"
              class="welcome-image"
              loading="lazy"
            />
          </picture>
        </a>
      </div>
      <h2 class="welcome-title">The Door<br class="mobile-break">Is Opening</h2>
      <p class="welcome-description">
        Step through our magical doorway and find yourself in a realm where legends come alive, treasures await discovery,
        and fellow adventurers gather to share their tales by the hearth.
      </p>
      <p class="welcome-description">
        Treasure Tavern is a fantasy universe created and updated to entertain and offer an escape from the real world. It's a work of fiction, an online store, an interactive social media experience, and more - a multifaceted realm where imagination meets community.
      </p>
      <p class="welcome-footer">
        Pull up a chair, order your favorite brew, and make yourself at home. The Tavern Keeper has been expecting you.
      </p>

      <!-- Navigation buttons -->
      <div class="welcome-nav-buttons">
        <a href="/about" class="welcome-nav-button">
          <div class="button-content">
            <span class="button-text">What is the Treasure Tavern?</span>
          </div>
        </a>
        <a href="/tavern-tales" class="welcome-nav-button tales-button">
          <div class="button-content">
            <i class="fas fa-book-open welcome-nav-icon"></i>
            <span class="button-text">Read Tavern Tales</span>
          </div>
        </a>
      </div>
    </div>

    <!-- Benefits Section -->
    <section class="benefits">
      <div class="benefits-pattern"></div>
      <h2 class="benefits-title">What You'll Discover</h2>
      <p class="benefits-subtitle">
        Step into a world of imagination and adventure, where every visit to the Treasure Tavern brings new experiences.
      </p>

      <div class="benefits-grid">
        <div class="benefit-card">
          <span class="benefit-icon">
            <i class="fas fa-book-open"></i>
          </span>
          <h3 class="benefit-title">Immersive Stories</h3>
          <p class="benefit-desc">
            Dive into captivating tales set in our rich, detailed fantasy world created by our community of storytellers.
          </p>
        </div>

        <div class="benefit-card">
          <span class="benefit-icon">
            <i class="fas fa-users"></i>
          </span>
          <h3 class="benefit-title">Vibrant Community</h3>
          <p class="benefit-desc">
            Join fellow adventurers, storytellers, and creators who share your passion for fantasy and adventure.
          </p>
        </div>

        <div class="benefit-card">
          <span class="benefit-icon">
            <i class="fas fa-magic"></i>
          </span>
          <h3 class="benefit-title">Magical Experiences</h3>
          <p class="benefit-desc">
            Encounter wonders, mysteries, and magical moments that will transport you to realms beyond imagination.
          </p>
        </div>

        <div class="benefit-card">
          <span class="benefit-icon">
            <i class="fas fa-paint-brush"></i>
          </span>
          <h3 class="benefit-title">Creative Freedom</h3>
          <p class="benefit-desc">
            Express yourself through stories, art, and collaborative world-building in our ever-expanding universe.
          </p>
        </div>
      </div>

      <!-- Benefits CTA -->
      <div class="benefits-cta">
        <a href="/about" class="benefits-button">Explore All Benefits</a>
      </div>
    </section>

    <!-- Interactive Lantern with unified pointer events and touch handling -->
    <a href="#newsletter-signup" id="lantern" class="lantern-container lantern-{lanternState}"
      on:pointerenter={handlePointerEnter}
      on:pointerleave={handlePointerLeave}
      on:touchstart|preventDefault={handleTouchStart}
      on:touchend|preventDefault={handleTouchEnd}
      on:touchcancel|preventDefault={handleTouchEnd}
      on:click|preventDefault={() => scrollToNewsletterForm()}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToNewsletterForm();
        }
      }}
      role="button"
      tabindex="0"
      aria-label="Interactive lantern - click to sign up to the newsletter">
      <div class="lantern-glow"></div>
      <img
        src={currentLanternImage}
        alt="Tavern Lantern"
        class="lantern-image"
        draggable="false"
        style="max-width:300px; max-height:300px; width:300px; height:300px;"
        on:error={(e) => {
          // Try to handle error gracefully by falling back to PNG if WebP fails
          const imgElement = e.currentTarget as HTMLImageElement;
          if (imgElement.src.endsWith('.webp')) {
            const fallbackSrc = imgElement.src.replace('.webp', '.png');
            imgElement.src = fallbackSrc;
          }
        }}
      />
    </a>

    <p class="subheading-emphasis" style="text-align: center; margin-left: auto; margin-right: auto; margin-top: 2rem;">Light the Lantern</p>
    <p class="subheading" style="text-align: center; margin-left: auto; margin-right: auto;">An amusing fantasy universe is coming. Join early to unlock the Tavern.</p>

    <!-- Tavern Tales Promotion Section -->
    <section class="tales-promotion">
      <div class="tales-promotion-container">
        <div class="tales-promotion-image-container">
          <img
            src="/images/treasure-tavern-tales.png"
            alt="Treasure Tavern Tales - A collection of magical stories from our fantasy universe"
            class="tales-promotion-image"
            loading="lazy"
          />
        </div>
        <div class="tales-promotion-content">
          <h2 class="tales-promotion-title">Embark on Magical Journeys</h2>
          <p class="tales-promotion-text">
            Discover a growing collection of enchanting tales from the Treasure Tavern universe.
            From the mysterious Bone Kingdom to the mischievous Goblin King, each story offers
            a window into our rich fantasy world filled with magic, adventure, and wonder.
          </p>
          <a href="/tavern-tales" class="tales-promotion-button">
            <span>Explore Tavern Tales</span>
            <i class="fas fa-book-open"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Newsletter Sign-up Form -->
    <form id="newsletter-signup" class="cta-form" on:submit|preventDefault={handleSubmit}>
      {#if !subscribed}
        <p class="form-intro">Be the first to know - put your email below!</p>

        <div class="input-wrapper">
          <input
            type="email"
            bind:value={email}
            placeholder="Enter your email address"
            required
          />
          <input
            type="text"
            bind:value={name}
            placeholder="Your name (optional)"
          />
          {#if error}
            <div class="error-message">{error}</div>
          {/if}

          <div class="checkbox-wrapper">
            <label class="newsletter-opt-in">
              <input
                type="checkbox"
                bind:checked={newsletterOptIn}
              />
              <span class="checkbox-text">Send me magical updates from the Tavern</span>
            </label>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" disabled={loading}>
            Join the Email List
            {#if loading}
              <span class="loading"></span>
            {/if}
          </button>
        </div>
      {:else}
        <div class="success-message">
          <p>Welcome, traveler! You'll receive word when the Tavern doors open.</p>
          <a href="/announcements" class="announcement-button">Read the Announcements</a>
        </div>
      {/if}
    </form>

    <p>Become a Friend of the Tavern and receive tales, secrets, and early access to a growing fantasy universe.</p>

    <!-- Tavern Tales Lead-in Section -->
    <div class="tavern-tales-lead">
      <h2 class="tavern-tales-title">Discover the Tavern Tales</h2>
      <p class="tavern-tales-description">
        Step into a world of fantasy and adventure with our collection of tales, poems, and songs.
        Each story is a unique journey waiting to be explored.
      </p>
      <a href="/tavern-tales" class="tavern-tales-image-link">
        <picture>
          <source srcset="/images/tavern-90s-landscape-tavern-girl-ad.webp" type="image/webp">
          <img
            src="/images/tavern-90s-landscape-tavern-girl-ad.png"
            alt="A mystical tavern landscape with a welcoming tavern girl"
            class="tavern-tales-image"
            loading="lazy"
          />
        </picture>
      </a>
      <a href="/tavern-tales" class="tavern-tales-button">Read the Lore</a>
    </div>

    <!-- Exploration Section -->
    <div class="exploration-section">
      <h2 class="exploration-title">Explore the Tavern</h2>
      <p class="exploration-description">Treasure Tavern is a fantastical universe filled with mythical characters, magical artifacts, and extraordinary tales. Explore our world through the links below and begin your journey.</p>

      <div class="exploration-links">
        <a href="/tavern-tales" class="exploration-card">
          <div class="card-icon">📜</div>
          <h3>Tavern Tales</h3>
          <p>Immerse yourself in fantastical stories from across the realm</p>
        </a>

        <a href="/about" class="exploration-card">
          <div class="card-icon">🏮</div>
          <h3>About</h3>
          <p>Learn the history and purpose of the mystical Treasure Tavern</p>
        </a>

        <a href="/newsletter" class="exploration-card">
          <div class="card-icon">📯</div>
          <h3>Newsletter</h3>
          <p>Subscribe to receive magical updates and exclusive content</p>
        </a>

        <a href="/announcements" class="exploration-card">
          <div class="card-icon">📣</div>
          <h3>Announcements</h3>
          <p>Hear the latest news and upcoming events from the Tavern</p>
        </a>

        <a href="/contact" class="exploration-card">
          <div class="card-icon">💌</div>
          <h3>Contact</h3>
          <p>Send a message to the Tavern Keepers with questions or tales</p>
        </a>

        <a href="/demo" class="exploration-card">
          <div class="card-icon">✨</div>
          <h3>Demo</h3>
          <p>Experience interactive previews of upcoming features</p>
        </a>
      </div>
    </div>

    <!-- Ultimate Vision Section -->
    <div class="vision-section">
      <div class="vision-content">
        <div class="vision-text">
          <h2 class="vision-title">Our Ultimate Vision</h2>
          <div class="vision-title-decoration"></div>
          <p class="vision-description">
            The ultimate vision of Treasure Tavern is to create an interactive AI-generated gaming experience where you can contribute to our shared universe through writing, art, and gameplay—all within our canonical world.
          </p>
          <div class="vision-buttons">
            <a href="/about#vision" class="vision-button primary">
              <i class="fas fa-crown"></i> Learn About Our Vision
            </a>
            <a href="/waitlist" class="vision-button secondary">
              <i class="fas fa-user-plus"></i> Join the Waitlist
            </a>
          </div>
        </div>
        <div class="vision-image-container">
          <picture>
            <img
              src="/images/the-bone-king-rune-sword.png"
              alt="The Bone King's Rune Sword - A legendary artifact from the Treasure Tavern universe"
              class="vision-image"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>

    <!-- Tavern Atmosphere Section -->
    <div class="tavern-atmosphere">
      <h2 class="atmosphere-title">Tales from Patrons</h2>
      <div class="atmosphere-title-decoration"></div>

      <div class="testimonials-container">
        <div class="testimonial">
          <div class="quote-icon">❝</div>
          <p class="atmosphere-quote">
            Lost my lucky dagger in a bet with a goblin last spring. Found it hanging above the hearth at Treasure Tavern three moons later. This place has a way of gathering lost treasures and wayward souls alike. Best mead in seven kingdoms too!
          </p>
          <p class="quote-attribution">— Durnin Axebeard, <span class="attribution-title">Dwarven Merchant</span></p>
        </div>

        <div class="testimonial">
          <div class="quote-icon">❝</div>
          <p class="atmosphere-quote">
            My songs have echoed in the halls of emperors, but nowhere do they resonate with such magic as within these tavern walls. The patrons here don't just listen to tales—they live them, breathe them, become part of them.
          </p>
          <p class="quote-attribution">— Lyra Silverstring, <span class="attribution-title">Elven Bard</span></p>
        </div>

        <div class="testimonial">
          <div class="quote-icon">❝</div>
          <p class="atmosphere-quote">
            Been traversing the Shadowlands for nigh on forty years. Only place where both the living and spectral feel welcome is Treasure Tavern. The keeper doesn't ask questions when you order two ales but drink alone.
          </p>
          <p class="quote-attribution">— Morvath the Gray, <span class="attribution-title">Spirit Walker</span></p>
        </div>
      </div>

      <div class="tavern-song">
        <h3 class="song-title">The Tavern Oak</h3>
        <div class="song-title-decoration"></div>
        <div
          class="scroll-image-container"
          on:click={() => scrollModalOpen = true}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && (scrollModalOpen = true)}
          aria-label="Open tavern song scroll"
        >
          <div class="scroll-frame">
            <picture>
              <source srcset={scrollImgWebpSrc} type="image/webp">
              <img
                src={scrollImgSrc}
                alt="The Tavern Oak - A tavern song written on a scroll"
                class="tavern-song-scroll"
                loading="lazy"
              />
            </picture>
          </div>
          <div class="view-larger-hint">
            <span>Click to enlarge</span>
          </div>
        </div>
        <div class="song-notes">
          <span class="music-note">♫</span>
          <span class="music-note delayed">♪</span>
        </div>
      </div>
    </div>
  </div>
</main>

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
    padding-top: 0.5rem;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    margin: 0 auto 1.5rem;
    font-weight: 700;
    line-height: 0.85;
    color: #F7E8D4;
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
    line-height: 1;
  }

  .welcome-medium {
    font-size: clamp(1.75rem, 4vw, 3rem);
    letter-spacing: 0.05em;
    font-weight: 600;
    display: block;
    margin-bottom: -0.25em;
    padding-top: 0.3em;
    line-height: 1;
    white-space: nowrap;
  }

  .welcome-small {
    font-size: clamp(1.1rem, 2.5vw, 1.8rem);
    letter-spacing: 0.12em;
    opacity: 0.85;
    font-weight: 400;
    display: block;
    margin-bottom: -0.25em;
    line-height: 1;
    white-space: nowrap;
  }

  .welcome-large {
    font-size: clamp(3.2rem, 7vw, 5.0rem);
    letter-spacing: 0.04em;
    line-height: 1;
    display: block;
    margin-top: 0;
    margin-bottom: -0.05em;
    color: #D5A44C; /* Warmer gold color */
    text-shadow: 0 0 15px rgba(213, 164, 76, 0.5), 0 0 30px rgba(213, 164, 76, 0.3);
    font-weight: 800;
    white-space: nowrap;
  }

  .brand-heading {
    color: #BD9648;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    text-transform: uppercase;
    letter-spacing: 0.25em;
    margin-bottom: 0.75rem;
    font-family: 'Cinzel', serif;
    font-weight: 500;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    opacity: 0.95;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin: 0 0 1rem;
    line-height: 1.4;
    color: rgba(247, 232, 212, 0.92);
    font-family: 'Spectral', serif;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }

  .subheading {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: clamp(1.05rem, 2.5vw, 1.2rem);
    margin: 0 auto 1.25rem;
    font-weight: 400;
    line-height: 1.4;
    color: rgba(247, 232, 212, 0.78);
    max-width: 580px;
    text-align: center;
  }

  .cta-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 420px;
    margin: 0 auto 1.25rem;
    background: rgba(20, 17, 30, 0.4);
    padding: 1.25rem;
    padding-top: 0.85rem;
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(247, 232, 212, 0.25);
    border-radius: 6px;
    background: rgba(19, 17, 28, 0.6);
    color: #F7E8D4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1rem;
    outline: none;
    transition: all 0.25s ease;
    margin-bottom: 0.5rem;
  }

  input:focus {
    border-color: rgba(189, 150, 72, 0.6);
    box-shadow: 0 0 12px rgba(189, 150, 72, 0.25);
  }

  input::placeholder {
    color: rgba(247, 232, 212, 0.45);
    font-weight: 300;
  }

  input:last-of-type {
    margin-bottom: 0.35rem;
  }

  button {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(122, 60, 163, 0.3);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(122, 60, 163, 0.4);
    background: linear-gradient(135deg, #AF71F4 0%, #8547B0 100%);
  }

  button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(122, 60, 163, 0.3);
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .success-message {
    margin-top: 1.25rem;
    margin-left: auto;
    margin-right: auto;
    padding: 1.25rem;
    background: rgba(52, 168, 83, 0.1);
    border: 1px solid rgba(52, 168, 83, 0.25);
    border-radius: 8px;
    color: #F7E8D4;
    animation: fadeIn 0.5s ease-in;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .success-message p {
    margin-bottom: 1.25rem;
  }

  .announcement-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 12px rgba(122, 60, 163, 0.3);
  }

  .announcement-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(122, 60, 163, 0.4);
    background: linear-gradient(135deg, #AF71F4 0%, #8547B0 100%);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loading {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(247, 232, 212, 0.3);
    border-radius: 50%;
    border-top-color: #F7E8D4;
    animation: spin 1s linear infinite;
    margin-left: 0.4rem;
    vertical-align: middle;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-message {
    margin-top: 0.25rem;
    margin-bottom: 0.35rem;
    color: #ff7c7c;
    font-size: 0.9rem;
    font-family: 'Inter', system-ui, sans-serif;
    animation: fadeIn 0.5s ease-in;
  }

  .checkbox-wrapper {
    margin-top: 0.35rem;
    margin-bottom: 0.4rem;
    text-align: left;
  }

  .newsletter-opt-in {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.9);
    transition: color 0.3s ease;
  }

  .newsletter-opt-in:hover {
    color: rgba(247, 232, 212, 1);
  }

  .newsletter-opt-in input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 0.9rem;
    height: 0.9rem;
    border: 1px solid rgba(189, 150, 72, 0.5);
    border-radius: 4px;
    background: rgba(19, 17, 28, 0.5);
    display: inline-block;
    position: relative;
    margin: 0;
    cursor: pointer;
    flex-shrink: 0;
  }

  .newsletter-opt-in input[type="checkbox"]:checked {
    background: rgba(158, 97, 227, 0.7);
    border-color: rgba(158, 97, 227, 0.6);
  }

  .newsletter-opt-in input[type="checkbox"]:checked::after {
    content: '✓';
    font-size: 0.7rem;
    color: #F7E8D4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .newsletter-opt-in input[type="checkbox"]:focus {
    box-shadow: 0 0 5px rgba(189, 150, 72, 0.3);
    outline: none;
  }

  .checkbox-text {
    line-height: 1.2;
  }

  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .form-intro {
    margin: 0 0;
    font-weight: 700;
    color: #BD9648;
    text-align: center;
    font-size: 1rem;
  }

  @media (min-width: 640px) {
    .cta-form {
      max-width: 440px;
      padding: 1.5rem;
    }
  }

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
      line-height: 0.75; /* Extremely tight */
    }
    /* END ADDED */

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
      margin-bottom: -0.25em; /* Very large negative margin */
    }
    /* END ADDED */

    .subheading {
      font-size: clamp(1.1rem, 2.5vw, 1.25rem);
      margin: 0 auto 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      padding: 2.5rem;
    }

    /* ADDED */
    h1 {
        margin-bottom: 0.1rem; /* Almost zero margin */
    }

    h1 .welcome-wrapper {
        line-height: 0.7; /* Extremely tight */
    }

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
        margin-bottom: -0.3em; /* Very large negative margin */
    }
    /* END ADDED */

    .lantern-container {
      width: 300px; /* Updated to 300px as requested */
      height: 300px; /* Updated to 300px as requested */
      margin: 0 auto 0.25rem; /* Center horizontally with auto margins */
    }
    /* END ADDED */

    .cta-form {
      padding: 1.75rem;
    }
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
        line-height: 0.65; /* Extremely tight */
    }

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
        margin-bottom: -0.35em; /* Very large negative margin */
    }
    /* END ADDED */

    h1 .welcome-large {
        font-size: clamp(3.5rem, 7vw, 4.5rem); /* Reduced max font size */
    }

    .lantern-container {
      width: 300px; /* Updated to 300px as requested */
      height: 300px; /* Updated to 300px as requested */
      margin: 0 auto 0.1rem; /* Center horizontally with auto margins */
    }

    /* Adjust section widths to match wider container */
    .welcome-section,
    .exploration-section,
    .vision-section,
    .tavern-atmosphere,
    .testimonials-container {
      max-width: 1100px;
    }

    .vision-content {
        gap: 3rem; /* Increase gap between text and image in vision section */
    }
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

  .lantern-container {
    position: relative;
    margin: 0 auto 1.5rem;
    width: 300px; /* Updated to 300px as requested */
    height: 300px; /* Updated to 300px as requested */
    cursor: pointer;
    transition: transform 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation; /* Improve touch behavior */
    display: block; /* Ensure block display for centering */
  }

  .lantern-container:hover {
    transform: translateY(-5px);
  }

  .lantern-container:active {
    transform: translateY(0);
  }

  .lantern-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.2s ease;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
    will-change: transform, opacity; /* Hint for browser optimization */
    max-width: 300px; /* Match container size */
    max-height: 300px; /* Match container size */
  }

  .lantern-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 215, 107, 0.4) 0%, rgba(255, 215, 107, 0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: -1;
    will-change: opacity, transform; /* Hint for browser optimization */
  }

  /* Add a no-hover fallback animation for touch-only devices */
  @media (hover: none) {
    .lantern-container {
      animation: subtle-pulse 3s infinite alternate;
    }

    @keyframes subtle-pulse {
      0% { transform: translateY(0); }
      100% { transform: translateY(-3px); }
    }
  }

  .lantern-animate .lantern-glow {
    opacity: 0.9;
    background: radial-gradient(circle, rgba(255, 180, 80, 0.8) 0%, rgba(255, 180, 80, 0) 65%);
    animation: flicker 0.4s ease-in-out infinite alternate;
  }

  .lantern-success .lantern-glow {
    opacity: 1;
    background: radial-gradient(circle, rgba(255, 215, 107, 0.8) 0%, rgba(255, 215, 107, 0) 75%);
    animation: pulse 3s infinite alternate;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.2); opacity: 0.9; }
  }

  @keyframes flicker {
    0% { opacity: 0.5; transform: scale(0.98); }
    30% { opacity: 0.75; transform: scale(1.02); }
    60% { opacity: 0.6; transform: scale(1.00); }
    100% { opacity: 0.8; transform: scale(1.03); }
  }

  /* Exploration Section Styles */
  .exploration-section {
    margin-top: 3rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .exploration-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin: 0 0 1rem;
    font-weight: 700;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    text-align: center;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  .exploration-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin: 0 auto 1.5rem;
    text-align: center;
    max-width: 700px;
    color: rgba(247, 232, 212, 0.92);
    line-height: 1.5;
  }

  .exploration-links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: clamp(1rem, 3vw, 1.5rem);
    margin-top: 1.5rem;
  }

  .exploration-card {
    background: rgba(19, 17, 28, 0.6);
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 8px;
    padding: 1.5rem 1.25rem;
    text-decoration: none;
    color: #F7E8D4;
    transition: all 0.3s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .exploration-card:hover {
    transform: translateY(-3px);
    background: rgba(19, 17, 28, 0.7);
    border-color: rgba(189, 150, 72, 0.3);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  .exploration-card h3 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin: 0.75rem 0 0.5rem;
    color: #BD9648;
    font-weight: 600;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  .exploration-card p {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    margin: 0;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.3;
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    .exploration-section {
      padding: 1.25rem;
      margin-top: 2rem;
    }

    .exploration-links {
      grid-template-columns: 1fr;
    }
  }

  /* Tavern Tales Lead-in Section */
  .tavern-tales-lead {
    margin-top: 4rem;
    margin-bottom: 3rem;
    text-align: center;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }

  .tavern-tales-image {
    width: 100%;
    max-width: 800px;
    height: auto;
    border-radius: 8px;
    margin: 2rem auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tavern-tales-image-link {
    display: block;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .tavern-tales-image-link:hover {
    transform: translateY(-5px);
  }

  .tavern-tales-image-link:hover .tavern-tales-image {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }

  .tavern-tales-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    margin: 0 0 1rem;
    font-weight: 700;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  .tavern-tales-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin: 0 auto 1.5rem;
    text-align: center;
    max-width: 700px;
    color: rgba(247, 232, 212, 0.92);
    line-height: 1.5;
  }

  .tavern-tales-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    font-weight: 500;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(122, 60, 163, 0.3);
    margin-top: 1rem;
  }

  .tavern-tales-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(122, 60, 163, 0.4);
    background: linear-gradient(135deg, #AF71F4 0%, #8547B0 100%);
  }

  @media (max-width: 768px) {
    .tavern-tales-lead {
      margin-top: 3rem;
      margin-bottom: 2rem;
    }

    .tavern-tales-image {
      margin: 1.5rem auto;
    }
  }

  /* Welcome Section Styles */
  .welcome-section {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    padding: 2rem 1.5rem;
    border-radius: 10px;
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .welcome-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    margin: 0 0 1rem;
    font-weight: 700;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    max-width: 100%;
    line-height: 1.3;
    white-space: nowrap;
    display: inline-block;
  }

  .mobile-break {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-break {
      display: block;
    }
  }

  .welcome-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin: 0 auto 1.5rem;
    text-align: center;
    max-width: 700px;
    color: rgba(247, 232, 212, 0.92);
    line-height: 1.5;
  }

  .welcome-image-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 1.5rem;
    position: relative;
  }

  .welcome-image-container a {
    display: block;
    transition: transform 0.3s ease;
  }

  .welcome-image-container a:hover {
    transform: translateY(-3px);
  }

  .welcome-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .welcome-image-container a:hover .welcome-image {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  .welcome-footer {
    font-family: 'Spectral', serif;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    font-style: italic;
    margin: 0.5rem auto 0;
    text-align: center;
    max-width: 700px;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.4;
  }

  /* Welcome navigation buttons */
  .welcome-nav-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .welcome-nav-button {
    background: rgba(31, 27, 45, 0.8); /* Slightly darker base */
    border: 1px solid rgba(189, 150, 72, 0.3); /* Slightly more visible border */
    border-radius: 6px;
    padding: 0.75rem 1rem; /* Base padding */
    color: #F7E8D4;
    text-decoration: none;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem; /* Base font size */
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 180px;
    max-width: 220px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Subtle base shadow */
  }

  .button-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  }

  .welcome-nav-button:hover {
    background: rgba(31, 27, 45, 0.9); /* Slightly lighter hover bg */
    border-color: rgba(189, 150, 72, 0.6); /* Brighter hover border */
    transform: translateY(-2px) scale(1.02); /* Add subtle scale */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); /* Slightly stronger hover shadow */
  }

  .welcome-nav-icon {
    color: #BD9648;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3)); /* Subtle icon shadow */
    font-size: 1.1rem; /* Slightly increased size */
  }

  /* Special style for Tales button with gold glow */
  .tales-button {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15), 0 0 12px rgba(189, 150, 72, 0.3); /* Base shadow with stronger glow */
    border-color: rgba(189, 150, 72, 0.5); /* More visible gold border */
    background: linear-gradient(to bottom, rgba(31, 27, 45, 0.8) 0%, rgba(31, 27, 45, 0.8) 98%, rgba(189, 150, 72, 0.2) 100%); /* Subtle gold bottom edge */
  }

  .tales-button:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(189, 150, 72, 0.5); /* Stronger hover shadow with enhanced glow */
    border-color: rgba(189, 150, 72, 0.7); /* Brighter border on hover */
  }

  .tales-button .welcome-nav-icon {
    filter: drop-shadow(0 0 4px rgba(189, 150, 72, 0.6)); /* Enhanced gold glow for the icon */
    color: #D4A74F; /* Brighter gold color for icon */
  }

  /* Mobile specific adjustments for welcome nav buttons */
  @media (max-width: 768px) {
    .welcome-nav-buttons {
      flex-direction: column; /* Stack buttons vertically */
      align-items: stretch; /* Make buttons take full width */
      gap: 0.75rem; /* Slightly reduce gap for vertical stacking */
    }

    .welcome-nav-button {
      padding: 1rem 1.25rem; /* Increase padding for larger touch target */
      font-size: 1rem; /* Increase font size slightly */
      min-width: unset; /* Remove min-width constraint */
      max-width: unset; /* Remove max-width constraint */
      flex-basis: auto; /* Allow button height to adjust to content */
    }
  }

  /* Benefits Section Styles */
  .benefits-section {
    width: 100%;
    max-width: 1100px;
    margin: 4rem auto 5rem;
    padding: 2rem 1rem;
    position: relative;
  }

  .benefits-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bd9648' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: -1;
  }

  .benefits-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: #BD9648;
    margin-bottom: 0.25rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    position: relative;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }

  .benefits-title::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0), rgba(189, 150, 72, 0.6), rgba(189, 150, 72, 0));
  }

  .benefits-subtitle {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.25rem);
    color: rgba(247, 232, 212, 0.9);
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 640px) {
    .benefits-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .benefits-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .benefit-card {
    background: rgba(31, 27, 45, 0.7);
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(189, 150, 72, 0.6);
  }

  .benefit-card:hover .benefit-icon {
    text-shadow: 0 0 20px rgba(153, 102, 204, 0.9);
  }

  .benefit-icon {
    color: #9966CC;
    font-size: 2rem;
    margin-bottom: 1rem;
    transition: text-shadow 0.3s ease;
  }

  .benefit-title {
    font-family: 'Cinzel', serif;
    color: #BD9648;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    text-align: center;
  }

  .benefit-desc {
    color: rgba(247, 232, 212, 0.8);
    text-align: center;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .benefits-cta {
    margin-top: 1rem;
    margin-bottom: 2.5rem;
    display: flex;
    justify-content: center;
  }

  .benefits-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #BD9648 0%, #E5C989 50%, #BD9648 100%);
    color: #1c1c1c;
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 12px rgba(189, 150, 72, 0.5);
    border: 2px solid rgba(189, 150, 72, 0.2);
    position: relative;
    overflow: hidden;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
    letter-spacing: 0.5px;
    gap: 10px;
  }

  .benefits-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.7s ease;
  }

  .benefits-button::after {
    content: '→';
    margin-left: 8px;
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }

  .benefits-button:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(189, 150, 72, 0.6);
    border-color: rgba(189, 150, 72, 0.4);
  }

  .benefits-button:hover::before {
    left: 100%;
  }

  .benefits-button:hover::after {
    transform: translateX(4px);
  }

  /* Hero Carousel Styles */
  .hero-carousel {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 2rem;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  /* On smaller screens, adjust margin */
  @media (max-width: 768px) {
    .hero-carousel {
      margin-bottom: 1.5rem;
    }

    .container {
      max-width: 100%;
      padding: 0 0.5rem;
    }
  }

  /* Tavern Tales Promotion Section */
  .tales-promotion {
    margin: 3rem 0;
    padding: 3rem 1rem;
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, rgba(31, 27, 45, 0.95) 0%, rgba(43, 29, 52, 0.95) 100%);
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .tales-promotion::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0.1), rgba(189, 150, 72, 0.7), rgba(189, 150, 72, 0.1));
  }

  .tales-promotion-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
  }

  @media (min-width: 900px) {
    .tales-promotion-container {
      flex-direction: row;
    }
  }

  .tales-promotion-image-container {
    flex: 1;
    max-width: 100%;
  }

  .tales-promotion-image {
    width: 100%;
    height: auto;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(189, 150, 72, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .tales-promotion-image:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(189, 150, 72, 0.4);
  }

  .tales-promotion-content {
    flex: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  .tales-promotion-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: #BD9648;
    margin-bottom: 1rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .tales-promotion-text {
    color: rgba(247, 232, 212, 0.9);
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .tales-promotion-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #5e4a9c 0%, #9966CC 100%);
    color: #FFFFFF;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.9rem 2rem;
    border-radius: 50px;
    border: none;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: fit-content;
    gap: 0.75rem;
  }

  .tales-promotion-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(153, 102, 204, 0.4);
    background: linear-gradient(135deg, #6a54b2 0%, #a575e0 100%);
  }

  /* Newsletter form styles */
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 420px;
    margin: 0 auto 1.25rem;
    background: rgba(20, 17, 30, 0.4);
    padding: 1.25rem;
    padding-top: 0.85rem;
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .newsletter-header {
    text-align: center;
    margin-bottom: 1rem;
  }

  .newsletter-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(247, 232, 212, 0.25);
    border-radius: 6px;
    background: rgba(19, 17, 28, 0.6);
    color: #F7E8D4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1rem;
    outline: none;
    transition: all 0.25s ease;
  }

  input:focus {
    border-color: rgba(189, 150, 72, 0.6);
    box-shadow: 0 0 12px rgba(189, 150, 72, 0.25);
  }

  input::placeholder {
    color: rgba(247, 232, 212, 0.45);
    font-weight: 300;
  }

  input:last-of-type {
    margin-bottom: 0.35rem;
  }

  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  button {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(122, 60, 163, 0.4);
    background: linear-gradient(135deg, #AF71F4 0%, #8547B0 100%);
  }

  button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(122, 60, 163, 0.3);
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Add styles for vision section */
  .vision-section {
    margin: 4rem auto;
    padding: 2.5rem 1.5rem;
    background: linear-gradient(145deg, rgba(31, 27, 45, 0.7) 0%, rgba(43, 29, 52, 0.7) 100%);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(189, 150, 72, 0.2);
    max-width: 1100px;
  }

  .vision-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0.1), rgba(189, 150, 72, 0.7), rgba(189, 150, 72, 0.1));
  }

  .vision-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0.05), rgba(189, 150, 72, 0.3), rgba(189, 150, 72, 0.05));
  }

  .vision-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .vision-content {
      flex-direction: row;
      align-items: center;
    }
  }

  .vision-text {
    flex: 1;
    text-align: center;
  }

  @media (min-width: 768px) {
    .vision-text {
      text-align: left;
      padding-right: 2rem;
    }
  }

  .vision-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    color: #D5A44C;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
    position: relative;
    display: inline-block;
  }

  .vision-title-decoration {
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, rgba(213, 164, 76, 0.2), rgba(213, 164, 76, 0.8), rgba(213, 164, 76, 0.2));
    margin: 0 auto 1.5rem;
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    .vision-title-decoration {
      margin: 0 0 1.5rem;
    }
  }

  .vision-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    color: rgba(247, 232, 212, 0.95);
    margin-bottom: 2rem;
    line-height: 1.6;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 768px) {
    .vision-description {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .vision-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .vision-buttons {
      justify-content: flex-start;
    }
  }

  .vision-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    border-radius: 6px;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    letter-spacing: 0.03em;
  }

  .vision-button.primary {
    background: linear-gradient(135deg, #BD9648 0%, #E5C989 100%);
    color: #1F1B2D;
    border: 1px solid rgba(229, 201, 137, 0.3);
  }

  .vision-button.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(229, 201, 137, 0.3);
    background: linear-gradient(135deg, #E5C989 0%, #BD9648 100%);
  }

  .vision-button.secondary {
    background: rgba(31, 27, 45, 0.6);
    color: #F7E8D4;
    border: 1px solid rgba(247, 232, 212, 0.2);
  }

  .vision-button.secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: rgba(31, 27, 45, 0.8);
    border-color: rgba(247, 232, 212, 0.3);
  }

  .vision-image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vision-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(189, 150, 72, 0.2);
    transform: rotate(2deg);
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }

  .vision-image:hover {
    transform: rotate(0deg) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 30px rgba(189, 150, 72, 0.3);
  }

  /* Tales from Patrons styles */
  .tavern-atmosphere {
    margin: 5rem auto;
    max-width: 1000px;
    padding: 0 1.5rem;
  }

  .atmosphere-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    color: #D5A44C;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
    text-align: center;
  }

  .atmosphere-title-decoration {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, rgba(213, 164, 76, 0.1), rgba(213, 164, 76, 0.7), rgba(213, 164, 76, 0.1));
    margin: 0 auto 3rem;
    border-radius: 2px;
  }

  .testimonials-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    .testimonials-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .testimonial {
    background: rgba(31, 27, 45, 0.6);
    padding: 2rem;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(189, 150, 72, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .testimonial:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .quote-icon {
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 3rem;
    color: rgba(213, 164, 76, 0.3);
    font-family: serif;
    line-height: 1;
  }

  .atmosphere-quote {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: rgba(247, 232, 212, 0.9);
    line-height: 1.6;
    font-style: italic;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .quote-attribution {
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    color: #BD9648;
    text-align: right;
    margin: 0;
  }

  .attribution-title {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.85rem;
    color: rgba(247, 232, 212, 0.7);
    font-style: italic;
  }

  /* Tavern Oak styling */
  .tavern-song {
    margin: 3rem auto;
    max-width: 600px;
    text-align: center;
    position: relative;
  }

  .song-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: #D5A44C;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
  }

  .song-title-decoration {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, rgba(213, 164, 76, 0.1), rgba(213, 164, 76, 0.7), rgba(213, 164, 76, 0.1));
    margin: 0 auto 2rem;
    border-radius: 2px;
  }

  .scroll-image-container {
    position: relative;
    max-width: 450px;
    margin: 0 auto;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .scroll-image-container:hover {
    transform: translateY(-5px);
  }

  .scroll-frame {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(189, 150, 72, 0.2);
    border: 1px solid rgba(189, 150, 72, 0.3);
  }

  .tavern-song-scroll {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }

  .scroll-image-container:hover .tavern-song-scroll {
    transform: scale(1.02);
  }

  .view-larger-hint {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(31, 27, 45, 0.85);
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 0.85rem;
    color: rgba(247, 232, 212, 0.9);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .scroll-image-container:hover .view-larger-hint {
    opacity: 1;
  }

  .song-notes {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: rgba(213, 164, 76, 0.6);
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.3);
    transform: rotate(10deg);
  }

  .music-note {
    display: inline-block;
    animation: float 3s ease-in-out infinite;
  }

  .music-note.delayed {
    animation-delay: 1.5s;
    font-size: 1.5rem;
    margin-left: -5px;
  }

  @keyframes float {
    0% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-8px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0); }
  }

  /* ADDED - Reduce space above H1 */
  .hero-carousel {
    margin-bottom: 1rem; /* Reduce space after carousel */
  }
  /* END ADDED */

  /* ADDED - Reduce space above H1 */
  .hero-carousel {
      margin-bottom: 0.75rem; /* Further reduce space */
  }
  /* END ADDED */

  .lantern-container {
    width: 300px; /* Updated to 300px as requested */
    height: 300px; /* Updated to 300px as requested */
    margin: 0 auto 0.25rem; /* Center horizontally with auto margins */
  }

  /* ADDED - Reduce space above H1 */
  .hero-carousel {
      margin-bottom: 0.5rem; /* Minimal space */
  }
  /* END ADDED */

  h1 .welcome-large {
    font-size: clamp(3.5rem, 7vw, 4.5rem); /* Reduced max font size */
  }

  .lantern-container {
    width: 300px; /* Updated to 300px as requested */
    height: 300px; /* Updated to 300px as requested */
    margin: 0 auto 0.1rem; /* Center horizontally with auto margins */
  }
</style>
