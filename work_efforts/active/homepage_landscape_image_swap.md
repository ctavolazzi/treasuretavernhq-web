# Homepage Landscape Image Swap

## Date: 2023-05-09

## Description
Replace both desktop and mobile welcome images on the home page with the new image `/static/images/tt-landscape-welcome-image.png`. Instead of having separate images for different screen sizes, use only the new landscape image for all screen sizes.

## Tasks
- [x] Identify the existing landscape image in the homepage code
- [x] Convert new image to WebP format for optimal performance
- [x] Replace both the PNG and WebP versions of the landscape image
- [x] Update the HTML to remove the portrait/mobile-specific image references
- [x] Modify the picture element to use the single new image on all screen sizes
- [ ] Verify that the image is properly displayed on both desktop and mobile

## File Locations
- Homepage component: `/src/routes/+page.svelte`
- Existing desktop image:
  - `/static/images/tavern-90s-main-ad-landscape.png`
  - `/static/images/tavern-90s-main-ad-landscape.webp`
- Existing mobile image:
  - `/static/images/tavern-90s-main-ad.png`
  - `/static/images/tavern-90s-main-ad.webp`
- New image to use on all screen sizes:
  - `/static/images/tt-landscape-welcome-image.png`
  - `/static/images/tt-landscape-welcome-image.webp`

## Completion Notes
- Successfully replaced desktop and mobile images with the single landscape image
- Created a WebP version of the new image for optimal performance
- Updated the homepage component to use the new image without media queries
- CSS for the welcome image was already responsive and didn't need changes