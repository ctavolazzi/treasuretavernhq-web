import { describe, expect, it } from 'vitest';
import { resolveOpenAiKey } from './apiKey';

describe('resolveOpenAiKey', () => {
  it('returns provided key when available', () => {
    expect(
      resolveOpenAiKey({ providedKey: 'sk-provided', envKey: 'sk-env', isDev: true })
    ).toBe('sk-provided');
  });

  it('uses env key in dev when provided key missing', () => {
    expect(resolveOpenAiKey({ providedKey: '', envKey: 'sk-env', isDev: true })).toBe('sk-env');
  });

  it('throws in prod when provided key missing', () => {
    expect(() => resolveOpenAiKey({ providedKey: '', envKey: 'sk-env', isDev: false })).toThrow(
      /Missing OpenAI API key/
    );
  });
});


