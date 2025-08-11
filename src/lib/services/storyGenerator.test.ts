import { describe, expect, it } from 'vitest';
import {
  StoryGeneratorService,
  type OpenAIClient,
  type StorageClient,
  type TalesRepository
} from './storyGenerator';

function makeAi(): OpenAIClient {
  return {
    async generateStory() {
      return {
        title: 'Whispers of the Void',
        excerpt: 'A traveler hears voices between the stars.',
        tags: ['void', 'traveler', 'stars'],
        markdown: '# Whispers of the Void\n\nAn eerie wind carried the sound of distant bells...\n',
        imagePrompt: 'mystical fantasy cover, void between stars, ornate frame'
      };
    },
    async generateImage() {
      return { imageData: new Uint8Array([1, 2, 3]), mimeType: 'image/png' };
    }
  };
}

function makeStorage(urlBase = 'https://storage.example.com'): StorageClient {
  return {
    async uploadCover(slug, _data, _mime) {
      return `${urlBase}/tales/cover/${slug}.png`;
    }
  };
}

function makeRepo(existing: string[] = []): TalesRepository {
  const slugs = new Set(existing);
  return {
    async listSlugs() {
      return Array.from(slugs);
    },
    async insert(record) {
      slugs.add(record.slug);
    }
  };
}

describe('StoryGeneratorService', () => {
  it('generates a tale, uploads image, saves record, returns full record', async () => {
    const service = new StoryGeneratorService(makeAi(), makeStorage(), makeRepo());
    const result = await service.generateAndPersist({
      prompt: 'cosmic horror in a gentle tone',
      category: 'story',
      featured: true
    });

    expect(result.slug).toBe('whispers-of-the-void');
    expect(result.title).toBe('Whispers of the Void');
    expect(result.cover_image_url).toContain('/tales/cover/whispers-of-the-void');
    expect(result.content_html).toContain('<h1');
    expect(result.category).toBe('story');
    expect(result.type).toBe('Story');
    expect(result.featured).toBe(true);
  });

  it('ensures unique slug if taken', async () => {
    const repo = makeRepo(['whispers-of-the-void']);
    const service = new StoryGeneratorService(makeAi(), makeStorage(), repo);
    const result = await service.generateAndPersist({ prompt: 'cosmic horror', category: 'story' });
    expect(result.slug).toBe('whispers-of-the-void-2');
  });

  it('rejects short prompts', async () => {
    const service = new StoryGeneratorService(makeAi(), makeStorage(), makeRepo());
    await expect(
      service.generateAndPersist({ prompt: 'too short', category: 'story' })
    ).rejects.toThrow('Prompt too short');
  });
});
