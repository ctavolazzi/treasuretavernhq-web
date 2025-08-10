### Scripts Overview

This folder now contains the canonical implementations for shell scripts. Previous shims that delegated to utils/scripts/ have been replaced with full scripts here.

- add-tale.sh: interactive helper to scaffold a new Tale
- png-to-webp.sh: converts PNGs to WebP
- remove-background.sh: removes image backgrounds
- create-lantern-gifs.sh: assembles lantern frames to GIFs

### Usage

- Run via npm where applicable:
  - npm run add-tale
- Or call directly:
  - bash scripts/png-to-webp.sh

### Consolidation status

- scripts/ is the single source of truth for shell scripts.
- utils/scripts/ will be deprecated; references should point to scripts/.

### Notes

- Scripts should be non-interactive by default when feasible.
- Prefer set -euo pipefail and clear error messages.
