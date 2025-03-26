#!/usr/bin/env node

/**
 * Tavern Tales Image Generator
 *
 * This utility script generates fantasy-themed placeholder images for the Tavern Tales section.
 * It can create images with customized text overlays, gradients, and effects.
 *
 * Usage:
 *   node utils/generatePlaceholders.js --title "Whispers of the Void" --output "static/images/tales/void-whispers.jpg"
 *
 * Options:
 *   --width     Width of the output image (default: 1200)
 *   --height    Height of the output image (default: 800)
 *   --title     Title text to overlay on the image
 *   --type      Image type: 'story', 'poem', 'song', 'interactive', 'video' (default: 'story')
 *   --output    Output file path
 *   --batch     Generate all placeholder images for tales defined in data file
 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  width: 1200,
  height: 800,
  title: '',
  type: 'story',
  output: '',
  batch: false
};

// Parse arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '--width' && i + 1 < args.length) {
    options.width = parseInt(args[++i], 10);
  } else if (arg === '--height' && i + 1 < args.length) {
    options.height = parseInt(args[++i], 10);
  } else if (arg === '--title' && i + 1 < args.length) {
    options.title = args[++i];
  } else if (arg === '--type' && i + 1 < args.length) {
    options.type = args[++i];
  } else if (arg === '--output' && i + 1 < args.length) {
    options.output = args[++i];
  } else if (arg === '--batch') {
    options.batch = true;
  }
}

// Color schemes for different tale types
const colorSchemes = {
  story: {
    gradientStart: '13111C',
    gradientEnd: '2B1D34',
    textColor: 'F7E8D4',
    accentColor: 'BD9648'
  },
  poem: {
    gradientStart: '1F1B2D',
    gradientEnd: '3A2A4C',
    textColor: 'F7E8D4',
    accentColor: '9E61E3'
  },
  song: {
    gradientStart: '131A28',
    gradientEnd: '27334D',
    textColor: 'E8F0F7',
    accentColor: '6189E3'
  },
  interactive: {
    gradientStart: '0D1A12',
    gradientEnd: '1A3828',
    textColor: 'E8F7ED',
    accentColor: '48BD7A'
  },
  video: {
    gradientStart: '28131A',
    gradientEnd: '4D2733',
    textColor: 'F7E8ED',
    accentColor: 'BD4879'
  },
  error: {
    gradientStart: '291A1A',
    gradientEnd: '4D2A2A',
    textColor: 'F7E8E8',
    accentColor: 'BD4848'
  }
};

/**
 * Generate a fantasy-themed image using FFMPEG
 */
async function generateImage(options) {
  const { width, height, title, type, output } = options;
  const colors = colorSchemes[type] || colorSchemes.story;

  // Ensure the output directory exists
  const outputDir = path.dirname(output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create a gradient background with FFmpeg
  const ffmpegCommand = [
    'ffmpeg -y',
    `-f lavfi -i "color=s=${width}x${height}:c=0x${colors.gradientStart}[c1]; `,
    `color=s=${width}x${height}:c=0x${colors.gradientEnd}[c2]; `,
    `[c1][c2]blend=all_mode=overlay:all_opacity=0.7"`,
    // Add some noise for texture
    `-vf "noise=alls=20:allf=t,`,
    // Add the title text
    `drawtext=fontfile=/System/Library/Fonts/Supplemental/Times New Roman.ttf:`,
    `text='${title.replace(/'/g, "\\'")}':`,
    `fontcolor=0x${colors.textColor}:fontsize=${width/15}:x=(w-text_w)/2:y=h/2.5,`,
    // Add a smaller type indicator text
    `drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:`,
    `text='${type.toUpperCase()}':`,
    `fontcolor=0x${colors.accentColor}:fontsize=${width/30}:x=(w-text_w)/2:y=h/1.7,`,
    // Add a placeholder explanation text
    `drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:`,
    `text='PLACEHOLDER IMAGE FOR ${type.toUpperCase()} CONTENT':`,
    `fontcolor=0x${colors.textColor}:fontsize=${width/40}:x=(w-text_w)/2:y=h/1.3,`,
    // Add a decorative line
    `drawbox=x=(w-w/3)/2:y=h/1.5:w=w/3:h=2:color=0x${colors.accentColor}:t=fill"`,
    output
  ].join(' ');

  console.log(`Generating image: ${output}`);

  try {
    await execPromise(ffmpegCommand);
    console.log(`✅ Successfully created: ${output}`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating image: ${error.message}`);

    // Simpler fallback if the advanced command fails
    try {
      console.log(`Attempting simpler fallback for ${output}...`);
      const fallbackCommand = [
        'ffmpeg -y',
        `-f lavfi -i "color=s=${width}x${height}:c=0x${colors.gradientStart}"`,
        `-vf "drawtext=fontfile=/System/Library/Fonts/Arial.ttf:`,
        `text='${title.replace(/'/g, "\\'")} (${type.toUpperCase()})':`,
        `fontcolor=0x${colors.textColor}:fontsize=${width/15}:x=(w-text_w)/2:y=h/2,`,
        `drawtext=fontfile=/System/Library/Fonts/Arial.ttf:`,
        `text='PLACEHOLDER IMAGE':`,
        `fontcolor=0x${colors.accentColor}:fontsize=${width/25}:x=(w-text_w)/2:y=h/1.5"`,
        output
      ].join(' ');

      await execPromise(fallbackCommand);
      console.log(`✅ Successfully created fallback: ${output}`);
      return true;
    } catch (fallbackError) {
      console.error(`❌ Error generating fallback image: ${fallbackError.message}`);

      // Last resort - create a solid color image with text
      try {
        console.log(`Attempting final fallback for ${output}...`);
        const lastResortCommand = `convert -size ${width}x${height} xc:#${colors.gradientStart} -gravity center -pointsize ${width/15} -fill white -annotate 0 "${title}" ${output}`;

        await execPromise(lastResortCommand);
        console.log(`✅ Created basic placeholder: ${output}`);
        return true;
      } catch (lastError) {
        console.error(`❌ All image generation attempts failed for ${output}`);
        return false;
      }
    }
  }
}

/**
 * Generate a batch of images for all tales in the data file
 */
async function generateBatchImages() {
  try {
    // This would typically load from your tales.js file, but for simplicity
    // we'll define some example tales here
    const tales = [
      {
        slug: 'whispers-of-the-goblin-court',
        title: 'Whispers of the Goblin Court',
        type: 'story'
      },
      {
        slug: 'ballad-of-the-wandering-knight',
        title: 'Ballad of the Wandering Knight',
        type: 'poem'
      },
      {
        slug: 'scales-of-forgotten-songs',
        title: 'Scales of Forgotten Songs',
        type: 'song'
      },
      {
        slug: 'riddles-in-the-dark',
        title: 'Riddles in the Dark',
        type: 'interactive'
      },
      {
        slug: 'twilight-of-the-forest-guardians',
        title: 'Twilight of the Forest Guardians',
        type: 'video'
      },
      {
        slug: 'whispers-of-the-void',
        title: 'Whispers of the Void',
        type: 'story'
      },
      {
        slug: 'lost-traveler',
        title: 'Lost Traveler',
        type: 'story'
      }
    ];

    console.log(`Generating ${tales.length} images...`);

    // Ensure the static directories exist
    const staticDir = 'static/images/tales';
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    // Generate images for each tale
    for (const tale of tales) {
      await generateImage({
        width: 1200,
        height: 800,
        title: tale.title,
        type: tale.type,
        output: `static/images/tales/${tale.slug}.jpg`
      });
    }

    // Generate a special error page image
    await generateImage({
      width: 1200,
      height: 800,
      title: 'Lost Traveler',
      type: 'error',
      output: `static/images/lost-traveler.jpg`
    });

    console.log('✅ Batch generation complete');
  } catch (error) {
    console.error(`❌ Error in batch generation: ${error.message}`);
  }
}

// Main execution
async function main() {
  console.log('🖼️  Tavern Tales Image Generator');

  if (options.batch) {
    await generateBatchImages();
  } else if (options.output) {
    if (!options.title) {
      console.error('❌ Error: --title is required when generating a single image');
      process.exit(1);
    }
    await generateImage(options);
  } else {
    console.log(`
Usage:
  node utils/generatePlaceholders.js --title "Image Title" --output "path/to/output.jpg"
  node utils/generatePlaceholders.js --batch

Options:
  --width     Width of the output image (default: 1200)
  --height    Height of the output image (default: 800)
  --title     Title text to overlay on the image
  --type      Image type: 'story', 'poem', 'song', 'interactive', 'video' (default: 'story')
  --output    Output file path
  --batch     Generate all placeholder images for tales defined in script
    `);
  }
}

main();