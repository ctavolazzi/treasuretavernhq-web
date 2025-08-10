<script lang="ts"></script>

<div class="welcome-section">
  <div class="welcome-image-container">
    <a href="/tavern-tales">
      <picture>
        <source srcset="/images/tt-landscape-welcome-image.webp" type="image/webp" />
        <img
          src="/images/tt-landscape-welcome-image.png"
          alt="Welcome to Treasure Tavern - A mystical fantasy landscape"
          class="welcome-image"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </a>
  </div>
  <h2 class="welcome-title">The<br class="mobile-break" /> Door Is Opening</h2>
  <p class="welcome-description">
    Step through our magical doorway and find yourself in a realm where legends come alive,
    treasures await discovery, and fellow adventurers gather to share their tales by the hearth.
  </p>
  <p class="welcome-description">
    Treasure Tavern is a fantasy universe created and updated to entertain and offer an escape from
    the real world. It's a work of fiction, an online store, an interactive social media experience,
    and more - a multifaceted realm where imagination meets community.
  </p>
  <p class="welcome-footer">
    Pull up a chair, order your favorite brew, and make yourself at home. The Tavern Keeper has been
    expecting you.
  </p>

  <div class="welcome-nav-buttons">
    <a href="/about" class="welcome-nav-button">
      <div class="button-content">
        <span class="button-text">What is the Treasure Tavern?</span>
      </div>
    </a>
    <a href="/tavern-tales" class="welcome-nav-button tales-button">
      <div class="button-content">
        <i class="fas fa-book-open welcome-nav-icon"></i>
        <span class="button-text">Read Tavern Tales</span>
      </div>
    </a>
  </div>
</div>

<style>
  /* removed empty .welcome-section ruleset */
  .welcome-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.2rem, 5vw, 2.8rem);
    margin: 0.75rem 0 0.5rem;
    color: #d5a44c;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
  }
  .welcome-description,
  .welcome-footer {
    font-family: 'Spectral', serif;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    color: rgba(247, 232, 212, 0.92);
    line-height: 1.6;
    margin: 0 0 1rem;
  }
  .welcome-image {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  }
  .welcome-nav-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }
  .welcome-nav-button {
    display: inline-block;
    padding: 0.9rem 2.1rem;
    border: 1px solid rgba(189, 150, 72, 0.25);
    border-radius: 30px;
    text-decoration: none;
    color: #f7e8d4;
    background: rgba(31, 27, 45, 0.5);
    transition: all 0.2s ease;
  }
  .welcome-nav-button:hover {
    background: linear-gradient(135deg, #e5c989 0%, #bd9648 100%);
    color: #1f1b2d;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }
  .welcome-nav-button .button-content {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .welcome-nav-icon {
    font-size: 1.2rem;
    color: #bd9648;
  }
  .button-text {
    font-family: 'Cinzel', serif;
  }
</style>
