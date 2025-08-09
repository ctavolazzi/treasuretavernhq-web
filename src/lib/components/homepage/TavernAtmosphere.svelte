<script lang="ts">
  export let scrollImgWebpSrc: string;
  export let scrollImgSrc: string;
  export let supportsWebP: boolean = true;
  export let onOpenModal: () => void;
</script>

<div class="tavern-atmosphere">
  <h2 class="atmosphere-title">Tales from Patrons</h2>
  <div class="atmosphere-title-decoration"></div>

  <div class="testimonials-container">
    <div class="testimonial">
      <div class="quote-icon">❝</div>
      <p class="atmosphere-quote">
        Lost my lucky dagger in a bet with a goblin last spring. Found it hanging above the hearth at
        Treasure Tavern three moons later. This place has a way of gathering lost treasures and
        wayward souls alike. Best mead in seven kingdoms too!
      </p>
      <p class="quote-attribution">— Durnin Axebeard, <span class="attribution-title">Dwarven Merchant</span></p>
    </div>

    <div class="testimonial">
      <div class="quote-icon">❝</div>
      <p class="atmosphere-quote">
        My songs have echoed in the halls of emperors, but nowhere do they resonate with such magic as
        within these tavern walls. The patrons here don't just listen to tales—they live them, breathe
        them, become part of them.
      </p>
      <p class="quote-attribution">— Lyra Silverstring, <span class="attribution-title">Elven Bard</span></p>
    </div>

    <div class="testimonial">
      <div class="quote-icon">❝</div>
      <p class="atmosphere-quote">
        Been traversing the Shadowlands for nigh on forty years. Only place where both the living and
        spectral feel welcome is Treasure Tavern. The keeper doesn't ask questions when you order two
        ales but drink alone.
      </p>
      <p class="quote-attribution">— Morvath the Gray, <span class="attribution-title">Spirit Walker</span></p>
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


