/**
 * Shared audio utilities for players
 */

/**
 * Format seconds to MM:SS string
 */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Attempt to play audio with safe error handling
 */
export async function tryPlay(audio: HTMLAudioElement): Promise<void> {
  try {
    await audio.play();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Audio play prevented or failed:', error);
    }
  }
}


