<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';

  // Get the announcement data from the page data prop
  export let data;
  const { announcement, relatedAnnouncements } = data;

  // Breadcrumb configuration with dynamic announcement title
  $: breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'fa-home' },
    { label: 'Announcements', href: '/announcements', icon: 'fa-bullhorn' },
    { label: announcement.title }
  ];

  let isReady = false;

  onMount(() => {
    setTimeout(() => {
      isReady = true;
    }, 300);
  });

  // Get proper icon for category
  function getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'event': return 'fa-calendar-alt';
      case 'news': return 'fa-newspaper';
      case 'alert': return 'fa-exclamation-triangle';
      default: return 'fa-info-circle';
    }
  }

  // CTA content logic
  let ctaTitle = "";
  let ctaButton = "";
  let ctaDemoLink = "";
  let ctaDescription = "";

  // Set CTA content based on announcement type
  if (announcement.type === "event") {
    ctaTitle = "Join Us At This Event!";
    ctaButton = "RSVP Now";
    ctaDemoLink = "/#newsletter";
    ctaDescription = "Limited spots available. Reserve your place at this exclusive tavern gathering and be part of the magic.";
  } else if (announcement.type === "news") {
    ctaTitle = "Stay Updated";
    ctaButton = "Subscribe to Newsletter";
    ctaDemoLink = "/#newsletter";
    ctaDescription = "Want to be the first to know about new happenings at the Tavern? Join our newsletter for exclusive updates and offers.";
  } else {
    ctaTitle = "Stay Informed";
    ctaButton = "Subscribe to Updates";
    ctaDemoLink = "/#newsletter";
    ctaDescription = "Don't miss important announcements and alerts from the Tavern. Subscribe to our updates to stay safe and informed.";
  }
</script>

<svelte:head>
  <title>{announcement.title} - Treasure Tavern</title>
  <meta name="description" content={announcement.content} />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-container">
  <Breadcrumb items={breadcrumbItems} />

  <main class="announcement-main" class:fade-in={isReady}>
    <div class="container">
      <div class="announcement-header">
        <h1>{announcement.title}</h1>
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
      </div>

      <div class="announcement-card">
        {#if announcement.mainImage}
          <div class="announcement-image">
            <img src={announcement.mainImage} alt={announcement.title} />
          </div>
        {/if}
        <div class="announcement-content">
          <!-- Use different rendering based on content type -->
          {@html announcement.fullContent}
        </div>
      </div>

      <AnnouncementCta
        title={ctaTitle}
        buttonText={ctaButton}
        description={ctaDescription}
        demoLink={ctaDemoLink || "/#newsletter"}
      />

      {#if relatedAnnouncements && relatedAnnouncements.length > 0}
        <div class="related-announcements">
          <h2 class="related-title">Related Announcements</h2>
          <div class="related-grid">
            {#each relatedAnnouncements as related}
              {#if related}
                <a href="/announcements/{related.slug}" class="related-card">
                  <div class="related-category {related.category.toLowerCase()}">
                    <i class="fas {getCategoryIcon(related.category)}"></i>
                    {related.category}
                  </div>
                  <h3 class="related-card-title">{related.title}</h3>
                  <p class="related-date">{related.date}</p>
                  <span class="read-more">Read More <i class="fas fa-arrow-right"></i></span>
                </a>
              {/if}
            {/each}
          </div>
        </div>
      {/if}

      <div class="navigation">
        <a href="/announcements" class="nav-button">
          <i class="fas fa-arrow-left" style="margin-right: 8px;"></i>
          All Announcements
        </a>
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

  .announcement-main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .announcement-main.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .container {
    width: 100%;
    max-width: 800px;
    z-index: 2;
    position: relative;
    margin: 0 auto;
  }

  .announcement-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Cinzel', fantasy;
    font-size: clamp(2rem, 5vw, 3rem);
    margin: 0 0 1rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
    letter-spacing: 0.02em;
  }

  .announcement-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .announcement-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.7);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .announcement-category {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    padding: 0.25rem 0.9rem;
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

  .announcement-card {
    background: rgba(20, 17, 30, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .announcement-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #BD9648, rgba(189, 150, 72, 0.1));
    opacity: 0.8;
  }

  .announcement-content {
    font-family: 'Spectral', serif;
    font-size: 1.15rem;
    color: rgba(247, 232, 212, 0.92);
    line-height: 1.6;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
  }

  .announcement-content :global(p) {
    margin-bottom: 1.25rem;
    text-align: center;
  }

  .announcement-content :global(h2) {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    color: #BD9648;
    margin: 2rem 0 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .announcement-content :global(h3) {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    color: #a99156;
    margin: 1.5rem 0 1rem;
  }

  .announcement-content :global(ul),
  .announcement-content :global(ol) {
    padding-left: 0;
    margin-bottom: 1.25rem;
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    list-style-position: inside;
  }

  .announcement-content :global(li) {
    margin-bottom: 0.8rem;
    text-align: center;
  }

  .announcement-content :global(img) {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    display: block;
  }

  .announcement-content :global(strong) {
    color: #d4af37;
    font-weight: bold;
  }

  .announcement-content :global(em) {
    color: #c9b68d;
    font-style: italic;
  }

  .announcement-content :global(blockquote) {
    border-left: 4px solid #BD9648;
    padding: 0.5rem 0 0.5rem 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #c9b68d;
  }

  .announcement-content :global(a) {
    color: #BD9648;
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  .announcement-content :global(a:hover) {
    color: #d4af37;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
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

  .related-announcements {
    margin-top: 3rem;
    position: relative;
  }

  .related-title {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    color: #BD9648;
    text-align: center;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .related-title::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg,
      rgba(189, 150, 72, 0) 0%,
      rgba(189, 150, 72, 0.6) 50%,
      rgba(189, 150, 72, 0) 100%
    );
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .related-card {
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(189, 150, 72, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    flex-direction: column;
  }

  .related-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(189, 150, 72, 0.3);
    background: rgba(31, 27, 45, 0.6);
  }

  .related-card-title {
    font-family: 'Cinzel', serif;
    font-size: 1.25rem;
    color: #F7E8D4;
    margin: 0.75rem 0;
    line-height: 1.3;
  }

  .related-date {
    font-size: 0.875rem;
    color: rgba(247, 232, 212, 0.7);
    margin-bottom: 1rem;
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

  .related-card:hover .read-more {
    color: #d4af37;
  }

  /* Media Queries for Responsiveness */
  @media (max-width: 768px) {
    .announcement-card {
      padding: 1.5rem;
    }

    .related-grid {
      grid-template-columns: 1fr;
    }

    .navigation {
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .nav-button {
      width: 100%;
      text-align: center;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .announcement-meta {
      flex-direction: column;
      gap: 0.75rem;
    }

    .announcement-card {
      padding: 1.25rem;
    }

    .announcement-content {
      font-size: 1rem;
    }
  }

  .announcement-image {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 2rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .announcement-image img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
</style>