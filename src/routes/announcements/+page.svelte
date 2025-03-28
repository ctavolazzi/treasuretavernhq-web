<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  // Breadcrumb configuration
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'fa-home' },
    { label: 'Announcements', icon: 'fa-bullhorn' }
  ];

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

<svelte:head>
  // Rest of head content
</svelte:head>

<div class="page-container">
  <Breadcrumb items={breadcrumbItems} />

  <div class="hero">
    <div class="container">
      <h1>
        <span class="title-line title-first">Tavern</span>
        <span class="title-line title-second">Announcements</span>
      </h1>
      <p class="subtitle">
        <span class="subtitle-line">The latest news</span>
        <span class="subtitle-line">from our growing fantasy universe</span>
      </p>

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
  </div>
</div>

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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    margin: 0 0 1.5rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    padding-bottom: 1rem;
  }

  h1::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg,
      rgba(189, 150, 72, 0) 0%,
      rgba(189, 150, 72, 0.6) 50%,
      rgba(189, 150, 72, 0) 100%
    );
  }

  .title-line {
    display: block;
    text-align: center;
    width: 100%;
  }

  .title-first {
    font-size: 4.5rem;
    letter-spacing: 0.2em;
    padding-right: 0.2em;
    text-shadow: 0 0 20px rgba(231, 206, 143, 0.45);
  }

  .title-second {
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    padding-right: 0.4em;
    margin-top: 0.2rem;
    color: #e1d4c0;
  }

  .subtitle {
    font-family: 'Cinzel', serif;
    font-size: min(3.5vw, 1.4rem);
    color: #BD9648;
    margin-bottom: 3rem;
    text-align: center;
    opacity: 0.95;
    width: 80%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    position: relative;
  }

  .subtitle-line {
    display: block;
    margin-bottom: 0.3rem;
  }

  .announcements {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    width: 100%;
  }

  .announcement {
    background: rgba(20, 17, 30, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
  }

  .announcement::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #BD9648, rgba(189, 150, 72, 0.1));
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .announcement:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(189, 150, 72, 0.3);
    background: rgba(31, 27, 45, 0.6);
  }

  .announcement:hover::before {
    opacity: 1;
  }

  .announcement-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    margin-bottom: 0.5rem;
    letter-spacing: 0.03em;
  }

  .announcement-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    color: #BD9648;
    margin: 0 0 1rem;
    font-weight: 600;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
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
    margin-top: 3rem;
    padding: 0.75rem 2rem;
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
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 4px 12px rgba(122, 60, 163, 0.3);
    position: relative;
    overflow: hidden;
  }

  .back-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    transition: transform 0.6s ease;
    pointer-events: none;
  }

  .back-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(122, 60, 163, 0.4);
    background: linear-gradient(135deg, #AF71F4 0%, #8547B0 100%);
  }

  .back-button:hover::after {
    transform: rotate(30deg) translate(150%, -150%);
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
    margin-top: 1.25rem;
    padding: 0.5rem 1.25rem;
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
    transform: translateY(-2px) translateX(3px);
    box-shadow: 0 4px 12px rgba(158, 97, 227, 0.2);
  }

  @media (max-width: 768px) {
    main {
      padding: 1.5rem;
    }

    .title-first {
      font-size: 11vw;
      letter-spacing: 0.2em;
      padding-right: 0.2em;
    }

    .title-second {
      font-size: 5vw;
      letter-spacing: 0.4em;
      padding-right: 0.4em;
    }

    h1::after {
      width: 60px;
    }
  }
</style>