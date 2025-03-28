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
      category: "Event",
      content: "After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware."
    },
    {
      id: 2,
      slug: "machine-elves-strike-resolved",
      date: "March 15, 2025",
      title: "Machine Elves Strike Resolved",
      category: "News",
      content: "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality."
    },
    {
      id: 3,
      slug: "dragon-mating-season",
      date: "March 22, 2025",
      title: "Warning: Dragon Mating Season",
      category: "Alert",
      content: "Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check."
    },
    {
      id: 4,
      slug: "bardic-competition",
      date: "April 5, 2025",
      title: "Annual Bardic Competition",
      category: "Event",
      content: "Calling all bards, minstrels, and musical enthusiasts! The annual Bardic Competition will be held in the Great Hall next month. Categories include traditional ballads, magical music, instrumental innovation, and comedy. Grand prize is a masterwork instrument crafted by the legendary luthier Harmonius Strings."
    },
    {
      id: 5,
      slug: "menu-expansion",
      date: "April 8, 2025",
      title: "New Spring Menu Items",
      category: "News",
      content: "Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new Fey-Touched Mushroom Stew, Unicorn Tear Tea, or the popular Phoenix Egg Benedict. Available for a limited time while magical ingredients last."
    },
    {
      id: 6,
      slug: "wizard-tower-renovation",
      date: "April 12, 2025",
      title: "Wizard Tower Renovation Complete",
      category: "News",
      content: "We're pleased to announce the completion of renovations to our Wizard Tower accommodations. New features include anti-gravity bathrooms, rooms that are bigger on the inside, windows with views of different dimensions, and self-maintaining fireplaces that adjust to your preferred temperature."
    },
    {
      id: 7,
      slug: "ghost-hunting-expedition",
      date: "April 18, 2025",
      title: "Ghost Hunting Expedition",
      category: "Event",
      content: "Join renowned spiritualist Madame Etherea for a midnight ghost hunting expedition through the ancient chambers beneath the tavern. Equipment provided. Participants must sign a waiver acknowledging the risks of spectral possession, temporal displacement, and existential dread."
    },
    {
      id: 8,
      slug: "potion-tasting-event",
      date: "April 24, 2025",
      title: "Magical Potion Tasting Event",
      category: "Event",
      content: "Master Alchemist Bubblebroth is hosting a magical potion tasting in our garden terrace. Sample exotic elixirs from across the realms, including mood-enhancing tonics, temporary transformation drafts, and Bubblebroth's famous 'Liquid Luck' concoction. Antidotes will be available."
    },
    {
      id: 9,
      slug: "kitchen-imp-infestation",
      date: "May 1, 2025",
      title: "Kitchen Imp Infestation Alert",
      category: "Alert",
      content: "Please be advised that we're experiencing a minor infestation of kitchen imps following a misfired summoning spell. These small, mischievous creatures may attempt to steal food from plates or replace salt with sugar. Our magical pest control team is working to resolve the issue."
    },
    {
      id: 10,
      slug: "enchanted-forest-expedition",
      date: "May 8, 2025",
      title: "Enchanted Forest Expedition",
      category: "Event",
      content: "Join our guided tour of the nearby Enchanted Forest led by renowned druid Oakhart. Learn about magical flora and fauna, witness rare fey creatures in their natural habitat, and harvest ingredients for potions (with proper permits). Protective charms included in tour price."
    }
  ];

  // Define available categories
  const categories = ["All", "Event", "News", "Alert"];

  // Initialize with all announcements visible
  let selectedCategory = "All";
  let searchQuery = "";
  let filteredAnnouncements = [...announcements];

  // Pagination settings
  const announcementsPerPage = 4;
  let currentPage = 1;
  let totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
  let paginatedAnnouncements: typeof announcements = [];

  // Filter announcements based on category and search
  $: {
    filteredAnnouncements = announcements.filter(announcement => {
      const matchesCategory = selectedCategory === "All" || announcement.category === selectedCategory;
      const matchesSearch = searchQuery === "" ||
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    // Reset to first page when filters change
    currentPage = 1;
    totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
    updatePaginatedAnnouncements();
  }

  // Update the paginated announcements when page or filters change
  $: {
    updatePaginatedAnnouncements();
  }

  // Function to paginate announcements
  function updatePaginatedAnnouncements() {
    const startIndex = (currentPage - 1) * announcementsPerPage;
    const endIndex = startIndex + announcementsPerPage;
    paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);
  }

  // Function to handle category selection
  function selectCategory(category: string) {
    selectedCategory = category;
  }

  // Pagination functions
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }

  // Generate array of page numbers for pagination
  $: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<svelte:head>
  <title>Announcements - Treasure Tavern</title>
  <meta name="description" content="The latest news and announcements from Treasure Tavern" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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

      <div class="controls">
        <div class="categories">
          {#each categories as category}
            <button
              class="category-button {selectedCategory === category ? 'selected' : ''}"
              on:click={() => selectCategory(category)}
            >
              {category}
              {#if category === "Alert"}
                <i class="fas fa-exclamation-triangle"></i>
              {:else if category === "Event"}
                <i class="fas fa-calendar-alt"></i>
              {:else if category === "News"}
                <i class="fas fa-newspaper"></i>
              {/if}
            </button>
          {/each}
        </div>

        <div class="search-container">
          <input
            type="text"
            placeholder="Search announcements..."
            bind:value={searchQuery}
            class="search-input"
          />
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>

      <div class="announcements">
        {#if filteredAnnouncements.length > 0}
          {#each paginatedAnnouncements as announcement (announcement.id)}
            <div class="announcement">
              <div class="announcement-meta">
                <div class="announcement-date">{announcement.date}</div>
                <div class="announcement-category {announcement.category.toLowerCase()}">
                  {announcement.category}
                </div>
              </div>
              <h2 class="announcement-title">
                <a href="/announcements/{announcement.slug}" class="announcement-link">{announcement.title}</a>
              </h2>
              <p class="announcement-content">{announcement.content.slice(0, 180)}...</p>
              <a href="/announcements/{announcement.slug}" class="read-more-button">Read Full Announcement</a>
            </div>
          {/each}

          {#if totalPages > 1}
            <div class="pagination">
              <button
                class="pagination-button"
                on:click={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i class="fas fa-chevron-left"></i>
              </button>

              {#each pageNumbers as page}
                <button
                  class="pagination-button {currentPage === page ? 'active' : ''}"
                  on:click={() => goToPage(page)}
                >
                  {page}
                </button>
              {/each}

              <button
                class="pagination-button"
                on:click={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <div class="page-info">
              Page {currentPage} of {totalPages} ({filteredAnnouncements.length} announcements)
            </div>
          {/if}
        {:else}
          <div class="empty-state">
            <p>No announcements match your criteria. Try adjusting your search or category filter.</p>
            <button class="reset-button" on:click={() => { selectedCategory = "All"; searchQuery = ""; }}>
              Reset Filters
            </button>
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
    margin: 1rem 0 1.5rem;
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
    padding-top: 0.75rem;
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
    margin-bottom: 2rem;
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

  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-bottom: 2rem;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .category-button {
    background: rgba(20, 17, 30, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category-button:hover {
    background: rgba(31, 27, 45, 0.6);
    transform: translateY(-2px);
  }

  .category-button.selected {
    background: rgba(189, 150, 72, 0.2);
    border-color: rgba(189, 150, 72, 0.4);
    color: #e1d4c0;
    font-weight: 500;
  }

  .search-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border-radius: 20px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    background: rgba(20, 17, 30, 0.4);
    color: #F7E8D4;
    font-family: 'Spectral', serif;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: rgba(189, 150, 72, 0.4);
    background: rgba(31, 27, 45, 0.6);
    box-shadow: 0 0 10px rgba(189, 150, 72, 0.2);
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(247, 232, 212, 0.6);
    pointer-events: none;
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

  .announcement-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .announcement-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    letter-spacing: 0.03em;
  }

  .announcement-category {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .announcement-category.event {
    background: rgba(121, 80, 242, 0.2);
    color: #b8a2ff;
    border: 1px solid rgba(121, 80, 242, 0.3);
  }

  .announcement-category.news {
    background: rgba(52, 152, 219, 0.2);
    color: #a4d4ff;
    border: 1px solid rgba(52, 152, 219, 0.3);
  }

  .announcement-category.alert {
    background: rgba(231, 76, 60, 0.2);
    color: #ffb3ad;
    border: 1px solid rgba(231, 76, 60, 0.3);
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

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    width: 100%;
  }

  .pagination-button {
    width: 36px;
    height: 36px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: rgba(20, 17, 30, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 6px;
    color: rgba(247, 232, 212, 0.8);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-button:hover:not(:disabled) {
    background: rgba(31, 27, 45, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.2);
  }

  .pagination-button.active {
    background: rgba(189, 150, 72, 0.2);
    border-color: rgba(189, 150, 72, 0.4);
    color: #e1d4c0;
    font-weight: 600;
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    text-align: center;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.85rem;
    color: rgba(247, 232, 212, 0.6);
    margin-top: 0.75rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 0;
    font-family: 'Spectral', serif;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .reset-button {
    background: rgba(158, 97, 227, 0.15);
    border: 1px solid rgba(158, 97, 227, 0.3);
    border-radius: 4px;
    padding: 0.5rem 1.25rem;
    color: #9E61E3;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .reset-button:hover {
    background: rgba(158, 97, 227, 0.25);
    transform: translateY(-2px);
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

    .controls {
      flex-direction: column;
      gap: 1rem;
    }

    .categories {
      justify-content: center;
      flex-wrap: wrap;
    }

    .announcement-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .pagination {
      flex-wrap: wrap;
    }
  }
</style>