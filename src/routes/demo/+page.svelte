<script>
  // Demo page
</script>

<style>
  .demo-container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    font-family: 'Cinzel Decorative', Georgia, serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1.5rem;
    font-weight: 700;
    line-height: 1.15;
    color: #F7E8D4;
    text-shadow: 0 0 15px rgba(231, 206, 143, 0.35);
  }

  .coming-soon {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: #BD9648;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    text-shadow: 0 0 8px rgba(189, 150, 72, 0.3);
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    line-height: 1.5;
    color: rgba(247, 232, 212, 0.92);
    font-family: 'Spectral', Georgia, serif;
    max-width: 580px;
    margin: 0 auto 1.5rem;
  }

  .back-link {
    margin-top: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
    color: #9E61E3;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(158, 97, 227, 0.4);
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .back-link:hover {
    background-color: rgba(158, 97, 227, 0.1);
    border-color: rgba(158, 97, 227, 0.6);
    transform: translateY(-2px);
  }
</style>

<main class="demo-container">
  <h1>Demo Tavern</h1>
  <div class="coming-soon">Coming Soon</div>
  <p>
    The tavern's doors are still being carved, the mead still brewing, and the adventure just beginning.
    Check back soon to experience the first taste of our fantasy universe.
  </p>
  <p>
    While we prepare this magical demo, you can join our early tavern-keepers by signing up on the home page.
  </p>
  <a href="/" class="back-link">← Return to the Tavern</a>
</main>