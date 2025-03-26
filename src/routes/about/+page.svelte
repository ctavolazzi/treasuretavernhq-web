<script>
  // Import any components you need
  import { onMount } from 'svelte';

  let isReady = false;

  onMount(() => {
    // Add any initialization logic here
    setTimeout(() => {
      isReady = true;
    }, 300);
  });
</script>

<svelte:head>
  <title>About - Treasure Tavern</title>
  <meta name="description" content="Learn about Treasure Tavern - a place for stories, adventures, and community." />
</svelte:head>

<style>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(145deg, #13111C 0%, #1F1B2D 60%, #2B1D34 100%);
    color: #F7E8D4;
  }

  .hero {
    position: relative;
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem max(1rem, 5vw);
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
    transition: all 0.5s ease;
    opacity: 0;
    transform: translateY(20px);
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
    margin-bottom: 2rem;
    color: rgba(247, 232, 212, 0.9);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-style: italic;
    line-height: 1.5;
  }

  .main-content {
    flex: 1;
    padding: clamp(2rem, 5vw, 4rem) max(1rem, 5vw);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .about-section {
    margin-bottom: clamp(3rem, 8vw, 5rem);
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: clamp(1.5rem, 4vw, 2rem);
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .section-content {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: rgba(247, 232, 212, 0.92);
    max-width: 900px;
  }

  .section-content p {
    margin-bottom: 1.5rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: clamp(1.5rem, 4vw, 2.5rem);
    margin-top: clamp(2rem, 5vw, 3rem);
  }

  .feature-card {
    background: rgba(31, 27, 45, 0.4);
    border-radius: 10px;
    padding: clamp(1.5rem, 4vw, 2rem);
    border: 1px solid rgba(189, 150, 72, 0.2);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(189, 150, 72, 0.4);
  }

  .feature-icon {
    font-size: 2rem;
    color: #9E61E3;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: #BD9648;
  }

  .feature-description {
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.6;
  }

  .cta-section {
    text-align: center;
    margin-top: clamp(2rem, 6vw, 4rem);
    padding: clamp(2rem, 5vw, 3rem);
    background: rgba(31, 27, 45, 0.6);
    border-radius: 10px;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .cta-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: 1rem;
    color: #BD9648;
  }

  .cta-text {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    margin-bottom: 2rem;
    color: rgba(247, 232, 212, 0.92);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-button {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border: none;
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .cta-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="page-container">
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content" class:visible={isReady}>
      <h1 class="hero-title">About Treasure Tavern</h1>
      <p class="hero-subtitle">A gathering place for adventurers, storytellers, and dreamers of all realms</p>
    </div>
  </section>

  <div class="main-content">
    <section class="about-section">
      <h2 class="section-title">Our Story</h2>
      <div class="section-content">
        <p>
          Treasure Tavern began as a humble gathering spot for weary travelers, eventually becoming a nexus for sharing tales, songs, and legends from across the known realms. Founded on the principles of community, creativity, and the preservation of extraordinary stories, our tavern has grown into a renowned hub for those seeking adventure and connection.
        </p>
        <p>
          Every corner of Treasure Tavern holds a story - from the ancient chess set said to be played by goblins after midnight to the collection of maps donated by the Wandering Knight himself. Our halls have hosted legendary bards, mysterious sages, and ordinary folk with extraordinary tales.
        </p>
        <p>
          Today, we extend our tavern beyond physical walls, creating a digital hearth where stories can be shared across distances and dimensions. Whether you're a seasoned storyteller or simply seeking refuge in the warmth of narrative, you'll find a place at our table.
        </p>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title">What We Offer</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-book-open"></i>
          </div>
          <h3 class="feature-title">Curated Tales</h3>
          <p class="feature-description">
            Discover carefully collected stories ranging from epic adventures to intimate moments of wonder and mystery, all presented in an immersive format.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-feather-alt"></i>
          </div>
          <h3 class="feature-title">Creative Community</h3>
          <p class="feature-description">
            Join a thriving community of storytellers, artists, and enthusiasts who share and celebrate the art of narrative and fantasy.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-scroll"></i>
          </div>
          <h3 class="feature-title">Regular Updates</h3>
          <p class="feature-description">
            Receive tales, announcements, and invitations to special events through our newsletter, delivered directly to your chamber door.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-hat-wizard"></i>
          </div>
          <h3 class="feature-title">Magical Experiences</h3>
          <p class="feature-description">
            Immerse yourself in interactive encounters, enchanted riddles, and experiences that blur the line between story and reality.
          </p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2 class="cta-title">Join Our Fellowship</h2>
      <p class="cta-text">
        The door to Treasure Tavern is always open for those with a spark of curiosity and a thirst for adventure. Sign up for our newsletter to receive the latest tales and invitations to exclusive gatherings.
      </p>
      <a href="/newsletter" class="cta-button">Subscribe to Our Tales</a>
    </section>
  </div>
</div>