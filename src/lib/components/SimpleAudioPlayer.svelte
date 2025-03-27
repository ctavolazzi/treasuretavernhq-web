<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props for the component
  export let audioSrc: string; // The URL of the audio file to play
  export let audioTitle: string = ''; // Optional title for the audio

  // Internal state
  let audio: HTMLAudioElement;
  let isPlaying: boolean = false;
  let currentTime: number = 0;
  let duration: number = 0;
  let progress: number = 0;

  // Update progress when the current time changes
  function updateProgress() {
    if (audio) {
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

  // Format time in MM:SS format
  function formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Set up event listeners
  onMount(() => {
    if (audio) {
      // Load metadata - this gets the duration once the audio is loaded
      audio.addEventListener('loadedmetadata', () => {
        duration = audio.duration;
      });

      // Update progress as audio plays
      audio.addEventListener('timeupdate', updateProgress);

      // Handle when audio ends
      audio.addEventListener('ended', () => {
        isPlaying = false;
        audio.currentTime = 0;
        updateProgress();
      });
    }
  });

  // Clean up event listeners
  onDestroy(() => {
    if (audio) {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => {});
    }
  });
</script>

<style>
  .audio-player {
    width: 100%;
    max-width: 600px;
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #F7E8D4;
    border: 1px solid rgba(189, 150, 72, 0.2);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .audio-title {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #BD9648;
  }

  .audio-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .play-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 36px;
    height: 36px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #F7E8D4;
    border-radius: 50%;
    background: rgba(158, 97, 227, 0.2);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .play-button:hover {
    background: rgba(158, 97, 227, 0.3);
  }

  .progress-container {
    flex-grow: 1;
    height: 4px;
    background: rgba(247, 232, 212, 0.15);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  .progress-bar {
    height: 100%;
    background: #9E61E3;
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .time-display {
    font-size: 0.8rem;
    color: rgba(247, 232, 212, 0.7);
    margin-left: 0.5rem;
    white-space: nowrap;
  }
</style>

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
        ❚❚
      {:else}
        ▶
      {/if}
    </button>
    <div class="progress-container">
      <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    <div class="time-display">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  </div>
</div>