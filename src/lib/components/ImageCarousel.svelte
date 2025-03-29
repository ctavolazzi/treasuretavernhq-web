<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props
  export let images: { src: string; alt: string; webpSrc?: string }[] = [];
  export let autoplayInterval: number = 5000; // Time between auto transitions in ms
  export let showControls: boolean = true;
  export let showIndicators: boolean = true;
  export let height: string = 'auto'; // Height of the carousel
  export let aspectRatio: string = '21:9'; // Default aspect ratio for landscape images

  // Internal state
  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  let isTransitioning = false;
  let carouselElement: HTMLDivElement;
  let touchStartX = 0;
  let touchEndX = 0;
  let supportsWebP = false;

  // Start/stop autoplay
  function startAutoplay() {
    if (images.length <= 1) return;

    timer = setInterval(() => {
      goToNext();
    }, autoplayInterval);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Navigation functions
  function goToIndex(index: number) {
    if (isTransitioning || index === currentIndex) return;

    isTransitioning = true;
    currentIndex = (index + images.length) % images.length;

    // Reset transition timer
    setTimeout(() => {
      isTransitioning = false;
    }, 600); // Slightly longer than CSS transition duration

    // Reset autoplay timer on manual navigation
    if (timer) {
      stopAutoplay();
      startAutoplay();
    }
  }

  function goToNext() {
    goToIndex(currentIndex + 1);
  }

  function goToPrev() {
    goToIndex(currentIndex - 1);
  }

  // Touch handlers
  function handleTouchStart(event: TouchEvent) {
    touchStartX = event.touches[0].clientX;
    stopAutoplay();
  }

  function handleTouchMove(event: TouchEvent) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    // Minimum distance to be considered a swipe
    const minSwipeDistance = 50;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }

    startAutoplay();
  }

  // Handle mouseenter/mouseleave
  function handleMouseEnter() {
    stopAutoplay();
  }

  function handleMouseLeave() {
    startAutoplay();
  }

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      goToPrev();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    }
  }

  onMount(() => {
    // Check for WebP support
    const canvas = document.createElement('canvas');
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      supportsWebP = true;
    }

    startAutoplay();

    // Add keyboard listener
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    stopAutoplay();
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<div
  class="carousel"
  bind:this={carouselElement}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  style="--aspect-ratio: {aspectRatio}; --height: {height};"
  role="region"
  aria-label="Image carousel"
  tabindex="0"
>
  <!-- Image Container -->
  <div class="carousel-inner">
    {#each images as image, i}
      <div
        class="carousel-item"
        class:active={i === currentIndex}
        class:prev={i === ((currentIndex - 1 + images.length) % images.length)}
        class:next={i === ((currentIndex + 1) % images.length)}
      >
        <picture>
          {#if image.webpSrc && supportsWebP}
            <source srcset={image.webpSrc} type="image/webp">
          {/if}
          <img
            src={image.src}
            alt={image.alt}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </picture>
      </div>
    {/each}
  </div>

  <!-- Controls -->
  {#if showControls && images.length > 1}
    <button
      class="carousel-control prev"
      on:click={() => goToPrev()}
      aria-label="Previous image"
    >
      <span class="arrow">&#10094;</span>
    </button>

    <button
      class="carousel-control next"
      on:click={() => goToNext()}
      aria-label="Next image"
    >
      <span class="arrow">&#10095;</span>
    </button>
  {/if}

  <!-- Indicators -->
  {#if showIndicators && images.length > 1}
    <div class="carousel-indicators">
      {#each images as _, i}
        <button
          class="indicator"
          class:active={i === currentIndex}
          on:click={() => goToIndex(i)}
          aria-label={`Go to image ${i + 1}`}
          aria-current={i === currentIndex ? 'true' : 'false'}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    height: var(--height);
    overflow: hidden;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.2);
    aspect-ratio: var(--aspect-ratio);
    margin: 0 auto;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  }

  .carousel-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateX(100%);
    transition: transform 0.5s ease, opacity 0.5s ease;
    z-index: 1;
  }

  .carousel-item.active {
    opacity: 1;
    transform: translateX(0);
    z-index: 3;
  }

  .carousel-item.prev {
    transform: translateX(-100%);
    z-index: 2;
  }

  .carousel-item.next {
    transform: translateX(100%);
    z-index: 2;
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* Controls */
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: rgba(31, 27, 45, 0.7);
    border: 1px solid rgba(189, 150, 72, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .carousel-control:hover,
  .carousel-control:focus {
    opacity: 1;
    background-color: rgba(31, 27, 45, 0.9);
    border-color: rgba(189, 150, 72, 0.6);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 15px rgba(189, 150, 72, 0.3);
  }

  .carousel-control.prev {
    left: 10px;
  }

  .carousel-control.next {
    right: 10px;
  }

  .arrow {
    color: #F7E8D4;
    font-size: 1.2rem;
    line-height: 1;
    user-select: none;
  }

  /* Indicators */
  .carousel-indicators {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 5;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(247, 232, 212, 0.5);
    border: 1px solid rgba(189, 150, 72, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .indicator.active {
    background-color: #BD9648;
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(189, 150, 72, 0.5);
  }

  .indicator:hover {
    transform: scale(1.2);
    background-color: rgba(247, 232, 212, 0.8);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .carousel-control {
      width: 35px;
      height: 35px;
    }

    .arrow {
      font-size: 1rem;
    }

    .carousel-indicators {
      bottom: 10px;
    }

    .indicator {
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: 480px) {
    .carousel-control {
      width: 30px;
      height: 30px;
    }

    .carousel-indicators {
      bottom: 8px;
    }

    .indicator {
      width: 6px;
      height: 6px;
    }
  }
</style>