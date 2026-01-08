<script lang="ts">
  import { character } from '$lib/stores/characterStore';
  import type { CommandOutcome } from '$lib/types/rpg';

  let rolling = false;
  let lastOutcome: CommandOutcome | null = null;
  let showResult = false;

  const actions = [
    'Explore the tavern',
    'Read a tale',
    'Join an adventure',
    'Seek wisdom',
    'Test your luck',
    'Browse the archives'
  ];

  function rollDice() {
    if (rolling) return;

    rolling = true;
    showResult = false;

    const action = actions[Math.floor(Math.random() * actions.length)];

    // Simulate dice rolling animation
    setTimeout(() => {
      lastOutcome = character.performAction(action);
      showResult = true;
      rolling = false;
    }, 600);
  }
</script>

<div class="dice-roller">
  <button
    class="dice-button"
    on:click={rollDice}
    disabled={rolling}
    class:rolling
  >
    <span class="dice-icon">🎲</span>
    <span class="dice-text">
      {rolling ? 'Rolling...' : 'Roll the Dice'}
    </span>
  </button>

  {#if showResult && lastOutcome}
    <div class="result-display" class:critical={lastOutcome.roll.isCritical} class:fumble={lastOutcome.roll.isFumble}>
      <div class="result-narrative">{lastOutcome.narrative}</div>

      <div class="result-rewards">
        {#if lastOutcome.xpGained > 0}
          <span class="reward xp">+{lastOutcome.xpGained} XP</span>
        {/if}
        {#if lastOutcome.creditsGained > 0}
          <span class="reward credits">+{lastOutcome.creditsGained} 💰</span>
        {/if}
      </div>

      {#if lastOutcome.statusEffect}
        <div class="status-gained {lastOutcome.statusEffect.type}">
          <span>{lastOutcome.statusEffect.icon}</span>
          <span>{lastOutcome.statusEffect.name}</span>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .dice-roller {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .dice-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #bd9648 0%, #d4a758 100%);
    border: 2px solid #e3d5c1;
    border-radius: 12px;
    color: #13111c;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(189, 150, 72, 0.3);
  }

  .dice-button:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(189, 150, 72, 0.5);
    background: linear-gradient(135deg, #d4a758 0%, #e8ba6a 100%);
  }

  .dice-button:active:not(:disabled) {
    transform: translateY(-1px);
  }

  .dice-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .dice-button.rolling .dice-icon {
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .dice-icon {
    font-size: 1.5rem;
    display: inline-block;
  }

  .result-display {
    padding: 1.5rem;
    background: linear-gradient(135deg, #1a1528 0%, #2b1d34 100%);
    border: 2px solid #bd9648;
    border-radius: 12px;
    color: #e3d5c1;
    animation: slideIn 0.3s ease;
  }

  .result-display.critical {
    border-color: #f1c40f;
    box-shadow: 0 0 20px rgba(241, 196, 15, 0.3);
  }

  .result-display.fumble {
    border-color: #e74c3c;
    box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .result-narrative {
    font-family: 'Spectral', serif;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .result-rewards {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .reward {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .reward.xp {
    background: rgba(241, 196, 15, 0.2);
    border: 1px solid #f1c40f;
    color: #f1c40f;
  }

  .reward.credits {
    background: rgba(189, 150, 72, 0.2);
    border: 1px solid #bd9648;
    color: #bd9648;
  }

  .status-gained {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: bold;
  }

  .status-gained.buff {
    background: rgba(46, 204, 113, 0.1);
    border: 1px solid #2ecc71;
    color: #2ecc71;
  }

  .status-gained.debuff {
    background: rgba(231, 76, 60, 0.1);
    border: 1px solid #e74c3c;
    color: #e74c3c;
  }
</style>
