<script lang="ts">
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import DiceRoller from '$lib/components/DiceRoller.svelte';
  import { character } from '$lib/stores/characterStore';
  import { onMount } from 'svelte';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Your Character - Treasure Tavern</title>
  <meta
    name="description"
    content="Track your adventures, roll the dice, and level up your character in Treasure Tavern."
  />
</svelte:head>

<main class="character-page">
  <div class="container">
    <div class="page-header">
      <h1>Your Adventure</h1>
      <p class="subtitle">
        Every action at Treasure Tavern shapes your destiny. Roll the dice, gain experience, and become a legend.
      </p>
    </div>

    {#if mounted}
      <div class="content-grid">
        <!-- Dice Roller Section -->
        <div class="section dice-section">
          <h2>Test Your Fate</h2>
          <p class="section-description">
            Roll the dice to embark on spontaneous adventures. Every roll shapes your journey!
          </p>
          <DiceRoller />
        </div>

        <!-- Character Sheet Section -->
        <div class="section character-section">
          <CharacterSheet />
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="info-section">
        <h2>How It Works</h2>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">🎲</div>
            <h3>Roll the Dice</h3>
            <p>Each roll determines your success or failure in spontaneous adventures throughout the tavern.</p>
          </div>
          <div class="info-card">
            <div class="info-icon">⭐</div>
            <h3>Gain Experience</h3>
            <p>Successful rolls earn XP and credits. Critical successes (Natural 20s) grant bonus rewards!</p>
          </div>
          <div class="info-card">
            <div class="info-icon">📈</div>
            <h3>Level Up</h3>
            <p>As you gain experience, you'll level up, increasing your max HP and growing stronger.</p>
          </div>
          <div class="info-card">
            <div class="info-icon">📖</div>
            <h3>Chronicle Your Journey</h3>
            <p>Your adventure journal tracks every roll, success, and milestone in your Treasure Tavern saga.</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats Display -->
      <div class="quick-stats">
        <div class="stat">
          <span class="stat-label">Level</span>
          <span class="stat-value">{$character.level}</span>
        </div>
        <div class="stat">
          <span class="stat-label">XP</span>
          <span class="stat-value">{$character.xp}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Credits</span>
          <span class="stat-value">{$character.credits}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Adventures</span>
          <span class="stat-value">{$character.journal.length}</span>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  .character-page {
    min-height: 100vh;
    background: linear-gradient(145deg, #13111c 0%, #1f1b2d 60%, #2b1d34 100%);
    padding: 2rem 1rem;
    color: #e3d5c1;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: #d5a44c;
    margin-bottom: 1rem;
    text-shadow: 0 0 15px rgba(213, 164, 76, 0.4);
  }

  .subtitle {
    font-family: 'Spectral', serif;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: rgba(247, 232, 212, 0.9);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .section {
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(189, 150, 72, 0.2);
    border-radius: 12px;
    padding: 2rem;
  }

  .section h2 {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    margin-bottom: 0.75rem;
    font-size: 1.8rem;
  }

  .section-description {
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.85);
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .dice-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .info-section {
    margin: 4rem 0;
    text-align: center;
  }

  .info-section h2 {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .info-card {
    background: rgba(31, 27, 45, 0.4);
    border: 1px solid rgba(189, 150, 72, 0.2);
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .info-card:hover {
    transform: translateY(-5px);
    border-color: rgba(189, 150, 72, 0.4);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .info-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .info-card h3 {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
  }

  .info-card p {
    font-family: 'Spectral', serif;
    color: rgba(247, 232, 212, 0.85);
    line-height: 1.6;
    margin: 0;
  }

  .quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-top: 3rem;
  }

  .stat {
    background: linear-gradient(135deg, #1a1528 0%, #2b1d34 100%);
    border: 2px solid #bd9648;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }

  .stat-label {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    font-size: 0.9rem;
    display: block;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .stat-value {
    font-family: 'Spectral', serif;
    color: #e3d5c1;
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .character-page {
      padding: 1rem 0.5rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .section {
      padding: 1.5rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .quick-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
