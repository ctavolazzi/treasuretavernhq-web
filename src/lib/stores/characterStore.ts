/**
 * Character Store - Persistent RPG Character State
 * Tracks player character across sessions using localStorage
 */

import { writable, get } from 'svelte/store';
import type { Character, JournalEntry, StatusEffect, CommandOutcome } from '$lib/types/rpg';
import { generateAbilityScores, calculateLevel, rollD20, narrateDiceRoll } from '$lib/utils/rpg';

const STORAGE_KEY = 'tavern_character';

/**
 * Create a new character with default stats
 */
function createDefaultCharacter(): Character {
  return {
    name: 'Adventurer',
    level: 1,
    hp: 20,
    maxHp: 20,
    xp: 0,
    credits: 0,
    abilities: generateAbilityScores(),
    statusEffects: [],
    journal: []
  };
}

/**
 * Load character from localStorage or create new one
 */
function loadCharacter(): Character {
  if (typeof window === 'undefined') return createDefaultCharacter();

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return createDefaultCharacter();
    }
  }
  return createDefaultCharacter();
}

/**
 * Create the character store
 */
function createCharacterStore() {
  const { subscribe, set, update } = writable<Character>(loadCharacter());

  return {
    subscribe,

    /**
     * Save character to localStorage
     */
    save: () => {
      const char = get({ subscribe });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
      }
    },

    /**
     * Reset character to default
     */
    reset: () => {
      const newChar = createDefaultCharacter();
      set(newChar);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newChar));
      }
    },

    /**
     * Perform an action with dice roll
     */
    performAction: (action: string, difficulty = 10): CommandOutcome => {
      const roll = rollD20();
      const success = roll.result >= difficulty;

      let xpGained = 0;
      let creditsGained = 0;
      let statusEffect: StatusEffect | undefined;

      // Calculate rewards
      if (roll.isCritical) {
        xpGained = 100;
        creditsGained = 50;
        statusEffect = {
          name: 'Harmonic Resonance',
          type: 'buff',
          duration: 3,
          description: '+2 to all rolls',
          icon: '⚡'
        };
      } else if (roll.isFumble) {
        statusEffect = {
          name: 'Entropy Spike',
          type: 'debuff',
          duration: 2,
          description: '-2 to all rolls',
          icon: '💥'
        };
      } else if (success) {
        xpGained = 25;
        creditsGained = 10;
      }

      // Update character
      update(char => {
        const newChar = { ...char };
        newChar.xp += xpGained;
        newChar.credits += creditsGained;

        // Check for level up
        const newLevel = calculateLevel(newChar.xp);
        if (newLevel > newChar.level) {
          newChar.level = newLevel;
          newChar.maxHp += 5;
          newChar.hp = newChar.maxHp;

          newChar.journal.push({
            timestamp: new Date().toISOString(),
            event: `Level up! Now level ${newLevel}`,
            type: 'levelup',
            details: `Gained 5 max HP`
          });
        }

        // Add status effect
        if (statusEffect) {
          newChar.statusEffects.push(statusEffect);
        }

        // Add journal entry
        newChar.journal.push({
          timestamp: new Date().toISOString(),
          event: action,
          type: roll.isCritical ? 'critical' : success ? 'success' : 'failure',
          roll
        });

        // Keep journal to last 50 entries
        if (newChar.journal.length > 50) {
          newChar.journal = newChar.journal.slice(-50);
        }

        return newChar;
      });

      // Save to localStorage
      const char = get({ subscribe });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
      }

      return {
        success,
        roll,
        xpGained,
        creditsGained,
        narrative: narrateDiceRoll(roll, action),
        statusEffect
      };
    },

    /**
     * Add a journal entry
     */
    addJournalEntry: (entry: Omit<JournalEntry, 'timestamp'>) => {
      update(char => {
        char.journal.push({
          ...entry,
          timestamp: new Date().toISOString()
        });

        if (char.journal.length > 50) {
          char.journal = char.journal.slice(-50);
        }

        return char;
      });

      const char = get({ subscribe });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
      }
    },

    /**
     * Update character name
     */
    setName: (name: string) => {
      update(char => {
        char.name = name;
        return char;
      });

      const char = get({ subscribe });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
      }
    }
  };
}

export const character = createCharacterStore();
