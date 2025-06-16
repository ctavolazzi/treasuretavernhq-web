<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  // Local state - don't bind from parent
  let isOpen = false;

  // Methods
  function toggleMenu() {
    isOpen = !isOpen;
    console.log('Menu toggled, isOpen:', isOpen);

    // Toggle body scroll
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Inform parent component of state change
    dispatch('stateChange', { isOpen });
  }

  function closeMenu() {
    isOpen = false;
    document.body.classList.remove('no-scroll');
    // Inform parent component of state change
    dispatch('stateChange', { isOpen });
  }

  onMount(() => {
    // Ensure clean state on mount
    isOpen = false;
    document.body.classList.remove('no-scroll');
  });
</script>

<!-- Hamburger button - Always rendered above all else -->
<button class="hamburger-button" class:open={isOpen} onclick={toggleMenu} aria-label="Toggle menu">
  {#if !isOpen}
    <div class="hamburger-line hamburger-line-1"></div>
    <div class="hamburger-line hamburger-line-2"></div>
    <div class="hamburger-line hamburger-line-3"></div>
  {:else}
    <div class="line-container">
      <div class="hamburger-line hamburger-line-1"></div>
      <div class="hamburger-line hamburger-line-2"></div>
      <div class="hamburger-line hamburger-line-3"></div>
    </div>
  {/if}
</button>

<!-- Overlay rendered before mobile menu -->
<div
  class="overlay"
  class:open={isOpen}
  onclick={toggleMenu}
  onkeydown={e => e.key === 'Escape' && toggleMenu()}
  role="button"
  tabindex="0"
  aria-label="Close menu"
></div>

<!-- Mobile menu -->
<div class="mobile-menu" class:open={isOpen} role="navigation" aria-label="Mobile navigation">
  <a href="/" class="mobile-nav-link" onclick={closeMenu}>
    <i class="fas fa-home"></i>
    Home
  </a>
  <a href="/about" class="mobile-nav-link" onclick={closeMenu}>
    <i class="fas fa-info-circle"></i>
    About
  </a>
  <a href="/announcements" class="mobile-nav-link" onclick={closeMenu}>
    <i class="fas fa-bullhorn"></i>
    Announcements
  </a>
  <a href="/contact" class="mobile-nav-link" onclick={closeMenu}>
    <i class="fas fa-envelope"></i>
    Contact
  </a>
</div>

<style>
  .hamburger-button {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 32px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-right: 20px;
    z-index: 2000; /* Highest z-index */
    position: relative;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hamburger-button:focus {
    outline: none;
  }

  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: #bd9648;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    transform-origin: center;
    border-radius: 2px;
    box-shadow: 0 0 3px rgba(189, 150, 72, 0.2);
  }

  /* Position the lines with proper spacing */
  .hamburger-line-1 {
    transform: translateY(-7px);
    transition-delay: 0.05s;
  }

  .hamburger-line-2 {
    transition-delay: 0.075s;
  }

  .hamburger-line-3 {
    transform: translateY(7px);
    transition-delay: 0.1s;
  }

  /* When open, make the button a perfect square container */
  .hamburger-button.open {
    position: fixed;
    top: 0.75rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: rgba(19, 17, 28, 0.85);
    border-radius: 3px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 4px rgba(189, 150, 72, 0.2);
    }
    to {
      box-shadow: 0 0 8px rgba(189, 150, 72, 0.4);
    }
  }

  /* For open state, create a container for the X */
  .hamburger-button.open .line-container {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: enterX 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes enterX {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Transform for open state */
  .hamburger-button.open .hamburger-line-1 {
    position: absolute;
    transform: rotate(45deg) scale(1);
    width: 24px;
    margin: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s;
    background-color: #e5b860; /* Brighter gold for the X */
    box-shadow: 0 0 5px rgba(229, 184, 96, 0.5); /* Glow effect */
  }

  .hamburger-button.open .hamburger-line-2 {
    opacity: 0;
    width: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s;
  }

  .hamburger-button.open .hamburger-line-3 {
    position: absolute;
    transform: rotate(-45deg) scale(1);
    width: 24px;
    margin: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s;
    background-color: #e5b860; /* Brighter gold for the X */
    box-shadow: 0 0 5px rgba(229, 184, 96, 0.5); /* Glow effect */
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: rgba(19, 17, 28, 0.97);
    box-shadow: -3px 0 20px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 280px;
    height: 100vh;
    padding: 5rem 1.5rem 2rem;
    transition:
      right 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.5s ease;
    z-index: 1500;
    border-left: 1px solid rgba(189, 150, 72, 0.25);
    overflow-y: auto;
  }

  .mobile-menu.open {
    right: 0;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.6);
  }

  .mobile-nav-link {
    color: rgba(247, 232, 212, 0.9);
    text-decoration: none;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    padding: 0.9rem 0;
    border-bottom: 1px solid rgba(189, 150, 72, 0.15);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
  }

  .mobile-nav-link:last-child {
    border-bottom: none;
  }

  .mobile-nav-link:hover {
    color: #bd9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    padding-left: 0.5rem;
  }

  .mobile-nav-icon {
    margin-right: 1.2rem;
    width: 1.5rem;
    text-align: center;
    color: #9e61e3;
    opacity: 0.9;
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover .mobile-nav-icon {
    transform: translateX(2px);
    opacity: 1;
  }

  /* Staggered link animations */
  .mobile-menu.open .mobile-nav-link {
    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateX(20px);
  }

  .mobile-menu.open .mobile-nav-link:nth-child(1) {
    animation-delay: 0.1s;
  }

  .mobile-menu.open .mobile-nav-link:nth-child(2) {
    animation-delay: 0.15s;
  }

  .mobile-menu.open .mobile-nav-link:nth-child(3) {
    animation-delay: 0.2s;
  }

  .mobile-menu.open .mobile-nav-link:nth-child(4) {
    animation-delay: 0.25s;
  }

  .mobile-menu.open .mobile-nav-link:nth-child(5) {
    animation-delay: 0.3s;
  }

  .mobile-menu.open .mobile-nav-link:nth-child(6) {
    animation-delay: 0.35s;
  }

  .mobile-menu.open .mobile-nav-link:nth-child(7) {
    animation-delay: 0.4s;
  }

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Overlay animation */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .overlay.open {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  @media (max-width: 768px) {
    .hamburger-button {
      display: flex;
    }
  }

  .special-link {
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    margin-bottom: 0.5rem;
    padding-bottom: 1rem;
    color: #bd9648;
    font-weight: 500;
  }

  .special-link .mobile-nav-icon {
    color: #bd9648;
  }
</style>
