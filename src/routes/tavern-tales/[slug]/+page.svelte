<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import SimpleAudioPlayer from '$lib/components/SimpleAudioPlayer.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import FloatingAudioPlayer from '$lib/components/FloatingAudioPlayer.svelte';

  // Define Tale interface to fix type errors
  interface Tale {
    slug: string;
    title: string;
    type: string;
    category: string;
    date: string;
    author: string;
    excerpt: string;
    content: string;
    coverImage: string;
    mediaType?: 'video' | 'audio' | 'interactive' | null;
    mediaContent?: string;
    tags: string[];
  }

  interface RelatedTale {
    slug: string;
    title: string;
    type: string;
    coverImage: string;
  }

  // Get the data from the loader with proper type annotations
  export let data: {
    tale: Tale;
    relatedTales: RelatedTale[];
  };

  const { tale, relatedTales } = data;

  // Breadcrumb configuration
  $: breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'fa-home' },
    { label: 'Tavern Tales', href: '/tavern-tales', icon: 'fa-book-open' },
    { label: tale.title }
  ];

  // For handling the interactive media component if applicable
  let showRiddleAnswers = false;

  // Handle media display
  let mediaReady = false;

  // Track the current slug to help with reactivity
  let currentSlug: string | undefined;
  // Add a loading state
  let isLoading = false;

  // State for copy functionality
  let copySuccess = false;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  onMount(() => {
    // Handle any client-side initialization
    mediaReady = true;

    // Initial scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Simpler approach - ensure loading state is reset properly
    // Marking as loaded initially (after component mount)
    isLoading = false;

    // Set up a safety timer to ensure spinner doesn't get stuck
    const safetyTimer = setTimeout(() => {
      if (isLoading) {
        isLoading = false;
      }
    }, 3000); // 3 second safety timeout

    // Clean up
    return () => {
      clearTimeout(safetyTimer);
    };
  });

  // Track changes to the tale slug without doing anything that would cause SSR issues
  $: currentSlug = tale?.slug;

  // Function to copy tale content to clipboard
  function copyTaleContent() {
    if (typeof window !== 'undefined' && tale) {
      // Create a temporary element to hold the HTML content
      const tempElement = document.createElement('div');
      tempElement.innerHTML = tale.content;

      // Get the text content (strips HTML tags)
      const textContent = tempElement.textContent || tempElement.innerText || '';

      // Copy to clipboard
      navigator.clipboard.writeText(textContent)
        .then(() => {
          // Show success message
          copySuccess = true;

          // Clear any existing timeout
          if (copyTimeout) {
            clearTimeout(copyTimeout);
          }

          // Hide success message after 3 seconds
          copyTimeout = setTimeout(() => {
            copySuccess = false;
          }, 3000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  }

  // Function to download tale content as a text file
  function downloadTaleAsText() {
    if (typeof window !== 'undefined' && tale) {
      // Create a temporary element to hold the HTML content
      const tempElement = document.createElement('div');
      tempElement.innerHTML = tale.content;

      // Get the text content (strips HTML tags)
      const textContent = tempElement.textContent || tempElement.innerText || '';

      // Create a blob with the text content
      const blob = new Blob([textContent], { type: 'text/plain' });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a link element
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tale.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;

      // Append the link to the body
      document.body.appendChild(a);

      // Click the link to trigger the download
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  // Clear timeout on component destroy
  onDestroy(() => {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
  });
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #13111C 0%, #1F1B2D 60%, #2B1D34 100%);
    color: #F7E8D4;
    overflow-x: hidden;
    line-height: 1.4;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  .tale-header {
    position: relative;
    padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem);
    text-align: center;
    background: rgba(19, 17, 28, 0.8);
    border-bottom: 1px solid rgba(189, 150, 72, 0.2);
  }

  .tale-meta-compact {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 0.75rem 0 0;
    flex-wrap: wrap;
  }

  .author-info {
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: #BD9648;
    font-weight: 500;
  }

  .season-info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(0.9rem, 2vw, 1rem);
    color: rgba(247, 232, 212, 0.85);
  }

  .season-info i {
    color: #9E61E3;
    font-size: 0.9rem;
  }

  .type-info {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(0.9rem, 2vw, 1rem);
    color: #9E61E3;
  }

  .meta-divider {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(247, 232, 212, 0.4);
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin: 0;
    font-weight: 700;
    line-height: 1.2;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
  }

  .tale-meta-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .keeper-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 1.8rem);
    color: rgba(247, 232, 212, 0.9);
    margin: 0;
    font-weight: 500;
  }

  .season-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.2rem;
    background: rgba(31, 27, 45, 0.5);
    border-radius: 40px;
    border: 1px solid rgba(158, 97, 227, 0.3);
  }

  .season-badge i {
    color: #9E61E3;
    font-size: 1.1rem;
  }

  .season-badge span {
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: rgba(247, 232, 212, 0.85);
  }

  .tale-type-badge {
    margin-top: 1rem;
    padding: 0.6rem 2rem;
    background: rgba(78, 34, 133, 0.4);
    border-radius: 30px;
    font-family: 'Cinzel', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    font-weight: 500;
    color: #9E61E3;
    border: 1px solid rgba(158, 97, 227, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .tale-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(1rem, 3vw, 2rem);
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .tale-meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    color: rgba(247, 232, 212, 0.7);
  }

  .meta-icon {
    color: #9E61E3;
  }

  .tale-type {
    padding: 0.3rem 0.8rem;
    background: rgba(158, 97, 227, 0.15);
    border-radius: 20px;
    font-weight: 500;
    color: #9E61E3;
  }

  .header-decor {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 15px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 15" preserveAspectRatio="none"><path d="M0,15 L1000,15 L1000,0 C900,10 800,15 700,5 C600,-5 500,10 400,15 C300,20 200,10 100,5 L0,15 Z" fill="%231F1B2D"/></svg>');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .back-nav-container {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 2rem 0.5rem;
    background: rgba(19, 17, 28, 0.95);
    border-bottom: 1px solid rgba(189, 150, 72, 0.2);
  }

  .back-button {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1.5rem;
    background: rgba(31, 27, 45, 0.8);
    color: #F7E8D4;
    border: 1px solid rgba(189, 150, 72, 0.5);
    border-radius: 8px;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .back-button:hover {
    background: rgba(31, 27, 45, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    border-color: rgba(189, 150, 72, 0.8);
  }

  .back-button i {
    font-size: 1.2rem;
    color: #9E61E3;
  }

  .home-button {
    padding: 0.8rem 1.5rem;
    background: rgba(31, 27, 45, 0.8);
    color: #F7E8D4;
    border: 1px solid rgba(189, 150, 72, 0.5);
    border-radius: 8px;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .home-button:hover {
    background: rgba(31, 27, 45, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    border-color: rgba(189, 150, 72, 0.8);
  }

  .home-button i {
    color: #BD9648;
  }

  .tale-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: clamp(1.5rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    .tale-container {
      grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
      gap: 3rem;
      align-items: start;
    }

    .tale-main-content {
      grid-column: 1;
      background: rgba(31, 27, 45, 0.3);
      border-radius: 12px;
      border: 1px solid rgba(189, 150, 72, 0.15);
      padding: 2rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .tale-sidebar {
      grid-column: 2;
      position: sticky;
      top: 2rem;
      padding: 1rem 1.5rem;
      background: rgba(31, 27, 45, 0.4);
      border-radius: 12px;
      border: 1px solid rgba(189, 150, 72, 0.15);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    margin: 3rem 0 1.5rem;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  h3 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.25rem, 2vw, 1.8rem);
    color: #BD9648;
    margin: 2rem 0 1rem;
  }

  .tale-content {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 3vw, 1.2rem);
    line-height: 1.7;
    color: #F7E8D4;
    max-width: 800px;
    margin: 0 auto;
  }

  /* Markdown styles for headers */
  .tale-content :global(.tale-h1),
  .tale-content :global(.tale-h2),
  .tale-content :global(.tale-h3),
  .tale-content :global(.tale-h4) {
    font-family: 'Cinzel', serif;
    color: #BD9648;
    margin: 1.5em 0 0.8em 0;
    line-height: 1.3;
  }

  .tale-content :global(.tale-h1) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    padding-bottom: 0.5rem;
  }

  .tale-content :global(.tale-h2) {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  .tale-content :global(.tale-h3) {
    font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  }

  .tale-content :global(.tale-h4) {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
  }

  /* Markdown styles for lists */
  .tale-content :global(.tale-list) {
    margin: 1rem 0 1.5rem 2rem;
  }

  .tale-content :global(.tale-list li) {
    margin-bottom: 0.5rem;
  }

  /* Markdown styles for links */
  .tale-content :global(.tale-link) {
    color: #9E61E3;
    text-decoration: none;
    border-bottom: 1px dotted rgba(158, 97, 227, 0.5);
    transition: all 0.2s ease;
  }

  .tale-content :global(.tale-link:hover) {
    color: #BD9648;
    border-bottom-color: #BD9648;
  }

  /* Markdown styles for code */
  .tale-content :global(.tale-code) {
    font-family: 'Courier New', monospace;
    background: rgba(19, 17, 28, 0.5);
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* Markdown styles for horizontal rule */
  .tale-content :global(.tale-divider) {
    border: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(189, 150, 72, 0.6), transparent);
    margin: 2rem 0;
  }

  /* Enhance existing styles for dialog and signature */
  .tale-content :global(.dialog) {
    font-style: italic;
    border-left: 3px solid rgba(158, 97, 227, 0.5);
    padding-left: 1rem;
    margin: 1.5rem 0;
  }

  .tale-content :global(.signature) {
    font-style: italic;
    text-align: right;
    color: rgba(247, 232, 212, 0.8);
    margin-top: 2rem;
  }

  .tale-content p {
    margin-bottom: 1.5rem;
  }

  .tale-content :global(strong) {
    color: #BD9648;
    font-weight: 600;
  }

  .tale-content :global(em) {
    font-style: italic;
  }

  @media (min-width: 1024px) {
    .tale-content {
      max-width: 800px;
    }
  }

  .tale-content :global(.journal-entry) {
    margin-bottom: 1.5rem;
    padding-left: clamp(0.5rem, 2vw, 1rem);
    border-left: 3px solid rgba(158, 97, 227, 0.4);
  }

  .tale-content :global(.poem) {
    margin-bottom: 3rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    background: rgba(31, 27, 45, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tale-content :global(.verse) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  .tale-content :global(.note) {
    padding: clamp(0.75rem, 2vw, 1rem);
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: clamp(0.85rem, 2vw, 0.95em);
  }

  .tale-content :global(.warning) {
    padding: clamp(0.75rem, 2vw, 1rem);
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: clamp(0.85rem, 2vw, 0.95em);
    border-left: 3px solid #FF6B6B;
  }

  .tale-content :global(.final-note) {
    padding: clamp(0.75rem, 2vw, 1rem);
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: clamp(0.85rem, 2vw, 0.95em);
  }

  .tale-content :global(.closing-note) {
    padding: clamp(0.75rem, 2vw, 1rem);
    margin: 2rem 0;
    border-radius: 8px;
    background: rgba(31, 27, 45, 0.5);
    font-size: clamp(0.85rem, 2vw, 0.95em);
  }

  .tale-content :global(.song-entry) {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tale-content :global(.song-description) {
    font-style: italic;
    color: rgba(247, 232, 212, 0.85);
  }

  .tale-content :global(.music-player) {
    padding: clamp(0.75rem, 2vw, 1rem);
    margin: 1rem 0;
    background: rgba(19, 17, 28, 0.6);
    border-radius: 8px;
    text-align: center;
  }

  .tale-content :global(.collector-notes) {
    font-size: clamp(0.85rem, 2vw, 0.95em);
    color: rgba(247, 232, 212, 0.75);
    padding-left: clamp(0.5rem, 2vw, 1rem);
    border-left: 3px solid rgba(189, 150, 72, 0.3);
  }

  .tale-content :global(.riddle) {
    margin-bottom: 3rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    background: rgba(31, 27, 45, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .tale-content :global(.riddle-text) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-style: italic;
  }

  .tale-content :global(.riddle-hint) {
    color: rgba(158, 97, 227, 0.9);
    font-size: clamp(0.85rem, 2vw, 0.95em);
  }

  .tale-content :global(.hidden) {
    display: none;
  }

  .tale-cover {
    margin: 0 0 2rem 0;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(189, 150, 72, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(19, 17, 28, 0.5);
  }

  @media (min-width: 1024px) {
    .tale-cover {
      min-height: 300px;
      max-height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tale-cover img {
      object-fit: contain;
      max-width: 100%;
      max-height: 600px;
      width: auto;
      height: auto;
    }
  }

  .tale-cover :global(img) {
    display: block;
    object-fit: contain;
    width: auto;
    height: auto;
    max-width: 100%;
    image-rendering: pixelated; /* Better display for pixel art */
  }

  .media-container {
    margin: clamp(1.5rem, 5vw, 3rem) 0;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .interactive-container {
    padding: clamp(1rem, 3vw, 1.5rem);
    background: rgba(19, 17, 28, 0.6);
    text-align: center;
  }

  .reveal-button {
    margin-top: 1.5rem;
    padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border: none;
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: clamp(0.9rem, 2vw, 1rem);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .reveal-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .related-tales {
    margin: 0;
  }

  .related-tales-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  @media (min-width: 1024px) {
    .related-tales-grid {
      grid-template-columns: 1fr;
    }

    .related-tales h2 {
      margin-top: 0;
      margin-bottom: 0.75rem;
    }
  }

  .related-tale-card {
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(189, 150, 72, 0.2);
    transition: all 0.3s ease;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .related-tale-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(189, 150, 72, 0.5);
  }

  .related-tale-content {
    padding: clamp(0.75rem, 2vw, 1.2rem);
    position: relative;
    background: rgba(31, 27, 45, 0.85);
  }

  .related-tale-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin: 0 0 0.5rem;
    color: #BD9648;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .related-tale-type {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    color: rgba(247, 232, 212, 0.7);
    display: inline-block;
    padding: 0.2rem 0.8rem;
    background: rgba(158, 97, 227, 0.15);
    border-radius: 20px;
    margin-bottom: 0.75rem;
  }

  .read-more {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    color: #9E61E3;
    margin-top: 0.75rem;
    transition: all 0.3s ease;
  }

  .read-more i {
    transition: transform 0.3s ease;
  }

  .related-tale-card:hover .read-more {
    color: #BD9648;
  }

  .related-tale-card:hover .read-more i {
    transform: translateX(4px);
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: clamp(2rem, 5vw, 3rem);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .nav-button {
    padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1.25rem);
    border: none;
    border-radius: 6px;
    background: rgba(31, 27, 45, 0.6);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .nav-button:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .footer {
    background: rgba(19, 17, 28, 1);
    padding: clamp(1.5rem, 4vw, 2rem);
    text-align: center;
    border-top: 1px solid rgba(189, 150, 72, 0.2);
    margin-top: 3rem;
  }

  .footer-text {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    color: rgba(247, 232, 212, 0.6);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .divider {
    width: 100%;
    max-width: 600px;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0) 0%, rgba(189, 150, 72, 0.6) 50%, rgba(189, 150, 72, 0) 100%);
    margin: clamp(2rem, 6vw, 4rem) auto;
  }

  /* Loading spinner and overlay */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(19, 17, 28, 0.92);
    z-index: 9999; /* Ensure it's above everything */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 0.2s ease;
  }

  .loading-text {
    font-family: 'Cinzel', serif;
    color: #F7E8D4;
    margin-top: 1.5rem;
    font-size: 1.2rem;
    text-shadow: 0 0 10px rgba(158, 97, 227, 0.6);
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 5px solid transparent;
    border-top-color: #9E61E3;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;
    position: relative;
  }

  .spinner:before, .spinner:after {
    content: "";
    position: absolute;
    border: 5px solid transparent;
    border-radius: 50%;
  }

  .spinner:before {
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-top-color: #BD9648;
    animation: spin 2s linear infinite;
  }

  .spinner:after {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-top-color: #F7E8D4;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .tale-container {
      padding: clamp(1.5rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem);
    }

    .tale-header {
      padding: clamp(1.2rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem);
    }

    .tale-meta-compact {
      margin-top: 0.5rem;
    }

    .navigation {
      justify-content: center;
    }

    .back-nav-container {
      padding: 1rem 1.2rem 0.5rem;
    }

    .back-button {
      padding: 0.6rem 1.2rem;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: clamp(1.75rem, 5vw, 2.5rem);
    }

    .tale-meta-compact {
      gap: 0.4rem;
      margin-top: 0.4rem;
      font-size: 0.85rem;
    }

    .author-info, .season-info, .type-info {
      font-size: 0.85rem;
    }

    .season-info i {
      font-size: 0.8rem;
    }

    .tale-content {
      font-size: clamp(0.95rem, 2vw, 1.1rem);
    }

    .related-tales-grid {
      grid-template-columns: 1fr;
    }

    .back-nav-container {
      padding: 0.8rem 1rem 0.5rem;
      flex-direction: row;
      gap: 0.5rem;
    }

    .back-button {
      padding: 0.5rem 0.8rem;
      font-size: 0.75rem;
      flex: 1;
      justify-content: center;
    }
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1.75rem auto 2.25rem;
    flex-wrap: wrap;
    max-width: 800px; /* Match text content width */
  }

  .copy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: rgba(31, 27, 45, 0.7);
    color: #F7E8D4;
    border: 1px solid rgba(189, 150, 72, 0.5);
    border-radius: 12px;
    padding: 0.85rem 2rem;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
    width: auto;
    min-width: 200px;
    max-width: 90%;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.03em;
  }

  .copy-button:hover {
    background: rgba(31, 27, 45, 0.9);
    border-color: #BD9648;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(189, 150, 72, 0.3);
  }

  .copy-button:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .copy-button i {
    color: #BD9648;
    font-size: 1.2rem;
  }

  .copy-success {
    color: #6CCF7F;
    font-weight: 500;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    animation: fadeIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Markdown styles for blockquotes */
  .tale-content :global(.tale-blockquote) {
    border-left: 4px solid rgba(189, 150, 72, 0.5);
    padding: 0.5rem 0 0.5rem 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: rgba(247, 232, 212, 0.85);
  }

  /* Markdown styles for code blocks */
  .tale-content :global(.tale-pre) {
    background: rgba(19, 17, 28, 0.7);
    border-radius: 5px;
    padding: 1rem;
    margin: 1.5rem 0;
    overflow-x: auto;
    border: 1px solid rgba(158, 97, 227, 0.3);
  }

  .tale-content :global(.tale-pre .tale-code) {
    background: transparent;
    padding: 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: #e2d1f9;
    display: block;
    line-height: 1.6;
  }

  /* Markdown styles for images */
  .tale-content :global(.tale-image) {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 1.5rem 0;
    border: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  /* Markdown styles for strikethrough */
  .tale-content :global(del) {
    text-decoration: line-through;
    color: rgba(247, 232, 212, 0.6);
  }
</style>

<svelte:head>
  <title>{tale.title} - Tavern Tales - Treasure Tavern</title>
  <meta name="description" content={tale.excerpt} />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

{#key tale.slug}
<!-- Loading overlay - positioned above everything -->
{#if isLoading}
<div class="loading-overlay" transition:fade={{ duration: 150 }}>
  <div class="spinner"></div>
  <p class="loading-text">Loading Chronicle...</p>
</div>
{/if}

<!-- Floating audio player for Bone Kingdom -->
{#if tale.slug === 'the-bone-kingdom'}
  <FloatingAudioPlayer
    audioSrc="/audio/The-Bone-KingdomHe-Waits.mp3"
    audioTitle="The Bone Kingdom Theme"
    hintText="Click to enhance your reading"
    startMuted={true}
  />
{/if}

<div class="page-container">
  <Breadcrumb items={breadcrumbItems} />

  <header class="tale-header">
    <h1>{tale.title}</h1>
    <div class="tale-meta-compact">
      <div class="author-info">{tale.author}</div>
      <div class="meta-divider"></div>
      <div class="season-info">
        <i class="fas fa-moon"></i>
        <span>{tale.date}</span>
      </div>
      <div class="meta-divider"></div>
      <div class="type-info">{tale.type}</div>
    </div>
    <div class="header-decor"></div>
  </header>

  <main class="tale-container">
    <!-- Main content area -->
    <div class="tale-main-content">
      <!-- Featured image -->
      <div class="tale-cover">
        <ResponsiveImage src={tale.coverImage} alt={tale.title} className="tale-cover-image" />
      </div>

      <!-- Media display, if applicable -->
      {#if tale.mediaType === 'video' && mediaReady}
        <div class="media-container">
          <div class="video-container">
            <iframe
              src={tale.mediaContent}
              title={tale.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      {:else if tale.mediaType === 'audio' && mediaReady}
        <SimpleAudioPlayer
          audioSrc={tale.mediaContent || ''}
          audioTitle={`Audio Narration: ${tale.title}`}
        />
      {:else if tale.mediaType === 'interactive'}
        <div class="media-container">
          <div class="interactive-container">
            <p>This tale contains interactive elements. {tale.mediaContent === 'riddles' ? 'Try to solve the riddles before revealing the answers!' : ''}</p>
            {#if tale.mediaContent === 'riddles'}
              <button class="reveal-button" on:click={() => {
                // This would toggle the visibility of answers in a real implementation
                document.querySelectorAll('.riddle-answer').forEach(el => {
                  el.classList.toggle('hidden');
                });
                showRiddleAnswers = !showRiddleAnswers;
              }}>
                {showRiddleAnswers ? 'Hide Answers' : 'Reveal Answers'}
              </button>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Action buttons below media but above content -->
      <div class="button-container">
        <button class="copy-button" on:click={copyTaleContent}>
          <i class="fas fa-copy"></i> Copy Story Text
          {#if copySuccess}
            <span class="copy-success"><i class="fas fa-check"></i> Copied!</span>
          {/if}
        </button>
      </div>

      <!-- Tale content -->
      <div class="tale-content">
        {@html tale.content}
      </div>

      <div class="divider"></div>

      <!-- CTA Section -->
      <AnnouncementCta
        title="Join the Tavern's Inner Circle"
        description="Subscribe to our Chronicles newsletter to receive exclusive tales, early access to new stories, and special invitations to Tavern events. Be part of our community of storytellers and adventurers."
        buttonText="Subscribe to Chronicles"
        demoLink="/newsletter"
      />

      <div class="navigation">
        <a href="/tavern-tales" class="nav-button" data-sveltekit-preload-data="hover">
          <i class="fas fa-arrow-left" style="margin-right: 0.5rem;"></i>
          All Chronicles
        </a>
        <a href="/" class="nav-button" data-sveltekit-preload-data="hover">
          Return to Tavern
          <i class="fas fa-home" style="margin-left: 0.5rem;"></i>
        </a>
      </div>
    </div>

    <!-- Sidebar content -->
    <div class="tale-sidebar">
      <!-- Related tales section -->
      {#if relatedTales && relatedTales.length > 0}
        <div class="related-tales">
          <h2>Related Chronicles</h2>
          <div class="related-tales-grid">
            {#each relatedTales as relatedTale}
              <a
                href={`/tavern-tales/${encodeURIComponent(relatedTale.slug)}`}
                class="related-tale-card"
                data-sveltekit-preload-data="hover"
                on:click={(e) => {
                  // Prevent default link behavior
                  e.preventDefault();

                  if (typeof window !== 'undefined') {
                    // Show loading state
                    isLoading = true;

                    // Scroll to top immediately
                    window.scrollTo({ top: 0, behavior: 'auto' });

                    // Navigate using proper SvelteKit navigation to ensure title updates
                    window.location.href = `/tavern-tales/${encodeURIComponent(relatedTale.slug)}`;
                  }
                }}
              >
                <ResponsiveImage src={relatedTale.coverImage} alt={relatedTale.title} />
                <div class="related-tale-content">
                  <h3 class="related-tale-title">{relatedTale.title}</h3>
                  <p class="related-tale-type">{relatedTale.type}</p>
                  <div class="read-more">
                    <span>Read Chronicle</span>
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </main>

  <footer class="footer">
    <p class="footer-text">© {new Date().getFullYear()} Treasure Tavern. All rights reserved.</p>
  </footer>
</div>
{/key}
