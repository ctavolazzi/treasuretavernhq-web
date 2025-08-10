#!/bin/bash

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed. Please install ffmpeg to continue."
    exit 1
fi

# Get input and output file paths from command line arguments
INPUT_FILE=${1:-"static/images/tavern-song-scroll-transparent.png"}
OUTPUT_FILE=${2:-"static/images/tavern-song-scroll-transparent.webp"}

# Default quality level - 90 is a good balance between quality and file size
QUALITY=${3:-90}

echo "Converting $INPUT_FILE to WebP format..."

# Use ffmpeg to convert PNG to WebP with quality setting and maintaining transparency
ffmpeg -i "$INPUT_FILE" -c:v libwebp -quality "$QUALITY" -lossless 0 -compression_level 6 -q:v 90 -pix_fmt yuva420p "$OUTPUT_FILE"

# Check if conversion was successful
if [ $? -eq 0 ]; then
    # Get file sizes for comparison
    ORIGINAL_SIZE=$(du -h "$INPUT_FILE" | cut -f1)
    NEW_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)

    echo "Conversion successful!"
    echo "Original file ($INPUT_FILE): $ORIGINAL_SIZE"
    echo "WebP file ($OUTPUT_FILE): $NEW_SIZE"
    echo "You can use the WebP image with PNG fallback in your code."
else
    echo "Error: Conversion failed."
    exit 1
fi

exit 0