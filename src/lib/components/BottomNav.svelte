<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props for customization
  export let navOptions: { label: string; href: string; action?: () => void }[] = [];
  export let enableMusicControl: boolean = true;
  export let audioSrc: string = '/audio/TheTavernOak.mp3';
  export let audioTitle: string = 'Tavern Music';

  // Component state
  let isMenuOpen = false;
  let isMusicPlaying = false;
  let audio: HTMLAudioElement | undefined;
  let bottomNavElement: HTMLDivElement;
  let menuElement: HTMLDivElement;
  let prevAudioSrc: string = audioSrc;

  // Toggle the expandable menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Toggle music playback
  function toggleMusic(event: MouseEvent) {
    // Prevent the event from bubbling up to parent elements
    event.stopPropagation();

    if (!audio) {
      setupAudio(); // Ensure audio is initialized
      if (!audio) return; // If still no audio, exit
    }

    try {
      if (!isMusicPlaying) {
        // Force unmute the audio
        audio.muted = false;

        // Try to play
        const playPromise = audio.play();

        if (playPromise) {
          playPromise.then(() => {
            // Playback started successfully
            isMusicPlaying = true;

            // Dispatch custom event for audio state change
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('bottomNavAudioChange', {
                detail: { type: 'audio', playing: true }
              }));
            }
          }).catch(e => {
            console.warn('Audio playback was prevented:', e);
            isMusicPlaying = false;
          });
        }
      } else {
        audio.pause();
        isMusicPlaying = false;

        // Dispatch custom event for audio state change
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('bottomNavAudioChange', {
            detail: { type: 'audio', playing: false }
          }));
        }
      }
    } catch (error) {
      console.error('Error with audio playback:', error);
    }
  }

  // Handle option click - either navigate or execute action
  function handleOptionClick(option: { href: string; action?: () => void }) {
    if (option.action) {
      option.action();
      return false; // Prevent default only if there's a custom action
    }

    // If there's a href but no action, allow default navigation
    if (option.href && option.href !== 'javascript:void(0)') {
      isMenuOpen = false;
      return true; // Allow default navigation
    }

    return false; // Prevent default for javascript:void(0) links
  }

  // Handle scroll behavior to avoid footer overlap
  function handleScroll() {
    if (!bottomNavElement) return;

    // Check if near footer to adjust position
    const footer = document.querySelector('.footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is becoming visible in the viewport
      if (footerRect.top < windowHeight) {
        // Calculate distance to shift the nav up
        const footerVisibleHeight = windowHeight - footerRect.top;
        bottomNavElement.style.bottom = `${Math.max(40, footerVisibleHeight)}px`;
      } else {
        // Reset to default position
        bottomNavElement.style.bottom = '40px';
      }
    }
  }

  // Initialize or update the audio element
  function setupAudio() {
    if (typeof window === 'undefined' || !enableMusicControl) return;

    try {
      // Create new audio if it doesn't exist, or if the source has changed
      if (!audio || prevAudioSrc !== audioSrc) {
        // Store current playing state if audio exists
        const wasPlaying = audio ? isMusicPlaying : false;

        // Clean up existing audio if any
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', handleAudioEnded);
          audio.removeEventListener('error', handleAudioError);
          audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        }

        // Create new audio with new source
        audio = new Audio(audioSrc);
        audio.loop = true;
        audio.volume = 0.3;
        audio.muted = false;  // Make sure it's not muted by default
        audio.preload = 'auto'; // Preload audio data

        // Add event listeners
        audio.addEventListener('ended', handleAudioEnded);
        audio.addEventListener('error', handleAudioError);
        audio.addEventListener('canplaythrough', handleCanPlayThrough);

        // Start loading the audio
        audio.load();

        // If it was playing before, we'll attempt to resume after canplaythrough
        if (wasPlaying) {
          console.log('Will attempt to resume playback after load');
          // Set a flag to resume playback when canplaythrough fires
          resumeAfterLoad = true;
        }

        prevAudioSrc = audioSrc;
        console.log('Audio initialized with source:', audioSrc);
      }
    } catch (error) {
      console.error('Error setting up audio:', error);
      isMusicPlaying = false;
    }
  }

  // Flag to track if we should resume playback after loading
  let resumeAfterLoad = false;

  function handleCanPlayThrough() {
    console.log('Audio can play through');
    if (resumeAfterLoad) {
      console.log('Resuming playback after load');
      const playPromise = audio?.play();
      if (playPromise) {
        playPromise.then(() => {
          isMusicPlaying = true;
          resumeAfterLoad = false;
        }).catch(e => {
          console.warn('Failed to resume playback:', e);
          isMusicPlaying = false;
          resumeAfterLoad = false;
        });
      }
    }
  }

  function handleAudioError(e: Event) {
    console.error('Audio error:', e);
    isMusicPlaying = false;
    resumeAfterLoad = false;

    // Dispatch event to notify of error
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bottomNavAudioError', {
        detail: { src: audioSrc, error: e }
      }));
    }
  }

  function handleAudioEnded() {
    isMusicPlaying = false;
  }

  onMount(() => {
    // Initialize audio
    setupAudio();

    // Try to load audio data
    if (audio) {
      audio.load();
    }

    // Set up scroll handler
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      // Initial position check
      setTimeout(handleScroll, 300);
    }
  });

  onDestroy(() => {
    // Clean up event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }

    // Stop audio on component destroy
    if (audio) {
      audio.pause();
      audio.removeEventListener('ended', handleAudioEnded);
      audio = undefined;
    }
  });

  // Click outside to close menu
  function handleClickOutside(event: MouseEvent) {
    if (isMenuOpen && menuElement && !menuElement.contains(event.target as Node) &&
        !bottomNavElement.contains(event.target as Node)) {
      isMenuOpen = false;
    }
  }

  // Watch for changes to audioSrc
  $: if (audioSrc !== prevAudioSrc) {
    setupAudio();
  }

  $: if (typeof window !== 'undefined' && isMenuOpen) {
    window.addEventListener('click', handleClickOutside);
  } else if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleClickOutside);
  }
</script>

<style>
  /* Bottom Nav Container with filigree */
  .bottom-nav {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom 0.3s ease;
    padding: 0 20px;
  }

  /* Filigree decorations */
  .bottom-nav::before,
  .bottom-nav::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6));
    opacity: 0.85;
    transition: all 0.3s ease;
  }

  .bottom-nav::before {
    right: calc(100% - 10px);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' width='100' height='30'%3E%3Cpath d='M100,15 C90,15 85,5 80,5 C75,5 75,15 70,15 C65,15 65,10 60,10 C55,10 55,15 50,15 C45,15 40,5 30,5 C20,5 10,15 0,15' stroke='%23cfa75d' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='78' cy='15' r='3' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='60' cy='10' r='2' fill='%23cfa75d' opacity='0.6'/%3E%3Ccircle cx='40' cy='10' r='2' fill='%23cfa75d' opacity='0.6'/%3E%3C/svg%3E");
  }

  .bottom-nav::after {
    left: calc(100% - 10px);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' width='100' height='30'%3E%3Cpath d='M0,15 C10,15 15,5 20,5 C25,5 25,15 30,15 C35,15 35,10 40,10 C45,10 45,15 50,15 C55,15 60,5 70,5 C80,5 90,15 100,15' stroke='%23cfa75d' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='22' cy='15' r='3' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='40' cy='10' r='2' fill='%23cfa75d' opacity='0.6'/%3E%3Ccircle cx='60' cy='10' r='2' fill='%23cfa75d' opacity='0.6'/%3E%3C/svg%3E");
  }

  .bottom-nav:hover::before,
  .bottom-nav:hover::after {
    opacity: 1;
    filter: drop-shadow(0 0 5px rgba(207, 167, 93, 0.8));
  }

  /* Mobile responsiveness adjustments */
  @media (max-width: 768px) {
    .bottom-nav::before,
    .bottom-nav::after {
      width: 60px;
      height: 20px;
    }
  }

  /* Expand/Collapse Button */
  .expand-btn {
    background-color: #cfa75d;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 56px;
    height: 56px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1c1c1c;
    font-size: 1.8rem;
    font-weight: bold;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(207, 167, 93, 0.4);
  }

  .expand-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(207, 167, 93, 0.5);
  }

  /* Hidden menu that appears above the nav */
  .menu {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%) scale(0.95);
    background-color: #1c1c1c;
    border: 1px solid #cfa75d;
    border-radius: 12px;
    padding: 20px;
    width: 260px;
    display: none;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(207, 167, 93, 0.2);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Speech bubble pointer */
  .menu::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #cfa75d;
  }

  /* When menu is open */
  .menu.show {
    display: flex;
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  /* Links in the expanded menu */
  .menu a {
    text-decoration: none;
    color: #fff;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    transition: color 0.2s ease;
    position: relative;
  }

  .menu a:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 60%;
    height: 1px;
    background: rgba(207, 167, 93, 0.2);
  }

  .menu a:hover {
    color: #cfa75d;
  }

  /* Music control row at top of the expanded menu */
  .music-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(207, 167, 93, 0.3);
  }

  .music-label {
    font-family: 'Cinzel', serif;
    color: #cfa75d;
    font-size: 1.1rem;
  }

  .music-control button {
    background-color: #cfa75d;
    color: #1c1c1c;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-family: 'Cinzel', serif;
    transition: all 0.2s ease;
  }

  .music-control button:hover {
    background-color: #e0b66d;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .bottom-nav {
      bottom: 30px;
    }

    .expand-btn {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
    }

    .menu {
      width: 230px;
      padding: 15px;
    }

    .music-control button {
      padding: 6px 12px;
      font-size: 0.9rem;
    }

    .menu a {
      font-size: 1rem;
    }
  }
</style>

<div class="bottom-nav" bind:this={bottomNavElement}>
  <!-- Expand/Collapse Button -->
  <button
    class="expand-btn"
    on:click={toggleMenu}
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  >
    {isMenuOpen ? '×' : '+'}
  </button>

  <!-- Hidden Menu -->
  <div class="menu" class:show={isMenuOpen} bind:this={menuElement}>
    {#if enableMusicControl}
      <!-- Music Control Row -->
      <div class="music-control">
        <span class="music-label">{audioTitle}</span>
        <button on:click={(e) => toggleMusic(e)}>
          {isMusicPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    {/if}

    <!-- Navigation Options -->
    {#each navOptions as option}
      <a
        href={option.href || 'javascript:void(0)'}
        on:click={(e) => {
          const shouldPrevent = !handleOptionClick(option);
          if (shouldPrevent) {
            e.preventDefault();
          }
        }}
      >
        {option.label}
      </a>
    {/each}
  </div>
</div>