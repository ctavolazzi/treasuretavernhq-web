<script>
  // Props for the component
  export let title = "Ready to Take Action?";
  export let description = "Join us for this special event at Treasure Tavern!";
  export let buttonText = "Sign Up Now";
  export let demoLink = "/demo";
</script>

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
    color: #BD9648;
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
    background: linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%);
    border-radius: 6px;
    color: #F7E8D4;
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
    background: linear-gradient(135deg, #AF71F4 0%, #8A4CB3 100%);
  }
</style>

<div class="cta-section">
  <h2 class="cta-title">{title}</h2>
  <p class="cta-description">{description}</p>
  <a href={demoLink} class="cta-button">{buttonText}</a>
</div>