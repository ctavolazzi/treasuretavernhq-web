import { parseMarkdown } from '$lib/utils/markdown';
import { ensureUniqueSlug, slugify } from '$lib/utils/slug';

export type TaleInput = {
  prompt: string;
  tone?: string;
  category: 'story' | 'poem' | 'song' | 'video' | 'interactive';
  featured?: boolean;
  imageStyle?: string;
  author?: string;
  dateLabel?: string;
};

export type TaleRecord = {
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  content_html: string;
  category: string;
  type: string;
  date_label: string;
  cover_image_url: string;
  featured: boolean;
  media_type: string | null;
  media_url: string | null;
  tags: string[];
};

export interface OpenAIClient {
  generateStory(input: TaleInput): Promise<{
    title: string;
    excerpt: string;
    tags: string[];
    markdown: string;
    imagePrompt: string;
  }>;
  generateImage(imagePrompt: string): Promise<{ imageData: Uint8Array; mimeType: string }>;
}

export interface StorageClient {
  uploadCover(slug: string, data: Uint8Array, mimeType: string): Promise<string>; // returns public URL
}

export interface TalesRepository {
  listSlugs(): Promise<string[]>;
  insert(record: TaleRecord): Promise<void>;
}

export class StoryGeneratorService {
  constructor(
    private readonly ai: OpenAIClient,
    private readonly storage: StorageClient,
    private readonly repo: TalesRepository
  ) {}

  async generateAndPersist(input: TaleInput): Promise<TaleRecord> {
    if (!input.prompt || input.prompt.trim().length < 10) {
      throw new Error('Prompt too short');
    }

    const draft = await this.ai.generateStory(input);
    const existingSlugs = new Set(await this.repo.listSlugs());
    const baseSlug = slugify(draft.title || input.prompt.slice(0, 50));
    const slug = ensureUniqueSlug(existingSlugs, baseSlug);

    const { imageData, mimeType } = await this.ai.generateImage(draft.imagePrompt);
    const coverUrl = await this.storage.uploadCover(slug, imageData, mimeType);

    const content_html = parseMarkdown(draft.markdown);

    const record: TaleRecord = {
      slug,
      title: draft.title,
      excerpt: draft.excerpt,
      content_md: draft.markdown,
      content_html,
      category: input.category,
      type: input.category === 'story' ? 'Story' : input.category.charAt(0).toUpperCase() + input.category.slice(1),
      date_label: input.dateLabel || 'Unknown Season',
      cover_image_url: coverUrl,
      featured: Boolean(input.featured),
      media_type: null,
      media_url: null,
      tags: draft.tags || []
    };

    await this.repo.insert(record);
    return record;
  }
}


