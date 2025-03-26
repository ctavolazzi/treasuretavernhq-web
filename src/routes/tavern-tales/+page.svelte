<script lang="ts">
  import { onMount } from 'svelte';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  // Define interfaces for the data types
  interface Category {
    id: string;
    name: string;
  }

  interface Tale {
    slug: string;
    title: string;
    type: string;
    category: string;
    date: string;
    author: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
  }

  // Get data from the loader with proper type annotations
  export let data: {
    categories: Array<{id: string, name: string}>,
    featuredTales: Array<any>,
    recentTales: Array<any>,
    allTales: Array<any>
  };

  // Extract data with proper types
  const { categories, featuredTales, recentTales, allTales } = data;

  // For the filtering system
  let activeFilter = 'all';
  let filteredTales = allTales;

  // For the search feature
  let searchTerm = '';
  let searchResults: Array<any> = [];
  let isSearching = false;

  // For animations and UI
  let isReady = false;

  // Handle filtering
  function filterTales(category: string): void {
    activeFilter = category;

    if (category === 'all') {
      filteredTales = allTales;
    } else {
      filteredTales = allTales.filter(tale => tale.category === category);
    }

    // Reset search when filter changes
    searchTerm = '';
    isSearching = false;
  }

  // Handle search
  function handleSearch(): void {
    if (searchTerm.trim() === '') {
      isSearching = false;
      return;
    }

    isSearching = true;
    const term = searchTerm.toLowerCase();

    searchResults = allTales.filter(tale =>
      tale.title.toLowerCase().includes(term) ||
      tale.excerpt.toLowerCase().includes(term) ||
      tale.author.toLowerCase().includes(term) ||
      tale.tags.some((tag: string) => tag.toLowerCase().includes(term))
    );
  }

  // Clear search
  function clearSearch(): void {
    searchTerm = '';
    isSearching = false;
  }

  onMount(() => {
    // For entrance animations
    setTimeout(() => {
      isReady = true;
    }, 300);
  });
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #13111C 0%, #1F1B2D 60%, #2B1D34 100%);
    color: #F7E8D4;
    overflow-x: hidden;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .hero {
    position: relative;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 2rem;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(19, 17, 28, 0.7), rgba(19, 17, 28, 0.8)),
                      url('/images/tavern-tales-bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .hero-content {
    max-width: 900px;
    width: 100%;
    z-index: 1;
  }

  .hero-title {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(3rem, 8vw, 5rem);
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-family: 'Spectral', serif;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    margin-bottom: 2rem;
    color: rgba(247, 232, 212, 0.9);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-style: italic;
    line-height: 1.5;
  }

  .hero-decor {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0,100 L1000,100 L1000,0 C900,80 800,100 700,60 C600,20 500,80 400,100 C300,120 200,80 100,50 L0,100 Z" fill="%231F1B2D"/></svg>');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .main-content {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .featured-section {
    margin-bottom: 5rem;
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    margin-bottom: 1.5rem;
    color: #BD9648;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(189, 150, 72, 0.6) 0%, rgba(189, 150, 72, 0) 100%);
    margin-left: 1rem;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .featured-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    min-height: 350px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: all 0.3s ease;
    background: rgba(31, 27, 45, 0.4);
    display: flex;
    flex-direction: column;
  }

  .featured-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(transparent, rgba(19, 17, 28, 0.8));
    pointer-events: none;
  }

  .card-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    color: rgba(247, 232, 212, 0.7);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .card-title {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #BD9648;
    line-height: 1.3;
    transition: color 0.3s ease;
  }

  .featured-card:hover .card-title {
    color: #9E61E3;
  }

  .card-excerpt {
    color: rgba(247, 232, 212, 0.85);
    margin-bottom: 1.5rem;
    font-family: 'Spectral', serif;
    font-size: 1rem;
    line-height: 1.5;
    flex: 1;
  }

  .card-tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    background: rgba(189, 150, 72, 0.15);
    color: #BD9648;
  }

  .card-tag.card-tag-story {
    background: rgba(189, 150, 72, 0.15);
    color: #BD9648;
  }

  .card-tag.card-tag-poem {
    background: rgba(158, 97, 227, 0.15);
    color: #9E61E3;
  }

  .card-tag.card-tag-song {
    background: rgba(131, 192, 219, 0.15);
    color: #83C0DB;
  }

  .card-tag.card-tag-video {
    background: rgba(255, 107, 107, 0.15);
    color: #FF6B6B;
  }

  .card-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #9E61E3;
    font-weight: 500;
    text-decoration: none;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .read-more:hover {
    color: #BD9648;
    transform: translateX(3px);
  }

  .categories-section {
    margin-bottom: 5rem;
  }

  .categories-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .category-button {
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    border: 1px solid rgba(247, 232, 212, 0.2);
    background: rgba(31, 27, 45, 0.4);
    color: rgba(247, 232, 212, 0.8);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .category-button.active {
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border-color: transparent;
    color: #F7E8D4;
    box-shadow: 0 5px 15px rgba(158, 97, 227, 0.3);
  }

  .category-button:hover:not(.active) {
    background: rgba(31, 27, 45, 0.6);
    border-color: rgba(247, 232, 212, 0.3);
    transform: translateY(-2px);
  }

  .recent-section {
    margin-bottom: 5rem;
  }

  .tales-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .tale-card {
    background: rgba(31, 27, 45, 0.4);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(247, 232, 212, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .tale-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
  }

  .tale-card-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .tale-card-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tale-card-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: rgba(247, 232, 212, 0.7);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .tale-card-title {
    font-family: 'Cinzel', serif;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #BD9648;
    line-height: 1.3;
    transition: color 0.3s ease;
  }

  .tale-card:hover .tale-card-title {
    color: #9E61E3;
  }

  .tale-card-excerpt {
    color: rgba(247, 232, 212, 0.85);
    margin-bottom: 1rem;
    font-family: 'Spectral', serif;
    font-size: 0.95rem;
    line-height: 1.5;
    flex: 1;
  }

  .tale-card-footer {
    margin-top: auto;
  }

  .search-container {
    margin-bottom: 2rem;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    color: #F7E8D4;
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(247, 232, 212, 0.2);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(158, 97, 227, 0.5);
    border-color: rgba(158, 97, 227, 0.5);
  }

  .search-button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(247, 232, 212, 0.7);
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .search-button:hover {
    color: #9E61E3;
  }

  .search-results {
    padding: 1.5rem;
    background: rgba(31, 27, 45, 0.6);
    border-radius: 8px;
    margin-bottom: 3rem;
  }

  .search-results-title {
    margin-bottom: 1rem;
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    color: #BD9648;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .clear-search {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.8);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .clear-search:hover {
    color: #9E61E3;
  }

  .no-results {
    padding: 2rem;
    text-align: center;
    color: rgba(247, 232, 212, 0.7);
    font-style: italic;
  }

  .load-more {
    display: block;
    margin: 2rem auto 0;
    padding: 0.75rem 2rem;
    background: rgba(31, 27, 45, 0.6);
    border: 1px solid rgba(247, 232, 212, 0.2);
    border-radius: 6px;
    color: #F7E8D4;
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .load-more:hover {
    background: rgba(31, 27, 45, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .cta-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(19, 17, 28, 0.6);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  .cta-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(19, 17, 28, 0.8), rgba(19, 17, 28, 0.9)),
                      url('/images/cta-bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .cta-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .cta-title {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
    color: #F7E8D4;
    text-shadow: 0 0 10px rgba(231, 206, 143, 0.35);
  }

  .cta-description {
    font-family: 'Spectral', serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin-bottom: 2rem;
    color: rgba(247, 232, 212, 0.9);
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, #BD9648 0%, #E7CE8F 100%);
    border: none;
    border-radius: 6px;
    color: #13111C;
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(189, 150, 72, 0.3);
  }

  .footer {
    background: rgba(19, 17, 28, 1);
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(189, 150, 72, 0.2);
  }

  .footer-text {
    font-size: 0.9rem;
    color: rgba(247, 232, 212, 0.6);
    font-family: 'Inter', system-ui, sans-serif;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 2rem 1.5rem;
    }

    .featured-grid {
      grid-template-columns: 1fr;
    }

    .tales-grid {
      grid-template-columns: 1fr;
    }

    .categories-container {
      justify-content: center;
    }
  }
</style>

<svelte:head>
  <title>Tavern Tales - Stories, Poems, and Ancient Chronicles - Treasure Tavern</title>
  <meta name="description" content="Immerse yourself in the mystical world of Treasure Tavern through stories, poems, songs, and visual tales collected from travelers across the realms." />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<div class="page-container">
  <div class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      {#if isReady}
        <h1 class="hero-title" in:fly={{ y: -30, duration: 800, delay: 300, easing: quintOut }}>Tavern Tales</h1>
        <p class="hero-subtitle" in:fade={{ duration: 1000, delay: 600 }}>
          Ancient scrolls, whispered legends, and ballads sung in shadowy corners of the Tavern.
          Explore the chronicles gathered by our patrons from across the realms.
        </p>
      {/if}
    </div>
    <div class="hero-decor"></div>
  </div>

  <main class="main-content">
    <!-- Featured Tales Section -->
    <section class="featured-section">
      <h2 class="section-title">Featured Chronicles</h2>
      <div class="featured-grid">
        {#each featuredTales as tale (tale.slug)}
          <a href={`/tavern-tales/${tale.slug}`} class="featured-card">
            <img src={tale.coverImage} alt={tale.title} class="card-image" />
            <div class="card-overlay"></div>
            <div class="card-content">
              <div class="card-meta">
                <span>{tale.author}</span>
                <span>{tale.date}</span>
              </div>
              <h3 class="card-title">{tale.title}</h3>
              <p class="card-excerpt">{tale.excerpt}</p>
              <div class="card-footer">
                <span class={`card-tag card-tag-${tale.type.toLowerCase()}`}>{tale.type}</span>
                <span class="read-more">
                  Read Chronicle <i class="fas fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- Categories and Search Section -->
    <section class="categories-section">
      <h2 class="section-title">Explore Chronicles</h2>

      <!-- Categories Filter -->
      <div class="categories-container">
        <button
          class={`category-button ${activeFilter === 'all' ? 'active' : ''}`}
          on:click={() => filterTales('all')}
        >
          All Chronicles
        </button>

        {#each categories as category}
          <button
            class={`category-button ${activeFilter === category.id ? 'active' : ''}`}
            on:click={() => filterTales(category.id)}
          >
            {category.name}
          </button>
        {/each}
      </div>

      <!-- Search input -->
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search for tales, authors, or themes..."
          bind:value={searchTerm}
          on:input={handleSearch}
        />
        <button class="search-button" on:click={handleSearch}>
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Search results if any -->
      {#if isSearching}
        <div class="search-results" in:fade={{ duration: 300 }}>
          <div class="search-results-title">
            Search Results {searchResults.length > 0 ? `(${searchResults.length})` : ''}
            <button class="clear-search" on:click={clearSearch}>
              <i class="fas fa-times"></i> Clear Search
            </button>
          </div>

          {#if searchResults.length > 0}
            <div class="tales-grid">
              {#each searchResults as tale (tale.slug)}
                <a href={`/tavern-tales/${tale.slug}`} class="tale-card">
                  <img src={tale.coverImage} alt={tale.title} class="tale-card-image" />
                  <div class="tale-card-content">
                    <div class="tale-card-meta">
                      <span>{tale.author}</span>
                      <span>{tale.date}</span>
                    </div>
                    <h3 class="tale-card-title">{tale.title}</h3>
                    <p class="tale-card-excerpt">{tale.excerpt}</p>
                    <div class="tale-card-footer">
                      <span class={`card-tag card-tag-${tale.type.toLowerCase()}`}>{tale.type}</span>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          {:else}
            <div class="no-results">
              <p>No tales found matching "{searchTerm}". Try a different search term.</p>
            </div>
          {/if}
        </div>
      {/if}

      <!-- All tales or filtered tales -->
      {#if !isSearching}
        <div class="tales-grid">
          {#each filteredTales as tale (tale.slug)}
            <a href={`/tavern-tales/${tale.slug}`} class="tale-card">
              <img src={tale.coverImage} alt={tale.title} class="tale-card-image" />
              <div class="tale-card-content">
                <div class="tale-card-meta">
                  <span>{tale.author}</span>
                  <span>{tale.date}</span>
                </div>
                <h3 class="tale-card-title">{tale.title}</h3>
                <p class="tale-card-excerpt">{tale.excerpt}</p>
                <div class="tale-card-footer">
                  <span class={`card-tag card-tag-${tale.type.toLowerCase()}`}>{tale.type}</span>
                </div>
              </div>
            </a>
          {/each}
        </div>

        <!-- Load more button - would connect to pagination in a real implementation -->
        {#if filteredTales.length > 12}
          <button class="load-more">
            Load More Chronicles
          </button>
        {/if}
      {/if}
    </section>

    <!-- Recent Tales Section -->
    <section class="recent-section">
      <h2 class="section-title">Recently Added</h2>
      <div class="tales-grid">
        {#each recentTales as tale (tale.slug)}
          <a href={`/tavern-tales/${tale.slug}`} class="tale-card">
            <img src={tale.coverImage} alt={tale.title} class="tale-card-image" />
            <div class="tale-card-content">
              <div class="tale-card-meta">
                <span>{tale.author}</span>
                <span>{tale.date}</span>
              </div>
              <h3 class="tale-card-title">{tale.title}</h3>
              <p class="tale-card-excerpt">{tale.excerpt}</p>
              <div class="tale-card-footer">
                <span class={`card-tag card-tag-${tale.type.toLowerCase()}`}>{tale.type}</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- Call to Action Section -->
    <AnnouncementCta
      title="Share Your Own Tale"
      description="The Tavern welcomes stories from travelers far and wide. Perhaps you have encountered something strange on your journeys worth recording in our archives?"
      buttonText="Submit Your Tale"
      demoLink="/contact"
    />

    <!-- Additional CTA for newsletter -->
    <section class="cta-section">
      <div class="cta-bg"></div>
      <div class="cta-content">
        <h2 class="cta-title">Don't Miss New Chronicles</h2>
        <p class="cta-description">
          Subscribe to the Tavern's newsletter to receive the latest tales, poems,
          and discoveries directly to your magical communication device.
        </p>
        <a href="/newsletter" class="cta-button">
          Subscribe to Updates
        </a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p class="footer-text">© {new Date().getFullYear()} Treasure Tavern. All rights reserved.</p>
  </footer>
</div>