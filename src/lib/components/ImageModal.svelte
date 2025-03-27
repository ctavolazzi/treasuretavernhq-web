<script lang="ts">
  import { fade, scale } from 'svelte/transition';

  export let open = false;
  export let imgSrc = '';
  export let altText = '';

  function closeModal() {
    open = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  function stopPropagation(event: Event) {
    event.stopPropagation();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="modal-overlay"
    on:click={closeModal}
    transition:fade={{ duration: 200 }}
  >
    <div class="modal-container"
      on:click={stopPropagation}
      transition:scale={{ start: 0.95, duration: 200 }}
    >
      <button class="close-button" on:click={closeModal} aria-label="Close modal">
        <span aria-hidden="true">×</span>
      </button>
      <div class="modal-content">
        <img src={imgSrc} alt={altText} class="modal-image" />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
  }

  .modal-container {
    position: relative;
    width: 90%;
    height: 95vh;
    background: rgba(31, 27, 45, 0.8);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(189, 150, 72, 0.3);
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 0.5rem;
  }

  .modal-image {
    height: calc(95vh - 20px);
    width: auto;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  @media (orientation: landscape) {
    .modal-container {
      width: auto;
      max-width: 85%;
      height: auto;
      max-height: 95vh;
    }

    .modal-image {
      height: auto;
      max-height: 90vh;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .modal-container {
      width: 95%;
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(247, 232, 212, 0.2);
    color: #F7E8D4;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    .close-button {
      width: 36px;
      height: 36px;
      font-size: 1.3rem;
    }
  }
</style>