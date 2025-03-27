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
  let audioPlayer: HTMLAudioElement; // Reference to audio player
  let audioControlsElement: HTMLElement; // Reference to audio controls
  let footerElement: HTMLElement; // Reference to footer element
  let audioControlsBottomOffset = 20; // Default bottom position
  let audioControlsVisible = true; // Control visibility of audio controls

  // Lantern animation
  let lanternState: 'out' | 'animate' | 'success' = 'out';
  let lanternAnimating = false;
  let lanternAnimationFrame: number | null = null; // Fix the type by allowing null
  let animationStep = 0;
  let lanternImages = [
    '/images/tavern-lantern-out.webp',
    '/images/tavern-lantern-2.webp',
    '/images/tavern-lantern.webp'
  ];
  // Fallback PNG images for browsers that don't support WebP
  let lanternImagesFallback = [
    '/images/tavern-lantern-out.png',
    '/images/tavern-lantern-2.png',
    '/images/tavern-lantern.png'
  ];
  let currentImageIndex = 0;
  let currentLanternImage = lanternImages[0];
  let isTouch = false; // Track if the device primarily uses touch
  let supportsWebP = true; // Will be set in onMount
  let isMuted = false; // Default to unmuted for audio to play on load

  // Audio control functions
  function toggleMute() {
    if (audioPlayer) {
      isMuted = !isMuted;
      audioPlayer.muted = isMuted;

      if (isMuted) {
        audioPlayer.pause();
      } else if (audioPlayer.paused) {
        audioPlayer.play();
      }
    }
  }

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
    // Remove the success state check to allow hover animation always
    lanternState = 'animate';
    lanternAnimating = true;

    // Store previous state to restore it when hover ends
    const previousIndex = currentImageIndex;

    // Cancel any existing animation
    if (lanternAnimationFrame !== null) {
      cancelAnimationFrame(lanternAnimationFrame);
    }

    // Reset animation step for smooth start
    animationStep = 0;

    // Force image to lantern-2 to start with a visible change
    currentImageIndex = 1;
    currentLanternImage = lanternImages[currentImageIndex];

    // Animation function
    const animate = () => {
      animationStep++;

      // Slower flickering - only change every 4 frames instead of 2
      if (animationStep % 4 === 0) {
        // Alternate between image 1 and 2 (spark and lit states)
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
    // Only go back to "out" state if we weren't in success state
    if (lanternState !== 'success') {
      lanternState = 'out';
      currentImageIndex = 0;
      currentLanternImage = lanternImages[0];
    } else {
      // If we were in success state, go back to fully lit
      currentImageIndex = 2;
      currentLanternImage = lanternImages[2];
    }

    lanternAnimating = false;

    if (lanternAnimationFrame !== null) {
      cancelAnimationFrame(lanternAnimationFrame);
      lanternAnimationFrame = null;
    }
  }

  // Use pointer events for unified handling of mouse and touch
  function handlePointerEnter(event: PointerEvent) {
    // Always start with the spark image (index 1) for immediate visual feedback
    currentImageIndex = 1;
    currentLanternImage = lanternImages[currentImageIndex];
    // Then start the animation
    startLanternAnimation();
  }

  function handlePointerLeave(event: PointerEvent) {
    stopLanternAnimation();
  }

  // Event handlers for touch
  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    // Always start with the spark image (index 1) for immediate visual feedback
    currentImageIndex = 1;
    currentLanternImage = lanternImages[currentImageIndex];
    startLanternAnimation();
  }

  function handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    stopLanternAnimation();
  }

  // Function to handle scroll and prevent audio controls from overlapping footer
  function handleScroll() {
    if (!audioControlsElement) return;

    // Get the footer element every time to ensure we have the latest reference
    const footer = document.querySelector('footer.footer');
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const audioControlsHeight = audioControlsElement.offsetHeight;

    // Check if footer is visible in the viewport
    if (footerRect.top < viewportHeight) {
      // Calculate how much space the footer is taking in the viewport
      const footerVisibleHeight = viewportHeight - footerRect.top;

      // Move audio controls above the footer with a 25px gap (reduced from 40px)
      audioControlsElement.style.bottom = `${footerVisibleHeight + 25}px`;
    } else {
      // Reset to default position
      audioControlsElement.style.bottom = `${audioControlsBottomOffset}px`;
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

    // Check WebP support directly without using the utility function
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';

    webP.onload = () => {
      // WebP is supported
      supportsWebP = true;
      currentLanternImage = lanternImages[currentImageIndex];
      // Start the lantern animation on page load
      startLanternAnimation();
    };

    webP.onerror = () => {
      // WebP is not supported, use PNG fallbacks
      supportsWebP = false;
      lanternImages = lanternImagesFallback;
      currentLanternImage = lanternImages[currentImageIndex];
      // Start the lantern animation on page load
      startLanternAnimation();
    };

    // Initialize audio player and attempt autoplay with multiple approaches
    if (audioPlayer) {
      audioPlayer.volume = 0.3; // Set initial volume to 30%

      // Force unmuted state
      audioPlayer.muted = false;
      isMuted = false;

      // Try to play audio immediately
      const playPromise = audioPlayer.play();

      // Handle autoplay promise (might be rejected due to browser policies)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Initial autoplay attempt failed:', error);

          // Try again with user interaction simulation
          document.addEventListener('click', function autoplayHandler() {
            audioPlayer.play().then(() => {
              // Remove the event listener once we've successfully started playback
              document.removeEventListener('click', autoplayHandler);
            }).catch(e => console.warn('Autoplay still failed after user interaction'));
          }, { once: true });

          // Also try with a slight delay as fallback
          setTimeout(() => {
            if (audioPlayer.paused) {
              audioPlayer.play().catch(e => console.warn('Delayed autoplay attempt also failed'));
            }
          }, 1000);
        });
      }
    }

    // Add Font Awesome for icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    // Set up scroll handling without relying on finding the footer immediately
    window.addEventListener('scroll', handleScroll);

    // Run initial position check after a longer delay to ensure DOM is fully loaded
    setTimeout(handleScroll, 1000);

    // Also check position on window resize
    window.addEventListener('resize', handleScroll);

    // Clean up animation on unmount
    return () => {
      if (lanternAnimationFrame !== null) {
        cancelAnimationFrame(lanternAnimationFrame);
      }
      // Stop audio on unmount
      if (audioPlayer) {
        audioPlayer.pause();
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
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
    transition: transform 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation; /* Improve touch behavior */
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
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
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

  .welcome-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
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

  @media (max-width: 768px) {
    .welcome-section {
      padding: 1.25rem;
      margin-top: 2rem;
    }
  }

  /* Audio Player Styles */
  .audio-controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(31, 27, 45, 0.6);
    padding: 8px 12px;
    border-radius: 30px;
    border: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .audio-controls:hover {
    background: rgba(31, 27, 45, 0.8);
    border-color: rgba(189, 150, 72, 0.5);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }

  .mute-button {
    background: none;
    border: none;
    color: #F7E8D4;
    font-size: 1.2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0;
    box-shadow: none;
    pointer-events: none; /* Allow clicks to pass through to parent */
  }

  .audio-title {
    font-family: 'Spectral', serif;
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.9);
    margin: 0;
    white-space: nowrap;
  }

  /* Tavern Atmosphere Section */
  .tavern-atmosphere {
    margin-top: 4rem;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
    background: rgba(31, 27, 45, 0.4);
    border-top: 1px solid rgba(189, 150, 72, 0.2);
    border-bottom: 1px solid rgba(189, 150, 72, 0.2);
    text-align: center;
    width: 100%;
    max-width: 1000px;
  }

  .atmosphere-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin: 0 0 1.5rem;
    font-weight: 700;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .testimonials-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .testimonial {
    position: relative;
    max-width: 700px;
    margin: 0 auto;
  }

  .atmosphere-quote {
    font-family: 'Spectral', serif;
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
    margin: 0 auto 0.5rem;
    color: rgba(247, 232, 212, 0.95);
    position: relative;
    padding: 0 1.5rem;
  }

  .atmosphere-quote::before,
  .atmosphere-quote::after {
    content: '"';
    font-size: 2rem;
    color: rgba(189, 150, 72, 0.6);
    position: absolute;
    line-height: 1;
  }

  .atmosphere-quote::before {
    left: 0;
    top: -0.2rem;
  }

  .atmosphere-quote::after {
    right: 0;
    bottom: -0.8rem;
  }

  .quote-attribution {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.7);
    margin: 0;
    text-align: right;
    padding-right: 1.5rem;
  }

  .atmosphere-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.5;
    margin: 1.5rem auto 0;
    max-width: 800px;
    color: rgba(247, 232, 212, 0.85);
  }

  .music-note {
    display: inline-block;
    font-size: 1.2rem;
    animation: float 3s infinite ease-in-out;
    margin: 0 0.5rem;
    color: rgba(158, 97, 227, 0.7);
  }

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  }

  @media (min-width: 768px) {
    .testimonials-container {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
    }

    .testimonial {
      flex: 1;
      min-width: 280px;
      max-width: 350px;
    }
  }

  /* Tavern Song Styles */
  .tavern-song {
    margin: 2rem auto 0;
    max-width: 700px;
    text-align: center;
    position: relative;
    padding: 1rem;
    background: rgba(31, 27, 45, 0.5);
    border-radius: 8px;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .song-title {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    color: #BD9648;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .song-lyrics {
    font-family: 'Spectral', serif;
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.8;
    color: rgba(247, 232, 212, 0.95);
  }

  .song-lyrics p {
    margin-bottom: 1.5rem;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    max-width: 100%;
  }

  .song-lyrics p:last-child {
    margin-bottom: 0.5rem;
  }

  .song-notes {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin: 1rem auto 0;
  }

  .delayed {
    animation-delay: 1.5s;
  }
</style>

<main>
  <!-- Audio player -->
  <audio bind:this={audioPlayer} src="/audio/TheTavernOak.mp3" preload="auto" loop></audio>

  <div class="audio-controls" bind:this={audioControlsElement} on:click={toggleMute} role="button" tabindex="0" aria-label={isMuted ? "Unmute tavern music" : "Mute tavern music"} on:keydown={(e) => e.key === 'Enter' && toggleMute()}>
    <div class="mute-button">
      {#if isMuted}
        <i class="fas fa-volume-mute"></i>
      {:else}
        <i class="fas fa-volume-up"></i>
      {/if}
    </div>
    <span class="audio-title">Tavern Music</span>
  </div>

  <div class="container">
    <h1>The Door Is Opening</h1>

    <!-- Welcome to the Tavern Section -->
    <div class="welcome-section">
      <div class="welcome-image-container">
        <picture>
          <source srcset="/images/tavern-90s-main-ad.webp" type="image/webp">
          <img
            src="/images/tavern-90s-main-ad.png"
            alt="Welcome to Treasure Tavern - A fantastical tavern where adventures await"
            class="welcome-image"
            loading="lazy"
          />
        </picture>
      </div>
      <h2 class="welcome-title">Welcome to Treasure Tavern</h2>
      <p class="welcome-description">
        Step through our magical doorway and find yourself in a realm where legends come alive, treasures await discovery,
        and fellow adventurers gather to share their tales by the hearth.
      </p>
      <p class="welcome-footer">
        Pull up a chair, order your favorite brew, and make yourself at home. The Tavern Keeper has been expecting you.
      </p>
    </div>

    <!-- Interactive Lantern with unified pointer events and touch handling -->
    <a href="/announcements" class="lantern-container lantern-{lanternState}"
      on:pointerenter={handlePointerEnter}
      on:pointerleave={handlePointerLeave}
      on:touchstart|preventDefault={handleTouchStart}
      on:touchend|preventDefault={handleTouchEnd}
      on:touchcancel|preventDefault={handleTouchEnd}
      role="button"
      tabindex="0"
      aria-label="Interactive lantern - click to read announcements">
      <div class="lantern-glow"></div>
      <img
        src={currentLanternImage}
        alt="Tavern Lantern"
        class="lantern-image"
        draggable="false"
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

    <!-- Tavern Atmosphere Section -->
    <div class="tavern-atmosphere">
      <h2 class="atmosphere-title">Tales from Patrons</h2>

      <div class="testimonials-container">
        <div class="testimonial">
          <p class="atmosphere-quote">
            Lost my lucky dagger in a bet with a goblin last spring. Found it hanging above the hearth at Treasure Tavern three moons later. This place has a way of gathering lost treasures and wayward souls alike. Best mead in seven kingdoms too!
          </p>
          <p class="quote-attribution">— Durnin Axebeard, Dwarven Merchant</p>
        </div>

        <div class="testimonial">
          <p class="atmosphere-quote">
            My songs have echoed in the halls of emperors, but nowhere do they resonate with such magic as within these tavern walls. The patrons here don't just listen to tales—they live them, breathe them, become part of them.
          </p>
          <p class="quote-attribution">— Lyra Silverstring, Elven Bard</p>
        </div>

        <div class="testimonial">
          <p class="atmosphere-quote">
            Been traversing the Shadowlands for nigh on forty years. Only place where both the living and spectral feel welcome is Treasure Tavern. The keeper doesn't ask questions when you order two ales but drink alone.
          </p>
          <p class="quote-attribution">— Morvath the Gray, Spirit Walker</p>
        </div>
      </div>

      <div class="tavern-song">
        <h3 class="song-title">The Tavern Oak</h3>
        <div class="song-lyrics">
          <p>
            Raise tankards high and spill your ale!<br>
            The Tavern's where our stories blend.<br>
            Where bards embellish every tale,<br>
            And foes by midnight become friends.
          </p>

          <p>
            Heroes boast of dragons slain,<br>
            While nabbing someone else's stew.<br>
            The thief claims he's reformed—again!<br>
            As barkeep's brew goes missing too.
          </p>

          <p>
            A wizard burps up sparks of blue,<br>
            A dwarf snores 'neath the table loud.<br>
            The elf's still on verse twenty-two,<br>
            The barmaid sighs amidst the crowd.
          </p>

          <p>
            So join our band of misfits dear,<br>
            We'll laugh and have our fill.<br>
            For in this hall we know no fear,<br>
            (Except the bloody bill!)
          </p>
        </div>
        <div class="song-notes">
          <span class="music-note">♫</span>
          <span class="music-note delayed">♪</span>
        </div>
      </div>
    </div>
  </div>
</main>
