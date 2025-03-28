<script>
  import { onMount } from 'svelte';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';

  // Demo page features
  const features = [
    {
      icon: 'fa-dungeon',
      title: 'Mystical Tavern Spaces',
      description: 'Whispers speak of hidden chambers and secret passages within these ancient walls, awaiting those with keen eyes and curious minds.'
    },
    {
      icon: 'fa-dice-d20',
      title: 'Weave Your Destiny',
      description: 'The threads of fate lie before you, ready to be woven into a tapestry uniquely your own. What tale will you tell?'
    },
    {
      icon: 'fa-book-open',
      title: 'Tales Untold',
      description: 'Legends and lore abound within these walls, some recorded in ancient tomes, others waiting to be discovered or perhaps... created.'
    },
    {
      icon: 'fa-users',
      title: 'Fellowship of the Brave',
      description: 'No hero walks alone in this realm. Find kindred spirits around the hearth, sharing tales of glory and woe alike.'
    }
  ];

  // Testimonial quotes from tavern patrons
  const testimonials = [
    { name: 'A Shadow in the Corner', quote: 'The air here feels thick with possibilities... and perhaps something more arcane.' },
    { name: 'Cloaked Visitor', quote: 'I\'ve glimpsed what awaits beyond the veil. Words fail to capture its essence.' },
    { name: 'Tavern Regular', quote: 'Each time I return, something has changed. Or perhaps, I am the one who is different.' }
  ];

  // Tavern rumors
  const upcomingEvents = [
    {
      slug: 'whispers-of-the-goblin-court',
      title: 'Whispers of the Goblin Court',
      date: 'When the moon wanes next',
      description: 'Strange chittering echoes from the cellar. The barmaid mentions chess pieces moving of their own accord after midnight.'
    },
    {
      slug: 'ballad-of-the-wandering-knight',
      title: 'Ballad of the Wandering Knight',
      date: 'When the stars align',
      description: 'The old bard in the corner speaks of a competition where words become reality, and the best tale might reshape the very walls of the tavern.'
    },
    {
      slug: 'twilight-of-the-forest-guardians',
      title: 'Twilight of the Forest Guardians',
      date: 'When morning mists part',
      description: 'Travelers claim to have seen great winged shapes against the dawn sky. The innkeeper neither confirms nor denies such sightings.'
    }
  ];

  // Interactive element
  let magicWordAttempt = '';
  let hasTriedMagicWord = false;
  let magicWordSuccess = false;
  const validMagicWords = ['abracadabra', 'open sesame'];

  function checkMagicWord() {
    hasTriedMagicWord = true;
    magicWordSuccess = validMagicWords.includes(magicWordAttempt.toLowerCase());
  }

  // For particle effect on magic success
  let showParticles = false;

  onMount(() => {
    // Any initialization can go here
  });

  $: if (magicWordSuccess && !showParticles) {
    showParticles = true;
    setTimeout(() => { showParticles = false; }, 3000);
  }
</script>

<style>
  .demo-container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    font-family: 'Cinzel Decorative', Georgia, serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: #BD9648;
    margin: 3rem 0 1.5rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  h3 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    color: #BD9648;
    margin: 0 0 1rem;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  .coming-soon {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: #BD9648;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    line-height: 1.5;
    color: rgba(247, 232, 212, 0.92);
    font-family: 'Spectral', Georgia, serif;
    max-width: 680px;
    margin: 0 auto 1.5rem;
  }

  .back-link {
    margin-top: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
    color: #9E61E3;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(158, 97, 227, 0.4);
    border-radius: 6px;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .back-link:hover {
    background-color: rgba(158, 97, 227, 0.1);
    border-color: rgba(158, 97, 227, 0.6);
    transform: translateY(-2px);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;
  }

  .feature-card {
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .feature-icon {
    font-size: 2.5rem;
    color: #9E61E3;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-family: 'Cinzel', serif;
    font-size: 1.3rem;
    color: #BD9648;
    margin-bottom: 0.75rem;
  }

  .feature-description {
    font-size: 1rem;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.5;
  }

  .testimonials {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 900px;
    margin: 2rem auto;
  }

  .testimonial-card {
    background: rgba(20, 17, 30, 0.4);
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

  .testimonial-quote {
    font-style: italic;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
    font-size: 1.1rem;
    color: rgba(247, 232, 212, 0.9);
  }

  .testimonial-author {
    font-weight: 600;
    color: #BD9648;
    font-family: 'Inter', system-ui, sans-serif;
    text-align: right;
  }

  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 900px;
    margin: 2rem auto;
  }

  .event-card {
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    padding: 1.25rem;
    border: 1px solid rgba(247, 232, 212, 0.1);
    display: flex;
    flex-direction: column;
    text-align: left;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .event-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
    background: rgba(31, 27, 45, 0.8);
  }

  .event-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    margin-bottom: 0.25rem;
  }

  .event-title {
    font-family: 'Cinzel', serif;
    font-size: 1.25rem;
    color: #BD9648;
    margin-bottom: 0.5rem;
  }

  .event-description {
    font-size: 1rem;
    color: rgba(247, 232, 212, 0.85);
  }

  .interactive-section {
    background: rgba(20, 17, 30, 0.5);
    border-radius: 12px;
    padding: 2rem;
    margin: 3rem auto;
    max-width: 800px;
    width: 100%;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .magic-word-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .magic-input {
    padding: 0.85rem 1rem;
    width: 100%;
    max-width: 400px;
    border-radius: 6px;
    background: rgba(19, 17, 28, 0.6);
    border: 1px solid rgba(247, 232, 212, 0.25);
    color: #F7E8D4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1.1rem;
    text-align: center;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
  }

  .magic-input:focus {
    outline: none;
    border-color: rgba(158, 97, 227, 0.6);
    box-shadow: 0 0 15px rgba(158, 97, 227, 0.3);
  }

  .magic-button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border: none;
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .magic-button:hover {
    background: linear-gradient(135deg, #AF71F4 0%, #8A4CB3 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .magic-result {
    margin-top: 1rem;
    min-height: 3rem;
    font-size: 1.1rem;
  }

  .magic-success {
    color: #6ee7b7;
    position: relative;
  }

  .magic-failure {
    color: #fca5a5;
  }

  .particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
  }

  .divider {
    width: 100%;
    max-width: 600px;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0) 0%, rgba(189, 150, 72, 0.6) 50%, rgba(189, 150, 72, 0) 100%);
    margin: 4rem auto;
  }

  .hint {
    font-size: 0.95rem;
    color: rgba(158, 97, 227, 0.8);
    margin-top: 1.5rem;
    font-style: italic;
  }

  .newsletter-preview {
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .preview-image {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(247, 232, 212, 0.2);
  }

  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
    }

    .interactive-section {
      padding: 1.5rem;
    }
  }
</style>

<svelte:head>
  <title>The Threshold - Treasure Tavern</title>
  <meta name="description" content="The Treasure Tavern stands between worlds, its doors not yet open. Leave your mark and perhaps the tavern will remember you when the time comes." />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<main class="demo-container">
  <h1>Treasure Tavern</h1>
  <div class="coming-soon">The Doors Are Yet to Open</div>

  <p>
    Hail, wanderer. You've found your way to our threshold earlier than fate intended. Beyond these doors lies
    a realm of mysteries still taking shape in the mists of creation.
  </p>

  <div style="margin: 1.5rem auto;">
    <a href="/#lantern" class="magic-button" style="display: inline-flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-envelope"></i>
      Light the Lantern
    </a>
  </div>

  <p>
    <strong>The Treasure Tavern</strong> exists between realms, a gathering place for those who seek wonder,
    adventure, and the fellowship of kindred spirits. The hearth fire is being stoked, and ancient spells of
    welcome are being woven into the very foundations.
  </p>

  <h2>Whispers of What Awaits</h2>
  <div class="features-grid">
    {#each features as feature}
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas {feature.icon}"></i>
        </div>
        <h3 class="feature-title">{feature.title}</h3>
        <p class="feature-description">{feature.description}</p>
      </div>
    {/each}
  </div>

  <h2>What Our Tavern Patrons Say</h2>
  <div class="testimonials">
    {#each testimonials as testimonial}
      <div class="testimonial-card">
        <p class="testimonial-quote">{testimonial.quote}</p>
        <p class="testimonial-author">— {testimonial.name}</p>
      </div>
    {/each}
  </div>

  <h2>A Test of Arcane Knowledge</h2>
  <div class="interactive-section">
    <p>
      Ancient runes flicker across the tavern doors. Perhaps they respond to certain words of power?
      Whisper an enchantment and see if the tavern recognizes you as one of its own.
    </p>

    <form class="magic-word-form" on:submit|preventDefault={checkMagicWord}>
      <input
        type="text"
        class="magic-input"
        bind:value={magicWordAttempt}
        placeholder="Speak a word of power..."
        autocomplete="off"
      />
      <button type="submit" class="magic-button">Whisper</button>
    </form>

    <div class="magic-result">
      {#if hasTriedMagicWord}
        {#if magicWordSuccess}
          <p class="magic-success">
            ✨ The runes flicker and glow with recognition... ✨<br>
            Something stirs in the shadows. The tavern has marked your passing.
          </p>
        {:else}
          <p class="magic-failure">
            The runes remain dormant. Perhaps another word will awaken them?
          </p>
        {/if}
      {/if}
    </div>

    {#if hasTriedMagicWord && !magicWordSuccess}
      <p class="hint">Hint: Try classic magical phrases from ancient tales, words that might open doors or create wonders.</p>
    {/if}
  </div>

  {#if showParticles}
    <div class="particles">
      <!-- Particles would be rendered here with a proper particle library -->
    </div>
  {/if}

  <h2>Tales Whispered at the Bar</h2>
  <p>
    The shadows in the corners of the tavern seem to shift and murmur. Fragments of conversations
    drift through the air, tales of things that may come to pass:
  </p>

  <div class="events-list">
    {#each upcomingEvents as event}
      <a href={`/tavern-tales/${event.slug}`} class="event-card">
        <div class="event-date">{event.date}</div>
        <h3 class="event-title">{event.title}</h3>
        <p class="event-description">{event.description}</p>
      </a>
    {/each}
  </div>

  <div class="explore-more" style="margin-top: 1.5rem; text-align: center;">
    <a href="/tavern-tales" class="magic-button">
      <i class="fas fa-book-open" style="margin-right: 0.5rem;"></i>
      Explore All Chronicles
    </a>
  </div>

  <div class="newsletter-preview">
    <h3>Echoes from the Chronicles</h3>
    <div class="preview-image">
      <!-- Placeholder for a newsletter preview image -->
      <img src="https://placehold.co/800x400/2B1D34/F7E8D4?text=Tavern+Chronicles" alt="Chronicles Preview" width="800" height="400" />
    </div>
    <p>
      The Tavern keeps its own records, tales of heroes and monsters, secrets and revelations.
      Those who have earned the tavern's trust may find such Chronicles delivered by mysterious means.
    </p>
  </div>

  <div class="divider"></div>

  <AnnouncementCta
    title="Leave Your Mark Upon the Threshold"
    description="Those who light the lantern may be remembered when the tavern's doors finally creak open. Perhaps a message might find its way to you."
    buttonText="Light the Lantern"
    demoLink="/#lantern"
  />

  <a href="/" class="back-link">← Return to the Tavern</a>
</main>