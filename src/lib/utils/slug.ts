export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function ensureUniqueSlug(existingSlugs: Set<string>, base: string): string {
  let candidate = slugify(base);
  if (!existingSlugs.has(candidate)) return candidate;
  let suffix = 2;
  while (existingSlugs.has(`${candidate}-${suffix}`)) {
    suffix++;
  }
  return `${candidate}-${suffix}`;
}


