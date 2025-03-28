<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import AnnouncementCta from '$lib/components/AnnouncementCta.svelte';

  // Get the announcement data from the page data prop
  export let data;
  const { announcement } = data;

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
  } else if (announcement.type === "product") {
    ctaTitle = "Pre-Order Now Available";
    ctaButton = "Secure Your Copy";
    ctaDemoLink = "/#newsletter";
    ctaDescription = "Be among the first to receive this limited edition item. Early bird offers end soon!";
  } else {
    ctaTitle = "Stay Connected";
    ctaButton = "Subscribe to Updates";
    ctaDemoLink = "/#newsletter";
    ctaDescription = "Don't miss this rare opportunity to observe dragons in their natural courtship behaviors from our specially constructed viewing platforms.";
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

  .announcement-date {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1rem;
    color: rgba(247, 232, 212, 0.6);
    margin-bottom: 0.5rem;
  }

  .announcement-card {
    background: rgba(20, 17, 30, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(247, 232, 212, 0.1);
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
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
    margin-bottom: 0.5rem;
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
  }

  @media (max-width: 768px) {
    main {
      padding: 1.5rem;
    }

    .announcement-card {
      padding: 1.5rem;
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
      <div class="announcement-meta">
        <div class="announcement-type">{announcement.type}</div>
        <div class="announcement-date">{announcement.date}</div>
      </div>
    </div>

    <article class="announcement-detail" class:visible={isReady}>
      <h1>{announcement.title}</h1>
      <div class="announcement-content">
        {@html announcement.content}
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
  </div>
</div>