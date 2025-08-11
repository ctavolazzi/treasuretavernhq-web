<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { AudioPlayerProps } from '$lib/types/common';

  // Unified props for all audio use cases
  export let audioSrc: AudioPlayerProps['audioSrc'];
  export let audioTitle: AudioPlayerProps['audioTitle'] = '';
  export let autoplay: AudioPlayerProps['autoplay'] = false;
  export let loop: boolean = true;
  export let volume: number = 0.3;
  export let showTitle: boolean = true;
  export let startMuted: AudioPlayerProps['startMuted'] = true;
  export let variant: 'floating' | 'inline' | 'bottom-nav' | 'simple' = 'inline';
  export let position: 'top-right' | 'bottom-right' | 'bottom-left' | 'center' = 'bottom-right';
  export let size: 'small' | 'medium' | 'large' = 'medium';

  // Audio state
  let audio: HTMLAudioElement | undefined;
  let isPlaying = false;
  let isMuted = startMuted;
  let isLoaded = false;
  let isError = false;

  // Methods
  function togglePlayback() {
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (import.meta.env.DEV) {
            console.warn('Audio playback failed:', error);
          }
          isError = true;
        });
      }
    }
  }

  function toggleMute() {
    if (!audio) {
      return;
    }

    audio.muted = !audio.muted;
    isMuted = audio.muted;
  }

  function handleAudioLoad() {
    isLoaded = true;
    isError = false;
  }

  function handleAudioError() {
    isError = true;
    console.error('Failed to load audio:', audioSrc);
  }

  function handlePlay() {
    isPlaying = true;
  }

  function handlePause() {
    isPlaying = false;
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      audio = new Audio(audioSrc);
      audio.loop = loop;
      audio.volume = volume;
      audio.muted = startMuted; // Start muted for better UX (configurable)

      // Event listeners
      audio.addEventListener('loadeddata', handleAudioLoad);
      audio.addEventListener('error', handleAudioError);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      if (autoplay) {
        // Try to autoplay, but respect browser policies
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked, that's fine
          });
        }
      }
    }
  });

  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio.removeEventListener('loadeddata', handleAudioLoad);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    }
  });

  // Update audio source when prop changes
  $: if (audio && audioSrc) {
    audio.src = audioSrc;
    audio.load();
  }
</script>

<!-- Render different variants based on props -->
{#if variant === 'floating'}
  <div class="audio-player floating {position} {size}" class:error={isError}>
    <div class="controls">
      <button
        class="control-btn"
        on:click={togglePlayback}
        disabled={!isLoaded || isError}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        <i class="fas {isPlaying ? 'fa-pause' : 'fa-play'}"></i>
      </button>

      <button
        class="control-btn"
        on:click={toggleMute}
        disabled={!isLoaded || isError}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        <i class="fas {isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
      </button>
    </div>

    {#if showTitle && audioTitle}
      <div class="title">{audioTitle}</div>
    {/if}
  </div>
{:else if variant === 'bottom-nav'}
  <div class="audio-controls">
    <button
      class="music-control"
      class:playing={isPlaying}
      on:click={toggleMute}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
    >
      <i class="fas {isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
      {isMuted ? 'Unmute' : 'Mute'} Music
    </button>

    {#if showTitle && audioTitle}
      <div class="music-info">
        <span class="music-title">♫ {audioTitle}</span>
      </div>
    {/if}
  </div>
{:else if variant === 'simple'}
  <div class="audio-player simple {size}">
    <button
      class="simple-toggle"
      on:click={toggleMute}
      disabled={!isLoaded || isError}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
    >
      <i class="fas {isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
      {#if showTitle && audioTitle}
        <span>{audioTitle}</span>
      {/if}
    </button>
  </div>
{:else}
  <!-- Inline variant -->
  <div class="audio-player inline {size}" class:error={isError}>
    <div class="player-header">
      {#if showTitle && audioTitle}
        <h4 class="player-title">{audioTitle}</h4>
      {/if}
    </div>

    <div class="controls">
      <button
        class="control-btn play-btn"
        on:click={togglePlayback}
        disabled={!isLoaded || isError}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        <i class="fas {isPlaying ? 'fa-pause' : 'fa-play'}"></i>
      </button>

      <button
        class="control-btn mute-btn"
        on:click={toggleMute}
        disabled={!isLoaded || isError}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        <i class="fas {isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
      </button>
    </div>

    {#if isError}
      <div class="error-message">Failed to load audio</div>
    {/if}
  </div>
{/if}

<style>
  /* Base styles */
  .audio-player {
    background: rgba(31, 27, 45, 0.9);
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 8px;
    color: #f7e8d4;
    font-family: 'Inter', system-ui, sans-serif;
  }

  /* Floating variant */
  .audio-player.floating {
    position: fixed;
    z-index: 100;
    padding: 0.75rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .floating.top-right {
    top: 20px;
    right: 20px;
  }
  .floating.bottom-right {
    bottom: 20px;
    right: 20px;
  }
  .floating.bottom-left {
    bottom: 20px;
    left: 20px;
  }
  .floating.center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* Inline variant */
  .audio-player.inline {
    padding: 1rem;
    margin: 1rem 0;
  }

  /* Simple variant */
  .audio-player.simple {
    display: inline-block;
  }

  .simple-toggle {
    background: rgba(31, 27, 45, 0.9);
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 6px;
    color: #f7e8d4;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .simple-toggle:hover {
    background: rgba(189, 150, 72, 0.1);
    border-color: rgba(189, 150, 72, 0.5);
  }

  /* Controls */
  .controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .control-btn {
    background: transparent;
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 6px;
    color: #bd9648;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control-btn:hover:not(:disabled) {
    background: rgba(189, 150, 72, 0.1);
    border-color: rgba(189, 150, 72, 0.5);
  }

  .control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Bottom nav variant */
  .audio-controls {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }

  .music-control {
    background: rgba(31, 27, 45, 0.9);
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 6px;
    color: #f7e8d4;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .music-control:hover {
    background: rgba(189, 150, 72, 0.1);
    border-color: rgba(189, 150, 72, 0.5);
  }

  .music-control.playing {
    color: #bd9648;
  }

  .music-info {
    font-size: 0.8rem;
    color: rgba(247, 232, 212, 0.7);
    text-align: center;
  }

  .music-title {
    font-style: italic;
  }

  /* Titles */
  .player-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #bd9648;
    font-family: 'Cinzel', serif;
  }

  .title {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.8);
    margin-top: 0.5rem;
    text-align: center;
  }

  /* Sizes */
  .small {
    font-size: 0.9rem;
  }
  .small .control-btn {
    min-width: 2rem;
    height: 2rem;
  }

  .large {
    font-size: 1.1rem;
  }
  .large .control-btn {
    min-width: 3rem;
    height: 3rem;
  }

  /* Error state */
  .error {
    border-color: rgba(220, 38, 38, 0.5);
  }

  .error-message {
    color: rgba(220, 38, 38, 0.8);
    font-size: 0.9rem;
    margin-top: 0.5rem;
    text-align: center;
  }
</style>
