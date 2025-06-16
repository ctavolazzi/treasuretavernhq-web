<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { subscribeEmail, isSupabaseConfigured, supabase } from '$lib/supabaseClient';
  import ImageModal from '$lib/components/ImageModal.svelte'; // Import the modal component

  const email = '';
  const name = '';
  let subscribed = false;
  let loading = false;
  let error = '';
  let supabaseConfigured = true;
  const newsletterOptIn = true; // Default to checked for better conversion
  let scrollModalOpen = false; // Track if the scroll modal is open
  const scrollImgSrc = '/images/tavern-song-scroll-transparent.png'; // Image source for the modal
  const scrollImgWebpSrc = '/images/tavern-song-scroll-transparent.webp'; // WebP version

  // Lantern animation
  let lanternState: 'out' | 'animate' | 'success' = 'out';
  let subscriptionSucceeded = false; // Track if user has successfully subscribed

  // URLs for the lantern GIFs and static images
  const lanternAnimationGif = '/gifs/tavern-lantern-animation.gif';
  const lanternSuccessGif = '/gifs/tavern-lantern-success.gif';
  const lanternStaticImage = '/images/tavern-lantern.webp';

  // Fallbacks for browsers that don't support WebP
  const lanternStaticImageFallback = '/images/tavern-lantern.png';

  // Track what image is currently displayed
  let currentLanternImage = lanternAnimationGif;
  let isTouch = false; // Track if the device primarily uses touch
  let supportsWebP = true; // Will be set in onMount
  const isMuted = true; // This will be removed but kept to avoid errors elsewhere
  const audioInitialized = false; // This will be removed but kept to avoid errors elsewhere

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

  function handleTouchEnd(event: TouchEvent) {
    // Touch end is handled by click event, no need for preventDefault
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
        targetPosition = rect.top + scrollTop - (viewportHeight - formHeight) / 3;
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
    // isTouch flag is kept for compatibility but not actively used
    isTouch = false;

    // Check for WebP support
    const webpSupport =
      document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

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
    <div class="welcome-section">
      <div class="welcome-image-container">
        <a href="/tavern-tales">
          <picture>
            <source srcset="/images/tt-landscape-welcome-image.webp" type="image/webp" />
            <img
              src="/images/tt-landscape-welcome-image.png"
              alt="Welcome to Treasure Tavern - A mystical fantasy landscape"
              class="welcome-image"
              loading="lazy"
            />
          </picture>
        </a>
      </div>
      <h2 class="welcome-title">The<br class="mobile-break" /> Door Is Opening</h2>
      <p class="welcome-description">
        Step through our magical doorway and find yourself in a realm where legends come alive,
        treasures await discovery, and fellow adventurers gather to share their tales by the hearth.
      </p>
      <p class="welcome-description">
        Treasure Tavern is a fantasy universe created and updated to entertain and offer an escape
        from the real world. It's a work of fiction, an online store, an interactive social media
        experience, and more - a multifaceted realm where imagination meets community.
      </p>
      <p class="welcome-footer">
        Pull up a chair, order your favorite brew, and make yourself at home. The Tavern Keeper has
        been expecting you.
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
        Step into a world of imagination and adventure, where every visit to the Treasure Tavern
        brings new experiences.
      </p>
      <div class="benefits-grid">
        <div class="benefit-card">
          <span class="benefit-icon">
            <i class="fas fa-book-open"></i>
          </span>
          <h3 class="benefit-title">Curated Tales</h3>
          <p class="benefit-desc">
            Discover carefully collected stories ranging from epic adventures to intimate moments of
            wonder and mystery, all presented in an immersive format.
          </p>
        </div>
      </div>
    </section>

    <!-- Interactive Lantern with unified pointer events and touch handling -->
    <a
      href="#newsletter-signup"
      id="lantern"
      class="lantern-container lantern-{lanternState}"
      on:pointerenter={handlePointerEnter}
      on:pointerleave={handlePointerLeave}
      on:click|preventDefault={() => scrollToNewsletterForm()}
      on:keydown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToNewsletterForm();
        }
      }}
      role="button"
      tabindex="0"
      aria-label="Interactive lantern - click to sign up to the newsletter"
    >
      <div class="lantern-glow"></div>
      <img
        src={currentLanternImage}
        alt="Tavern Lantern"
        class="lantern-image"
        draggable="false"
        style:max-width="300px"
        style:max-height="300px"
        style:height="300px"
        style:width="300px"
        on:error={e => {
          // Try to handle error gracefully by falling back to PNG if WebP fails
          const imgElement = e.currentTarget as HTMLImageElement;
          if (imgElement.src.endsWith('.webp')) {
            const fallbackSrc = imgElement.src.replace('.webp', '.png');
            imgElement.src = fallbackSrc;
          }
        }}
      />
    </a>

    <p
      class="subheading-emphasis"
      style:text-align="center"
      style:margin-left="auto"
      style:margin-top="2rem"
      style:font-size="clamp(2rem, 4vw, 3rem)"
      style:text-shadow="0 0 15px rgba(213, 164, 76, 0.5), 0 0 30px rgba(213, 164, 76, 0.3), 0 0
      45px rgba(213, 164, 76, 0.2)"
      style:font-weight="700"
      style:display="inline-block"
      style:animation="glow 3s ease-in-out infinite alternate"
      style:padding="0.5rem 1.5rem"
      style:position="relative"
      style:letter-spacing="0.1em"
      style:color="#D5A44C"
      style:font-family="'Cinzel Decorative', fantasy"
      style:margin-right="auto"
    >
      LIGHT THE LANTERN
    </p>
    <p
      class="subheading"
      style:text-align="center"
      style:margin-left="auto"
      style:margin-right="auto"
    >
      An amusing fantasy universe is coming. Join early to unlock the Tavern.
    </p>

    <!-- Exploration Section -->
    <div class="exploration-section">
      <h2 class="exploration-title">Explore the Tavern</h2>
      <p class="exploration-description">
        Treasure Tavern is a fantastical universe filled with mythical characters, magical
        artifacts, and extraordinary tales. Explore our world through the links below and begin your
        journey.
      </p>

      <div class="exploration-grid">
        <a href="/about" class="exploration-card">
          <i class="fas fa-info-circle"></i>
          <h3>About</h3>
          <p>Learn more about Treasure Tavern</p>
        </a>
        <a href="/announcements" class="exploration-card">
          <i class="fas fa-bullhorn"></i>
          <h3>Announcements</h3>
          <p>Latest updates and news</p>
        </a>
        <a href="/contact" class="exploration-card">
          <i class="fas fa-envelope"></i>
          <h3>Contact</h3>
          <p>Get in touch with us</p>
        </a>
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
            Lost my lucky dagger in a bet with a goblin last spring. Found it hanging above the
            hearth at Treasure Tavern three moons later. This place has a way of gathering lost
            treasures and wayward souls alike. Best mead in seven kingdoms too!
          </p>
          <p class="quote-attribution">
            — Durnin Axebeard, <span class="attribution-title">Dwarven Merchant</span>
          </p>
        </div>

        <div class="testimonial">
          <div class="quote-icon">❝</div>
          <p class="atmosphere-quote">
            My songs have echoed in the halls of emperors, but nowhere do they resonate with such
            magic as within these tavern walls. The patrons here don't just listen to tales—they
            live them, breathe them, become part of them.
          </p>
          <p class="quote-attribution">
            — Lyra Silverstring, <span class="attribution-title">Elven Bard</span>
          </p>
        </div>

        <div class="testimonial">
          <div class="quote-icon">❝</div>
          <p class="atmosphere-quote">
            Been traversing the Shadowlands for nigh on forty years. Only place where both the
            living and spectral feel welcome is Treasure Tavern. The keeper doesn't ask questions
            when you order two ales but drink alone.
          </p>
          <p class="quote-attribution">
            — Morvath the Gray, <span class="attribution-title">Spirit Walker</span>
          </p>
        </div>
      </div>

      <div class="tavern-song">
        <h3 class="song-title">The Tavern Oak</h3>
        <div class="song-title-decoration"></div>
        <div
          class="scroll-image-container"
          on:click={() => (scrollModalOpen = true)}
          role="button"
          tabindex="0"
          on:keydown={e => e.key === 'Enter' && (scrollModalOpen = true)}
          aria-label="Open tavern song scroll"
        >
          <div class="scroll-frame">
            <picture>
              <source srcset={scrollImgWebpSrc} type="image/webp" />
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

    <!-- Tavern Tales Promotion Section -->
    <div class="tales-promotion" style:margin="4rem auto">
      <div
        class="tales-promotion-container"
        style:display="flex"
        style:gap="2rem"
        style:max-width="1200px"
        style:padding="2rem"
        style:margin="0 auto"
        style:align-items="center"
      >
        <div class="tales-promotion-image" style:flex="1">
          <img
            src="/images/treasure-tavern-tales.png"
            alt="Treasure Tavern Tales - A collection of magical stories"
            style:width="100%"
            style:height="auto"
            style:box-shadow="0 5px 20px rgba(0, 0, 0, 0.5)"
            style:border-radius="10px"
          />
        </div>
        <div class="tales-promotion-content" style:flex="1" style:text-align="left">
          <h2
            style:font-family="'Cinzel', serif"
            style:color="#D5A44C"
            style:margin-bottom="1rem"
            style:font-size="clamp(2rem, 4vw, 2.5rem)"
          >
            Embark on Magical Journeys
          </h2>
          <p
            style:font-family="'Spectral', serif"
            style:font-size="clamp(1.1rem, 2vw, 1.3rem)"
            style:margin-bottom="2rem"
            style:line-height="1.6"
            style:color="rgba(247, 232, 212, 0.92)"
          >
            Discover a growing collection of enchanting tales from the Treasure Tavern universe.
            From the mysterious Bone Kingdom to the mischievous Goblin King, each story offers a
            window into our rich fantasy world filled with magic, adventure, and wonder.
          </p>
          <a
            href="/tavern-tales"
            class="magic-button"
            style:display="inline-flex"
            style:align-items="center"
            style:padding="1rem 2rem"
            style:color="#1F1B2D"
            style:font-size="1.2rem"
            style:text-decoration="none"
            style:transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            style:border="2px solid rgba(189, 150, 72, 0.2)"
            style:overflow="hidden"
            style:text-shadow="0 1px 1px rgba(255, 255, 255, 0.3)"
            style:position="relative"
            style:box-shadow="0 5px 15px rgba(0, 0, 0, 0.3), 0 0 12px rgba(189, 150, 72, 0.5)"
            style:border-radius="50px"
            style:font-weight="600"
            style:font-family="'Cinzel', serif"
            style:background="linear-gradient(135deg, #BD9648 0%, #E5C989 100%)"
            style:gap="0.75rem"
          >
            <i class="fas fa-book-open"></i>
            <span>Explore Tavern Tales</span>
            <i class="fas fa-chevron-right" style:margin-left="0.25rem"></i>
          </a>
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

  .brand-heading {
    color: #bd9648;
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
    color: #f7e8d4;
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
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    color: #f7e8d4;
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
    background: linear-gradient(135deg, #af71f4 0%, #8547b0 100%);
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
    color: #f7e8d4;
    animation: fadeIn 0.5s ease-in;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .announcement-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    color: #f7e8d4;
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

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .loading {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(247, 232, 212, 0.3);
    border-radius: 50%;
    border-top-color: #f7e8d4;
    animation: spin 1s linear infinite;
    margin-left: 0.4rem;
    vertical-align: middle;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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
    color: #bd9648;
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
      line-height: 0.65; /* Tighter spacing (was 0.75) */
    }
    /* END ADDED */

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
      margin-bottom: -0.35em; /* More negative margin (was -0.25em) */
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
      line-height: 0.55; /* Tighter spacing (was 0.65) */
    }

    /* ADDED - Tighter inter-line spacing */
    .welcome-medium,
    .welcome-small {
      margin-bottom: -0.45em; /* More negative margin (was -0.35em) */
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
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-3px);
      }
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
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    100% {
      transform: scale(1.2);
      opacity: 0.9;
    }
  }

  @keyframes flicker {
    0% {
      opacity: 0.5;
      transform: scale(0.98);
    }
    30% {
      opacity: 0.75;
      transform: scale(1.02);
    }
    60% {
      opacity: 0.6;
      transform: scale(1);
    }
    100% {
      opacity: 0.8;
      transform: scale(1.03);
    }
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
    color: #bd9648;
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

  .exploration-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .exploration-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: var(--card-bg);
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-color);
    transition: transform 0.3s ease;
  }

  .exploration-card:hover {
    transform: translateY(-5px);
  }

  .exploration-card i {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .exploration-card h3 {
    margin: 0 0 0.5rem;
  }

  .exploration-card p {
    margin: 0;
    text-align: center;
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
    color: #d5a44c;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
    text-align: center;
  }

  .atmosphere-title-decoration {
    width: 100px;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(213, 164, 76, 0.1),
      rgba(213, 164, 76, 0.7),
      rgba(213, 164, 76, 0.1)
    );
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
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
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
    color: #bd9648;
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
    color: #d5a44c;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
  }

  .song-title-decoration {
    width: 60px;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(213, 164, 76, 0.1),
      rgba(213, 164, 76, 0.7),
      rgba(213, 164, 76, 0.1)
    );
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
    box-shadow:
      0 8px 30px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(189, 150, 72, 0.2);
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
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-8px) rotate(5deg);
    }
    100% {
      transform: translateY(0) rotate(0);
    }
  }

  /* ADDED - Reduce space above H1 */

  .lantern-container {
    width: 300px; /* Updated to 300px as requested */
    height: 300px; /* Updated to 300px as requested */
    margin: 0 auto 0.25rem; /* Center horizontally with auto margins */
  }

  @keyframes glow {
    0% {
      text-shadow:
        0 0 15px rgba(213, 164, 76, 0.5),
        0 0 30px rgba(213, 164, 76, 0.3),
        0 0 45px rgba(213, 164, 76, 0.2);
      box-shadow:
        0 0 20px rgba(213, 164, 76, 0.2),
        inset 0 0 15px rgba(213, 164, 76, 0.1);
    }
    100% {
      text-shadow:
        0 0 20px rgba(213, 164, 76, 0.6),
        0 0 40px rgba(213, 164, 76, 0.4),
        0 0 60px rgba(213, 164, 76, 0.3);
      box-shadow:
        0 0 30px rgba(213, 164, 76, 0.3),
        inset 0 0 20px rgba(213, 164, 76, 0.2);
    }
  }
</style>
