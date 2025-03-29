<script lang="ts">
  import BottomNav from '$lib/components/BottomNav.svelte';
  import { onMount } from 'svelte';

  // Sample navigation options for demo
  const navOptions = [
    { label: 'Home', href: '/' },
    { label: 'Tales', href: '/tavern-tales' },
    { label: 'Newsletter', href: '/newsletter' },
    {
      label: 'Toggle Theme',
      href: 'javascript:void(0)',
      action: () => {
        alert('Theme toggle action would go here');
      }
    },
    { label: 'Contact', href: '/contact' }
  ];

  // Demo state
  let audioEnabled = true;
  let currentAudioSource = '/audio/TheTavernOak.mp3';
  let audioTitle = 'Tavern Music';

  // Available audio tracks for demo
  const audioTracks = [
    { src: '/audio/TheTavernOak.mp3', title: 'Tavern Music' },
    { src: '/audio/demo-track-1.mp3', title: 'Adventure Theme' },
    { src: '/audio/demo-track-2.mp3', title: 'Mysterious Melody' }
  ];

  // Find index of current track
  let currentTrackIndex = 0;

  function toggleAudioOption() {
    audioEnabled = !audioEnabled;
  }

  function changeAudioTrack() {
    // Cycle to next track
    currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    currentAudioSource = audioTracks[currentTrackIndex].src;
    audioTitle = audioTracks[currentTrackIndex].title;
  }
</script>

<style>
  .demo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Georgia', serif;
    min-height: 150vh; /* To demonstrate scrolling behavior */
  }

  h1, h2 {
    font-family: 'Cinzel', serif;
    color: #cfa75d;
  }

  .description {
    margin-bottom: 30px;
    line-height: 1.5;
  }

  .demo-controls {
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  button {
    background-color: #cfa75d;
    color: #1c1c1c;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
    margin-right: 10px;
  }

  .feature-list {
    margin-bottom: 30px;
  }

  .feature-list li {
    margin-bottom: 10px;
  }

  .scroll-hint {
    text-align: center;
    margin-top: 60px;
    font-style: italic;
    color: #777;
  }

  .placeholder {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(207, 167, 93, 0.1);
    border-radius: 8px;
    margin: 20px 0;
  }

  .current-track {
    margin-top: 15px;
    padding: 10px;
    background-color: rgba(207, 167, 93, 0.2);
    border-radius: 4px;
  }

  .track-title {
    font-weight: bold;
    color: #cfa75d;
  }
</style>

<svelte:head>
  <title>Bottom Nav Demo | Treasure Tavern</title>
</svelte:head>

<div class="demo-container">
  <h1>Bottom Navigation Component</h1>

  <div class="description">
    <p>This is a demonstration of the dynamic bottom navigation component for Treasure Tavern. The component appears as an elegant gold "+" button centered at the bottom of the screen, expanding to show a speech bubble menu with music controls and navigation options.</p>
  </div>

  <div class="demo-controls">
    <h2>Demo Controls</h2>
    <p>Toggle music controls or change the audio track:</p>
    <div>
      <button on:click={toggleAudioOption}>
        {audioEnabled ? 'Disable' : 'Enable'} Music Controls
      </button>

      <button on:click={changeAudioTrack}>
        Change Audio Track
      </button>
    </div>

    <div class="current-track">
      <p>Current Track: <span class="track-title">{audioTitle}</span></p>
      <p>Source: <code>{currentAudioSource}</code></p>
    </div>
  </div>

  <div class="feature-list">
    <h2>Features</h2>
    <ul>
      <li>Floating bottom navigation with expandable menu</li>
      <li>Music controls with play/pause functionality</li>
      <li>Dynamic audio source changing</li>
      <li>Customizable navigation options</li>
      <li>Smart footer detection to prevent overlap</li>
      <li>Fully responsive for both desktop and mobile</li>
      <li>Styled to match Treasure Tavern's fantasy theme</li>
    </ul>
  </div>

  <p class="scroll-hint">Scroll down to see how the bottom nav adjusts when reaching the footer</p>

  <div class="placeholder">
    <p>Content placeholder</p>
  </div>

  <div class="placeholder">
    <p>More content placeholder</p>
  </div>

  <div class="placeholder">
    <p>Even more content placeholder</p>
  </div>
</div>

<!-- The bottom navigation component -->
<BottomNav
  navOptions={navOptions}
  enableMusicControl={audioEnabled}
  audioSrc={currentAudioSource}
  audioTitle={audioTitle}
/>