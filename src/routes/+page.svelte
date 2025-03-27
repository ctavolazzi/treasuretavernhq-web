<script lang="ts">
  import { onMount } from 'svelte';
  import { subscribeEmail, isSupabaseConfigured, supabase } from '$lib/supabaseClient';
  import ImageModal from '$lib/components/ImageModal.svelte'; // Import the modal component

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
  let scrollModalOpen = false; // Track if the scroll modal is open
  let scrollImgSrc = '/images/tavern-song-scroll-transparent.png'; // Image source for the modal
  let scrollImgWebpSrc = '/images/tavern-song-scroll-transparent.webp'; // WebP version

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
  let isMuted = true; // Start muted to comply with browser autoplay policies
  let audioInitialized = false; // Track if audio has been initialized

  // Audio control functions
  function toggleMute() {
    if (audioPlayer) {
      isMuted = !isMuted;
      audioPlayer.muted = isMuted;

      if (isMuted) {
        audioPlayer.pause();
      } else {
        // Play and handle any errors gracefully
        audioPlayer.play().catch(error => {
          console.warn('Still unable to play audio after user interaction:', error);
          // Fall back to muted state if still having issues
          isMuted = true;
          audioPlayer.muted = true;
        });
      }

      // Remove localStorage storage
      // Update initialized state
      audioInitialized = true;
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
    };

    webP.onerror = () => {
      // WebP is not supported, use fallbacks
      supportsWebP = false;
      lanternStaticImage = lanternStaticImageFallback;
    };

    // If user has subscribed, show success state
    if (subscribed) {
      lanternState = 'success';
      currentLanternImage = lanternSuccessGif;
    }

    // Initialize audio player
    if (audioPlayer) {
      audioPlayer.volume = 0.3; // Set initial volume to 30%

      // Remove localStorage check - always start muted
      // Always start muted
      audioPlayer.muted = true;
      isMuted = true; // Force isMuted to true on every page load

      // Load the audio
      audioPlayer.load();

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
        // Stop audio on unmount
        if (audioPlayer) {
          audioPlayer.pause();
        }

        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
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
    margin-bottom: -0.1em;
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
    margin-bottom: -0.1em;
    line-height: 1;
    white-space: nowrap;
  }

  .welcome-large {
    font-size: clamp(3.2rem, 7vw, 5.5rem);
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
    padding: 1.5rem 1rem;
    background: rgba(31, 27, 45, 0.5);
    border-radius: 8px;
    border: 1px solid rgba(189, 150, 72, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .song-title {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    color: #BD9648;
    margin-bottom: 1rem;
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

  .tavern-song-scroll {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: min(70vh, 600px);
    margin: 0 auto;
    display: block;
    transition: transform 0.3s ease;
    object-fit: contain;
  }

  .scroll-image-container {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    max-width: 700px;
    margin: 0 auto 1rem;
    transition: transform 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
  }

  .scroll-image-container:hover .tavern-song-scroll {
    transform: scale(1.02);
  }

  .scroll-image-container:hover .view-larger-hint {
    opacity: 1;
  }

  .view-larger-hint {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    color: #F7E8D4;
    padding: 8px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 768px) {
    .view-larger-hint {
      opacity: 0.8;
      font-size: 0.8rem;
      padding: 6px;
    }

    .tavern-song-scroll {
      max-height: min(60vh, 500px);
    }
  }

  /* Add style for the hint text */
  .audio-hint {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.75rem;
    color: rgba(247, 232, 212, 0.7);
    font-style: italic;
    margin-left: 4px;
  }
</style>

<main>
  <!-- Audio player -->
  <audio bind:this={audioPlayer} src="/audio/TheTavernOak.mp3" preload="auto" loop muted></audio>

  <!-- Image Modal -->
  <ImageModal
    bind:open={scrollModalOpen}
    imgSrc={supportsWebP ? scrollImgWebpSrc : scrollImgSrc}
    altText="The Tavern Oak - A tavern song written on a scroll"
  />

  <div class="audio-controls" bind:this={audioControlsElement} on:click={toggleMute} role="button" tabindex="0" aria-label={isMuted ? "Unmute tavern music" : "Mute tavern music"} on:keydown={(e) => e.key === 'Enter' && toggleMute()}>
    <div class="mute-button">
      {#if isMuted}
        <i class="fas fa-volume-mute"></i>
      {:else}
        <i class="fas fa-volume-up"></i>
      {/if}
    </div>
    <span class="audio-title">Tavern Music</span>
    {#if isMuted}
      <span class="audio-hint">(Click to play)</span>
    {/if}
  </div>

  <div class="container">
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
      <h2 class="welcome-title">The Door Is Opening</h2>
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
        <div
          class="scroll-image-container"
          on:click={() => scrollModalOpen = true}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && (scrollModalOpen = true)}
          aria-label="Open tavern song scroll"
        >
          <picture>
            <source srcset={scrollImgWebpSrc} type="image/webp">
            <img
              src={scrollImgSrc}
              alt="The Tavern Oak - A tavern song written on a scroll"
              class="tavern-song-scroll"
              loading="lazy"
            />
          </picture>
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
