/**
 * RPG System Types - Tavern Keeper Core
 * D&D 5e-inspired character system for Treasure Tavern
 */

// Ability scores (D&D 5e style)
export interface AbilityScores {
  STR: number; // Strength - Physical power
  DEX: number; // Dexterity - Agility and reflexes
  CON: number; // Constitution - Endurance
  INT: number; // Intelligence - Reasoning and memory
  WIS: number; // Wisdom - Awareness and insight
  CHA: number; // Charisma - Force of personality
}

// Character state
export interface Character {
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  xp: number;
  credits: number;
  abilities: AbilityScores;
  statusEffects: StatusEffect[];
  journal: JournalEntry[];
}

// Status effects (buffs/debuffs)
export interface StatusEffect {
  name: string;
  type: 'buff' | 'debuff';
  duration: number; // turns/actions remaining
  description: string;
  icon?: string;
}

// Journal entry for adventures
export interface JournalEntry {
  timestamp: string;
  event: string;
  type: 'success' | 'failure' | 'critical' | 'levelup' | 'observation';
  details?: string;
  roll?: DiceRoll;
}

// Dice roll result
export interface DiceRoll {
  dice: string; // e.g., "1d20", "2d6+3"
  result: number;
  isCritical: boolean;
  isFumble: boolean;
  hasAdvantage: boolean;
  hasDisadvantage: boolean;
}

// Command outcome
export interface CommandOutcome {
  success: boolean;
  roll: DiceRoll;
  xpGained: number;
  creditsGained: number;
  narrative: string;
  statusEffect?: StatusEffect;
}
