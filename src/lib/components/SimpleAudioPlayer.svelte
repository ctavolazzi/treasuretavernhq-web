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
          if (import.meta.env.DEV) console.warn('Failed to play audio:', error);
        });
      }
      isPlaying = !isPlaying;
    }
  }

  // Handle seeking when progress bar is clicked
  function handleSeek(event: MouseEvent) {
    if (audio && duration) {
      const progressContainer = event.currentTarget as HTMLElement;
      const rect = progressContainer.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const percentageClicked = clickPosition / rect.width;
      const seekTime = percentageClicked * duration;

      // Set the audio time to the calculated time
      audio.currentTime = seekTime;

      // If audio was playing, continue playing after seek
      if (isPlaying) {
        audio.play().catch(error => {
          if (import.meta.env.DEV) console.warn('Failed to play audio after seeking:', error);
        });
      }
    }
  }

  // Format time in MM:SS format (shared)
  import { formatTime } from '$lib/utils/audio';

  // Named handlers to ensure proper removal on destroy
  let onLoadedMetadata: (() => void) | null = null;
  let onEnded: (() => void) | null = null;

  // Set up event listeners
  onMount(() => {
    if (!audio) return;

    onLoadedMetadata = () => {
      duration = audio.duration;
    };
    onEnded = () => {
      isPlaying = false;
      audio.currentTime = 0;
      updateProgress();
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onEnded);
  });

  // Clean up event listeners
  onDestroy(() => {
    if (!audio) return;
    if (onLoadedMetadata) {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    }
    audio.removeEventListener('timeupdate', updateProgress);
    if (onEnded) {
      audio.removeEventListener('ended', onEnded);
    }
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
        <i class="fas fa-pause"></i>
      {:else}
        <i class="fas fa-play"></i>
      {/if}
    </button>
    <div class="progress-container" role="button" tabindex="0" on:keydown={(e) => e.key==='Enter' && handleSeek((e as unknown) as MouseEvent)} on:click={handleSeek}>
      <div class="progress-bar" style:width="{progress}%">
        <div class="progress-indicator"></div>
      </div>
    </div>
    <div class="time-display">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  </div>
</div>

<style>
  .audio-player {
    width: 100%;
    max-width: 100%;
    background: rgba(19, 17, 28, 0.8);
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    color: #f7e8d4;
    border: 1px solid rgba(158, 97, 227, 0.2);
    font-family: 'Inter', system-ui, sans-serif;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    margin: 1.5rem 0;
  }

  .audio-title {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #bd9648;
    font-family: 'Cinzel', serif;
  }

  .audio-controls {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .play-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 48px;
    height: 48px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #f7e8d4;
    border-radius: 50%;
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    transition: all 0.2s ease;
    flex-shrink: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  .play-button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.35);
  }

  .progress-container {
    flex-grow: 1;
    height: 8px;
    background: rgba(247, 232, 212, 0.1);
    border-radius: 4px;
    overflow: visible;
    position: relative;
    cursor: pointer;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #9e61e3 0%, #bd9648 100%);
    border-radius: 4px;
    transition: width 0.1s linear;
    position: relative;
  }

  .progress-indicator {
    position: absolute;
    top: 50%;
    right: -6px;
    width: 12px;
    height: 12px;
    background: #f7e8d4;
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 6px rgba(158, 97, 227, 0.8);
    border: 2px solid rgba(158, 97, 227, 1);
    z-index: 2;
  }

  .time-display {
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.9);
    margin-left: 0.75rem;
    white-space: nowrap;
    min-width: 90px;
    text-align: right;
  }

  @media (max-width: 600px) {
    .audio-player {
      padding: 1rem;
    }

    .audio-controls {
      gap: 0.75rem;
    }

    .play-button {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .time-display {
      font-size: 0.85rem;
      min-width: 80px;
    }
  }
</style>
