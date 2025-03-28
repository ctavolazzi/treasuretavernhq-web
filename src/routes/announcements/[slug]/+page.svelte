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
  function getCategoryIcon(category) {
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

  .announcement-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    font-family: 'Cinzel Decorative', 'Luminari', fantasy;
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
  }

  .announcement-content :global(p) {
    margin-bottom: 1.25rem;
  }

  .announcement-content :global(ul) {
    padding-left: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .announcement-content :global(li) {
    margin-bottom: 0.8rem;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
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

  .related-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .related-item {
    background: rgba(20, 17, 30, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    padding: 1.25rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .related-item:hover {
    transform: translateY(-3px);
    background: rgba(31, 27, 45, 0.6);
    border-color: rgba(189, 150, 72, 0.2);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .related-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #BD9648, rgba(189, 150, 72, 0.1));
    opacity: 0.6;
  }

  .related-category {
    font-size: 0.8rem;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .related-title-link {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    color: #BD9648;
    text-decoration: none;
    margin-bottom: 0.5rem;
    display: block;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .related-title-link:hover {
    color: #d8b05c;
    text-decoration: underline;
  }

  .related-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.85rem;
    color: rgba(247, 232, 212, 0.6);
    margin-bottom: 0.75rem;
  }

  .related-excerpt {
    font-family: 'Spectral', serif;
    font-size: 0.95rem;
    color: rgba(247, 232, 212, 0.85);
    margin-bottom: 1rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .visible {
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    main {
      padding: 1.5rem;
    }

    .announcement-card {
      padding: 1.5rem;
    }

    .related-list {
      grid-template-columns: 1fr;
    }
  }
</style>

<svelte:head>
  <title>{announcement.title} - Treasure Tavern</title>
  <meta name="description" content={announcement.content.slice(0, 160)} />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>

<div class="page-container">
  <Breadcrumb items={breadcrumbItems} />

  <div class="container">
    <div class="announcement-header">
      <a href="/announcements" class="nav-button">
        <i class="fas fa-arrow-left"></i> All Announcements
      </a>
    </div>

    <article class="announcement-detail" class:visible={isReady}>
      <h1>{announcement.title}</h1>

      <div class="announcement-meta">
        <div class="announcement-date">
          <i class="far fa-calendar-alt"></i> {announcement.date}
        </div>
        <div class="announcement-category {announcement.category.toLowerCase()}">
          <i class="fas {getCategoryIcon(announcement.category)}"></i> {announcement.category}
        </div>
      </div>

      <div class="announcement-card">
        <div class="announcement-content">
          {@html announcement.fullContent}
        </div>
      </div>
    </article>

    <div class="announcement-footer">
      <AnnouncementCta
        title={ctaTitle}
        description={ctaDescription}
        buttonText={ctaButton}
        demoLink={ctaDemoLink}
      />
    </div>

    {#if relatedAnnouncements && relatedAnnouncements.length > 0}
      <div class="related-announcements">
        <h2 class="related-title">Related Announcements</h2>
        <div class="related-list">
          {#each relatedAnnouncements as related}
            <div class="related-item">
              <div class="related-category {related.category.toLowerCase()}">
                <i class="fas {getCategoryIcon(related.category)}"></i> {related.category}
              </div>
              <a href="/announcements/{related.slug}" class="related-title-link">
                {related.title}
              </a>
              <div class="related-date">{related.date}</div>
              <div class="related-excerpt">{related.content.slice(0, 120)}...</div>
              <a href="/announcements/{related.slug}" class="nav-button">
                Read More
              </a>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>