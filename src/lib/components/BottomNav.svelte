<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  // Props for customization
  export let navOptions: {
    label: string;
    href: string;
    action?: () => void;
    special?: boolean;
    icon?: string;
  }[] = [];
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

    // If menu is now open, check for top edge of screen
    if (isMenuOpen && menuElement) {
      // Wait a tiny bit for the menu to be rendered
      setTimeout(() => {
        const menuRect = menuElement.getBoundingClientRect();
        if (menuRect.top < 10) {
          // Menu would be cut off at top, adjust to display below the button
          menuElement.style.bottom = 'auto';
          menuElement.style.top = '60px'; // Height of button + some space
          // Move the pointer to point upward
          menuElement.classList.add('flip-pointer');
        } else {
          // Reset to default position
          menuElement.style.bottom = '70px';
          menuElement.style.top = 'auto';
          menuElement.classList.remove('flip-pointer');
        }
      }, 10);
    }
  }

  // Toggle music playback
  function toggleMusic(event: MouseEvent) {
    // Prevent the event from bubbling up to parent elements
    event.stopPropagation();

    if (!audio) {
      setupAudio(); // Ensure audio is initialized
      if (!audio) {
        return;
      } // If still no audio, exit
    }

    try {
      if (!isMusicPlaying) {
        // Force unmute the audio
        audio.muted = false;

        // Try to play
        const playPromise = audio.play();

        if (playPromise) {
          playPromise
            .then(() => {
              // Playback started successfully
              isMusicPlaying = true;

              // Dispatch custom event for audio state change
              if (typeof window !== 'undefined') {
                window.dispatchEvent(
                  new CustomEvent('bottomNavAudioChange', {
                    detail: { type: 'audio', playing: true }
                  })
                );
              }
            })
            .catch(e => {
              console.warn('Audio playback was prevented:', e);
              isMusicPlaying = false;
            });
        }
      } else {
        audio.pause();
        isMusicPlaying = false;

        // Dispatch custom event for audio state change
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('bottomNavAudioChange', {
              detail: { type: 'audio', playing: false }
            })
          );
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
    if (!bottomNavElement) {
      return;
    }

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
    if (typeof window === 'undefined' || !enableMusicControl) {
      return;
    }

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
        audio.muted = false; // Make sure it's not muted by default
        audio.preload = 'auto'; // Preload audio data

        // Add event listeners
        audio.addEventListener('ended', handleAudioEnded);
        audio.addEventListener('error', handleAudioError);
        audio.addEventListener('canplaythrough', handleCanPlayThrough);

        // Start loading the audio
        audio.load();

        // If it was playing before, we'll attempt to resume after canplaythrough
        if (wasPlaying) {
          if (import.meta.env.DEV) console.log('Will attempt to resume playback after load');
          // Set a flag to resume playback when canplaythrough fires
          resumeAfterLoad = true;
        }

        prevAudioSrc = audioSrc;
        if (import.meta.env.DEV) console.log('Audio initialized with source:', audioSrc);
      }
    } catch (error) {
      console.error('Error setting up audio:', error);
      isMusicPlaying = false;
    }
  }

  // Flag to track if we should resume playback after loading
  let resumeAfterLoad = false;

  function handleCanPlayThrough() {
    if (import.meta.env.DEV) console.log('Audio can play through');
    if (resumeAfterLoad) {
      if (import.meta.env.DEV) console.log('Resuming playback after load');
      const playPromise = audio?.play();
      if (playPromise) {
        playPromise
          .then(() => {
            isMusicPlaying = true;
            resumeAfterLoad = false;
          })
          .catch(e => {
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
      window.dispatchEvent(
        new CustomEvent('bottomNavAudioError', {
          detail: { src: audioSrc, error: e }
        })
      );
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
    if (
      isMenuOpen &&
      menuElement &&
      !menuElement.contains(event.target as Node) &&
      !bottomNavElement.contains(event.target as Node)
    ) {
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

<div class="bottom-nav" class:menu-open={isMenuOpen} bind:this={bottomNavElement}>
  <!-- Expand/Collapse Button -->
  <button
    class="expand-btn"
    class:open={isMenuOpen}
    on:click={toggleMenu}
    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
  >
    {isMenuOpen ? '×' : '+'}
  </button>

  <!-- Hidden Menu -->
  <div class="menu" class:show={isMenuOpen} bind:this={menuElement}>
    {#if enableMusicControl}
      <!-- Music Control Row -->
      <div class="music-control">
        <span class="music-label">{audioTitle}</span>
        <button on:click={e => toggleMusic(e)}>
          {isMusicPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    {/if}

    <!-- Navigation Options -->
    {#each navOptions as option}
      <a
        href={option.href || 'javascript:void(0)'}
        class:special={option.special}
        on:click={e => {
          const shouldPrevent = !handleOptionClick(option);
          if (shouldPrevent) {
            e.preventDefault();
          }
        }}
      >
        {#if option.icon}<i class={`fas ${option.icon}`}></i>
        {/if}{option.label}
      </a>
    {/each}
  </div>
</div>

<style>
  /* Bottom Nav Container with filigree */
  .bottom-nav {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom 0.3s ease;
    padding: 0 20px; /* Reduced padding - we'll position the filigree better */
    pointer-events: none;
    width: auto; /* No longer spanning full width */
    max-width: 300px; /* Constrain the width to keep filigree close */
  }

  /* Expand/Collapse Button and filigree should receive pointer events */
  .expand-btn,
  .bottom-nav::before,
  .bottom-nav::after {
    pointer-events: auto;
  }

  /* Filigree decorations */
  .bottom-nav::before,
  .bottom-nav::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 28px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6));
    opacity: 0.9;
    transition: all 0.3s ease;
    animation: shimmer 4s infinite ease-in-out;
  }

  .bottom-nav::before {
    right: 100%; /* Position at the right edge of the container */
    margin-right: 8px; /* Increased margin for better visual spacing */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 40' width='140' height='40'%3E%3Cdefs%3E%3ClinearGradient id='gold1' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23cfa75d' stop-opacity='0.3'/%3E%3Cstop offset='50%25' stop-color='%23e5c989' stop-opacity='0.8'/%3E%3Cstop offset='100%25' stop-color='%23cfa75d' stop-opacity='0.7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M140,20 C130,20 125,10 115,10 C105,10 100,20 90,20 C80,20 75,15 65,15 C55,15 50,20 40,20 C30,20 20,10 10,10 C0,10 0,20 0,20' stroke='url(%23gold1)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M10,10 C8,8 6,7 4,7 C2,7 1,8 1,10 C1,12 2,14 4,14 C6,14 8,12 8,10 C8,8 7,6 5,6 C3,6 1,8 2,10 C3,12 5,12 7,11' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3Cpath d='M115,10 C118,8 119,6 119,4 C119,2 118,1 116,1 C114,1 112,2 112,4 C112,6 114,8 116,8 C118,8 120,7 120,5 C120,3 118,1 116,2 C114,3 114,5 115,7 C116,9 118,10 120,9' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3Cpath d='M65,15 C63,13 61,12 60,11 C59,10 59,8 61,8 C63,8 65,10 65,12 C65,14 63,16 61,15 C59,14 60,12 62,12 C64,12 64,14 62,15' stroke='%23e0b66d' stroke-width='0.7' fill='none'/%3E%3Cpath d='M40,20 C38,18 36,17 35,16 C34,15 34,13 36,13 C38,13 40,15 40,17 C40,19 38,21 36,20 C34,19 35,17 37,17 C39,17 39,19 37,20' stroke='%23e0b66d' stroke-width='0.7' fill='none'/%3E%3Ccircle cx='90' cy='20' r='1.5' fill='%23e0b66d' opacity='0.9'/%3E%3Ccircle cx='65' cy='15' r='1.5' fill='%23e0b66d' opacity='0.9'/%3E%3Ccircle cx='40' cy='20' r='1.5' fill='%23e0b66d' opacity='0.9'/%3E%3Ccircle cx='115' cy='10' r='1.2' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='80' cy='18' r='0.8' fill='%23e0b66d' opacity='0.7'/%3E%3Ccircle cx='75' cy='17' r='0.6' fill='%23e0b66d' opacity='0.7'/%3E%3Ccircle cx='70' cy='16' r='0.7' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='55' cy='16' r='0.7' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='50' cy='17' r='0.6' fill='%23e0b66d' opacity='0.7'/%3E%3Ccircle cx='45' cy='18' r='0.8' fill='%23e0b66d' opacity='0.7'/%3E%3Cpath d='M140,20 L135,16 M140,20 L135,24' stroke='%23e0b66d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M0,20 L5,16 M0,20 L5,24' stroke='%23e0b66d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M135,16 C134,14 132,14 133,16 C134,18 136,18 137,16 M135,24 C134,26 132,26 133,24 C134,22 136,22 137,24' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3Cpath d='M5,16 C6,14 8,14 7,16 C6,18 4,18 3,16 M5,24 C6,26 8,26 7,24 C6,22 4,22 3,24' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  .bottom-nav::after {
    left: 100%; /* Position at the left edge of the container */
    margin-left: 8px; /* Increased margin for better visual spacing */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 40' width='140' height='40'%3E%3Cdefs%3E%3ClinearGradient id='gold2' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23cfa75d' stop-opacity='0.3'/%3E%3Cstop offset='50%25' stop-color='%23e5c989' stop-opacity='0.8'/%3E%3Cstop offset='100%25' stop-color='%23cfa75d' stop-opacity='0.7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0,20 C10,20 15,10 25,10 C35,10 40,20 50,20 C60,20 65,15 75,15 C85,15 90,20 100,20 C110,20 120,10 130,10 C140,10 140,20 140,20' stroke='url(%23gold2)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M130,10 C132,8 134,7 136,7 C138,7 139,8 139,10 C139,12 138,14 136,14 C134,14 132,12 132,10 C132,8 133,6 135,6 C137,6 139,8 138,10 C137,12 135,12 133,11' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3Cpath d='M25,10 C22,8 21,6 21,4 C21,2 22,1 24,1 C26,1 28,2 28,4 C28,6 26,8 24,8 C22,8 20,7 20,5 C20,3 22,1 24,2 C26,3 26,5 25,7 C24,9 22,10 20,9' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3Cpath d='M75,15 C77,13 79,12 80,11 C81,10 81,8 79,8 C77,8 75,10 75,12 C75,14 77,16 79,15 C81,14 80,12 78,12 C76,12 76,14 78,15' stroke='%23e0b66d' stroke-width='0.7' fill='none'/%3E%3Cpath d='M100,20 C102,18 104,17 105,16 C106,15 106,13 104,13 C102,13 100,15 100,17 C100,19 102,21 104,20 C106,19 105,17 103,17 C101,17 101,19 103,20' stroke='%23e0b66d' stroke-width='0.7' fill='none'/%3E%3Ccircle cx='50' cy='20' r='1.5' fill='%23e0b66d' opacity='0.9'/%3E%3Ccircle cx='75' cy='15' r='1.5' fill='%23e0b66d' opacity='0.9'/%3E%3Ccircle cx='100' cy='20' r='1.5' fill='%23e0b66d' opacity='0.9'/%3E%3Ccircle cx='25' cy='10' r='1.2' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='130' cy='10' r='1.2' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='60' cy='18' r='0.8' fill='%23e0b66d' opacity='0.7'/%3E%3Ccircle cx='65' cy='17' r='0.6' fill='%23e0b66d' opacity='0.7'/%3E%3Ccircle cx='70' cy='16' r='0.7' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='85' cy='16' r='0.7' fill='%23e0b66d' opacity='0.8'/%3E%3Ccircle cx='90' cy='17' r='0.6' fill='%23e0b66d' opacity='0.7'/%3E%3Ccircle cx='95' cy='18' r='0.8' fill='%23e0b66d' opacity='0.7'/%3E%3Cpath d='M0,20 L5,16 M0,20 L5,24' stroke='%23e0b66d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M140,20 L135,16 M140,20 L135,24' stroke='%23e0b66d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M5,16 C6,14 8,14 7,16 C6,18 4,18 3,16 M5,24 C6,26 8,26 7,24 C6,22 4,22 3,24' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3Cpath d='M135,16 C134,14 132,14 133,16 C134,18 136,18 137,16 M135,24 C134,26 132,26 133,24 C134,22 136,22 137,24' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  /* Add shimmer animation to filigree */
  @keyframes shimmer {
    0% {
      filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6));
      opacity: 0.85;
    }
    25% {
      filter: drop-shadow(0 0 4px rgba(207, 167, 93, 0.7));
      opacity: 0.9;
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(229, 201, 137, 0.9));
      opacity: 1;
    }
    75% {
      filter: drop-shadow(0 0 4px rgba(207, 167, 93, 0.7));
      opacity: 0.9;
    }
    100% {
      filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6));
      opacity: 0.85;
    }
  }

  /* Make the filigree larger on hover */
  .bottom-nav:hover::before,
  .bottom-nav:hover::after {
    animation: none;
    filter: drop-shadow(0 0 8px rgba(229, 201, 137, 1));
    width: 110px;
    opacity: 1;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* More bouncy animation */
  }

  /* Mobile responsiveness adjustments */
  @media (max-width: 768px) {
    .bottom-nav {
      bottom: 30px;
      max-width: 220px; /* Smaller container on mobile */
    }

    .expand-btn {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
    }

    .bottom-nav::before,
    .bottom-nav::after {
      width: 70px;
      height: 25px;
    }

    .bottom-nav:hover::before,
    .bottom-nav:hover::after {
      width: 80px;
    }

    .menu {
      width: 230px;
      padding: 15px;
      max-width: 80vw; /* Ensure menu isn't wider than screen */
    }

    .music-control button {
      padding: 6px 12px;
      font-size: 0.9rem;
    }

    .menu a {
      font-size: 1rem;
    }
  }

  /* Ultra small screens */
  @media (max-width: 360px) {
    .bottom-nav {
      max-width: 180px; /* Even smaller container on tiny screens */
    }

    .bottom-nav::before,
    .bottom-nav::after {
      width: 50px;
      height: 20px;
      margin-right: 5px;
      margin-left: 5px;
    }

    .expand-btn {
      width: 44px;
      height: 44px;
      font-size: 1.3rem;
    }

    .menu {
      max-width: 90vw;
      width: 200px;
    }
  }

  /* Expand/Collapse Button */
  .expand-btn {
    background: radial-gradient(circle, #e0b66d 0%, #cfa75d 60%, #bd9648 100%);
    border: 1px solid rgba(0, 0, 0, 0.15);
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
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(207, 167, 93, 0.4);
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
    position: relative;
    z-index: 3;
  }

  /* Enhanced styling for open state */
  .expand-btn.open {
    background: radial-gradient(circle, #e5c989 0%, #cfa75d 70%, #bd9648 100%);
    box-shadow: 0 0 20px rgba(229, 201, 137, 0.7);
    transform: scale(1.05);
  }

  .expand-btn::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(229, 201, 137, 0),
      rgba(229, 201, 137, 0.5) 50%,
      rgba(229, 201, 137, 0) 100%
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .expand-btn.open::before {
    opacity: 1;
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .expand-btn:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow:
      0 6px 15px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(207, 167, 93, 0.5);
  }

  .expand-btn:active {
    transform: scale(1.02) translateY(0);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(207, 167, 93, 0.4);
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
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.4),
      0 0 10px rgba(207, 167, 93, 0.2);
    opacity: 0;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    z-index: 2;
    pointer-events: auto;
  }

  /* Speech bubble pointer */
  .menu::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #cfa75d;
    transition: all 0.3s ease;
  }

  /* Flipped pointer when menu is below the button */
  .menu.flip-pointer::after {
    bottom: auto;
    top: -10px;
    border-top: none;
    border-bottom: 10px solid #cfa75d;
  }

  /* When menu is open */
  .menu.show {
    display: flex;
    opacity: 1;
    transform: translateX(-50%) scale(1);
    transition:
      opacity 0.4s ease,
      transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

  /* Special styling for gold highlighted links */
  .menu a.special {
    color: #e0b66d;
    background: linear-gradient(
      to right,
      rgba(189, 150, 72, 0),
      rgba(189, 150, 72, 0.15),
      rgba(189, 150, 72, 0)
    );
    border-radius: 4px;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.4);
    position: relative;
    overflow: hidden;
    padding: 12px 0;
    margin: 5px 0;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .menu a.special i {
    margin-right: 8px;
    font-size: 0.9em;
  }

  .menu a.special::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(229, 201, 137, 0.2), transparent);
    transition: left 0.8s ease;
  }

  .menu a.special:hover {
    color: #e5c989;
    text-shadow: 0 0 12px rgba(229, 201, 137, 0.7);
    background: linear-gradient(
      to right,
      rgba(189, 150, 72, 0),
      rgba(189, 150, 72, 0.25),
      rgba(189, 150, 72, 0)
    );
    transform: translateY(-2px);
    border: 1px solid rgba(189, 150, 72, 0.4);
    box-shadow:
      0 3px 10px rgba(0, 0, 0, 0.2),
      0 0 15px rgba(189, 150, 72, 0.2);
  }

  .menu a.special:hover::before {
    left: 100%;
    animation: shimmerEffect 1.5s infinite;
  }

  @keyframes shimmerEffect {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
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

  /* Animation for filigree when menu is toggled */
  @keyframes filigreeExpand {
    0% {
      transform: translateY(-50%) scale(0.95);
      opacity: 0.7;
      filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6));
    }
    50% {
      transform: translateY(-50%) scale(1.15);
      opacity: 1;
      filter: drop-shadow(0 0 8px rgba(229, 201, 137, 0.9));
    }
    100% {
      transform: translateY(-50%) scale(1);
      opacity: 0.9;
      filter: drop-shadow(0 0 5px rgba(207, 167, 93, 0.8));
    }
  }

  .bottom-nav.menu-open::before,
  .bottom-nav.menu-open::after {
    animation: filigreeExpand 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    width: 110px;
  }
</style>
