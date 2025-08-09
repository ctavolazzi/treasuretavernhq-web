#!/bin/bash
# Moved from utils/scripts/remove-background.sh
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$DIR/.."
"$ROOT/utils/scripts/remove-background.sh" "$@"

