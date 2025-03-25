<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<style>
  .banner {
    padding: 0.5rem 0.75rem;
    background: linear-gradient(90deg, #13111C 0%, #1F1B2D 50%, #13111C 100%);
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .banner-text {
    color: #BD9648;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-family: 'Cinzel', serif;
    font-weight: 500;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    margin: 0;
  }
</style>

<div class="banner">
  <h1 class="banner-text">Treasure Tavern HQ</h1>
</div>

{@render children()}
