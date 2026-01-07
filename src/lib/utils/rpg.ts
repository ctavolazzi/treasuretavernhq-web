/**
 * RPG System Utilities - Dice Rolling & Game Mechanics
 */

import type { DiceRoll, AbilityScores } from '$lib/types/rpg';

/**
 * Roll a d20 with optional advantage/disadvantage
 */
export function rollD20(advantage = false, disadvantage = false): DiceRoll {
  const roll1 = Math.floor(Math.random() * 20) + 1;

  if (!advantage && !disadvantage) {
    return {
      dice: '1d20',
      result: roll1,
      isCritical: roll1 === 20,
      isFumble: roll1 === 1,
      hasAdvantage: false,
      hasDisadvantage: false
    };
  }

  const roll2 = Math.floor(Math.random() * 20) + 1;
  const result = advantage ? Math.max(roll1, roll2) : Math.min(roll1, roll2);

  return {
    dice: advantage ? '1d20 (advantage)' : '1d20 (disadvantage)',
    result,
    isCritical: result === 20,
    isFumble: result === 1,
    hasAdvantage: advantage,
    hasDisadvantage: disadvantage
  };
}

/**
 * Roll any dice notation (e.g., "2d6+3")
 */
export function rollDice(notation: string): number {
  const match = notation.match(/(\d+)d(\d+)([+-]\d+)?/);
  if (!match) return 0;

  const [, numDice, dieSize, modifier] = match;
  const dice = parseInt(numDice);
  const sides = parseInt(dieSize);
  const mod = modifier ? parseInt(modifier) : 0;

  let total = 0;
  for (let i = 0; i < dice; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }

  return total + mod;
}

/**
 * Calculate ability modifier (D&D 5e formula)
 */
export function getModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

/**
 * Calculate XP needed for next level
 */
export function xpForNextLevel(currentLevel: number): number {
  return currentLevel * currentLevel * 100;
}

/**
 * Generate default ability scores (standard array)
 */
export function generateAbilityScores(): AbilityScores {
  return {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 12,
    WIS: 10,
    CHA: 12
  };
}

/**
 * Create a narrative for a dice roll outcome
 */
export function narrateDiceRoll(roll: DiceRoll, action: string): string {
  if (roll.isCritical) {
    return `⚡ Natural 20! ${action} succeeds spectacularly!`;
  }
  if (roll.isFumble) {
    return `💥 Critical fumble! ${action} goes horribly wrong...`;
  }
  if (roll.result >= 15) {
    return `✨ Rolled ${roll.result}. ${action} succeeds!`;
  }
  if (roll.result >= 10) {
    return `✓ Rolled ${roll.result}. ${action} barely succeeds.`;
  }
  return `✗ Rolled ${roll.result}. ${action} fails.`;
}
