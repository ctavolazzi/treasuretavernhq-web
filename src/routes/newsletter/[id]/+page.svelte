<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Define newsletter ID type
  type NewsletterID = 'january-2025' | 'february-2025' | 'march-2025';

  // Extract the newsletter ID from the URL
  const id = $page.params.id as NewsletterID;

  // Interface for a newsletter
  interface Newsletter {
    title: string;
    date: string;
    content: string;
  }

  // Newsletter data - in a real app, this would be fetched from a database or API
  const newsletters: Record<NewsletterID, Newsletter> = {
    'january-2025': {
      title: 'January 2025: New Year Adventures',
      date: 'January 1, 2025',
      content: `
        <h2>Embark on New Year Adventures</h2>

        <p>Welcome to the first Tavern Chronicles of 2025! As the winter snow blankets the lands, we gather by the hearth to share tales of adventure and plan our quests for the coming year.</p>

        <h3>New Year's Resolutions for Every Adventurer</h3>

        <p>The turning of the year is the perfect time to set new goals for your heroic journey. Consider these resolutions that every adventurer should contemplate:</p>

        <p>- Master a new weapon or spell school</p>
        <p>- Forge an alliance with a previously hostile faction</p>
        <p>- Explore that mysterious dungeon you've been avoiding</p>
        <p>- Commission a bard to immortalize your greatest deed</p>

        <h3>The Frost Queen's Challenge</h3>

        <p>Legend speaks of the Frost Queen's Challenge, a trial that appears only in the first moon of each year. Those brave enough to seek out her ice palace in the Northern Wastes may earn her favor—and magical items that harness the power of winter itself.</p>

        <h3>January Special: Adventurer's Journal</h3>

        <p>Begin your year right with our leather-bound Adventurer's Journal, complete with sections for quest tracking, treasure inventories, and NPC relationships. Use code <strong>NEWQUEST</strong> for 20% off your purchase!</p>

        <p>May your year be filled with successful quests and legendary tales!</p>
      `
    },
    'february-2025': {
      title: 'February 2025: Tales of Romance',
      date: 'February 1, 2025',
      content: `
        <h2>Love and Magic in the Realms</h2>

        <p>Greetings, brave hearts! February brings with it tales of love that transcend time and magic that binds souls together. This month, we explore the romantic legends that inspire bards across the realms.</p>

        <h3>Legendary Romances</h3>

        <p>Throughout history, love has driven heroes to accomplish impossible feats. The ranger Alastair who transformed himself into a dragon to rescue his beloved from the Obsidian Tower. The sorceress Elindra who cast herself into stone to protect her village—only to be awakened centuries later by a kiss from a wandering healer who saw beauty in the statue. These tales remind us that love is perhaps the strongest magic of all.</p>

        <h3>Enchanted Items for Lovers</h3>

        <p>The Paired Pendants of Heartspeak allow wearers to sense each other's emotions across any distance. The Rose of Eternal Devotion never wilts so long as the giver's love remains true. The Goblet of Shared Fates ensures that when one drinks, both taste the sweetness—and both share the consequences of poison.</p>

        <h3>Valentine's Day Campaign Hook</h3>

        <p>For Dungeon Masters: Try this adventure hook for your February sessions. A local village celebrates Valentine's Day by hanging enchanted lanterns that reveal one's true love. This year, however, all the lanterns show the same mysterious figure, and those who gaze too long find themselves entranced and wandering toward the ancient forest...</p>

        <p>Until our next meeting, may your heart find adventure and your adventures feed your heart!</p>
      `
    },
    'march-2025': {
      title: 'March 2025: Dungeon Master Tips',
      date: 'March 1, 2025',
      content: `
        <h2>Mastering the Art of Storytelling</h2>

        <p>Welcome to our special Dungeon Master edition! This month, we've gathered wisdom from legendary Game Masters across the realms to help you create unforgettable adventures for your players.</p>

        <h3>Creating Memorable NPCs</h3>

        <p>The secret to memorable NPCs isn't complex backstories—it's distinctive traits and clear motivations. Give each important character one unique physical characteristic, one behavioral quirk, and one driving goal. This simple formula creates characters players will remember long after the session ends.</p>

        <p><em>"I always give my villain NPCs something relatable or even admirable. A ruthless warlord who always keeps his promises, or a necromancer who's trying to resurrect her lost child. It makes players pause rather than simply attacking."</em> — Thaddeus the Wise, 30-year DM</p>

        <h3>Dynamic Combat Encounters</h3>

        <p>Transform static battles into dynamic challenges by adding environmental elements players can interact with. Chandeliers that can be dropped on enemies, magical fountains with unpredictable effects, or shifting terrain that changes every few rounds keeps combat fresh and encourages creative problem-solving.</p>

        <h3>Exclusive: Downloadable Encounter Builder</h3>

        <p>We've created a special encounter-building tool that helps you balance combat difficulty while incorporating interactive elements. Available now in our members' section!</p>

        <p>May your dice roll true and your tales inspire wonder!</p>
      `
    }
  };

  // Get the specific newsletter
  const newsletter = newsletters[id];

  let notFound = false;
  let canShare = false;

  // Function to share the newsletter
  function shareNewsletter() {
    if (navigator.share) {
      navigator
        .share({
          title: newsletter.title,
          text: `Check out this newsletter from Treasure Tavern: ${newsletter.title}`,
          url: window.location.href
        })
        .catch(error => console.error('Error sharing:', error));
    }
  }

  onMount(() => {
    // Check if the newsletter exists
    if (!newsletter) {
      notFound = true;
    }

    // Check if the Web Share API is available
    canShare = !!navigator.share;
  });
</script>

<svelte:head>
  <title>{newsletter ? newsletter.title : 'Newsletter Not Found'} - Treasure Tavern</title>
  <meta
    name="description"
    content={newsletter
      ? `Read ${newsletter.title} from Treasure Tavern's fantasy newsletter archive.`
      : 'Newsletter archive from Treasure Tavern'}
  />
</svelte:head>

<div class="newsletter-page">
  <div class="header-actions">
    <a href="/newsletter" class="back-link">
      <i class="fas fa-arrow-left"></i> Back to Tavern Chronicles
    </a>

    {#if canShare && newsletter}
      <button class="share-button" on:click={shareNewsletter}>
        <i class="fas fa-share-alt"></i> Share
      </button>
    {/if}
  </div>

  {#if notFound}
    <div class="not-found">
      <h2>Newsletter Not Found</h2>
      <p>We couldn't find the newsletter you're looking for. It may have been moved or deleted.</p>
      <a href="/newsletter" class="subscribe-button">View All Newsletters</a>
    </div>
  {:else if newsletter}
    <header class="newsletter-header">
      <h1 class="newsletter-title">{newsletter.title}</h1>
      <p class="newsletter-date">{newsletter.date}</p>
    </header>

    <div class="newsletter-content">
      {@html newsletter.content}
    </div>

    <div class="subscribe-cta">
      <h3>Want More Tavern Chronicles?</h3>
      <p>
        Don't miss future editions! Subscribe now to get our next chronicle <strong
          >"April 2025: Coming Soon"</strong
        > delivered straight to your inbox as soon as it's released.
      </p>
      <div class="cta-benefits">
        <div class="benefit-item">
          <i class="fas fa-scroll"></i>
          <span>First access to new Chronicles</span>
        </div>
        <div class="benefit-item">
          <i class="fas fa-gem"></i>
          <span>Exclusive subscriber-only content</span>
        </div>
        <div class="benefit-item">
          <i class="fas fa-hat-wizard"></i>
          <span>Special offers on magical items</span>
        </div>
      </div>
      <div class="cta-buttons">
        <a href="/newsletter#hero-section" class="subscribe-button">Subscribe Now</a>
        <a href="/demo" class="demo-button">Try Free Demo</a>
      </div>
    </div>
  {/if}
</div>

<style>
  .newsletter-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .back-link {
    color: #bd9648;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .share-button {
    background: none;
    border: none;
    color: #bd9648;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .share-button:hover {
    text-decoration: underline;
  }

  .not-found {
    text-align: center;
    padding: 4rem 0;
  }

  .newsletter-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .newsletter-title {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    margin-bottom: 1rem;
  }

  .newsletter-date {
    color: #666;
    font-style: italic;
  }

  .newsletter-content {
    line-height: 1.6;
    margin-bottom: 4rem;
  }

  .newsletter-content p {
    margin-bottom: 1.5rem;
  }

  .newsletter-content strong {
    color: #bd9648;
  }

  .newsletter-content em {
    color: #666;
  }

  .subscribe-cta {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }

  .cta-benefits {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .benefit-item i {
    color: #bd9648;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .subscribe-button,
  .demo-button {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
  }

  .subscribe-button {
    background: #bd9648;
    color: white;
  }

  .demo-button {
    background: white;
    color: #bd9648;
    border: 2px solid #bd9648;
  }

  .subscribe-button:hover,
  .demo-button:hover {
    opacity: 0.9;
  }
</style>
