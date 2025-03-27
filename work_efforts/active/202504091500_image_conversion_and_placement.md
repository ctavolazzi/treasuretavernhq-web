---
title: "Image Conversion and Placement"
status: "active" # options: active, paused, completed
priority: "medium" # options: low, medium, high, critical
assignee: "AI Assistant"
created: "2025-04-09 15:00" # YYYY-MM-DD HH:mm
last_updated: "2025-04-09 15:00" # YYYY-MM-DD HH:mm
due_date: "2025-04-09" # YYYY-MM-DD
tags: [web, frontend, image-optimization, webp, design]
---

# Image Conversion and Placement

## 🚩 Objectives
- Convert the tavern-90s-landscape-tavern-girl-ad.png to WebP format for better performance
- Find an appropriate location to place the image on the site
- Ensure the image fits with the site's fantasy theme and aesthetic

## 🛠 Tasks
- [x] Convert the PNG image to WebP format
- [x] Determine the best location for the image
- [x] Add the image to the chosen location
- [x] Ensure proper responsive behavior
- [x] Test the image display across different devices

## 📝 Notes
- The image is located at /static/images/tavern-90s-landscape-tavern-girl-ad.png
- The site already uses WebP format for other images (as seen in the lantern images)
- Need to maintain the fantasy theme and aesthetic of the site
- Should consider responsive design implications
- Added the image as a lead-in to the tavern tales section
- Implemented proper WebP with PNG fallback
- Added descriptive text and call-to-action button
- Styled to match the site's fantasy theme
- Updated button text to "Read the Lore" for better thematic fit
- Made the image clickable with hover effects for better interactivity
- Modified lantern animation to play on page load
- Made lantern clickable to navigate to announcements page
- Aligned "Tavern" and "Announcements" to visually appear the same width
- Formatted subtitle text to display on multiple lines

## 🐞 Issues Encountered
- Initial attempts at preventing title wrapping were insufficient
- Clamp() function proved less reliable for ensuring no text wrapping
- Button centering required container layout adjustments
- Achieving visual alignment between different-length words required careful letter-spacing and padding adjustments

## ✅ Outcomes & Results
- Successfully converted the image to WebP format (86% size reduction)
- Added the image to the home page as a lead-in to the tavern tales section
- Implemented responsive design with proper styling
- Added descriptive text and call-to-action
- Maintained the site's fantasy theme and aesthetic
- Used proper image optimization techniques (WebP, lazy loading)
- Updated button text to better match the fantasy theme
- Made the image clickable with hover effects for better user interaction
- Modified lantern animation to play automatically on page load
- Added navigation from lantern to announcements page
- Created visually aligned two-line title with perfect width matching
- Split subtitle into multiple lines for improved readability
- Used letter-spacing and padding-right to ensure visual alignment

## 📌 Linked Items
- [[static/images/tavern-90s-landscape-tavern-girl-ad.png]]
- [[static/images/tavern-90s-landscape-tavern-girl-ad.webp]]
- [[src/routes/+page.svelte]]
- [[src/routes/announcements/+page.svelte]]
- [[src/routes/tavern-tales/+page.svelte]]

## 📅 Timeline & Progress
- **Started**: 2025-04-09 15:00
- **Updated**: 2025-04-09 16:40
- **Completed**: 2025-04-09 16:40