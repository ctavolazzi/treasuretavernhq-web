<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Local state - don't bind from parent
  let isOpen = false;

  // Methods
  function toggleMenu() {
    isOpen = !isOpen;
    console.log("Menu toggled, isOpen:", isOpen);

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
    z-index: 1000;
    position: relative;
  }

  .hamburger-button:focus {
    outline: none;
  }

  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: #BD9648;
    transition: all 0.25s ease;
    position: relative;
    transform-origin: center;
    border-radius: 2px;
    box-shadow: 0 0 3px rgba(189, 150, 72, 0.2);
  }

  /* Position the lines with proper spacing */
  .hamburger-line-1 {
    transform: translateY(-7px);
  }

  .hamburger-line-3 {
    transform: translateY(7px);
  }

  /* Transform for open state */
  .hamburger-button.open .hamburger-line-1 {
    transform: translateY(0) rotate(45deg);
  }

  .hamburger-button.open .hamburger-line-2 {
    opacity: 0;
    transform: translateX(-5px);
  }

  .hamburger-button.open .hamburger-line-3 {
    transform: translateY(0) rotate(-45deg);
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
    transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 990;
    border-left: 1px solid rgba(189, 150, 72, 0.25);
    overflow-y: auto;
  }

  .mobile-menu.open {
    right: 0;
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
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    padding-left: 0.5rem;
  }

  .mobile-nav-icon {
    margin-right: 1.2rem;
    width: 1.5rem;
    text-align: center;
    color: #9E61E3;
    opacity: 0.9;
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover .mobile-nav-icon {
    transform: translateX(2px);
    opacity: 1;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
    z-index: 980;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0.3s ease;
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
</style>

<!-- Hamburger button -->
<button
  class="hamburger-button"
  class:open={isOpen}
  on:click={toggleMenu}
  aria-label="Toggle menu"
>
  <div class="hamburger-line hamburger-line-1"></div>
  <div class="hamburger-line hamburger-line-2"></div>
  <div class="hamburger-line hamburger-line-3"></div>
</button>

<!-- Mobile menu -->
<div class="mobile-menu" class:open={isOpen}>
  <a href="/newsletter" class="mobile-nav-link" on:click={closeMenu}>
    <span class="mobile-nav-icon"><i class="fas fa-scroll"></i></span>
    Newsletter
  </a>
  <a href="/tavern-tales" class="mobile-nav-link" on:click={closeMenu}>
    <span class="mobile-nav-icon"><i class="fas fa-book-open"></i></span>
    Tales
  </a>
  <a href="/demo" class="mobile-nav-link" on:click={closeMenu}>
    <span class="mobile-nav-icon"><i class="fas fa-flask"></i></span>
    Demo
  </a>
  <a href="/announcements" class="mobile-nav-link" on:click={closeMenu}>
    <span class="mobile-nav-icon"><i class="fas fa-bullhorn"></i></span>
    Announcements
  </a>
  <a href="/about" class="mobile-nav-link" on:click={closeMenu}>
    <span class="mobile-nav-icon"><i class="fas fa-info-circle"></i></span>
    About
  </a>
</div>

<!-- Overlay -->
<div class="overlay" class:open={isOpen} on:click={toggleMenu}></div>