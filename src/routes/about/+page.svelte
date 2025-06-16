<script lang="ts">
  // Import any components you need
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let isReady = false;
  const sectionsVisible = {
    questions: false,
    story: false,
    features: false,
    cta: false
  };

  // Define type for section IDs
  type SectionId = keyof typeof sectionsVisible;

  // Intersection observer to animate sections as they come into view
  onMount(() => {
    setTimeout(() => {
      isReady = true;
    }, 300);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              const sectionId = entry.target.dataset.section;
              if (sectionId && sectionId in sectionsVisible) {
                sectionsVisible[sectionId as SectionId] = true;
              }
            }
          });
        },
        { threshold: 0.2 }
      );

      document.querySelectorAll('[data-section]').forEach(section => {
        observer.observe(section);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      Object.keys(sectionsVisible).forEach(key => {
        sectionsVisible[key as SectionId] = true;
      });
    }
  });

  // Function to scroll to questions section
  function scrollToQuestions() {
    const questionsSection = document.querySelector('.visitor-questions');
    if (questionsSection) {
      questionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<svelte:head>
  <title>About - Treasure Tavern</title>
  <meta
    name="description"
    content="Learn about Treasure Tavern - a place for stories, adventures, and community."
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
</svelte:head>

<div class="page-container">
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content" class:visible={isReady}>
      <h1 class="hero-title">About Treasure Tavern</h1>
      <p class="hero-subtitle">A creative writing project under development</p>
    </div>
  </section>

  <div class="visitor-questions" data-section="questions">
    {#if sectionsVisible.questions}
      <h2 class="questions-title" in:fly={{ y: 30, duration: 500, delay: 100 }}>
        Common Questions
      </h2>
      <div class="questions-grid">
        <div class="question-item" in:fly={{ y: 30, duration: 500, delay: 200 }}>
          <i class="fas fa-question-circle"></i>
          <h3>What is Treasure Tavern?</h3>
          <p>
            Treasure Tavern HQ is a creative writing project currently under development. We're
            building a platform for storytelling and plan to expand our scope as more storytelling
            tools become available.
          </p>
        </div>
        <div class="question-item" in:fly={{ y: 30, duration: 500, delay: 300 }}>
          <i class="fas fa-seedling"></i>
          <h3>What are the future plans?</h3>
          <p>
            We plan to expand the project's scope over time as more storytelling tools become
            available. Our focus is on creative writing and storytelling.
          </p>
        </div>
        <div class="question-item" in:fly={{ y: 30, duration: 500, delay: 350 }}>
          <i class="fas fa-info-circle"></i>
          <h3>Important Notice</h3>
          <p>
            This website is under development. All content is subject to change and is provided for
            entertainment purposes only.
          </p>
        </div>
      </div>
    {/if}
  </div>

  <div class="section-divider">
    <div class="divider-icon">
      <i class="fas fa-scroll"></i>
    </div>
  </div>

  <div class="main-content">
    <section class="about-section" data-section="story">
      {#if sectionsVisible.story}
        <h2 class="section-title" in:fade={{ duration: 500 }}>Our Story</h2>
        <div class="section-content" in:fly={{ y: 20, duration: 500, delay: 100 }}>
          <p>
            Treasure Tavern HQ is a creative writing project that aims to build a platform for
            storytelling. While we're currently in development, we're working towards creating an
            engaging space for creative writing.
          </p>
          <p>
            As we continue to develop, we plan to expand our capabilities and features,
            incorporating new storytelling tools and technologies as they become available.
          </p>
          <p>
            Please note that this website is under active development. All content is subject to
            change and is provided for entertainment purposes only.
          </p>
        </div>
      {/if}
    </section>

    <div class="section-divider">
      <div class="divider-icon">
        <i class="fas fa-gem"></i>
      </div>
    </div>

    <section class="about-section" data-section="features">
      {#if sectionsVisible.features}
        <h2 class="section-title" in:fade={{ duration: 500 }}>What We Offer</h2>
        <div class="features-grid">
          <div class="feature-card" in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <div class="feature-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h3 class="feature-title">Curated Tales</h3>
            <p class="feature-description">
              Discover carefully collected stories ranging from epic adventures to intimate moments
              of wonder and mystery, all presented in an immersive format.
            </p>
          </div>
        </div>
      {/if}
    </section>

    <div class="section-divider">
      <div class="divider-icon">
        <i class="fas fa-crown"></i>
      </div>
    </div>

    <section class="cta-section" data-section="cta">
      {#if sectionsVisible.cta}
        <div class="cta-content" in:fly={{ y: 20, duration: 500, delay: 100 }}>
          <h2>Development Status</h2>
          <p>
            This project is under active development. All content is subject to change and is
            provided for entertainment purposes only.
          </p>
        </div>
      {/if}
    </section>
  </div>
</div>

<style>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(145deg, #13111c 0%, #1f1b2d 60%, #2b1d34 100%);
    color: #f7e8d4;
    background-image:
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239e61e3' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
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
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(19, 17, 28, 0.7), rgba(19, 17, 28, 0.8)),
      url('/images/tavern-tales-bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
    transform: scale(1.05);
    animation: subtle-zoom 30s infinite alternate ease-in-out;
  }

  @keyframes subtle-zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  }

  .hero-content {
    max-width: 900px;
    width: 100%;
    z-index: 1;
    transition: all 0.5s ease;
    opacity: 0;
    transform: translateY(20px);
    padding: 2rem;
    position: relative;
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
    color: #f7e8d4;
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

  .about-section {
    margin-bottom: clamp(3rem, 8vw, 5rem);
    position: relative;
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: clamp(1.5rem, 3vw, 2rem);
    color: #bd9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    text-align: center;
    position: relative;
    display: inline-block;
    padding-bottom: 0.75rem;
    width: 100%;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(80px, 20%, 150px);
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(158, 97, 227, 0) 0%,
      rgba(158, 97, 227, 0.8) 50%,
      rgba(158, 97, 227, 0) 100%
    );
  }

  .section-content {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: rgba(247, 232, 212, 0.92);
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
    background: rgba(31, 27, 45, 0.3);
    border-radius: 10px;
    border: 1px solid rgba(189, 150, 72, 0.15);
  }

  .section-content p {
    margin-bottom: 1.5rem;
  }

  .section-content p:last-child {
    margin-bottom: 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-top: clamp(1.5rem, 4vw, 2.5rem);
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .feature-card {
    background: rgba(31, 27, 45, 0.4);
    border-radius: 10px;
    padding: 1.75rem;
    border: 1px solid rgba(189, 150, 72, 0.2);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #9e61e3 0%, #7a3ca3 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(189, 150, 72, 0.4);
  }

  .feature-card:hover::before {
    transform: scaleX(1);
  }

  .feature-icon {
    font-size: 2.2rem;
    color: #9e61e3;
    margin-bottom: 1rem;
    text-align: center;
    background: rgba(158, 97, 227, 0.1);
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(158, 97, 227, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.1);
    background: rgba(158, 97, 227, 0.15);
    box-shadow: 0 5px 15px rgba(158, 97, 227, 0.2);
  }

  .feature-title {
    font-family: 'Cinzel', serif;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: #bd9648;
    text-align: center;
  }

  .feature-description {
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.6;
    font-size: 0.95rem;
    text-align: center;
  }

  .cta-section {
    padding: 2rem;
    background: rgba(31, 27, 45, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(189, 150, 72, 0.2);
    text-align: center;
    margin-top: 2rem;
  }

  .cta-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
    color: #bd9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .cta-text {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 3vw, 1.3rem);
    line-height: 1.6;
    color: rgba(247, 232, 212, 0.92);
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .cta-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    display: inline-block;
    padding: 0.85rem 1.75rem;
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    color: #f7e8d4;
    border: none;
    border-radius: 6px;
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .cta-button:hover {
    background: linear-gradient(135deg, #af71f4 0%, #8a4cb3 100%);
    transform: translateY(-3px);
    box-shadow:
      0 7px 14px rgba(0, 0, 0, 0.15),
      0 0 10px rgba(158, 97, 227, 0.3);
  }

  .account-button {
    background: linear-gradient(135deg, #bd9648 0%, #9a7a3d 100%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .account-button:hover {
    background: linear-gradient(135deg, #d4a852 0%, #b99148 100%);
  }

  .cta-note {
    font-family: 'Spectral', serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.8);
    font-style: italic;
    max-width: 600px;
    margin: 0 auto;
  }

  .visitor-questions {
    margin: 2.5rem auto;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
    position: relative;
  }

  .visitor-questions::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(19, 17, 28, 0.4);
    border-top: 1px solid rgba(189, 150, 72, 0.2);
    border-bottom: 1px solid rgba(189, 150, 72, 0.2);
    z-index: -1;
  }

  .questions-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 4vw, 2rem);
    color: #bd9648;
    text-align: center;
    margin-bottom: 1.5rem;
    margin-top: 2rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    position: relative;
  }

  .questions-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(60px, 15%, 120px);
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(158, 97, 227, 0) 0%,
      rgba(158, 97, 227, 0.8) 50%,
      rgba(158, 97, 227, 0) 100%
    );
  }

  .questions-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    padding: 2rem 0;
  }

  .question-item {
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(189, 150, 72, 0.2);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .question-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(189, 150, 72, 0.4);
  }

  .question-item i {
    font-size: 1.5rem;
    color: #9e61e3;
    margin-bottom: 0.75rem;
    background: rgba(158, 97, 227, 0.1);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(158, 97, 227, 0.2);
    transition: all 0.3s ease;
    margin-left: auto;
    margin-right: auto;
  }

  .question-item:hover i {
    transform: scale(1.1);
    background: rgba(158, 97, 227, 0.15);
  }

  .question-item h3 {
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    color: #bd9648;
    margin-bottom: 0.75rem;
    text-align: center;
  }

  .question-item p {
    font-family: 'Spectral', serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(247, 232, 212, 0.9);
    margin: 0;
    text-align: center;
  }

  .scroll-down {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(247, 232, 212, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9rem;
    font-family: 'Spectral', serif;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .scroll-down:hover {
    opacity: 1;
  }

  .scroll-down i {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .section-divider {
    height: 30px;
    margin: 3rem 0;
    position: relative;
    overflow: hidden;
  }

  .section-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 45%;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0.05) 0%, rgba(189, 150, 72, 0.3) 100%);
  }

  .section-divider::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 45%;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0.3) 0%, rgba(189, 150, 72, 0.05) 100%);
  }

  .divider-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background: #1f1b2d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bd9648;
    font-size: 0.9rem;
    border: 1px solid rgba(189, 150, 72, 0.3);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .questions-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  @media (min-width: 1024px) {
    .questions-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  @media (max-width: 640px) {
    .hero {
      min-height: 25vh;
      padding: 2rem 1rem;
    }

    .hero-content {
      padding: 1.5rem 1rem;
    }

    .section-content {
      padding: 1rem 0.75rem;
    }

    .feature-card {
      padding: 1.25rem;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      font-size: 1.8rem;
    }

    .cta-section {
      padding: 1.5rem 1rem;
    }

    .question-item {
      padding: 1.25rem;
    }

    .question-item i {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .scroll-down {
      display: none;
    }
  }
</style>
