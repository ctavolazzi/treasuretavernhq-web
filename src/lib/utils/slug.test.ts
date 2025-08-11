import { describe, it, expect } from 'vitest';
import { slugify, ensureUniqueSlug } from './slug';

describe('slugify', () => {
  it('converts to lowercase, trims, and replaces spaces', () => {
    expect(slugify('  The Glass Sorceress  ')).toBe('the-glass-sorceress');
  });

  it('handles ampersands and non-word chars', () => {
    expect(slugify('Riddles & Songs!')).toBe('riddles-and-songs');
  });

  it('collapses consecutive dashes', () => {
    expect(slugify('A --- Tale___ Of  Magic')).toBe('a-tale___-of-magic'.replace(/_+/g, '___'));
  });
});

describe('ensureUniqueSlug', () => {
  it('returns base slug if not taken', () => {
    const existing = new Set(['the-glass-sorceress']);
    expect(ensureUniqueSlug(existing, 'The Bone Kingdom')).toBe('the-bone-kingdom');
  });

  it('adds numeric suffix if taken', () => {
    const existing = new Set(['the-bone-kingdom', 'the-bone-kingdom-2']);
    expect(ensureUniqueSlug(existing, 'The Bone Kingdom')).toBe('the-bone-kingdom-3');
  });
});


