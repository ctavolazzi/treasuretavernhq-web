<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  // Form state
  let email = '';
  let name = '';
  let isSubmitting = false;
  let isSuccess = false;
  let errorMessage = '';
  let isReady = false;
  let successMessage = '';

  // Get form result if coming back from form submission
  export let form;

  // Check if we have a form submission result
  $: if (form) {
    if (form.success) {
      isSuccess = true;
      successMessage = form.message || 'Thank you for joining the waitlist!';
    } else if (form.error) {
      errorMessage = form.error;
    }
  }

  // Breadcrumb configuration
  $: breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'fa-home' },
    { label: isSuccess ? 'Waitlist Joined' : 'Waitlist', icon: 'fa-user-plus' }
  ];

  onMount(() => {
    // Reduce timeout delay for faster initial render
    isReady = true;
  });
</script>

<svelte:head>
  <title>Join the Waitlist - Treasure Tavern</title>
  <meta name="description" content="Join the Treasure Tavern account waitlist - Be the first to know when account creation is available and get early access to our exclusive features." />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<style>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(145deg, #13111C 0%, #1F1B2D 60%, #2B1D34 100%);
    color: #F7E8D4;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239e61e3' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
                    url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bd9648' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .hero {
    position: relative;
    min-height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2.5rem max(1rem, 5vw);
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(19, 17, 28, 0.7), rgba(19, 17, 28, 0.8)),
                      url('/images/tavern-tales-bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .hero-content {
    max-width: 900px;
    width: 100%;
    z-index: 1;
    /* Optimize animation properties */
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    transform: translateY(10px);
    padding: 2rem;
    position: relative;
    will-change: opacity, transform;
  }

  .hero-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(19, 17, 28, 0.3);
    border-radius: 8px;
    backdrop-filter: blur(2px);
    z-index: -1;
    border: 1px solid rgba(189, 150, 72, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-title {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(2.5rem, 8vw, 4rem);
    margin-bottom: 1rem;
    font-weight: 700;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    margin-bottom: 0.5rem;
    color: rgba(247, 232, 212, 0.9);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-style: italic;
    line-height: 1.5;
  }

  .main-content {
    flex: 1;
    padding: 0 max(1rem, 5vw) 3rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .waitlist-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(31, 27, 45, 0.4);
    border-radius: 10px;
    border: 1px solid rgba(189, 150, 72, 0.2);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .waitlist-info {
    margin-bottom: 2rem;
    text-align: center;
  }

  .waitlist-heading {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 4vw, 2rem);
    color: #BD9648;
    margin-bottom: 1rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .waitlist-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: rgba(247, 232, 212, 0.9);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    font-family: 'Spectral', serif;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: rgba(247, 232, 212, 0.9);
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    background: rgba(19, 17, 28, 0.6);
    border: 1px solid rgba(247, 232, 212, 0.2);
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  input:focus {
    outline: none;
    border-color: rgba(158, 97, 227, 0.6);
    box-shadow: 0 0 10px rgba(158, 97, 227, 0.2);
  }

  .submit-button {
    width: 100%;
    padding: 0.85rem 1rem;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border: none;
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    cursor: pointer;
    /* Optimize button hover transition */
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    will-change: transform;
  }

  .submit-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #AF71F4 0%, #8A4CB3 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .submit-button:disabled {
    background: linear-gradient(135deg, #7a5da3 0%, #5a3c7a 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;
  }

  .error-message {
    color: #FF6B6B;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .success-message {
    padding: 1.5rem;
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(189, 150, 72, 0.4);
    border-radius: 10px;
    margin-top: 1rem;
    text-align: center;
  }

  .success-title {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #BD9648;
  }

  .success-text {
    font-family: 'Spectral', serif;
    font-size: 1.1rem;
    color: rgba(247, 232, 212, 0.92);
    margin-bottom: 1.5rem;
  }

  .feature-list {
    margin: 2rem 0;
    list-style: none;
    padding: 0;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.9);
  }

  .feature-icon {
    color: #9E61E3;
    margin-right: 0.75rem;
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .feature-text {
    font-size: 1rem;
    line-height: 1.5;
  }

  .back-link {
    display: inline-block;
    margin-top: 2rem;
    font-family: 'Cinzel', serif;
    color: rgba(247, 232, 212, 0.85);
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .back-link:hover {
    color: #BD9648;
  }

  .back-link i {
    margin-right: 0.5rem;
  }

  @media (max-width: 640px) {
    .hero {
      min-height: 25vh;
      padding: 2rem 1rem;
    }

    .hero-content {
      padding: 1.5rem 1rem;
    }

    .waitlist-container {
      padding: 1.5rem;
    }
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(247, 232, 212, 0.3);
    border-top-color: #F7E8D4;
    border-radius: 50%;
    /* Optimize spinner animation */
    animation: spin 0.8s linear infinite;
    will-change: transform;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

<div class="page-container">
  <Breadcrumb items={breadcrumbItems} />

  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content" class:visible={isReady}>
      {#if !isSuccess}
        <!-- Use Svelte's fade transition instead of CSS transitions for smoother effect -->
        {#if isReady}
          <div in:fade={{ duration: 300 }}>
            <h1 class="hero-title">Join Waitlist</h1>
            <p class="hero-subtitle">Be first in line when accounts launch</p>
          </div>
        {/if}
      {:else}
        <!-- Use Svelte's fade transition for success state too -->
        <div in:fade={{ duration: 300 }}>
          <h1 class="hero-title">Waitlist Joined</h1>
          <p class="hero-subtitle">Thanks for your interest!</p>
        </div>
      {/if}
    </div>
  </section>

  <div class="main-content">
    {#if !isSuccess}
      <div class="waitlist-container" in:fade={{ duration: 300, delay: 100 }}>
        <div class="waitlist-info">
          <h2 class="waitlist-heading">Account Creation Soon</h2>
          <p class="waitlist-description">
            Get notified when our tavern opens its registry for new patrons.
          </p>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <i class="fas fa-crown feature-icon"></i>
            <p class="feature-text">Early access</p>
          </div>
          <div class="feature-item">
            <i class="fas fa-gift feature-icon"></i>
            <p class="feature-text">Welcome gift</p>
          </div>
          <div class="feature-item">
            <i class="fas fa-scroll feature-icon"></i>
            <p class="feature-text">Exclusive features</p>
          </div>
          <div class="feature-item">
            <i class="fas fa-bell feature-icon"></i>
            <p class="feature-text">Priority notification</p>
          </div>
        </div>

        <form method="POST">
          <div class="form-group">
            <label for="name">Your Name <span style="color: #BD9648;">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              bind:value={name}
              required
              placeholder="Enter your name"
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address <span style="color: #BD9648;">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              bind:value={email}
              required
              placeholder="Enter your email"
            />
          </div>

          {#if errorMessage}
            <div class="error-message">
              <i class="fas fa-exclamation-circle"></i> {errorMessage}
            </div>
          {/if}

          <button type="submit" class="submit-button">
            <i class="fas fa-envelope"></i>
            <span>Join</span>
          </button>
        </form>
      </div>
    {:else}
      <div class="waitlist-container success-message" in:fade={{ duration: 300, delay: 100 }}>
        <h2 class="success-title">Successfully Joined!</h2>
        <p class="success-text">
          {successMessage}
        </p>
        <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="/" class="submit-button">
            <i class="fas fa-home"></i>
            Return Home
          </a>
          <a href="/tavern-tales" class="submit-button">
            <i class="fas fa-book-open"></i>
            Read Tales
          </a>
        </div>
      </div>
    {/if}

    <div style="text-align: center;">
      <a href="/about" class="back-link">
        <i class="fas fa-arrow-left"></i> Back to About Page
      </a>
    </div>
  </div>
</div>