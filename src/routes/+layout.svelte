<script lang="ts">
	import '../app.css';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import { onMount } from 'svelte';
	let { children } = $props();

  let bannerActive = false;
  let mobileMenuOpen = false;

  function toggleBanner() {
    bannerActive = !bannerActive;

    // Optional: Add some fun effect when clicked
    if (bannerActive) {
      setTimeout(() => {
        bannerActive = false;
      }, 1000);
    }
  }

  onMount(() => {
    // Fix for any potential mobile menu issues
    document.body.classList.remove('no-scroll');
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<style>
  /* Import the required fonts from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;700&family=Spectral:wght@400;500;600&display=swap');

  :global(body) {
    font-family: 'Spectral', Georgia, serif;
    margin: 0;
    padding: 0;
  }

  :global(body.no-scroll) {
    overflow: hidden;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: rgba(19, 17, 28, 0.98);
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-left, .nav-right {
    display: flex;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    transition: opacity 0.2s ease;
  }

  .logo:hover {
    opacity: 0.9;
  }

  .logo img {
    height: 40px;
    margin-right: 0.75rem;
    filter: drop-shadow(0 0 2px rgba(189, 150, 72, 0.5));
  }

  .nav-link {
    color: rgba(247, 232, 212, 0.85);
    text-decoration: none;
    margin-left: 2rem;
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    transition: all 0.2s ease;
    position: relative;
    padding: 0.25rem 0;
  }

  .nav-link:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #BD9648;
    transition: width 0.2s ease;
  }

  .nav-link:hover {
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .nav-link:hover:after {
    width: 100%;
  }

  .banner {
    padding: 0.5rem 0.75rem;
    background: linear-gradient(90deg, #13111C 0%, #1F1B2D 50%, #13111C 100%);
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  .banner:hover {
    background: linear-gradient(90deg, #181423 0%, #262238 50%, #181423 100%);
  }

  .banner-text {
    color: #BD9648;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-family: 'Cinzel', serif;
    font-weight: 500;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    margin: 0;
    transition: all 0.3s ease;
    display: block;
    width: 100%;
  }

  .banner:hover .banner-text {
    color: #d8b05c;
    letter-spacing: 0.28em;
    text-shadow: 0 0 12px rgba(189, 150, 72, 0.6);
  }

  .banner.active {
    background: linear-gradient(90deg, #181423 0%, #262238 50%, #181423 100%);
  }

  .banner.active .banner-text {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    nav {
      padding: 0.75rem 1rem;
    }

    .nav-left {
      flex: 1;
    }

    .nav-right {
      display: none; /* Hide regular menu on mobile */
    }

    .logo span {
      font-size: 0.9rem;
    }

    .logo img {
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    .logo span {
      display: none;
    }

    .logo img {
      height: 35px;
      margin-right: 0;
    }
  }

  /* Footer Styles */
  .footer {
    background: rgba(19, 17, 28, 0.95);
    border-top: 1px solid rgba(189, 150, 72, 0.3);
    padding: 1.5rem 0;
    text-align: center;
    margin-top: 2rem;
  }

  .footer-text {
    color: rgba(247, 232, 212, 0.75);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    margin: 0;
  }

  .footer-links {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  .footer-link {
    color: rgba(247, 232, 212, 0.65);
    text-decoration: none;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: #BD9648;
  }
</style>

<nav>
  <div class="nav-left">
    <a href="/" class="logo">
      <img src="/treasure-tavern-logo-small.png" alt="Treasure Tavern" />
      <span>Treasure Tavern</span>
    </a>
  </div>

  <div class="nav-right">
    <a href="/newsletter" class="nav-link">Newsletter</a>
    <a href="/tavern-tales" class="nav-link">Tales</a>
    <a href="/demo" class="nav-link">Demo</a>
    <a href="/announcements" class="nav-link">Announcements</a>
    <a href="/about" class="nav-link">About</a>
    <a href="/contact" class="nav-link">Contact</a>
  </div>

  <!-- Mobile Menu Component -->
  <MobileNav on:stateChange={(e) => mobileMenuOpen = e.detail.isOpen} />
</nav>

<a href="/about" class="banner" class:active={bannerActive} on:click={toggleBanner}>
  <h1 class="banner-text">Treasure Tavern HQ</h1>
</a>

{@render children()}

<!-- Footer -->
<footer class="footer">
  <p class="footer-text">© {new Date().getFullYear()} Treasure Tavern. All rights reserved.</p>
  <div class="footer-links">
    <a href="/about" class="footer-link">About</a>
    <a href="/contact" class="footer-link">Contact</a>
    <a href="/tavern-tales" class="footer-link">Tales</a>
    <a href="/newsletter" class="footer-link">Newsletter</a>
  </div>
</footer>
