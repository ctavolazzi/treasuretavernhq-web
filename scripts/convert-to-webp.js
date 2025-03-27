#!/usr/bin/env node

/**
 * Image Conversion Script
 *
 * Converts PNG/JPG images to WebP format with appropriate quality settings.
 * Usage:
 *   - Convert a single file: node convert-to-webp.js path/to/image.png
 *   - Convert a directory: node convert-to-webp.js path/to/directory
 *   - Convert with custom quality: node convert-to-webp.js path/to/image.png 85
 *
 * The script will create WebP versions of the images while preserving the original files.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default quality level for WebP conversion
const DEFAULT_QUALITY = 90;

// Extensions to look for
const VALID_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Function to convert a single file
function convertToWebP(filePath, quality = DEFAULT_QUALITY) {
  // Only process files with valid extensions
  const ext = path.extname(filePath).toLowerCase();
  if (!VALID_EXTENSIONS.includes(ext)) {
    console.log(`Skipping ${filePath} - not a supported image format`);
    return;
  }

  // Generate output file path with .webp extension
  const outputPath = filePath.replace(ext, '.webp');

  try {
    console.log(`Converting ${filePath} to WebP (quality: ${quality})...`);
    execSync(`cwebp -q ${quality} "${filePath}" -o "${outputPath}"`);

    // Get file sizes to show reduction
    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(outputPath).size;
    const reduction = (100 - (webpSize / originalSize * 100)).toFixed(2);

    console.log(`✅ Created ${outputPath} (${(webpSize / 1024).toFixed(2)}KB, ${reduction}% smaller than original)`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}: ${error.message}`);
  }
}

// Function to process a directory recursively
function processDirectory(directoryPath, quality = DEFAULT_QUALITY) {
  try {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Recursively process subdirectories
        processDirectory(filePath, quality);
      } else {
        // Convert individual files
        convertToWebP(filePath, quality);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error.message}`);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node convert-to-webp.js <file-or-directory> [quality]');
    console.log('  quality: Optional, 0-100, default is 90');
    return;
  }

  const targetPath = args[0];
  const quality = args[1] ? parseInt(args[1], 10) : DEFAULT_QUALITY;

  if (isNaN(quality) || quality < 0 || quality > 100) {
    console.error('Quality must be a number between 0 and 100');
    return;
  }

  try {
    const stats = fs.statSync(targetPath);

    if (stats.isDirectory()) {
      console.log(`Processing directory: ${targetPath}`);
      processDirectory(targetPath, quality);
    } else {
      convertToWebP(targetPath, quality);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Check if cwebp is installed
try {
  execSync('which cwebp');
} catch (error) {
  console.error('Error: cwebp is not installed. Please install it first.');
  console.log('  macOS: brew install webp');
  console.log('  Ubuntu/Debian: sudo apt-get install webp');
  console.log('  Windows: Download from https://developers.google.com/speed/webp/download');
  process.exit(1);
}

main();