<script>
  import { onMount } from 'svelte';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';

  // Demo page features
  const features = [
    {
      icon: 'fa-dungeon',
      title: 'Interactive Tavern Exploration',
      description: 'Navigate through themed rooms and discover hidden secrets in our fully interactive tavern environment.'
    },
    {
      icon: 'fa-dice-d20',
      title: 'Character Creation System',
      description: 'Forge your own identity with our robust character creation tools. Choose race, class, backstory and more!'
    },
    {
      icon: 'fa-book-open',
      title: 'Quests & Stories',
      description: 'Embark on adventures ranging from simple tavern tasks to epic quests that will test your mettle.'
    },
    {
      icon: 'fa-users',
      title: 'Community Events',
      description: 'Join scheduled tournaments, seasonal festivals, and collaborative challenges with other tavern patrons.'
    }
  ];

  // Testimonial quotes from beta testers
  const testimonials = [
    { name: 'Eldrin Stormforge', quote: 'The atmosphere is so immersive, I felt like I was really sitting in a fantasy tavern!' },
    { name: 'Lyra Nightsong', quote: 'The character creation is incredible! So many options, and each choice feels meaningful.' },
    { name: 'Thordar Ironhelm', quote: 'I spent hours just exploring the tavern and finding secret passages. Can\'t wait for the full release!' }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: 'Goblin Chess Tournament',
      date: 'March 28, 2025',
      description: 'Challenge our resident goblins to chess matches with special rules. Winners receive exclusive in-game rewards.'
    },
    {
      title: 'Bardic Competition',
      date: 'April 5, 2025',
      description: 'Submit your poems, songs, or tales to be judged by our panel of famous fantasy bards.'
    },
    {
      title: 'Dragon Flight Experience',
      date: 'April 12, 2025',
      description: 'Limited spots available for our virtual dragon flight experience. Feel the wind in your hair as you soar above the realm.'
    }
  ];

  // Interactive element
  let magicWordAttempt = '';
  let hasTriedMagicWord = false;
  let magicWordSuccess = false;
  const secretMagicWord = 'enchant';

  function checkMagicWord() {
    hasTriedMagicWord = true;
    magicWordSuccess = magicWordAttempt.toLowerCase() === secretMagicWord;
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
  <title>Demo Preview - Treasure Tavern</title>
  <meta name="description" content="Preview the upcoming Treasure Tavern fantasy experience - explore features, upcoming events, and get a taste of our magical world." />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<main class="demo-container">
  <h1>Treasure Tavern Demo</h1>
  <div class="coming-soon">Opening Soon - Spring 2025</div>

  <p>
    Welcome, brave adventurer! You've stumbled upon our tavern a bit early - we're still polishing the mugs
    and training the griffins. Soon, these doors will open to a world of fantasy adventure, camaraderie, and magic.
  </p>

  <p>
    <strong>The Treasure Tavern</strong> will be a fully interactive fantasy experience where you can create your own
    character, join quests, collect magical items, and become part of our growing community of adventurers.
  </p>

  <h2>Features Coming to Our Tavern</h2>
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

  <h2>What Our Beta Testers Say</h2>
  <div class="testimonials">
    {#each testimonials as testimonial}
      <div class="testimonial-card">
        <p class="testimonial-quote">{testimonial.quote}</p>
        <p class="testimonial-author">— {testimonial.name}</p>
      </div>
    {/each}
  </div>

  <h2>Try Your Hand at Magic</h2>
  <div class="interactive-section">
    <p>
      The tavern is imbued with ancient magic. Speak the correct enchantment word below
      to reveal a hidden surprise.
    </p>

    <form class="magic-word-form" on:submit|preventDefault={checkMagicWord}>
      <input
        type="text"
        class="magic-input"
        bind:value={magicWordAttempt}
        placeholder="Speak the magic word..."
        autocomplete="off"
      />
      <button type="submit" class="magic-button">Cast Spell</button>
    </form>

    <div class="magic-result">
      {#if hasTriedMagicWord}
        {#if magicWordSuccess}
          <p class="magic-success">
            ✨ The air shimmers around you as your spell takes effect! ✨<br>
            You have been granted early access to our newsletter signup. Check your email soon!
          </p>
        {:else}
          <p class="magic-failure">
            Your spell fizzles out. Perhaps try another word?
          </p>
        {/if}
      {/if}
    </div>

    {#if hasTriedMagicWord && !magicWordSuccess}
      <p class="hint">Hint: This word means "to cast a spell upon" or "to fill with delight."</p>
    {/if}
  </div>

  {#if showParticles}
    <div class="particles">
      <!-- Particles would be rendered here with a proper particle library -->
    </div>
  {/if}

  <h2>Upcoming Virtual Events</h2>
  <p>
    Even before our full launch, we'll be hosting special events for our community.
    Here's a glimpse of what's coming:
  </p>

  <div class="events-list">
    {#each upcomingEvents as event}
      <div class="event-card">
        <div class="event-date">{event.date}</div>
        <h3 class="event-title">{event.title}</h3>
        <p class="event-description">{event.description}</p>
      </div>
    {/each}
  </div>

  <div class="newsletter-preview">
    <h3>From Our Latest Chronicle</h3>
    <div class="preview-image">
      <!-- Placeholder for a newsletter preview image -->
      <img src="https://placehold.co/800x400/2B1D34/F7E8D4?text=March+Chronicle+Preview" alt="Newsletter Preview" width="800" height="400" />
    </div>
    <p>
      Each month, our tavern scribes compile the most exciting tales, useful adventuring tips, and exclusive offers
      into our Tavern Chronicles. Join our mailing list to never miss an issue.
    </p>
  </div>

  <div class="divider"></div>

  <AnnouncementCta
    title="Join Our Fellowship of Adventurers"
    description="Be among the first to receive your invitation when our doors open. Early members will receive exclusive in-game rewards and special access to limited-time events."
    buttonText="Reserve Your Spot Now"
    demoLink="/"
  />

  <a href="/" class="back-link">← Return to the Tavern</a>
</main>