# Tale Social Sharing Metadata Implementation

## Status: Completed

## Description
This work effort implements proper metadata for social sharing of Tavern Tales stories. When a tale is shared via text messages, DMs, or social platforms, it should display the proper tale image in landscape format along with appropriate descriptions and metadata.

## Objectives
- [x] Create a centralized system for defining social sharing metadata
- [x] Implement proper Open Graph and Twitter Card meta tags
- [x] Ensure tale images appear properly in shared links
- [x] Use existing tale images without requiring special formatting
- [x] Ensure URLs and image paths are properly formatted as absolute URLs

## Files
- `src/lib/data/social-meta.ts` - New file with social metadata utilities
- `src/routes/tavern-tales/[slug]/+page.svelte` - Updated head section with proper meta tags
- `src/routes/tavern-tales/[slug]/+page.js` - Updated to provide absolute URLs

## Dependencies
None

## Notes
- The implementation uses the existing tale images rather than requiring new specially-formatted ones
- All URLs and image paths are properly converted to absolute URLs for social sharing
- Open Graph and Twitter Card meta tags are included for better sharing experience
- This creates a single source of truth for tale metadata
- The social sharing metadata is cleanly separated from the tale display logic