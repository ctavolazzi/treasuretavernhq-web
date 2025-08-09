<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props for the component
  export let audioSrc: string; // The URL of the audio file to play
  export let audioTitle: string = ''; // Optional title for the audio
  export let autoplay: boolean = false; // Whether to autoplay the audio
  export let showProgress: boolean = true; // Whether to show the progress bar

  // Internal state
  let audio: HTMLAudioElement;
  let isPlaying: boolean = false;
  let currentTime: number = 0;
  let duration: number = 0;
  let progress: number = 0;
  const volume: number = 0.7; // Default volume at 70%
  let dragging: boolean = false;

  // Update progress when the current time changes
  function updateProgress() {
    if (!dragging && audio) {
      currentTime = audio.currentTime;
      progress = (currentTime / duration) * 100;
    }
  }

  // Handle play/pause toggle
  function togglePlay() {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.warn('Failed to play audio:', error);
        });
      }
      isPlaying = !isPlaying;
    }
  }

  // Handle seeking with mouse/touch events
  function startDrag() {
    dragging = true;
  }

  function endDrag() {
    dragging = false;
  }

  function updateSeek(e: MouseEvent | TouchEvent) {
    if (dragging) {
      seek(e);
    }
  }

  // Handle seeking when the user interacts with the progress bar
  function seek(e: MouseEvent | TouchEvent) {
    if (audio && duration) {
      const progressBar = e.currentTarget as HTMLDivElement;
      const rect = progressBar.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const offsetX = clientX - rect.left;
      const newPosition = (offsetX / rect.width) * duration;

      // Update audio position
      audio.currentTime = newPosition;

      // Update progress state
      currentTime = newPosition;
      progress = (currentTime / duration) * 100;
    }
  }

  // Format time in MM:SS format
  function formatTime(seconds: number): string {
    if (isNaN(seconds)) {
      return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Optimized touch handler for progress bar
  function handleTouchStart(e: TouchEvent) {
    // Only prevent default if we're actually going to handle the touch
    if (audio && duration) {
      e.preventDefault();
      startDrag();
      seek(e);
    }
  }

  // Set up event listeners
  onMount(() => {
    console.log('AudioPlayer mounted, audioSrc:', audioSrc);

    if (audio) {
      console.log('Audio element found');

      // Set initial volume
      audio.volume = volume;

      // Load metadata - this gets the duration once the audio is loaded
      audio.addEventListener('loadedmetadata', () => {
        console.log('Audio metadata loaded, duration:', audio.duration);
        duration = audio.duration;
      });

      // Add error handling
      audio.addEventListener('error', e => {
        console.error('Audio error:', e);
        console.error('Audio error code:', audio.error?.code);
        console.error('Audio error message:', audio.error?.message);
      });

      // Log when audio is actually playing
      audio.addEventListener('playing', () => {
        console.log('Audio is now playing');
      });

      // Update progress as audio plays
      audio.addEventListener('timeupdate', updateProgress);

      // Handle when audio ends
      audio.addEventListener('ended', () => {
        isPlaying = false;
        audio.currentTime = 0;
        updateProgress();
      });

      // Start playing if autoplay is enabled
      if (autoplay) {
        audio.play().catch(error => {
          console.warn('Autoplay failed:', error);
          isPlaying = false;
        });
        isPlaying = true;
      }

      // Set up global event listeners for drag actions
      window.addEventListener('mousemove', updateSeek);
      window.addEventListener('touchmove', updateSeek);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchend', endDrag);
    }
  });

  // Clean up event listeners
  onDestroy(() => {
    if (audio) {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => {});
    }

    window.removeEventListener('mousemove', updateSeek);
    window.removeEventListener('touchmove', updateSeek);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('touchend', endDrag);
  });
</script>

<div class="audio-player">
  {#if audioTitle}
    <div class="audio-title">{audioTitle}</div>
  {/if}

  <audio bind:this={audio} src={audioSrc} preload="metadata">
    Your browser does not support the audio element.
  </audio>

  <div class="audio-controls">
    <button class="play-button" on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
      {#if isPlaying}
        <!-- Pause icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      {:else}
        <!-- Play icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      {/if}
    </button>

    {#if showProgress}
      <div
        role="slider"
        aria-label="Audio progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progress) || 0}
        class="progress-container"
        on:mousedown={e => {
          startDrag();
          seek(e);
        }}
        on:touchstart={e => {
          handleTouchStart(e);
        }}
      >
        <div class="progress-bar" style:width="{progress}%"></div>
      </div>
    {/if}
  </div>

  {#if showProgress}
    <div class="time-display">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  {/if}
</div>

<style>
  .audio-player {
    width: 100%;
    max-width: 600px;
    margin: 1.5rem auto;
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    padding: 1rem 1.25rem;
    color: #f7e8d4;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(189, 150, 72, 0.2);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .audio-title {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    font-weight: 500;
    color: #bd9648;
    text-align: center;
  }

  .audio-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .play-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #f7e8d4;
    border-radius: 50%;
    background: rgba(158, 97, 227, 0.2);
    transition: all 0.2s ease;
  }

  .play-button:hover {
    background: rgba(158, 97, 227, 0.3);
    transform: scale(1.05);
  }

  .time-display {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: rgba(247, 232, 212, 0.7);
    margin-top: 0.5rem;
  }

  .progress-container {
    flex-grow: 1;
    margin: 0 1rem;
    height: 6px;
    background: rgba(247, 232, 212, 0.15);
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #9e61e3 0%, #7a3ca3 100%);
    border-radius: 3px;
    transition: width 0.1s linear;
  }

  /* For smaller screens */
  @media (max-width: 640px) {
    .audio-player {
      padding: 0.85rem 1rem;
    }
  }
</style>
