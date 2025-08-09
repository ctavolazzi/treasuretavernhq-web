#!/bin/bash
# Moved from utils/scripts/create-lantern-gifs.sh
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$DIR/.."
"$ROOT/utils/scripts/create-lantern-gifs.sh" "$@"

