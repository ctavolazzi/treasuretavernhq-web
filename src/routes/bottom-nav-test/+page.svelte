<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { setPageAudio, resetPageAudio } from '$lib/stores/audioStore';

  let audioStatus = "Not playing";

  onMount(() => {
    // Set custom audio for this test page
    setPageAudio('/audio/TheTavernOak.mp3', 'Tavern Music Test');

    // Listen for audio events to update status
    const audioEventListener = (event: any) => {
      if (event.detail && event.detail.type === 'audio') {
        audioStatus = event.detail.playing ? "Playing" : "Paused";
      }
    };

    // Add event listener if we have a custom event for audio state
    if (typeof window !== 'undefined') {
      window.addEventListener('bottomNavAudioChange', audioEventListener);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('bottomNavAudioChange', audioEventListener);
      }
    };
  });

  onDestroy(() => {
    // Reset to default audio when leaving the page
    resetPageAudio();
  });
</script>

<style>
  .test-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    min-height: 100vh;
  }

  h1 {
    font-family: 'Cinzel', serif;
    color: #cfa75d;
    margin-bottom: 30px;
  }

  .card {
    background-color: #1c1c1c;
    border: 1px solid #cfa75d;
    padding: 30px;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .status {
    margin-top: 20px;
    font-size: 1.2rem;
  }

  .status-value {
    color: #cfa75d;
    font-weight: bold;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .instructions {
    background-color: rgba(207, 167, 93, 0.1);
    padding: 20px;
    border-radius: 8px;
    margin-top: 40px;
  }

  .instructions h2 {
    color: #cfa75d;
    font-family: 'Cinzel', serif;
    margin-bottom: 15px;
  }

  .instructions ol {
    padding-left: 20px;
  }

  .instructions li {
    margin-bottom: 10px;
  }
</style>

<div class="test-container">
  <h1>Bottom Nav Audio Test</h1>

  <div class="card">
    <p>This page is testing the audio functionality of the bottom navigation component. The bottom nav should appear at the bottom of the screen with a "+" button.</p>

    <p>Click the "+" button to expand the menu, then use the Play/Pause button to control the audio.</p>

    <div class="status">
      Audio Status: <span class="status-value">{audioStatus}</span>
    </div>
  </div>

  <div class="instructions">
    <h2>Test Instructions</h2>
    <ol>
      <li>The audio should start muted/paused by default</li>
      <li>Click the "+" button at the bottom of the screen to expand the menu</li>
      <li>Click "Play" to start playing the audio</li>
      <li>Click "Pause" to pause the audio</li>
      <li>Navigate to another page and return to this page - the audio control should still work</li>
      <li>Try the same on the Bone Kingdom tale page to verify its custom audio works</li>
    </ol>
  </div>
</div>