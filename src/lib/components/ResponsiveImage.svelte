<script lang="ts">
  import { getResponsiveImagePaths } from '$lib/utils/imageUtils';

  export let src: string;
  export let alt: string = '';
  export let className: string = '';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let lazy: boolean = true;
  export let draggable: boolean = false;

  const paths = getResponsiveImagePaths(src);
</script>

<picture>
  <source srcset={paths.webp} type="image/webp">
  <source srcset={paths.png} type="image/png">
  <source srcset={paths.jpg} type="image/jpeg">
  <img
    src={paths.png}
    {alt}
    class={className}
    {width}
    {height}
    loading={lazy ? 'lazy' : 'eager'}
    {draggable}
    on:error={(e) => {
      // Try to handle error gracefully
      const img = e.currentTarget as HTMLImageElement;
      if (img && img.style) {
        img.style.display = 'none';
      }
    }}
  />
</picture>

<style>
  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
</style>