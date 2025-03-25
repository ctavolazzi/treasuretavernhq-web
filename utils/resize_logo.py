from PIL import Image
import os
import sys
from pathlib import Path

# Get the project root directory (adjust paths based on the script's location)
project_root = Path(__file__).parent.parent.absolute()

# Input and output file paths
input_path = project_root / "static" / "treasure-tavern-logo-transparent_HIGH-RES.png"
output_path = project_root / "static" / "treasure-tavern-logo-small.png"

# Target size for social media (1200x630 is a good size for most platforms)
# This maintains aspect ratio while making it smaller
target_width = 1200

def resize_logo():
    # Open the original image
    image = Image.open(input_path)
    original_width, original_height = image.size

    # Calculate the height to maintain aspect ratio
    target_height = int(original_height * (target_width / original_width))

    # Resize the image
    resized_image = image.resize((target_width, target_height), Image.LANCZOS)

    # Save the resized image with optimized settings
    resized_image.save(
        output_path,
        "PNG",
        optimize=True,
        quality=85,  # Lower quality = smaller file size
    )

    # Print file size info
    original_size = os.path.getsize(input_path) / (1024 * 1024)  # Convert to MB
    new_size = os.path.getsize(output_path) / (1024 * 1024)  # Convert to MB

    print(f"Original image: {original_width}x{original_height} pixels, {original_size:.2f} MB")
    print(f"Resized image: {target_width}x{target_height} pixels, {new_size:.2f} MB")
    print(f"Reduction: {(1 - (new_size / original_size)) * 100:.2f}%")
    print(f"Saved to: {output_path}")

if __name__ == "__main__":
    resize_logo()