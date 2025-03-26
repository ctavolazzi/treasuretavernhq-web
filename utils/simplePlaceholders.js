#!/usr/bin/env node

/**
 * Simple Placeholder Image Generator
 * Uses Node.js to create placeholder images for Tavern Tales
 *
 * This simpler script uses direct file operations instead of FFMPEG
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Tale types and their colors
const taleTypes = {
  story: {
    bgColor: '13111C',
    textColor: 'F7E8D4'
  },
  poem: {
    bgColor: '1F1B2D',
    textColor: 'F7E8D4'
  },
  song: {
    bgColor: '131A28',
    textColor: 'E8F0F7'
  },
  interactive: {
    bgColor: '0D1A12',
    textColor: 'E8F7ED'
  },
  video: {
    bgColor: '28131A',
    textColor: 'F7E8ED'
  },
  error: {
    bgColor: '291A1A',
    textColor: 'F7E8E8'
  }
};

// Predefined tale data
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

/**
 * Generate a simple SVG placeholder and convert it to PNG
 */
async function generatePlaceholder(title, type, outputPath) {
  const typeInfo = taleTypes[type] || taleTypes.story;

  // Change output to PNG
  outputPath = outputPath.replace('.jpg', '.png');

  const svgContent = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#${typeInfo.bgColor}" />
  <text x="600" y="350" font-family="Arial" font-size="60" fill="#${typeInfo.textColor}" text-anchor="middle">${title}</text>
  <text x="600" y="450" font-family="Arial" font-size="40" fill="#${typeInfo.textColor}" text-anchor="middle">${type.toUpperCase()}</text>
  <text x="600" y="550" font-family="Arial" font-size="30" fill="#${typeInfo.textColor}" text-anchor="middle">PLACEHOLDER IMAGE</text>
</svg>
  `;

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write SVG directly to file with .svg extension
  const svgPath = outputPath.replace('.png', '.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Created SVG placeholder: ${svgPath}`);

  return svgPath;
}

/**
 * Create the specific error page placeholder
 */
async function generateErrorPlaceholder() {
  const outputPath = 'static/images/lost-traveler.png';
  const typeInfo = taleTypes.error;

  const svgContent = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#${typeInfo.bgColor}" />
  <text x="600" y="350" font-family="Arial" font-size="60" fill="#${typeInfo.textColor}" text-anchor="middle">Lost Traveler</text>
  <text x="600" y="450" font-family="Arial" font-size="40" fill="#${typeInfo.textColor}" text-anchor="middle">404 ERROR</text>
  <text x="600" y="550" font-family="Arial" font-size="30" fill="#${typeInfo.textColor}" text-anchor="middle">PLACEHOLDER IMAGE FOR ERROR PAGE</text>
</svg>
  `;

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write SVG to file
  const svgPath = outputPath.replace('.png', '.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Created error SVG placeholder: ${svgPath}`);

  return svgPath;
}

/**
 * Generate all the placeholder images
 */
async function generateAllPlaceholders() {
  // Create tales directory if it doesn't exist
  const talesDir = 'static/images/tales';
  if (!fs.existsSync(talesDir)) {
    fs.mkdirSync(talesDir, { recursive: true });
  }

  console.log('Generating tale placeholders...');

  const svgFiles = [];

  // Generate placeholders for all tales
  for (const tale of tales) {
    const svgPath = await generatePlaceholder(
      tale.title,
      tale.type,
      `static/images/tales/${tale.slug}.jpg`
    );
    svgFiles.push(svgPath);
  }

  // Generate the special error page placeholder
  const errorSvgPath = await generateErrorPlaceholder();
  svgFiles.push(errorSvgPath);

  console.log('✅ All SVG placeholders generated!');

  return svgFiles;
}

// Run the generator
console.log('🖼️ Simple Placeholder Image Generator');
generateAllPlaceholders()
  .then(svgFiles => {
    console.log("SVG files created successfully. Use them directly in your HTML with <img> tags.");
    console.log("Example usage: <img src='/images/tales/whispers-of-the-goblin-court.svg' alt='Tale title' />");
  })
  .catch(error => {
    console.error('❌ Error generating placeholders:', error);
  });