<script>
  // Props for the component
  export let title = 'Learn More';
  export let description = 'Find out more about this announcement.';
  export let buttonText = 'Read More';
  export let demoLink = '/about';
</script>

<div class="cta-section">
  <h2 class="cta-title">{title}</h2>
  <p class="cta-description">{description}</p>
  <a href={demoLink} class="cta-button">{buttonText}</a>
</div>

<style>
  .cta-section {
    margin-top: 2rem;
    text-align: center;
    padding: 2rem;
    background: rgba(189, 150, 72, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(189, 150, 72, 0.2);
  }

  .cta-title {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    color: #bd9648;
    margin-bottom: 1rem;
  }

  .cta-description {
    font-family: 'Spectral', serif;
    font-size: 1.1rem;
    color: rgba(247, 232, 212, 0.92);
    margin-bottom: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-button {
    display: inline-block;
    padding: 0.85rem 1.75rem;
    background: linear-gradient(135deg, #9e61e3 0%, #7a3ca3 100%);
    border-radius: 6px;
    color: #f7e8d4;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, #af71f4 0%, #8a4cb3 100%);
  }
</style>
