<script lang="ts">
  import { onMount } from 'svelte';
  import { subscribeEmail, isSupabaseConfigured } from '$lib/supabaseClient';

  // Define form data interface
  interface FormData {
    email: string;
    name: string;
    newsletterOptIn: boolean;
    loading: boolean;
    error: string;
    success: boolean;
  }

  // Form data for the three different signup forms
  let heroForm: FormData = { email: '', name: '', newsletterOptIn: true, loading: false, error: '', success: false };
  let valueForm: FormData = { email: '', name: '', newsletterOptIn: true, loading: false, error: '', success: false };
  let ctaForm: FormData = { email: '', name: '', newsletterOptIn: true, loading: false, error: '', success: false };

  let supabaseConfigured = true;
  let currentYear = new Date().getFullYear();

  // Validate email format
  function validateEmail(emailToCheck: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailToCheck);
  }

  // Generic form submission handler
  async function handleSubmit(formData: FormData, source: string) {
    formData.loading = true;
    formData.error = '';

    if (!validateEmail(formData.email)) {
      formData.error = 'Please enter a valid email address';
      formData.loading = false;
      return;
    }

    try {
      // Use the Supabase client function with newsletter opt-in state and optional name
      const result = await subscribeEmail(
        formData.email,
        formData.newsletterOptIn,
        formData.name,
        `newsletter_page_${source}`
      );

      if (result.success) {
        formData.success = true;
        formData.email = '';
        formData.name = '';
      } else {
        formData.error = result.error || 'Unknown error occurred';
      }
    } catch (err) {
      console.error(`Error submitting email (${source}):`, err);
      formData.error = 'There was an error subscribing. Please try again later.';
    } finally {
      formData.loading = false;
    }
  }

  // Specific handlers for each form
  function handleHeroSubmit() {
    return handleSubmit(heroForm, 'hero');
  }

  function handleValueSubmit() {
    return handleSubmit(valueForm, 'value_prop');
  }

  function handleCtaSubmit() {
    return handleSubmit(ctaForm, 'final_cta');
  }

  // Newsletter data
  const newsletters = [
    { id: '2025-05', title: 'May 2025: The Hidden Treasures', summary: 'Discover the rarest magical items from distant realms.' },
    { id: '2025-04', title: 'April 2025: Spring Festival Special', summary: 'Celebrating the Bloom Festival with exclusive stories and offers.' },
    { id: '2025-03', title: 'March 2025: Dungeon Master Tips', summary: 'Expert advice for running memorable campaigns.' }
  ];

  // Mobile menu state
  let showMobileMenu = false;

  onMount(() => {
    // Check if Supabase is configured properly
    supabaseConfigured = isSupabaseConfigured();
    if (!supabaseConfigured) {
      console.warn('Supabase is not properly configured. Email submission will be simulated.');
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
  }

  .hero-section {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem 6rem;
    position: relative;
    background: linear-gradient(180deg, rgba(19, 17, 28, 0.95) 0%, rgba(31, 27, 45, 0.95) 100%);
  }

  .hero-content {
    max-width: 800px;
    width: 100%;
    z-index: 2;
  }

  .section {
    padding: 5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .value-section {
    background: rgba(19, 17, 28, 0.9);
    position: relative;
    border-top: 1px solid rgba(189, 150, 72, 0.15);
    border-bottom: 1px solid rgba(189, 150, 72, 0.15);
  }

  .testimonial-section {
    background: linear-gradient(180deg, rgba(31, 27, 45, 0.8) 0%, rgba(43, 29, 52, 0.8) 100%);
  }

  .cta-section {
    background: rgba(19, 17, 28, 0.95);
    padding-bottom: 6rem;
  }

  .container {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
  }

  .narrow-container {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(2.75rem, 6vw, 4.5rem);
    margin: 0 0 1rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    letter-spacing: 0.02em;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    margin: 0 0 1.5rem;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  h3 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin: 0 0 1rem;
    color: #BD9648;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin: 0 0 1.5rem;
    line-height: 1.5;
    color: rgba(247, 232, 212, 0.92);
    font-family: 'Spectral', serif;
  }

  .lead {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    margin-bottom: 2rem;
  }

  .brand-heading {
    color: #BD9648;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    text-transform: uppercase;
    letter-spacing: 0.25em;
    margin-bottom: 0.75rem;
    font-family: 'Cinzel', serif;
    font-weight: 500;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    opacity: 0.95;
    display: inline-block;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .brand-heading:hover {
    color: #d8b05c;
    text-shadow: 0 0 12px rgba(189, 150, 72, 0.6);
    transform: scale(1.05);
  }

  .brand-heading::before,
  .brand-heading::after {
    content: '';
    height: 1px;
    width: 30px;
    background: rgba(189, 150, 72, 0.5);
    position: absolute;
    top: 50%;
    transition: all 0.3s ease;
  }

  .brand-heading:hover::before,
  .brand-heading:hover::after {
    width: 40px;
    background: rgba(189, 150, 72, 0.8);
  }

  .brand-heading::before {
    right: calc(100% + 15px);
  }

  .brand-heading:hover::before {
    right: calc(100% + 10px);
  }

  .brand-heading::after {
    left: calc(100% + 15px);
  }

  .brand-heading:hover::after {
    left: calc(100% + 10px);
  }

  .cta-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 420px;
    margin: 1.5rem auto 1.25rem;
    background: rgba(20, 17, 30, 0.6);
    padding: 1.75rem 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.15);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .cta-form:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }

  .form-title {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    color: #F7E8D4;
    margin: 0 0 1rem;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(247, 232, 212, 0.25);
    border-radius: 6px;
    background: rgba(19, 17, 28, 0.6);
    color: #F7E8D4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1rem;
    outline: none;
    transition: all 0.25s ease;
    margin-bottom: 0.5rem;
  }

  input:focus {
    border-color: rgba(189, 150, 72, 0.6);
    box-shadow: 0 0 12px rgba(189, 150, 72, 0.25);
  }

  input::placeholder {
    color: rgba(247, 232, 212, 0.45);
    font-weight: 300;
  }

  button {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #A671E6 0%, #8A4CB3 100%);
  }

  button:active {
    transform: translateY(0);
  }

  button:disabled {
    background: rgba(158, 97, 227, 0.5);
    cursor: not-allowed;
    transform: none;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .checkbox-wrapper input[type="checkbox"] {
    width: auto;
    margin: 0.25rem 0 0 0;
  }

  .checkbox-wrapper label {
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.3;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .error-message {
    color: #FF6B6B;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .success-message {
    color: #4FB286;
    font-size: 1.1rem;
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(79, 178, 134, 0.1);
    border-radius: 6px;
    text-align: center;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }

  .benefit-card {
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(247, 232, 212, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #9E61E3;
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .testimonial-card {
    background: rgba(19, 17, 28, 0.6);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(247, 232, 212, 0.1);
    position: relative;
  }

  .testimonial-card::before {
    content: '"';
    font-size: 5rem;
    font-family: Georgia, serif;
    position: absolute;
    top: -15px;
    left: 10px;
    color: rgba(189, 150, 72, 0.15);
    z-index: -1;
  }

  .testimonial-text {
    font-style: italic;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .testimonial-author {
    font-weight: 600;
    color: #BD9648;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .footer {
    background: rgba(19, 17, 28, 1);
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(189, 150, 72, 0.2);
  }

  .footer-text {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    font-family: 'Inter', system-ui, sans-serif;
  }

  @media (max-width: 768px) {
    .section {
      padding: 4rem 1.5rem;
    }

    .benefits-grid, .testimonial-grid {
      grid-template-columns: 1fr;
    }

    .brand-heading::before,
    .brand-heading::after {
      width: 20px;
    }

    .brand-heading::before {
      right: calc(100% + 10px);
    }

    .brand-heading::after {
      left: calc(100% + 10px);
    }
  }

  .magic-underline {
    background-image: linear-gradient(90deg, rgba(158, 97, 227, 0.8), rgba(189, 150, 72, 0.8));
    background-repeat: no-repeat;
    background-size: 100% 3px;
    background-position: 0 95%;
    padding: 0 0.2rem;
  }

  .highlight {
    color: #BD9648;
    font-weight: 600;
  }

  .scroll-arrow {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    color: rgba(247, 232, 212, 0.6);
    animation: bounce 2s infinite;
    cursor: pointer;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-20px) translateX(-50%);
    }
    60% {
      transform: translateY(-10px) translateX(-50%);
    }
  }

  /* Newsletter Navigation Styles */
  .newsletter-nav {
    background: rgba(31, 27, 45, 0.7);
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    padding: 0.75rem 1rem;
    position: relative;
    z-index: 10;
    margin-bottom: 1rem;
    backdrop-filter: blur(5px);
  }

  .newsletter-nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .newsletter-nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .newsletter-nav-title {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    color: #BD9648;
    margin: 0;
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: rgba(247, 232, 212, 0.85);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.25rem;
    width: 36px;
    height: 36px;
  }

  .newsletter-list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .newsletter-item {
    flex: 1;
    min-width: 250px;
  }

  .newsletter-link {
    display: block;
    padding: 0.75rem;
    text-decoration: none;
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(189, 150, 72, 0.15);
    border-radius: 6px;
    transition: all 0.3s ease;
    height: 100%;
  }

  .newsletter-link:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .newsletter-link-title {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: #BD9648;
    margin: 0 0 0.25rem;
  }

  .newsletter-link-summary {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.85);
    margin: 0;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    .newsletter-nav {
      padding: 0.5rem 0.75rem;
    }

    .mobile-menu-toggle {
      display: block;
      background: rgba(19, 17, 28, 0.5);
      border-radius: 4px;
    }

    .newsletter-list {
      display: none;
      flex-direction: column;
    }

    .newsletter-list.show {
      display: flex;
      margin-top: 0.5rem;
    }

    .newsletter-item {
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .newsletter-link {
      padding: 0.5rem 0.75rem;
    }
  }
</style>

<svelte:head>
  <title>Join Our Fantasy Newsletter - Treasure Tavern</title>
  <meta name="description" content="Subscribe to our fantasy newsletter and embark on an adventure of exclusive tips, special offers, and magical content from Treasure Tavern." />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<div class="page-container">
  <!-- Newsletter Navigation -->
  <div class="newsletter-nav">
    <div class="newsletter-nav-inner">
      <div class="newsletter-nav-header">
        <h2 class="newsletter-nav-title">Past Newsletters</h2>
        <button class="mobile-menu-toggle" on:click={() => showMobileMenu = !showMobileMenu} aria-label="Toggle newsletter menu">
          <i class="fas fa-{showMobileMenu ? 'times' : 'bars'}" aria-hidden="true"></i>
        </button>
      </div>
      <ul class="newsletter-list" class:show={showMobileMenu}>
        {#each newsletters as newsletter}
          <li class="newsletter-item">
            <a href="/newsletter/{newsletter.id}" class="newsletter-link">
              <h3 class="newsletter-link-title">{newsletter.title}</h3>
              <p class="newsletter-link-summary">{newsletter.summary}</p>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Hero Section with Primary Signup -->
  <section class="hero-section">
    <div class="hero-content">
      <a href="/" style="text-decoration: none;">
        <p class="brand-heading">Treasure Tavern Presents</p>
      </a>
      <h1>Unlock the Secrets of Fantasy Adventure</h1>
      <p class="lead">
        Join our exclusive newsletter and receive <span class="magic-underline">magical tips</span>,
        <span class="magic-underline">special offers</span>, and <span class="magic-underline">epic stories</span>
        delivered straight to your inbox.
      </p>

      <!-- Hero Form - First Signup Opportunity -->
      <div class="cta-form">
        <h3 class="form-title">Begin Your Journey</h3>
        {#if heroForm.success}
          <div class="success-message">
            <i class="fas fa-check-circle"></i> Thank you for joining our fellowship! Check your inbox for your welcome message.
          </div>
        {:else}
          <form on:submit|preventDefault={handleHeroSubmit}>
            <input
              type="text"
              placeholder="Your name (optional)"
              bind:value={heroForm.name}
            />
            <input
              type="email"
              placeholder="Your email address"
              bind:value={heroForm.email}
              required
            />
            <div class="checkbox-wrapper">
              <input
                type="checkbox"
                id="hero-newsletter-opt-in"
                bind:checked={heroForm.newsletterOptIn}
              />
              <label for="hero-newsletter-opt-in">
                Yes, send me exclusive content, special offers, and updates from Treasure Tavern.
              </label>
            </div>
            {#if heroForm.error}
              <div class="error-message"><i class="fas fa-exclamation-circle"></i> {heroForm.error}</div>
            {/if}
            <button type="submit" disabled={heroForm.loading}>
              {heroForm.loading ? 'Joining...' : 'Join the Adventure'}
            </button>
          </form>
        {/if}
      </div>
    </div>
    <div class="scroll-arrow" on:click={() => window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })}>
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>

  <!-- Value Proposition Section with Second Signup -->
  <section class="section value-section">
    <div class="container">
      <div class="narrow-container">
        <h2>Why Join Our Fantasy Fellowship?</h2>
        <p class="lead">
          Our newsletter is crafted by seasoned adventurers for those who seek the extraordinary.
          Here's what awaits when you join our ranks:
        </p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-book-open"></i></div>
          <h3>Exclusive Content</h3>
          <p>Gain access to lore, stories, and guides not available anywhere else in the realm.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-gifts"></i></div>
          <h3>Special Offers</h3>
          <p>Be the first to receive special discounts and promotions on our finest treasures.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-users"></i></div>
          <h3>Community Events</h3>
          <p>Receive invitations to our exclusive gatherings, both virtual and in-person.</p>
        </div>
      </div>

      <!-- Value Prop Form - Second Signup Opportunity -->
      <div class="narrow-container">
        <div class="cta-form">
          <h3 class="form-title">Claim Your Membership</h3>
          {#if valueForm.success}
            <div class="success-message">
              <i class="fas fa-check-circle"></i> Your name has been added to our fellowship roster! Your adventure begins soon.
            </div>
          {:else}
            <form on:submit|preventDefault={handleValueSubmit}>
              <input
                type="text"
                placeholder="Your name (optional)"
                bind:value={valueForm.name}
              />
              <input
                type="email"
                placeholder="Your email address"
                bind:value={valueForm.email}
                required
              />
              <div class="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="value-newsletter-opt-in"
                  bind:checked={valueForm.newsletterOptIn}
                />
                <label for="value-newsletter-opt-in">
                  I wish to receive the legendary Treasure Tavern newsletter.
                </label>
              </div>
              {#if valueForm.error}
                <div class="error-message"><i class="fas fa-exclamation-circle"></i> {valueForm.error}</div>
              {/if}
              <button type="submit" disabled={valueForm.loading}>
                {valueForm.loading ? 'Processing...' : 'Secure My Spot'}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial Section -->
  <section class="section testimonial-section">
    <div class="container">
      <h2>What Fellow Adventurers Say</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <p class="testimonial-text">
            "The Treasure Tavern newsletter has been my trusted companion on many quests.
            Their exclusive tips helped me become a better game master!"
          </p>
          <p class="testimonial-author">— Elyndria, Dungeon Master</p>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-text">
            "I love receiving their weekly stories in my inbox. It's like a small escape into
            fantasy that brightens my otherwise mundane workdays."
          </p>
          <p class="testimonial-author">— Thorin, Fantasy Enthusiast</p>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-text">
            "The exclusive offers alone are worth signing up. I've saved a fortune on fantasy
            merchandise thanks to their subscriber-only discounts."
          </p>
          <p class="testimonial-author">— Lyra, Collector</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA Section with Third Signup -->
  <section class="section cta-section">
    <div class="narrow-container">
      <h2>Join the Fellowship Today</h2>
      <p class="lead">
        Don't miss out on the <span class="highlight">exclusive content</span>,
        <span class="highlight">special offers</span>, and
        <span class="highlight">magical experiences</span> that await.
        The adventure begins with a simple step.
      </p>

      <!-- Final CTA Form - Third Signup Opportunity -->
      <div class="cta-form">
        <h3 class="form-title">One Last Chance to Join</h3>
        {#if ctaForm.success}
          <div class="success-message">
            <i class="fas fa-check-circle"></i> Welcome to our fellowship! Your adventure with Treasure Tavern begins now.
          </div>
        {:else}
          <form on:submit|preventDefault={handleCtaSubmit}>
            <input
              type="text"
              placeholder="Your name (optional)"
              bind:value={ctaForm.name}
            />
            <input
              type="email"
              placeholder="Your email address"
              bind:value={ctaForm.email}
              required
            />
            <div class="checkbox-wrapper">
              <input
                type="checkbox"
                id="cta-newsletter-opt-in"
                bind:checked={ctaForm.newsletterOptIn}
              />
              <label for="cta-newsletter-opt-in">
                Yes, I want to receive the mystical wisdom of Treasure Tavern in my inbox.
              </label>
            </div>
            {#if ctaForm.error}
              <div class="error-message"><i class="fas fa-exclamation-circle"></i> {ctaForm.error}</div>
            {/if}
            <button type="submit" disabled={ctaForm.loading}>
              {ctaForm.loading ? 'Summoning...' : 'Embark on the Journey'}
            </button>
          </form>
        {/if}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p class="footer-text">© {currentYear} Treasure Tavern. All rights reserved.</p>
  </footer>
</div>