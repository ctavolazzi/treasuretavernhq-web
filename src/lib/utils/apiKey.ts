export type ResolveApiKeyParams = {
  providedKey?: string | null | undefined;
  envKey?: string | null | undefined;
  isDev: boolean;
};

export function resolveOpenAiKey({ providedKey, envKey, isDev }: ResolveApiKeyParams): string {
  const trimmedProvided = (providedKey || '').trim();
  if (trimmedProvided.length > 0) return trimmedProvided;

  if (isDev) {
    const trimmedEnv = (envKey || '').trim();
    if (trimmedEnv.length > 0) return trimmedEnv;
  }

  throw new Error('Missing OpenAI API key. Provide it in the form. In development, you may set OPENAI_API_KEY in .env.');
}


