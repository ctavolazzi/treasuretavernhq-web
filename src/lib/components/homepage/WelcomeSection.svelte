<script lang="ts">
  export let supportsWebP: boolean = true;
  export let scrollModalOpen: boolean; // bind from parent if needed
</script>

<div class="welcome-section">
  <div class="welcome-image-container">
    <a href="/tavern-tales">
      <picture>
        <source srcset="/images/tt-landscape-welcome-image.webp" type="image/webp" />
        <img
          src="/images/tt-landscape-welcome-image.png"
          alt="Welcome to Treasure Tavern - A mystical fantasy landscape"
          class="welcome-image"
          loading="lazy"
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
    the real world. It's a work of fiction, an online store, an interactive social media
    experience, and more - a multifaceted realm where imagination meets community.
  </p>
  <p class="welcome-footer">
    Pull up a chair, order your favorite brew, and make yourself at home. The Tavern Keeper has
    been expecting you.
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


