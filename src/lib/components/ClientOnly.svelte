<script>
  import { onMount } from 'svelte';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <slot />
{:else}
  <div class="placeholder" style="height: var(--height, auto); aspect-ratio: var(--aspect-ratio, auto);">
    <!-- Optional loading placeholder -->
  </div>
{/if}

<style>
  .placeholder {
    width: 100%;
    background-color: rgba(31, 27, 45, 0.3);
    border-radius: 8px;
  }
</style>