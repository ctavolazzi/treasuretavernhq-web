<script lang="ts">
  // Props to customize the breadcrumb
  export let items: Array<{
    label: string;
    href?: string;
    icon?: string;
  }> = [];

  // Default minimal path - just home
  if (items.length === 0) {
    items = [{ label: 'Home', href: '/', icon: 'fa-home' }];
  }

  // Always ensure Home is the first item
  if (items.length > 0 && items[0].label !== 'Home') {
    items.unshift({ label: 'Home', href: '/', icon: 'fa-home' });
  }
</script>

<div class="breadcrumb">
  {#each items as item, index}
    {#if index > 0}
      <i class="fas fa-chevron-right separator"></i>
    {/if}

    {#if item.href && index < items.length - 1}
      <a href={item.href}>
        {#if item.icon}<i class="fas {item.icon}"></i>{/if}
        <span class="label">{item.label}</span>
      </a>
    {:else}
      <span class="current">
        {#if item.icon}<i class="fas {item.icon}"></i>{/if}
        <span class="label">{item.label}</span>
      </span>
    {/if}
  {/each}
</div>

<style>
  .breadcrumb {
    padding: 0.35rem 0.5rem;
    background: rgba(31, 27, 45, 0.3);
    border-bottom: 1px solid rgba(189, 150, 72, 0.15);
    display: flex;
    align-items: center;
    font-family: 'Cinzel', serif;
    flex-wrap: nowrap;
    gap: 0.25rem;
    font-size: 0.8rem;
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none; /* Hide scrollbar in IE and Edge */
    scrollbar-width: none; /* Hide scrollbar in Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .breadcrumb::-webkit-scrollbar {
    display: none;
  }

  a {
    color: rgba(247, 232, 212, 0.8);
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.25s ease;
    padding: 0.1rem 0.25rem;
    border-radius: 3px;
    white-space: nowrap;
  }

  a:hover {
    color: #bd9648;
    background: rgba(189, 150, 72, 0.08);
  }

  .current {
    color: #9e61e3;
    display: flex;
    align-items: center;
    font-weight: 500;
    text-shadow: 0 0 5px rgba(158, 97, 227, 0.2);
    padding: 0.1rem 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  i {
    font-size: 0.75rem;
    margin-right: 0.2rem;
  }

  .separator {
    font-size: 0.65rem;
    margin: 0;
    color: rgba(247, 232, 212, 0.4);
    flex-shrink: 0;
  }

  .label {
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    .breadcrumb {
      padding: 0.3rem 0.4rem;
      font-size: 0.75rem;
      gap: 0.2rem;
    }

    i {
      font-size: 0.7rem;
      margin-right: 0.15rem;
    }

    .current {
      max-width: 150px;
    }
  }
</style>
