<script lang="ts">
  import { character } from '$lib/stores/characterStore';
  import { getModifier, xpForNextLevel } from '$lib/utils/rpg';

  let showJournal = false;

  $: xpNeeded = xpForNextLevel($character.level);
  $: xpProgress = ($character.xp / xpNeeded) * 100;
</script>

<div class="character-sheet">
  <!-- Header -->
  <div class="sheet-header">
    <h2 class="character-name">{$character.name}</h2>
    <div class="level-badge">Level {$character.level}</div>
  </div>

  <!-- HP and XP -->
  <div class="vitals">
    <div class="stat-bar">
      <div class="stat-label">
        <span>HP</span>
        <span class="stat-value">{$character.hp}/{$character.maxHp}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill hp-fill" style="width: {($character.hp / $character.maxHp) * 100}%" />
      </div>
    </div>

    <div class="stat-bar">
      <div class="stat-label">
        <span>XP</span>
        <span class="stat-value">{$character.xp}/{xpNeeded}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill xp-fill" style="width: {xpProgress}%" />
      </div>
    </div>

    <div class="currency">
      <span class="credits-icon">💰</span>
      <span>{$character.credits} Credits</span>
    </div>
  </div>

  <!-- Ability Scores -->
  <div class="abilities">
    {#each Object.entries($character.abilities) as [ability, score]}
      <div class="ability-score">
        <div class="ability-name">{ability}</div>
        <div class="ability-value">{score}</div>
        <div class="ability-modifier">
          {getModifier(score) >= 0 ? '+' : ''}{getModifier(score)}
        </div>
      </div>
    {/each}
  </div>

  <!-- Status Effects -->
  {#if $character.statusEffects.length > 0}
    <div class="status-effects">
      <h3>Active Effects</h3>
      {#each $character.statusEffects as effect}
        <div class="status-effect {effect.type}">
          <span class="effect-icon">{effect.icon}</span>
          <span class="effect-name">{effect.name}</span>
          <span class="effect-duration">({effect.duration} turns)</span>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Journal Toggle -->
  <button class="journal-toggle" on:click={() => showJournal = !showJournal}>
    {showJournal ? '📕 Hide' : '📖 Show'} Adventure Journal
  </button>

  <!-- Journal -->
  {#if showJournal}
    <div class="journal">
      <h3>Recent Adventures</h3>
      <div class="journal-entries">
        {#each $character.journal.slice().reverse().slice(0, 10) as entry}
          <div class="journal-entry {entry.type}">
            <div class="entry-header">
              <span class="entry-type">{entry.type}</span>
              <span class="entry-time">{new Date(entry.timestamp).toLocaleString()}</span>
            </div>
            <div class="entry-event">{entry.event}</div>
            {#if entry.roll}
              <div class="entry-roll">
                🎲 {entry.roll.dice}: {entry.roll.result}
                {#if entry.roll.isCritical}⚡{/if}
                {#if entry.roll.isFumble}💥{/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .character-sheet {
    background: linear-gradient(135deg, #1a1528 0%, #2b1d34 100%);
    border: 2px solid #bd9648;
    border-radius: 12px;
    padding: 1.5rem;
    color: #e3d5c1;
    font-family: 'Spectral', serif;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  .sheet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #bd9648;
  }

  .character-name {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    color: #bd9648;
    margin: 0;
  }

  .level-badge {
    background: #bd9648;
    color: #13111c;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .vitals {
    margin-bottom: 1.5rem;
  }

  .stat-bar {
    margin-bottom: 1rem;
  }

  .stat-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #bd9648;
  }

  .stat-value {
    color: #e3d5c1;
  }

  .progress-bar {
    height: 12px;
    background: #13111c;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #bd9648;
  }

  .progress-fill {
    height: 100%;
    transition: width 0.3s ease;
  }

  .hp-fill {
    background: linear-gradient(90deg, #c8102e 0%, #e74c3c 100%);
  }

  .xp-fill {
    background: linear-gradient(90deg, #bd9648 0%, #f1c40f 100%);
  }

  .currency {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #13111c;
    border-radius: 8px;
    border: 1px solid #bd9648;
    text-align: center;
    font-size: 1.1rem;
  }

  .credits-icon {
    margin-right: 0.5rem;
  }

  .abilities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .ability-score {
    background: #13111c;
    border: 1px solid #bd9648;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
  }

  .ability-name {
    font-size: 0.8rem;
    color: #bd9648;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .ability-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e3d5c1;
  }

  .ability-modifier {
    font-size: 0.9rem;
    color: #888;
  }

  .status-effects {
    margin-bottom: 1.5rem;
  }

  .status-effects h3 {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    margin-bottom: 0.75rem;
  }

  .status-effect {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .status-effect.buff {
    background: rgba(46, 204, 113, 0.1);
    border: 1px solid #2ecc71;
  }

  .status-effect.debuff {
    background: rgba(231, 76, 60, 0.1);
    border: 1px solid #e74c3c;
  }

  .effect-icon {
    font-size: 1.2rem;
  }

  .effect-duration {
    margin-left: auto;
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .journal-toggle {
    width: 100%;
    padding: 0.75rem;
    background: #bd9648;
    color: #13111c;
    border: none;
    border-radius: 8px;
    font-family: 'Spectral', serif;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }

  .journal-toggle:hover {
    background: #d4a758;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(189, 150, 72, 0.3);
  }

  .journal {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #bd9648;
  }

  .journal h3 {
    font-family: 'Cinzel', serif;
    color: #bd9648;
    margin-bottom: 1rem;
  }

  .journal-entries {
    max-height: 400px;
    overflow-y: auto;
  }

  .journal-entry {
    padding: 1rem;
    margin-bottom: 0.75rem;
    background: #13111c;
    border-left: 3px solid;
    border-radius: 6px;
  }

  .journal-entry.success {
    border-left-color: #2ecc71;
  }

  .journal-entry.failure {
    border-left-color: #e74c3c;
  }

  .journal-entry.critical {
    border-left-color: #f1c40f;
    background: rgba(241, 196, 15, 0.05);
  }

  .journal-entry.levelup {
    border-left-color: #bd9648;
    background: rgba(189, 150, 72, 0.1);
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .entry-type {
    text-transform: uppercase;
    font-weight: bold;
  }

  .entry-event {
    margin-bottom: 0.5rem;
  }

  .entry-roll {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .abilities {
      grid-template-columns: repeat(2, 1fr);
    }

    .character-name {
      font-size: 1.4rem;
    }
  }
</style>
