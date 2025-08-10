<script lang="ts">
  export let scrollImgWebpSrc: string;
  export let scrollImgSrc: string;
  export let onOpenModal: () => void;
</script>

<div class="tavern-atmosphere">
  <h2 class="atmosphere-title">Tales from Patrons</h2>
  <div class="atmosphere-title-decoration"></div>

  <div class="testimonials-container">
    <div class="testimonial">
      <div class="quote-icon">❝</div>
      <p class="atmosphere-quote">
        Lost my lucky dagger in a bet with a goblin last spring. Found it hanging above the hearth
        at Treasure Tavern three moons later. This place has a way of gathering lost treasures and
        wayward souls alike. Best mead in seven kingdoms too!
      </p>
      <p class="quote-attribution">
        — Durnin Axebeard, <span class="attribution-title">Dwarven Merchant</span>
      </p>
    </div>

    <div class="testimonial">
      <div class="quote-icon">❝</div>
      <p class="atmosphere-quote">
        My songs have echoed in the halls of emperors, but nowhere do they resonate with such magic
        as within these tavern walls. The patrons here don't just listen to tales—they live them,
        breathe them, become part of them.
      </p>
      <p class="quote-attribution">
        — Lyra Silverstring, <span class="attribution-title">Elven Bard</span>
      </p>
    </div>

    <div class="testimonial">
      <div class="quote-icon">❝</div>
      <p class="atmosphere-quote">
        Been traversing the Shadowlands for nigh on forty years. Only place where both the living
        and spectral feel welcome is Treasure Tavern. The keeper doesn't ask questions when you
        order two ales but drink alone.
      </p>
      <p class="quote-attribution">
        — Morvath the Gray, <span class="attribution-title">Spirit Walker</span>
      </p>
    </div>
  </div>

  <div class="tavern-song">
    <h3 class="song-title">The Tavern Oak</h3>
    <div class="song-title-decoration"></div>
    <div
      class="scroll-image-container"
      on:click={onOpenModal}
      role="button"
      tabindex="0"
      on:keydown={e => e.key === 'Enter' && onOpenModal()}
      aria-label="Open tavern song scroll"
    >
      <div class="scroll-frame">
        <picture>
          <source srcset={scrollImgWebpSrc} type="image/webp" />
          <img
            src={scrollImgSrc}
            alt="The Tavern Oak - A tavern song written on a scroll"
            class="tavern-song-scroll"
            loading="lazy"
          />
        </picture>
      </div>
      <div class="view-larger-hint">
        <span>Click to enlarge</span>
      </div>
    </div>
    <div class="song-notes">
      <span class="music-note">♫</span>
      <span class="music-note delayed">♪</span>
    </div>
  </div>
</div>

<style>
  .tavern-atmosphere {
    margin: 5rem auto;
    max-width: 1000px;
    padding: 0 1.5rem;
  }

  .atmosphere-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    color: #d5a44c;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 10px rgba(213, 164, 76, 0.4);
    text-align: center;
  }

  .atmosphere-title-decoration {
    width: 100px;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(213, 164, 76, 0.1),
      rgba(213, 164, 76, 0.7),
      rgba(213, 164, 76, 0.1)
    );
    margin: 0 auto 3rem;
    border-radius: 2px;
  }

  .testimonials-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    .testimonials-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .testimonial {
    background: rgba(31, 27, 45, 0.6);
    padding: 2rem;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(189, 150, 72, 0.2);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .testimonial:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .quote-icon {
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 3rem;
    color: rgba(213, 164, 76, 0.3);
    font-family: serif;
    line-height: 1;
  }

  .atmosphere-quote {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.6;
    color: rgba(247, 232, 212, 0.92);
    margin: 0 0 1rem;
  }

  .quote-attribution {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: #bd9648;
    margin: 0;
  }

  .attribution-title {
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 600;
  }

  /* Tavern Oak styling */
  .tavern-song {
    margin: 3rem auto;
    padding: 0 1rem;
    text-align: center;
  }

  .song-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.4rem, 3vw, 2rem);
    color: #d5a44c;
    margin: 0;
  }

  .song-title-decoration {
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(213, 164, 76, 0.1),
      rgba(213, 164, 76, 0.7),
      rgba(213, 164, 76, 0.1)
    );
    margin: 0.75rem auto 1.5rem;
    border-radius: 2px;
  }

  .scroll-image-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .scroll-image-container:hover {
    transform: translateY(-5px);
  }

  .scroll-frame {
    position: relative;
    display: inline-block;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .tavern-song-scroll {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  .scroll-image-container:hover .tavern-song-scroll {
    transform: scale(1.02);
  }

  .view-larger-hint {
    position: absolute;
    bottom: 8px;
    right: 10px;
    background: rgba(19, 17, 28, 0.8);
    color: #f7e8d4;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    opacity: 0.85;
  }

  .song-notes {
    position: absolute;
    left: 10px;
    bottom: -10px;
    pointer-events: none;
  }

  .music-note {
    display: inline-block;
    font-size: 1.2rem;
    color: #d5a44c;
    opacity: 0.8;
    animation: float 3s infinite ease-in-out;
  }

  .music-note.delayed {
    animation-delay: 1.5s;
  }

  @keyframes float {
    0% {
      opacity: 0.75;
      transform: scale(1.02);
    }
    60% {
      opacity: 0.6;
      transform: scale(1);
    }
    100% {
      opacity: 0.8;
      transform: scale(1.03);
    }
  }
</style>
