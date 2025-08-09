<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props with default values
  export let audioSrc: string;
  export let audioTitle: string = 'Background Music';
  export let hintText: string = 'Click to unmute';
  export let startMuted: boolean = true;

  // Element references
  let audioControlsElement: HTMLDivElement | null = null;
  let audioPlayer: HTMLAudioElement | null = null;
  let isMuted: boolean = startMuted;
  let showHint = true;

  // Toggle mute/unmute
  function toggleMute() {
    if (!audioPlayer) {
      return;
    }

    if (isMuted) {
      audioPlayer.muted = false;
        audioPlayer.play().catch(error => {
          if (import.meta.env.DEV) console.warn('Failed to play audio:', error);
        // Fallback if autoplay is blocked
        isMuted = true;
        if (audioPlayer) {
          audioPlayer.muted = true;
        }
      });
    } else {
      audioPlayer.muted = true;
    }

    isMuted = !isMuted;

    // Hide hint after first interaction
    if (showHint) {
      showHint = false;
    }
  }

  // Handle scroll behavior - show/hide based on scroll position
  function handleScroll() {
    if (!audioControlsElement) {
      return;
    }

    // Show audio controls when scrolled down
    if (window.scrollY > 300) {
      audioControlsElement.style.opacity = '1';
      audioControlsElement.style.pointerEvents = 'auto';
    } else {
      audioControlsElement.style.opacity = '0';
      audioControlsElement.style.pointerEvents = 'none';
    }

    // Check if near footer to adjust position
    const footer = document.querySelector('.footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is becoming visible in the viewport
      if (footerRect.top < windowHeight) {
        // Calculate how much of the footer is visible
        const footerVisibleHeight = windowHeight - footerRect.top;
        // Adjust the bottom position of the audio controls
        audioControlsElement.style.bottom = `${Math.min(footerVisibleHeight + 20, 120)}px`;
      } else {
        // Reset to default position
        audioControlsElement.style.bottom = '20px';
      }
    }
  }

  onMount(() => {
    // Start the audio (it will be muted if startMuted is true)
    if (typeof window !== 'undefined') {
      // Auto-play as muted (needed for mobile and modern browsers)
      if (audioPlayer) {
        audioPlayer.volume = 0.5; // Set initial volume to 50%

        // Always start muted if specified
         audioPlayer.muted = startMuted;
        isMuted = startMuted;

        // Load the audio
        audioPlayer.load();

        // Try to autoplay (will likely be blocked if not muted)
         audioPlayer.play().catch(e => {
          if (import.meta.env.DEV) console.log('Audio autoplay was prevented:', e);
        });
      }

      // Add scroll event handler
      window.addEventListener('scroll', handleScroll);

      // Initial position check
      setTimeout(handleScroll, 300);

      // Check position on window resize
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);

        // Clean up
        if (audioPlayer) {
          audioPlayer.pause();
        }
      }
    };
  });
</script>

<!-- Audio player -->
<audio bind:this={audioPlayer} src={audioSrc} preload="auto" loop></audio>

<div
  class="audio-controls"
  bind:this={audioControlsElement}
  on:click={toggleMute}
  role="button"
  tabindex="0"
  aria-label={isMuted ? `Play ${audioTitle}` : `Mute ${audioTitle}`}
  on:keydown={e => e.key === 'Enter' && toggleMute()}
>
  <div class="mute-button">
    {#if isMuted}
      <i class="fas fa-volume-mute"></i>
    {:else}
      <i class="fas fa-volume-up"></i>
    {/if}
  </div>
  <span class="audio-title">{audioTitle}</span>
  {#if isMuted && showHint}
    <span class="audio-hint">{hintText}</span>
  {/if}
</div>

<style>
  /* Audio Player Styles */
  .audio-controls {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(31, 27, 45, 0.8);
    padding: 10px 16px;
    border-radius: 30px;
    border: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition:
      all 0.2s ease,
      opacity 0.3s ease,
      bottom 0.2s ease;
    opacity: 0;
    pointer-events: none;
  }

  .audio-controls:hover {
    background: rgba(31, 27, 45, 0.9);
    border-color: rgba(189, 150, 72, 0.5);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    transform: translateX(-50%) translateY(-2px);
  }

  .mute-button {
    color: #bd9648;
    font-size: 1.1rem;
    width: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .audio-title {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    font-size: 0.9rem;
    margin: 0 4px;
  }

  .audio-hint {
    font-size: 0.75rem;
    color: rgba(247, 232, 212, 0.7);
    font-style: italic;
  }

  /* Mobile responsive styles */
  @media (max-width: 480px) {
    .audio-controls {
      padding: 8px 12px;
      gap: 8px;
    }

    .audio-title {
      font-size: 0.8rem;
    }

    .audio-hint {
      font-size: 0.7rem;
    }
  }
</style>
