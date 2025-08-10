import { writable } from 'svelte/store';

// Default audio settings
const defaultAudio = {
  src: '/audio/TheTavernOak.mp3',
  title: 'Tavern Music',
  enabled: true,
  audioAvailable: true // Flag to indicate if audio file actually exists
};

// Create a writable store with the default settings
export const pageAudio = writable(defaultAudio);

// Function to update the audio settings
export function setPageAudio(
  src: string,
  title: string = 'Tavern Music',
  audioAvailable: boolean = true
) {
  // Only proceed if the audio file exists
  if (audioAvailable) {
    if (import.meta.env.DEV) {
      console.log(`Setting page audio: ${src} - ${title}`);
    }
    pageAudio.update(() => ({
      src,
      title,
      enabled: true,
      audioAvailable
    }));
  } else {
    if (import.meta.env.DEV) {
      console.warn(`Audio file not available: ${src}`);
    }
    disablePageAudio();
  }
}

// Function to disable audio for a page
export function disablePageAudio() {
  pageAudio.update(audio => ({
    ...audio,
    enabled: false,
    audioAvailable: false
  }));
}

// Function to restore default audio
export function resetPageAudio() {
  if (import.meta.env.DEV) {
    console.log('Resetting to default audio');
  }
  pageAudio.set(defaultAudio);
}
