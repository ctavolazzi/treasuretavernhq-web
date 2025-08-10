#!/bin/bash
set -euo pipefail

# Require ffmpeg
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is not installed. Please install ffmpeg." >&2
  exit 1
fi

# Script to create lantern animation GIFs using ffmpeg with simplified flickering between two images
echo "Creating lantern animation GIFs with ffmpeg (two-image flickering)..."

# Create a temporary directory for the sequence of frames
mkdir -p temp_frames
trap 'rm -rf temp_frames' EXIT
# Make sure the output directory exists
mkdir -p static/gifs

# Validate required input images
for img in static/images/tavern-lantern-2.webp static/images/tavern-lantern.webp static/images/tavern-lantern-3.webp; do
  if [ ! -f "$img" ]; then
    echo "Error: Missing required image: $img" >&2
    exit 1
  fi
done

# Create a sequence that alternates between the two specified images
cp static/images/tavern-lantern-2.webp temp_frames/frame01.webp
cp static/images/tavern-lantern.webp temp_frames/frame02.webp
cp static/images/tavern-lantern-2.webp temp_frames/frame03.webp
cp static/images/tavern-lantern.webp temp_frames/frame04.webp
cp static/images/tavern-lantern-2.webp temp_frames/frame05.webp
cp static/images/tavern-lantern.webp temp_frames/frame06.webp
cp static/images/tavern-lantern-2.webp temp_frames/frame07.webp
cp static/images/tavern-lantern.webp temp_frames/frame08.webp
cp static/images/tavern-lantern-2.webp temp_frames/frame09.webp
cp static/images/tavern-lantern.webp temp_frames/frame10.webp

# Create a file with frame durations for variable timing (in centiseconds)
cat > temp_frames/framerate.txt << EOL
file 'frame01.webp'
duration 0.12
file 'frame02.webp'
duration 0.14
file 'frame03.webp'
duration 0.09
file 'frame04.webp'
duration 0.15
file 'frame05.webp'
duration 0.11
file 'frame06.webp'
duration 0.13
file 'frame07.webp'
duration 0.10
file 'frame08.webp'
duration 0.14
file 'frame09.webp'
duration 0.12
file 'frame10.webp'
EOL

# Create animation GIF with two-image flickering
echo "Creating animation GIF with two-image flickering..."
cd temp_frames
ffmpeg -y -f concat -i framerate.txt -vsync vfr -vf "fps=12,scale=180:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 ../static/gifs/tavern-lantern-animation.gif
cd ..

# Create success GIF (pulsing lit lantern)
echo "Creating success GIF..."
# Clean temp directory
rm -f temp_frames/*

# Copy success frames (keeping the same success animation)
cp static/images/tavern-lantern.webp temp_frames/success1.webp
cp static/images/tavern-lantern-3.webp temp_frames/success2.webp
cp static/images/tavern-lantern.webp temp_frames/success3.webp
cp static/images/tavern-lantern-3.webp temp_frames/success4.webp

# Create success GIF
ffmpeg -y -framerate 4 -i temp_frames/success%d.webp -vf "fps=4,scale=180:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 static/gifs/tavern-lantern-success.gif

# Clean up
echo "Cleaning up temporary files..."

echo "GIFs created successfully in static/gifs/"
