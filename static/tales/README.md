# Adding New Tales to Treasure Tavern

This directory contains all the tales for the Treasure Tavern website. Each tale is stored in its own directory with its content in a text file.

## Quick Start Guide

To add a new tale:

1. Create a new directory in `static/tales/` with the slug of your tale (e.g., `my-new-tale`)
2. Copy the template.txt file from the template folder into your new directory
3. Rename the file to match your tale's slug (e.g., `my-new-tale.txt`)
4. Edit the content with your tale
5. Add a cover image to `static/images/tales/` with the same slug name (e.g., `my-new-tale.png`)
6. Add the tale metadata to `src/lib/data/tales.js` using the format below

## Tale Metadata Format

Add your tale's metadata to the `talesData` array in `src/lib/data/tales.js`:

```javascript
{
    slug: 'my-new-tale',
    title: 'My New Tale',
    type: 'Story',  // Story, Poem, Song, etc.
    category: 'story', // story, poem, song, video, interactive
    date: 'Winter Solstice',
    author: 'The Author',
    excerpt: 'A brief description of the tale that will appear in listings.',
    coverImage: '/images/tales/my-new-tale.png',
    featured: false, // Set to true to feature on the homepage
    mediaType: null, // 'audio', 'video', or null
    mediaContent: null, // Path to media file or null
    tags: ['tag1', 'tag2', 'tag3'],
    useExternalContent: true // Important! This tells the system to load from the text file
}
```

## Markdown Formatting

Tales support full Markdown formatting! Here are the supported Markdown features:

### Headers

```
# Level 1 Header
## Level 2 Header
### Level 3 Header
```

### Text Formatting

```
**Bold text** or __Bold text__
*Italic text* or _Italic text_
~~Strikethrough text~~
```

### Lists

```
- Unordered list item
- Another item
* Also works with asterisks

1. Ordered list item
2. Second item
3. Third item
```

### Links and Images

```
[Link text](https://example.com)
![Image alt text](/path/to/image.jpg)
```

### Blockquotes

```
> This is a blockquote
> It can span multiple lines
```

### Code

```
`Inline code`

```
Code block
with multiple lines
```
```

### Horizontal Rules

```
---
```

### Special Formatting

The tale system also supports our special formatting rules:

- Lines that start with `- ` (dash followed by space) are formatted as signature/attribution paragraphs
- Text surrounded by quotes (`"like this"`) is formatted as dialog

## Cover Images

Cover images should be:
- PNG or WebP format
- Approximately 800x600 pixels
- Placed in the `static/images/tales/` directory
- Named with the same slug as your tale

## Media Support

The system supports:
- Audio narration (add path to `mediaContent` and set `mediaType` to 'audio')
- Video content (add path to `mediaContent` and set `mediaType` to 'video')