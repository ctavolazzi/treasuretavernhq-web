#!/usr/bin/env node

/**
 * Sitemap Generator
 *
 * This script generates a sitemap.xml file for the Treasure Tavern website
 * including all pages and tales.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Configuration
const baseUrl = 'https://treasuretavern.com'; // Replace with your actual domain when ready
const staticPages = ['/', '/about', '/contact', '/newsletter', '/announcements', '/tavern-tales'];

// Import tales data (adjust path as needed)
const talesDataPath = path.join(rootDir, 'src', 'lib', 'data', 'tales.js');

/**
 * Read and parse tales data to extract slugs
 * This is a simplified approach - in a real app, you might fetch from a database
 */
async function getTaleSlugs() {
  try {
    // We'll read the file as text and look for slug patterns
    const fileContent = fs.readFileSync(talesDataPath, 'utf-8');
    const slugPattern = /slug:\s+'([^']+)'/g;
    const matches = [...fileContent.matchAll(slugPattern)];

    return matches.map(match => match[1]);
  } catch (error) {
    console.error('Error reading tales data:', error);
    return [];
  }
}

/**
 * Generate sitemap XML content
 */
async function generateSitemap() {
  const taleSlugs = await getTaleSlugs();

  // XML header
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  staticPages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });

  // Add tale pages
  taleSlugs.forEach(slug => {
    const talePath = `/tavern-tales/${slug}`;
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${talePath}</loc>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  });

  // Close XML
  sitemap += '</urlset>';

  return sitemap;
}

/**
 * Write sitemap to file
 */
async function writeSitemap() {
  try {
    const sitemap = await generateSitemap();
    const outputPath = path.join(rootDir, 'static', 'sitemap.xml');

    fs.writeFileSync(outputPath, sitemap);
    console.log(`Sitemap generated successfully at ${outputPath}`);

    // Update robots.txt to reference the sitemap
    updateRobotsTxt();
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

/**
 * Update robots.txt to include sitemap reference
 */
function updateRobotsTxt() {
  const robotsPath = path.join(rootDir, 'static', 'robots.txt');

  try {
    let robotsContent = fs.readFileSync(robotsPath, 'utf-8');

    // Check if sitemap is already defined
    if (!robotsContent.includes('Sitemap:')) {
      // Add sitemap reference
      robotsContent = robotsContent.replace(
        '# Sitemap location (when added)',
        '# Sitemap location'
      );

      robotsContent = robotsContent.replace(
        '# Sitemap: https://treasuretavern.com/sitemap.xml',
        'Sitemap: https://treasuretavern.com/sitemap.xml'
      );

      fs.writeFileSync(robotsPath, robotsContent);
      console.log('Updated robots.txt with sitemap reference');
    }
  } catch (error) {
    console.error('Error updating robots.txt:', error);
  }
}

// Execute main function
writeSitemap();
