#!/bin/bash
# Moved from utils/scripts/png-to-webp.sh
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$DIR/.."
"$ROOT/utils/scripts/png-to-webp.sh" "$@"

