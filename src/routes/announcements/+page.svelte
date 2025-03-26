<script>
  import { onMount } from 'svelte';

  // Sample announcements data - in a real app, this would come from a database or API
  const announcements = [
    {
      id: 1,
      slug: "goblin-infestation-cleanup",
      date: "March 10, 2025",
      title: "Goblin Infestation Cleanup Complete",
      content: "After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware."
    },
    {
      id: 2,
      slug: "machine-elves-strike-resolved",
      date: "March 15, 2025",
      title: "Machine Elves Strike Resolved",
      content: "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality."
    },
    {
      id: 3,
      slug: "dragon-mating-season",
      date: "March 22, 2025",
      title: "Warning: Dragon Mating Season",
      content: "Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check."
    }
  ];
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #13111C 0%, #1F1B2D 60%, #2B1D34 100%);
    color: #F7E8D4;
    overflow-x: hidden;
    line-height: 1.4;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 100%;
    position: relative;
  }

  .container {
    max-width: 800px;
    width: 100%;
    z-index: 2;
    position: relative;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    margin: 0 0 1.5rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    letter-spacing: 0.02em;
    text-align: center;
  }

  .subtitle {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: #BD9648;
    margin-bottom: 2rem;
    text-align: center;
    opacity: 0.95;
  }

  .announcements {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .announcement {
    background: rgba(20, 17, 30, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .announcement:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .announcement-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    margin-bottom: 0.5rem;
  }

  .announcement-title {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    color: #BD9648;
    margin: 0 0 1rem;
    font-weight: 600;
  }

  .announcement-content {
    font-family: 'Spectral', serif;
    font-size: 1.1rem;
    color: rgba(247, 232, 212, 0.92);
    margin: 0;
    line-height: 1.6;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 0;
    font-family: 'Spectral', serif;
    font-size: 1.2rem;
  }

  .back-button {
    margin-top: 2rem;
    align-self: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 12px rgba(122, 60, 163, 0.3);
  }

  .back-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(122, 60, 163, 0.4);
    background: linear-gradient(135deg, #AF71F4 0%, #8547B0 100%);
  }

  .announcement-link {
    text-decoration: none;
    color: #BD9648;
    transition: color 0.3s ease;
  }

  .announcement-link:hover {
    color: #d8b05c;
    text-decoration: underline;
  }

  .read-more-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(158, 97, 227, 0.15);
    border: 1px solid rgba(158, 97, 227, 0.3);
    border-radius: 4px;
    color: #9E61E3;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .read-more-button:hover {
    background: rgba(158, 97, 227, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    main {
      padding: 1.5rem;
    }
  }
</style>

<main>
  <div class="container">
    <h1>Tavern Announcements</h1>
    <p class="subtitle">The latest news from our growing fantasy universe</p>

    <div class="announcements">
      {#if announcements.length > 0}
        {#each announcements as announcement (announcement.id)}
          <div class="announcement">
            <div class="announcement-date">{announcement.date}</div>
            <h2 class="announcement-title">
              <a href="/announcements/{announcement.slug}" class="announcement-link">{announcement.title}</a>
            </h2>
            <p class="announcement-content">{announcement.content.slice(0, 180)}...</p>
            <a href="/announcements/{announcement.slug}" class="read-more-button">Read Full Announcement</a>
          </div>
        {/each}
      {:else}
        <div class="empty-state">
          <p>No announcements yet, but the tavern keeper will have news soon!</p>
        </div>
      {/if}
    </div>

    <a href="/" class="back-button">Return to Tavern</a>
  </div>
</main>