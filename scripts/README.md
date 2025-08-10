### Scripts Overview

This folder contains entry-point shell scripts for common tasks. Shims here delegate to existing implementations under utils/scripts/ to avoid breaking current npm script paths while we consolidate.

- add-tale.sh: interactive helper to scaffold a new Tale
- png-to-webp.sh: converts PNGs to WebP (delegates to utils/scripts/png-to-webp.sh)
- remove-background.sh: removes image backgrounds (delegates to utils/scripts/remove-background.sh)
- create-lantern-gifs.sh: assembles lantern frames to GIFs (delegates to utils/scripts/create-lantern-gifs.sh)

### Usage

- Run via npm where applicable:
  - npm run add-tale
- Or call directly:
  - bash scripts/png-to-webp.sh

### Planned consolidation

- Migrate canonical implementations from utils/scripts/ into scripts/ so this directory becomes the single source of truth.
- Keep CLI flags/behavior stable to preserve automation.

### Notes

- Scripts should be non-interactive by default when feasible.
- Prefer set -euo pipefail and clear error messages.
