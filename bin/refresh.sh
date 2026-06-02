#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

"$ROOT/bin/build_index.py"
"$ROOT/bin/prepper_status.py"

echo "Prepper Disk refreshed at $ROOT"

