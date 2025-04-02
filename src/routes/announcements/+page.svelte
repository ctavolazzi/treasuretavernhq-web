<script lang="ts">
  import { onMount } from 'svelte';

  // Define announcement interface
  interface Announcement {
    id: number;
    slug: string;
    date: string;
    title: string;
    category: string;
    type: string;
    content: string;
    mainImage?: string;
  }

  // Get data from page load function
  export let data;
  const { announcements: loadedAnnouncements, categories } = data;

  // State for filtering and pagination
  let selectedCategory = "All";
  let searchQuery = "";
  let filteredAnnouncements: Announcement[] = loadedAnnouncements;
  let initialDisplayCount = 5;
  let displayCount = initialDisplayCount;
  let fadeIn = false;

  onMount(() => {
    // Add fade-in effect after component mounts
    setTimeout(() => {
      fadeIn = true;
    }, 100);
  });

  // Function to get category icon
  function getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'event': return 'fa-calendar-alt';
      case 'news': return 'fa-newspaper';
      case 'alert': return 'fa-exclamation-triangle';
      default: return 'fa-info-circle';
    }
  }

  // Filter announcements based on selected category and search query
  $: {
    filteredAnnouncements = loadedAnnouncements.filter(announcement => {
      const matchesCategory = selectedCategory === "All" || announcement.category === selectedCategory;
      const matchesSearch = searchQuery === "" ||
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    // Reset display count when filters change
    displayCount = initialDisplayCount;
  }

  // Update the visible announcements when displayCount or filteredAnnouncements change
  $: visibleAnnouncements = filteredAnnouncements.slice(0, displayCount);

  // Function to handle category selection
  function selectCategory(category: string) {
    selectedCategory = category;
  }

  // Function to load more announcements
  function loadMore() {
    displayCount += initialDisplayCount;
  }
</script>

<svelte:head>
  <title>Announcements - Treasure Tavern</title>
  <meta name="description" content="The latest news and announcements from Treasure Tavern" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-container">
  <main class="announcements-main">
    <div class="container" class:fade-in={fadeIn}>
      <h1 class="page-title">Tavern Announcements</h1>

      <div class="search-filters">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search announcements..."
            bind:value={searchQuery}
            class="search-input"
          />
          {#if searchQuery}
            <button class="clear-search" on:click={() => searchQuery = ""}>
              <i class="fas fa-times"></i>
            </button>
          {/if}
        </div>

        <div class="category-filters">
          {#each categories as category}
            <button
              class="category-button"
              class:active={selectedCategory === category}
              on:click={() => selectCategory(category)}
            >
              {#if category !== 'All'}
                <i class="fas {getCategoryIcon(category)}"></i>
              {/if}
              {category}
            </button>
          {/each}
        </div>
      </div>

      <div class="announcements-grid">
        {#if filteredAnnouncements.length > 0}
          {#each visibleAnnouncements as announcement (announcement.slug)}
            <a href="/announcements/{announcement.slug}" class="announcement-card">
              <div class="announcement-meta">
                <div class="announcement-date">
                  <i class="fas fa-calendar"></i>
                  {announcement.date}
                </div>
                <div class="announcement-category {announcement.category.toLowerCase()}">
                  <i class="fas {getCategoryIcon(announcement.category)}"></i>
                  {announcement.category}
                </div>
              </div>

              <h2 class="announcement-title">{announcement.title}</h2>

              {#if announcement.mainImage}
                <div class="card-image">
                  <img src={announcement.mainImage} alt={announcement.title} />
                </div>
              {/if}

              <p class="announcement-excerpt">{announcement.content}</p>

              <span class="read-more">
                Read Full Announcement
                <i class="fas fa-arrow-right"></i>
              </span>
            </a>
          {/each}

          {#if visibleAnnouncements.length < filteredAnnouncements.length}
            <button class="load-more-button" on:click={loadMore}>
              <span>Load More Announcements</span>
              <i class="fas fa-chevron-down"></i>
            </button>
          {:else if filteredAnnouncements.length > initialDisplayCount}
            <div class="all-loaded">
              <span>You've reached the end of the announcements</span>
              <i class="fas fa-scroll"></i>
            </div>
          {/if}
        {:else}
          <div class="empty-state">
            <i class="fas fa-scroll empty-icon"></i>
            <p>No announcements match your criteria.</p>
            <button class="reset-button" on:click={() => { selectedCategory = "All"; searchQuery = ""; }}>
              Reset Filters
            </button>
          </div>
        {/if}
      </div>

      <div class="navigation">
        <a href="/" class="nav-button">
          <i class="fas fa-home" style="margin-right: 8px;"></i>
          Return to Tavern
        </a>
      </div>
    </div>
  </main>
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

  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .announcements-main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin: 0 auto;
  }

  .container {
    width: 100%;
    max-width: 1100px;
    z-index: 2;
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .container.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .page-title {
    font-family: 'Cinzel Decorative', 'Cinzel', fantasy;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    text-align: center;
    margin-bottom: 2rem;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.4);
    font-weight: 700;
    letter-spacing: 0.02em;
    position: relative;
  }

  .page-title::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg,
      rgba(189, 150, 72, 0) 0%,
      rgba(189, 150, 72, 0.7) 50%,
      rgba(189, 150, 72, 0) 100%
    );
  }

  .search-filters {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .search-container {
    position: relative;
    width: 100%;
  }

  .search-icon {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(247, 232, 212, 0.6);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 0.9rem 1rem 0.9rem 3rem;
    background: rgba(20, 17, 30, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 8px;
    color: #F7E8D4;
    font-family: 'Spectral', serif;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: rgba(189, 150, 72, 0.4);
    background: rgba(31, 27, 45, 0.6);
    box-shadow: 0 0 15px rgba(189, 150, 72, 0.1);
  }

  .search-input::placeholder {
    color: rgba(247, 232, 212, 0.5);
  }

  .clear-search {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: rgba(247, 232, 212, 0.6);
    font-size: 0.9rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .clear-search:hover {
    color: #F7E8D4;
    background: rgba(247, 232, 212, 0.1);
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }

  .category-button {
    padding: 0.6rem 1rem;
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 20px;
    background: rgba(20, 17, 30, 0.4);
    color: rgba(247, 232, 212, 0.8);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category-button:hover {
    background: rgba(31, 27, 45, 0.6);
    border-color: rgba(189, 150, 72, 0.2);
    transform: translateY(-2px);
  }

  .category-button.active {
    background: rgba(189, 150, 72, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
    color: #F7E8D4;
    font-weight: 500;
  }

  .announcements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .announcement-card {
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(189, 150, 72, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .announcement-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #BD9648, rgba(189, 150, 72, 0.1));
    opacity: 0.6;
  }

  .announcement-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
    background: rgba(31, 27, 45, 0.6);
  }

  .announcement-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .announcement-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.7);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .announcement-category {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.4rem;
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
    font-size: 1.4rem;
    color: #BD9648;
    margin: 0 0 1rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .announcement-excerpt {
    font-family: 'Spectral', serif;
    font-size: 1rem;
    color: rgba(247, 232, 212, 0.92);
    margin: 0 0 1.5rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .read-more {
    color: #BD9648;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    transition: color 0.3s ease;
  }

  .announcement-card:hover .read-more {
    color: #d4af37;
  }

  .load-more-button {
    grid-column: 1 / -1;
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(189, 150, 72, 0.2);
    color: #F7E8D4;
    padding: 1rem;
    border-radius: 8px;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .load-more-button:hover {
    background: rgba(31, 27, 45, 0.6);
    border-color: rgba(189, 150, 72, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  .all-loaded {
    grid-column: 1 / -1;
    text-align: center;
    padding: 1.5rem;
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-style: italic;
    margin-top: 1rem;
  }

  .empty-state {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 3rem;
    background: rgba(31, 27, 45, 0.3);
    border: 1px solid rgba(247, 232, 212, 0.1);
    border-radius: 8px;
    text-align: center;
  }

  .empty-icon {
    font-size: 3rem;
    color: rgba(189, 150, 72, 0.4);
  }

  .reset-button {
    background: rgba(189, 150, 72, 0.2);
    border: 1px solid rgba(189, 150, 72, 0.3);
    color: #F7E8D4;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-family: 'Cinzel', serif;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .reset-button:hover {
    background: rgba(189, 150, 72, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .navigation {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .nav-button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 6px;
    background: rgba(31, 27, 45, 0.6);
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(247, 232, 212, 0.1);
  }

  .nav-button:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.2);
  }

  /* Media Queries for Responsiveness */
  @media (max-width: 768px) {
    .announcements-grid {
      grid-template-columns: 1fr;
    }

    .search-filters {
      gap: 1rem;
    }

    .category-filters {
      justify-content: flex-start;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      flex-wrap: nowrap;
      width: 100%;
    }

    .category-button {
      flex-shrink: 0;
    }
  }

  @media (max-width: 480px) {
    .announcements-main {
      padding: 0.75rem;
    }

    .search-input {
      padding: 0.75rem 1rem 0.75rem 2.75rem;
      font-size: 0.95rem;
    }

    .announcement-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .announcement-category {
      align-self: flex-start;
    }
  }

  .card-image {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 4px;
    margin: 1rem 0;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .card-image img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }
</style>