<script lang="ts"></script>

<div class="exploration-section">
  <h2 class="exploration-title">Explore the Tavern</h2>
  <p class="exploration-description">
    Treasure Tavern is a fantastical universe filled with mythical characters, magical artifacts,
    and extraordinary tales. Explore our world through the links below and begin your journey.
  </p>

  <div class="exploration-grid">
    <a href="/about" class="exploration-card">
      <i class="fas fa-info-circle"></i>
      <h3>About</h3>
      <p>Learn more about Treasure Tavern</p>
    </a>
    <a href="/announcements" class="exploration-card">
      <i class="fas fa-bullhorn"></i>
      <h3>Announcements</h3>
      <p>Latest updates and news</p>
    </a>
  </div>
</div>

<style>
  .exploration-section {
    margin-top: 3rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .exploration-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin: 0 0 1rem;
    font-weight: 700;
    color: #bd9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    text-align: center;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  .exploration-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin: 0 auto 1.5rem;
    text-align: center;
    max-width: 700px;
    color: rgba(247, 232, 212, 0.92);
    line-height: 1.5;
  }

  .exploration-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .exploration-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: var(--card-bg);
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-color);
    transition: transform 0.3s ease;
  }

  .exploration-card:hover {
    transform: translateY(-5px);
  }

  .exploration-card i {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .exploration-card h3 {
    margin: 0 0 0.5rem;
  }

  .exploration-card p {
    margin: 0;
    text-align: center;
  }
</style>


