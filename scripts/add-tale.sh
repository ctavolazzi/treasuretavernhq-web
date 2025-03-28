#!/bin/bash

# add-tale.sh - Helper script to add new tales to Treasure Tavern
# Usage: ./scripts/add-tale.sh "My New Tale"

# Check if a title was provided
if [ -z "$1" ]; then
  echo "Please provide a tale title"
  echo "Usage: ./scripts/add-tale.sh \"My New Tale\""
  exit 1
fi

# Convert title to slug
slug=$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')

# Define directories
TALES_DIR="static/tales"
TEMPLATE_DIR="$TALES_DIR/template"
IMAGES_DIR="static/images/tales"
NEW_TALE_DIR="$TALES_DIR/$slug"

# Check if the tale directory already exists
if [ -d "$NEW_TALE_DIR" ]; then
  echo "Error: Tale with slug '$slug' already exists"
  exit 1
fi

# Create the tale directory
mkdir -p "$NEW_TALE_DIR"
mkdir -p "$IMAGES_DIR"

# Copy the template and rename it
cp "$TEMPLATE_DIR/template.txt" "$NEW_TALE_DIR/$slug.txt"

echo "✅ Tale directory created: $NEW_TALE_DIR"
echo "✅ Template copied to: $NEW_TALE_DIR/$slug.txt"
echo ""
echo "Next steps:"
echo "1. Edit the tale content in: $NEW_TALE_DIR/$slug.txt"
echo "2. Add a cover image to: $IMAGES_DIR/$slug.png"
echo "3. Add the tale metadata to src/lib/data/tales.js using this template:"
echo ""
echo "{
    slug: '$slug',
    title: '$1',
    type: 'Story',  // Update as needed: Story, Poem, Song, etc.
    category: 'story', // Update as needed: story, poem, song, video, interactive
    date: 'Season',  // Update with appropriate season or date
    author: 'Author Name',  // Update with author name
    excerpt: 'A brief description of the tale that will appear in listings.',
    coverImage: '/images/tales/$slug.png',
    featured: false,  // Set to true to feature on homepage
    mediaType: null,  // 'audio', 'video', or null
    mediaContent: null,  // Path to media file or null
    tags: ['tag1', 'tag2', 'tag3'],  // Update with appropriate tags
    useExternalContent: true  // Keep this true to load from the text file
}"

echo ""
echo "Use this command to add your metadata to tales.js:"
echo "code src/lib/data/tales.js"