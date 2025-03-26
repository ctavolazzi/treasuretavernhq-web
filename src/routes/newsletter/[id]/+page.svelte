<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Extract the newsletter ID from the URL
  const id = $page.params.id;

  // Newsletter data - in a real app, this would be fetched from a database or API
  const newsletters = {
    '2025-05': {
      title: 'May 2025: The Hidden Treasures',
      date: 'May 1, 2025',
      content: `
        <h2>The Hidden Treasures of the Eastern Realms</h2>

        <p>Welcome, adventurers, to our May edition of the Treasure Tavern newsletter! This month, we're exploring the mythical artifacts of the Eastern Realms, a land shrouded in mystery and magic.</p>

        <h3>The Crystal of Eternal Twilight</h3>

        <p>Deep within the Whispering Mountains lies a crystal that captures the essence of twilight. It's said that gazing into its depths reveals visions of possible futures, but only for those pure of heart. According to legend, the crystal was created when the first rays of moonlight touched the tears of a dying phoenix.</p>

        <h3>The Scrolls of Forgotten Wisdom</h3>

        <p>These ancient scrolls contain spells and knowledge from a civilization that vanished thousands of years ago. Written in a language that changes depending on who reads them, the scrolls adapt to show the reader exactly what they need to learn—though not always what they want to know.</p>

        <h3>Special Offer: Eastern Realms Map Collection</h3>

        <p>For this month only, we're offering a limited edition set of maps detailing the Eastern Realms, complete with notes from famous explorers and hints about where these treasures might be found. Use code <strong>EASTERN25</strong> at checkout for 25% off!</p>

        <p>Until next month, may your quests be fruitful and your stories legendary.</p>
      `
    },
    '2025-04': {
      title: 'April 2025: Spring Festival Special',
      date: 'April 1, 2025',
      content: `
        <h2>Celebrating the Bloom Festival</h2>

        <p>Greetings, fellow adventurers! As nature awakens from its slumber, we at Treasure Tavern are excited to share the traditions and secrets of the Spring Bloom Festival.</p>

        <h3>The Origin of the Bloom Festival</h3>

        <p>The Spring Bloom Festival dates back to the Second Age, when a terrible curse had blanketed the land in eternal winter. It was only through the sacrifice of the elven princess Elowen, who gave her life to awaken the ancient forest spirits, that spring returned to the realm. Each year, we celebrate her gift by planting new life and sharing stories of renewal.</p>

        <h3>Bloom Festival Traditions You Can Try</h3>

        <p>Create a "wish garden" by planting seeds while focusing on your hopes for the coming year. The blooms that emerge are said to reflect the likelihood of your wishes coming true.</p>

        <p>Craft a crown of spring flowers to honor Princess Elowen. Those who wear such crowns at midnight on the festival's final day sometimes report dreams of guidance from the princess herself.</p>

        <h3>Limited Time: Bloom Festival Game Expansion</h3>

        <p>We've created a special Bloom Festival expansion for your tabletop campaigns, complete with festival-themed quests, magical spring items, and unique NPCs to encounter. Download it now from our members' area at no cost!</p>

        <p>May your spring be filled with adventure and new beginnings!</p>
      `
    },
    '2025-03': {
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

  onMount(() => {
    // Check if the newsletter exists
    if (!newsletter) {
      notFound = true;
    }
  });
</script>

<style>
  .newsletter-page {
    max-width: 800px;
    margin: 2rem auto 4rem;
    padding: 0 1.5rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #BD9648;
    text-decoration: none;
    font-family: 'Cinzel', serif;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
  }

  .back-link:hover {
    color: #d8b05c;
  }

  .newsletter-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(189, 150, 72, 0.3);
    padding-bottom: 1rem;
  }

  .newsletter-title {
    font-family: 'Cinzel Decorative', fantasy;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: #F7E8D4;
    margin: 0 0 0.5rem;
    line-height: 1.2;
  }

  .newsletter-date {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.7);
    margin: 0;
  }

  .newsletter-content {
    font-family: 'Spectral', serif;
    line-height: 1.6;
    color: rgba(247, 232, 212, 0.9);
  }

  .newsletter-content h2 {
    font-family: 'Cinzel', serif;
    color: #BD9648;
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }

  .newsletter-content h3 {
    font-family: 'Cinzel', serif;
    color: #BD9648;
    font-size: 1.4rem;
    margin: 1.5rem 0 0.75rem;
  }

  .newsletter-content p {
    margin: 0 0 1.25rem;
  }

  .newsletter-content strong {
    color: #BD9648;
    font-weight: 600;
  }

  .newsletter-content em {
    font-style: italic;
  }

  .not-found {
    text-align: center;
    padding: 3rem 0;
  }

  .not-found h2 {
    font-family: 'Cinzel', serif;
    color: #BD9648;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .not-found p {
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.9);
    margin-bottom: 2rem;
  }

  .subscribe-cta {
    margin-top: 3rem;
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(189, 150, 72, 0.2);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
  }

  .subscribe-cta h3 {
    font-family: 'Cinzel', serif;
    color: #BD9648;
    font-size: 1.4rem;
    margin: 0 0 1rem;
  }

  .subscribe-cta p {
    margin: 0 0 1.5rem;
  }

  .subscribe-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    text-decoration: none;
    font-family: 'Cinzel', serif;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .subscribe-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #A671E6 0%, #8A4CB3 100%);
  }

  @media (max-width: 768px) {
    .newsletter-page {
      margin: 1.5rem auto 3rem;
      padding: 0 1rem;
    }
  }
</style>

<svelte:head>
  <title>{newsletter ? newsletter.title : 'Newsletter Not Found'} - Treasure Tavern</title>
  <meta name="description" content="{newsletter ? `Read ${newsletter.title} from Treasure Tavern's fantasy newsletter archive.` : 'Newsletter archive from Treasure Tavern'}" />
</svelte:head>

<div class="newsletter-page">
  <a href="/newsletter" class="back-link">
    <i class="fas fa-arrow-left"></i> Back to Newsletters
  </a>

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
      <h3>Enjoying Our Newsletter?</h3>
      <p>Don't miss future editions! Subscribe now to receive magical content directly in your inbox.</p>
      <a href="/newsletter" class="subscribe-button">Subscribe Now</a>
    </div>
  {/if}
</div>
