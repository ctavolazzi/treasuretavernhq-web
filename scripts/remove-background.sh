#!/bin/bash
set -euo pipefail

# Require ffmpeg
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is not installed. Please install ffmpeg." >&2
  exit 1
fi

# Script to remove background from tavern-song-scroll.png using ffmpeg
echo "Removing background from tavern-song-scroll.png..."

# Input and output paths
INPUT_FILE="static/images/tavern-song-scroll.png"
OUTPUT_FILE="static/images/tavern-song-scroll-transparent.png"
TEMP_DIR="temp"
mkdir -p "$TEMP_DIR"
trap 'rm -rf "$TEMP_DIR"' EXIT

# Strategy: Use multiple passes with different filter techniques

# First, try a more nuanced approach with chromakey
# We'll use multiple color ranges to target different parts of the background
echo "Using advanced multi-pass background removal..."

# Pass 1: Create a version with the initial background removal
echo "Pass 1: Initial background removal with primary background color..."
ffmpeg -i "$INPUT_FILE" -vf "colorkey=0x4d4d4d:0.15:0.1" -frames:v 1 -update 1 "$TEMP_DIR/pass1.png"

# Pass 2: Target lighter gray areas in the background
echo "Pass 2: Targeting additional background areas..."
ffmpeg -i "$TEMP_DIR/pass1.png" -vf "colorkey=0x5a5a5a:0.15:0.1" -frames:v 1 -update 1 "$TEMP_DIR/pass2.png"

# Pass 3: Target darker gray areas in the background
echo "Pass 3: Targeting darker background areas..."
ffmpeg -i "$TEMP_DIR/pass2.png" -vf "colorkey=0x3a3a3a:0.15:0.1" -frames:v 1 -update 1 "$OUTPUT_FILE"

echo "Clean up temporary files..."

echo "Background removal completed: $OUTPUT_FILE"
echo "Please check the results and adjust parameters as needed for optimal results."
echo "If the results are still not ideal, consider using a dedicated image editing tool like GIMP or Photoshop for more precise removal."