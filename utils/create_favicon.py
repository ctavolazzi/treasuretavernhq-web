from PIL import Image
import os
from pathlib import Path

# Get the project root directory
project_root = Path(__file__).parent.parent.absolute()

# Input and output file paths
input_path = project_root / "static" / "treasure-tavern-logo-transparent_HIGH-RES.png"
favicon_dir = project_root / "static" / "favicon"

# Ensure the favicon directory exists
favicon_dir.mkdir(exist_ok=True)

# Common favicon sizes
favicon_sizes = [16, 32, 48, 64, 128, 192, 256]

def create_favicons():
    # Open the original image
    image = Image.open(input_path)

    # Create standard .ico file (supports multiple sizes)
    favicon_sizes_for_ico = [16, 32, 48, 64]
    ico_images = []

    for size in favicon_sizes_for_ico:
        resized = image.resize((size, size), Image.LANCZOS)
        ico_images.append(resized)

    # Save the .ico file (which contains multiple sizes)
    ico_path = favicon_dir / "favicon.ico"
    ico_images[0].save(
        ico_path,
        format="ICO",
        sizes=[(size, size) for size in favicon_sizes_for_ico],
        quality=85
    )

    # Create individual PNG files for each size
    for size in favicon_sizes:
        resized = image.resize((size, size), Image.LANCZOS)
        output_path = favicon_dir / f"favicon-{size}x{size}.png"
        resized.save(
            output_path,
            "PNG",
            optimize=True,
            quality=85
        )
        print(f"Created {size}x{size} favicon: {output_path}")

    # Create apple-touch-icon (180x180)
    apple_touch_size = 180
    apple_touch = image.resize((apple_touch_size, apple_touch_size), Image.LANCZOS)
    apple_touch_path = favicon_dir / "apple-touch-icon.png"
    apple_touch.save(
        apple_touch_path,
        "PNG",
        optimize=True,
        quality=90
    )

    print(f"Created apple-touch-icon: {apple_touch_path}")
    print(f"Created favicon.ico: {ico_path}")
    print(f"All favicons saved to: {favicon_dir}")

if __name__ == "__main__":
    create_favicons()