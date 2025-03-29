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
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom 0.3s ease;
    padding: 0 30px;
    pointer-events: none;
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
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 90px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6));
    opacity: 0.85;
    transition: all 0.3s ease;
    animation: shimmer 3s infinite ease-in-out;
    max-width: 30vw;
  }

  .bottom-nav::before {
    right: calc(100% - 10px);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 40' width='140' height='40'%3E%3Cpath d='M140,20 C130,20 125,10 115,10 C105,10 100,20 90,20 C80,20 75,15 65,15 C55,15 50,20 40,20 C30,20 20,10 10,10 C0,10 0,20 0,20' stroke='%23cfa75d' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M0,20 C2,15 0,10 0,20 M0,20 C-2,25 0,30 0,20' stroke='%23cfa75d' stroke-width='1' fill='none'/%3E%3C!-- Left spiral decorations --%3E%3Cpath d='M10,10 C8,8 6,7 4,7 C2,7 1,8 1,10 C1,12 2,14 4,14 C6,14 8,12 8,10 C8,8 7,6 5,6 C3,6 1,8 2,10 C3,12 5,12 7,11' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3C!-- Right spiral decorations --%3E%3Cpath d='M115,10 C118,8 119,6 119,4 C119,2 118,1 116,1 C114,1 112,2 112,4 C112,6 114,8 116,8 C118,8 120,7 120,5 C120,3 118,1 116,2 C114,3 114,5 115,7 C116,9 118,10 120,9' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3C!-- Center spiral decoration --%3E%3Cpath d='M64,15 C62,13 60,12 59,12 C58,12 57,13 57,14 C57,15 58,16 59,16 C60,16 61,15.5 61,14.5 C61,13.5 60.5,13 59.5,13 C58.5,13 58,13.5 58.5,14.5 C59,15.5 60,15.5 61,15' stroke='%23cfa75d' stroke-width='0.7' fill='none'/%3E%3C!-- Decorative circles --%3E%3Ccircle cx='90' cy='20' r='1.5' fill='%23cfa75d' opacity='0.9'/%3E%3Ccircle cx='65' cy='15' r='1.5' fill='%23cfa75d' opacity='0.9'/%3E%3Ccircle cx='40' cy='20' r='1.5' fill='%23cfa75d' opacity='0.9'/%3E%3Ccircle cx='115' cy='10' r='1.2' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23cfa75d' opacity='0.8'/%3E%3C!-- Small dots pattern --%3E%3Ccircle cx='80' cy='18' r='0.8' fill='%23cfa75d' opacity='0.7'/%3E%3Ccircle cx='75' cy='17' r='0.6' fill='%23cfa75d' opacity='0.7'/%3E%3Ccircle cx='70' cy='16' r='0.7' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='55' cy='16' r='0.7' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='50' cy='17' r='0.6' fill='%23cfa75d' opacity='0.7'/%3E%3Ccircle cx='45' cy='18' r='0.8' fill='%23cfa75d' opacity='0.7'/%3E%3C!-- Decorative flourishes --%3E%3Cpath d='M140,20 L135,15 M140,20 L135,25' stroke='%23cfa75d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M0,20 L5,15 M0,20 L5,25' stroke='%23cfa75d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M135,15 C133,12 131,12 132,15 M135,25 C133,28 131,28 132,25' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3Cpath d='M5,15 C7,12 9,12 8,15 M5,25 C7,28 9,28 8,25' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  .bottom-nav::after {
    left: calc(100% - 10px);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 40' width='140' height='40'%3E%3Cpath d='M0,20 C10,20 15,10 25,10 C35,10 40,20 50,20 C60,20 65,15 75,15 C85,15 90,20 100,20 C110,20 120,10 130,10 C140,10 140,20 140,20' stroke='%23cfa75d' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M140,20 C138,15 140,10 140,20 M140,20 C142,25 140,30 140,20' stroke='%23cfa75d' stroke-width='1' fill='none'/%3E%3C!-- Right spiral decorations --%3E%3Cpath d='M130,10 C132,8 134,7 136,7 C138,7 139,8 139,10 C139,12 138,14 136,14 C134,14 132,12 132,10 C132,8 133,6 135,6 C137,6 139,8 138,10 C137,12 135,12 133,11' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3C!-- Left spiral decorations --%3E%3Cpath d='M25,10 C22,8 21,6 21,4 C21,2 22,1 24,1 C26,1 28,2 28,4 C28,6 26,8 24,8 C22,8 20,7 20,5 C20,3 22,1 24,2 C26,3 26,5 25,7 C24,9 22,10 20,9' stroke='%23cfa75d' stroke-width='0.8' fill='none'/%3E%3C!-- Center spiral decoration --%3E%3Cpath d='M76,15 C78,13 80,12 81,12 C82,12 83,13 83,14 C83,15 82,16 81,16 C80,16 79,15.5 79,14.5 C79,13.5 79.5,13 80.5,13 C81.5,13 82,13.5 81.5,14.5 C81,15.5 80,15.5 79,15' stroke='%23cfa75d' stroke-width='0.7' fill='none'/%3E%3C!-- Decorative circles --%3E%3Ccircle cx='50' cy='20' r='1.5' fill='%23cfa75d' opacity='0.9'/%3E%3Ccircle cx='75' cy='15' r='1.5' fill='%23cfa75d' opacity='0.9'/%3E%3Ccircle cx='100' cy='20' r='1.5' fill='%23cfa75d' opacity='0.9'/%3E%3Ccircle cx='25' cy='10' r='1.2' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='130' cy='10' r='1.2' fill='%23cfa75d' opacity='0.8'/%3E%3C!-- Small dots pattern --%3E%3Ccircle cx='60' cy='18' r='0.8' fill='%23cfa75d' opacity='0.7'/%3E%3Ccircle cx='65' cy='17' r='0.6' fill='%23cfa75d' opacity='0.7'/%3E%3Ccircle cx='70' cy='16' r='0.7' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='85' cy='16' r='0.7' fill='%23cfa75d' opacity='0.8'/%3E%3Ccircle cx='90' cy='17' r='0.6' fill='%23cfa75d' opacity='0.7'/%3E%3Ccircle cx='95' cy='18' r='0.8' fill='%23cfa75d' opacity='0.7'/%3E%3C!-- Decorative flourishes --%3E%3Cpath d='M0,20 L5,15 M0,20 L5,25' stroke='%23cfa75d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M140,20 L135,15 M140,20 L135,25' stroke='%23cfa75d' stroke-width='0.8' opacity='0.8'/%3E%3Cpath d='M5,15 C7,12 9,12 8,15 M5,25 C7,28 9,28 8,25' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3Cpath d='M135,15 C133,12 131,12 132,15 M135,25 C133,28 131,28 132,25' stroke='%23cfa75d' stroke-width='0.6' opacity='0.7' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  /* Add shimmer animation to filigree */
  @keyframes shimmer {
    0% { filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6)); }
    50% { filter: drop-shadow(0 0 5px rgba(207, 167, 93, 0.9)); }
    100% { filter: drop-shadow(0 0 3px rgba(207, 167, 93, 0.6)); }
  }

  /* Make the filigree larger on hover */
  .bottom-nav:hover::before,
  .bottom-nav:hover::after {
    animation: none;
    filter: drop-shadow(0 0 7px rgba(207, 167, 93, 1.0));
    width: 100px;
    opacity: 1;
  }

  /* Mobile responsiveness adjustments */
  @media (max-width: 768px) {
    .bottom-nav {
      bottom: 30px;
      padding: 0 20px; /* Slightly reduced padding on mobile */
    }

    .expand-btn {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
    }

    .bottom-nav::before,
    .bottom-nav::after {
      width: 70px;
      height: 30px;
      max-width: 25vw; /* Ensure they're proportionally sized on mobile */
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
      padding: 0 15px;
    }

    .bottom-nav::before,
    .bottom-nav::after {
      width: 50px;
      height: 25px;
      max-width: 20vw;
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
    z-index: 2;
    pointer-events: auto;
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

  /* Animation for filigree when menu is toggled */
  @keyframes filigreeExpand {
    0% { transform: translateY(-50%) scale(0.9); opacity: 0.7; }
    50% { transform: translateY(-50%) scale(1.1); opacity: 1; }
    100% { transform: translateY(-50%) scale(1); opacity: 0.85; }
  }

  .bottom-nav.menu-open::before,
  .bottom-nav.menu-open::after {
    animation: filigreeExpand 0.5s ease forwards;
  }
</style>

<div class="bottom-nav" class:menu-open={isMenuOpen} bind:this={bottomNavElement}>
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