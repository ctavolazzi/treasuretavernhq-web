<script lang="ts">
  import { onMount } from 'svelte';
  import { subscribeEmail, isSupabaseConfigured, supabase } from '$lib/supabaseClient';

  let email = '';
  let name = '';
  let subscribed = false;
  let loading = false;
  let error = '';
  let supabaseConfigured = true;
  let newsletterOptIn = true; // Default to checked for better conversion

  // Lantern animation
  let lanternState: 'out' | 'animate' | 'success' = 'out';
  let lanternAnimating = false;
  let lanternAnimationFrame: number;
  let animationStep = 0;
  let lanternImages = [
    '/images/tavern-lantern-out.png',
    '/images/tavern-lantern-2.png',
    '/images/tavern-lantern.png'
  ];
  let currentImageIndex = 0;
  let currentLanternImage = lanternImages[0];

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
        // Start a fancy lighting sequence - first spark animation
        lanternState = 'animate';
        lanternAnimating = true;
        currentImageIndex = 1;
        currentLanternImage = lanternImages[1];

        // After sparking for a moment, fully light the lantern
        setTimeout(() => {
          // Increase the flickering intensity for a moment
          let flickerCount = 0;
          const intenseFade = setInterval(() => {
            flickerCount++;
            currentImageIndex = flickerCount % 2 === 0 ? 1 : 2;
            currentLanternImage = lanternImages[currentImageIndex];

            // After several flickers, settle on fully lit
            if (flickerCount > 6) {
              clearInterval(intenseFade);
              lanternAnimating = false;
              lanternState = 'success';
              currentImageIndex = 2;
              currentLanternImage = lanternImages[2];

              // Finally set subscribed state (after lantern is lit)
              subscribed = true;
            }
          }, 120) as unknown as number;
        }, 800);
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

  // Start lantern animation
  function startLanternAnimation() {
    if (lanternState === 'success') return; // Don't animate if subscription successful

    lanternState = 'animate';
    lanternAnimating = true;

    // Cancel any existing animation
    if (lanternAnimationFrame) {
      cancelAnimationFrame(lanternAnimationFrame);
    }

    // Animation function
    const animate = () => {
      animationStep++;

      // Cycle between the spark (1) and lit (2) images rapidly
      // We use modulo to alternate between 1 and 2 (second and third images)
      if (animationStep % 5 === 0) { // Change image every 5 frames for a nice effect
        currentImageIndex = currentImageIndex === 1 ? 2 : 1;
        currentLanternImage = lanternImages[currentImageIndex];
      }

      if (lanternAnimating) {
        lanternAnimationFrame = requestAnimationFrame(animate);
      }
    };

    // Start the animation
    animate();
  }

  // Stop lantern animation
  function stopLanternAnimation() {
    if (lanternState === 'success') return; // Don't stop if subscription successful

    lanternAnimating = false;
    lanternState = 'out';
    currentImageIndex = 0;
    currentLanternImage = lanternImages[0];

    if (lanternAnimationFrame) {
      cancelAnimationFrame(lanternAnimationFrame);
      lanternAnimationFrame = undefined;
    }
  }

  // Event handlers
  function handleTouchStart() {
    startLanternAnimation();
  }

  function handleTouchEnd() {
    stopLanternAnimation();
  }

  function handleMouseEnter() {
    startLanternAnimation();
  }

  function handleMouseLeave() {
    stopLanternAnimation();
  }

  onMount(() => {
    // Check if Supabase is configured properly
    supabaseConfigured = isSupabaseConfigured();
    if (!supabaseConfigured) {
      console.warn('Supabase is not properly configured. Email submission will be simulated.');
    }

    // Clean up animation on unmount
    return () => {
      if (lanternAnimationFrame) {
        cancelAnimationFrame(lanternAnimationFrame);
      }
    };
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
    font-size: clamp(2.75rem, 6vw, 4.5rem);
    margin: 0 0 0.5rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    letter-spacing: 0.02em;
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
    align-items: flex-start;
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
    width: 1.15rem;
    height: 1.15rem;
    border: 1px solid rgba(189, 150, 72, 0.5);
    border-radius: 4px;
    background: rgba(19, 17, 28, 0.5);
    display: inline-block;
    position: relative;
    margin: 0;
    margin-top: 0.15rem;
    cursor: pointer;
    flex-shrink: 0;
  }

  .newsletter-opt-in input[type="checkbox"]:checked {
    background: rgba(158, 97, 227, 0.7);
    border-color: rgba(158, 97, 227, 0.6);
  }

  .newsletter-opt-in input[type="checkbox"]:checked::after {
    content: '✓';
    font-size: 0.8rem;
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
      margin-bottom: 0.75rem;
    }

    .subheading {
      font-size: clamp(1.1rem, 2.5vw, 1.25rem);
      margin: 0 auto 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      padding: 2.5rem;
    }

    .cta-form {
      padding: 1.75rem;
    }
  }

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
    width: 180px;
    height: 180px;
    cursor: pointer;
    transition: transform 0.2s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .lantern-container:hover {
    transform: translateY(-3px);
  }

  .lantern-container:active {
    transform: translateY(0);
  }

  .lantern-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.1s ease;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
  }

  .lantern-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 215, 107, 0.4) 0%, rgba(255, 215, 107, 0) 70%);
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: -1;
  }

  .lantern-animate .lantern-glow {
    opacity: 0.7;
    background: radial-gradient(circle, rgba(255, 180, 80, 0.6) 0%, rgba(255, 180, 80, 0) 60%);
    animation: flicker 0.3s ease-in-out infinite alternate;
  }

  .lantern-success .lantern-glow {
    opacity: 1;
    background: radial-gradient(circle, rgba(255, 215, 107, 0.7) 0%, rgba(255, 215, 107, 0) 70%);
    animation: pulse 3s infinite alternate;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.15); opacity: 0.8; }
  }

  @keyframes flicker {
    0% { opacity: 0.4; transform: scale(0.98); }
    100% { opacity: 0.7; transform: scale(1.02); }
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
</style>

<main>
  <div class="container">
    <h1>The Door Is Opening</h1>

    <!-- Interactive Lantern with touch/hover animation -->
    <div class="lantern-container lantern-{lanternState}"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      on:touchstart|preventDefault={handleTouchStart}
      on:touchend|preventDefault={handleTouchEnd}
      on:touchcancel|preventDefault={handleTouchEnd}>
      <div class="lantern-glow"></div>
      <img
        src={currentLanternImage}
        alt="Tavern Lantern"
        class="lantern-image"
        draggable="false"
      />
    </div>

    <p class="subheading" style="text-align: center; margin-left: auto; margin-right: auto;">An amusing fantasy universe is coming. Join early to unlock the Tavern.</p>

    {#if !subscribed}
      <form class="cta-form" on:submit|preventDefault={handleSubmit}>
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
            Light the Lantern
            {#if loading}
              <span class="loading"></span>
            {/if}
          </button>
        </div>
      </form>
    {:else}
      <div class="success-message">
        <p>Welcome, traveler! You'll receive word when the Tavern doors open.</p>
        <a href="/announcements" class="announcement-button">Read the Announcements</a>
      </div>
    {/if}

    <p>Become a Friend of the Tavern and receive tales, secrets, and early access to a growing fantasy universe.</p>

    <!-- Exploration Section -->
    <div class="exploration-section">
      <h2 class="exploration-title">Discover the Tavern</h2>
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
  </div>
</main>
