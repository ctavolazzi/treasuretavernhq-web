/**
 * Image Utilities
 * Helper functions for image optimizations and fallbacks
 */

/**
 * Generates image paths for WebP with fallbacks to PNG and JPG
 * @param imagePath - The original image path (can be WebP, PNG, or JPEG)
 * @returns Object containing paths for different image formats
 */
export function getResponsiveImagePaths(imagePath: string): {
  webp: string;
  png: string;
  jpg: string;
  original: string;
} {
  // Normalize the path to handle any image format
  let basePath = imagePath;

  // If the path ends with an extension, remove it to get the base path
  const extensionMatch = imagePath.match(/\.(webp|png|jpe?g)$/i);
  if (extensionMatch) {
    basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
  }

  return {
    webp: `${basePath}.webp`,
    png: `${basePath}.png`,
    jpg: `${basePath}.jpg`,
    original: imagePath // Keep the original for reference
  };
}

/**
 * Creates a picture element string with WebP and fallbacks
 * @param props Image properties including source, alt text, and optional CSS class
 * @returns Picture element as a string with proper fallbacks
 */
export function createPictureElement(props: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { src, alt, className = '' } = props;
  const paths = getResponsiveImagePaths(src);

  return `
    <picture>
      <source srcset="${paths.webp}" type="image/webp">
      <source srcset="${paths.png}" type="image/png">
      <source srcset="${paths.jpg}" type="image/jpeg">
      <img
        src="${paths.png}"
        alt="${alt}"
        class="${className}"
        on:error={(e) => e.currentTarget.style.display = 'none'}
      />
    </picture>
  `;
}

/**
 * Helper to check if WebP is supported in the browser
 * @returns Promise that resolves to a boolean indicating WebP support
 */
export async function checkWebPSupport(): Promise<boolean> {
  // Simple feature detection
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  return new Promise<boolean>(resolve => {
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 1);
    };
  });
}

/**
 * Creates a responsive image component instance
 * @param src The image source path
 * @param alt Alt text for the image
 * @param className Optional CSS class name
 * @returns An HTML element for use in Svelte components
 */
export function ResponsiveImage(
  src: string,
  alt: string,
  className?: string
): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = createPictureElement({
    src,
    alt,
    className
  });
  return container.firstElementChild as HTMLElement;
}