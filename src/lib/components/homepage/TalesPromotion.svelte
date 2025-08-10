<script lang="ts">
  // Stateless promotional block extracted from the homepage
</script>

<!-- Tavern Tales Promotion Section -->
<div class="tales-promotion">
  <div class="tales-promotion-container">
    <div class="tales-promotion-image">
      <img
        src="/images/treasure-tavern-tales.png"
        alt="Treasure Tavern Tales - A collection of magical stories"
      />
    </div>
    <div class="tales-promotion-content">
      <h2>Embark on Magical Journeys</h2>
      <p>
        Discover a growing collection of enchanting tales from the Treasure Tavern universe.
        From the mysterious Bone Kingdom to the mischievous Goblin King, each story offers a
        window into our rich fantasy world filled with magic, adventure, and wonder.
      </p>
      <a href="/tavern-tales" class="magic-button">
        <i class="fas fa-book-open"></i>
        <span>Explore Tavern Tales</span>
        <i class="fas fa-chevron-right chevron"></i>
      </a>
    </div>
  </div>
 </div>

<style>
  .tales-promotion {
    margin: 4rem auto;
  }

  .tales-promotion-container {
    display: flex;
    gap: 2rem;
    max-width: 1200px;
    padding: 2rem;
    margin: 0 auto;
    align-items: center;
  }

  .tales-promotion-image {
    flex: 1;
  }

  .tales-promotion-image img {
    width: 100%;
    height: auto;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    display: block;
  }

  .tales-promotion-content {
    flex: 1;
    text-align: left;
  }

  .tales-promotion-content h2 {
    font-family: 'Cinzel', serif;
    color: #d5a44c;
    margin-bottom: 1rem;
    font-size: clamp(2rem, 4vw, 2.5rem);
  }

  .tales-promotion-content p {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin-bottom: 2rem;
    line-height: 1.6;
    color: rgba(247, 232, 212, 0.92);
  }

  .magic-button {
    display: inline-flex;
    align-items: center;
    padding: 1rem 2rem;
    color: #1f1b2d;
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 2px solid rgba(189, 150, 72, 0.2);
    overflow: hidden;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 12px rgba(189, 150, 72, 0.5);
    border-radius: 50px;
    font-weight: 600;
    font-family: 'Cinzel', serif;
    background: linear-gradient(135deg, #bd9648 0%, #e5c989 100%);
    gap: 0.75rem;
  }

  .magic-button .chevron {
    margin-left: 0.25rem;
  }
</style>


