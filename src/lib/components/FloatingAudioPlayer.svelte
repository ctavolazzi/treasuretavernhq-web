<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props with default values
  export let audioSrc: string;
  export let audioTitle: string = "Background Music";
  export let hintText: string = "Click to unmute";
  export let startMuted: boolean = true;

  // Element references
  let audioControlsElement: HTMLDivElement | null = null;
  let audioPlayer: HTMLAudioElement | null = null;
  let isMuted: boolean = startMuted;
  let isPlaying = false;
  let hintVisible = true;
  let audioProgress = 0;
  let audioDuration = 0;

  // Toggle mute/unmute
  function toggleMute(e?: Event) {
    if (e) e.stopPropagation();

    if (!audioPlayer) return;

    isMuted = !isMuted;
    audioPlayer.volume = isMuted ? 0 : 0.5;
  }

  // Handle scroll behavior - show/hide based on scroll position
  function handleScroll() {
    if (!audioControlsElement) return;

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
        audioPlayer.muted = startMuted;
        audioPlayer.volume = startMuted ? 0 : 0.5;

        audioPlayer.play().catch(e => {
          console.log('Audio autoplay was prevented:', e);
        });
      }

      // Add scroll event handler
      window.addEventListener('scroll', handleScroll);

      // Check position on window resize
      window.addEventListener('resize', handleScroll);

      // Find the elements after the component is mounted
      audioControlsElement = document.querySelector('.audio-controls');
      audioPlayer = document.querySelector('#audio-player');

      if (audioPlayer) {
        // Set initial volume to 0 if startMuted is true
        audioPlayer.volume = startMuted ? 0 : 0.5;

        // Update progress when the time changes
        audioPlayer.addEventListener('timeupdate', () => {
          if (audioPlayer) {
            audioProgress = audioPlayer.currentTime;
            audioDuration = audioPlayer.duration || 0;
          }
        });

        // Update duration once metadata is loaded
        audioPlayer.addEventListener('loadedmetadata', () => {
          if (audioPlayer) {
            audioDuration = audioPlayer.duration;
          }
        });
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
    };
  });

  // Function to toggle play/pause
  function toggleAudio() {
    if (!audioPlayer) return;

    if (audioPlayer.paused) {
      audioPlayer.play();
      isPlaying = true;
    } else {
      audioPlayer.pause();
      isPlaying = false;
    }

    // Hide hint after first play
    if (hintVisible) {
      hintVisible = false;
    }
  }
</script>

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
    gap: 8px;
    background: rgba(31, 27, 45, 0.6);
    padding: 8px 12px;
    border-radius: 30px;
    border: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition: all 0.2s ease, opacity 0.3s ease, bottom 0.2s ease;
    opacity: 0;
    pointer-events: none;
    flex-wrap: wrap;
  }

  .audio-controls:hover {
    background: rgba(31, 27, 45, 0.8);
    border-color: rgba(189, 150, 72, 0.5);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    transform: translateX(-50%) translateY(-2px);
  }

  .control-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: #F7E8D4;
    font-size: 1rem;
  }

  .audio-info {
    display: flex;
    flex-direction: column;
  }

  .audio-title {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    color: #BD9648;
    margin: 0;
  }

  .audio-hint {
    font-size: 0.7rem;
    color: rgba(247, 232, 212, 0.7);
    font-style: italic;
    margin-top: 2px;
  }

  .mute-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #9E61E3;
    font-size: 0.95rem;
    margin-left: 4px;
    transition: color 0.2s ease;
  }

  .mute-button:hover {
    color: #BD9648;
  }

  /* Progress bar styles */
  .progress-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(247, 232, 212, 0.2);
    border-radius: 0 0 30px 30px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(to right, #9E61E3, #BD9648);
    transition: width 0.1s linear;
  }

  /* Mobile responsive styles */
  @media (max-width: 480px) {
    .audio-controls {
      padding: 6px 10px;
      gap: 6px;
    }

    .audio-title {
      font-size: 0.75rem;
    }

    .audio-hint {
      font-size: 0.65rem;
    }

    .control-icon, .mute-button {
      width: 24px;
      height: 24px;
      font-size: 0.85rem;
    }
  }
</style>

<div
  class="audio-controls"
  on:click={toggleAudio}
  bind:this={audioControlsElement}
  role="button"
  tabindex="0"
  aria-label={isPlaying ? "Pause audio" : "Play audio"}
  on:keydown={e => e.key === 'Enter' && toggleAudio()}
>
  <!-- Audio element -->
  <audio src={audioSrc} id="audio-player" preload="metadata" bind:this={audioPlayer} loop></audio>

  <!-- Play/Pause button -->
  <div class="control-icon">
    <i class={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
  </div>

  <!-- Title text -->
  <div class="audio-info">
    <div class="audio-title">{audioTitle}</div>
    {#if hintVisible}
      <div class="audio-hint">{hintText}</div>
    {/if}
  </div>

  <!-- Mute button -->
  <div
    class="mute-button"
    on:click|stopPropagation={toggleMute}
    role="button"
    tabindex="0"
    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    on:keydown={e => e.key === 'Enter' && toggleMute()}
  >
    <i class={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
  </div>

  <!-- Progress bar - only show when playing or has progressed -->
  {#if isPlaying || audioProgress > 0}
    <div class="progress-container">
      <div class="progress-bar" style="width: {(audioProgress / audioDuration * 100) || 0}%"></div>
    </div>
  {/if}
</div>