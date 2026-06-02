#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCES="$ROOT/config/sync-sources.tsv"
LOG_DIR="$ROOT/logs"
LOG_FILE="$LOG_DIR/rclone-sync-$(date -u +%Y%m%dT%H%M%SZ).log"

mkdir -p "$LOG_DIR"

if [[ ! -f "$SOURCES" ]]; then
  echo "Missing sources file: $SOURCES" >&2
  exit 1
fi

while IFS=$'\t' read -r enabled name remote_path local_path mode; do
  [[ -z "${enabled:-}" || "${enabled:0:1}" == "#" ]] && continue
  [[ "$enabled" != "yes" ]] && continue

  mkdir -p "$local_path"
  echo "[$(date -u +%FT%TZ)] $mode $name: $remote_path -> $local_path" | tee -a "$LOG_FILE"

  case "$mode" in
    copy)
      rclone copy "$remote_path" "$local_path" --create-empty-src-dirs --log-file "$LOG_FILE" --log-level INFO
      ;;
    sync)
      rclone sync "$remote_path" "$local_path" --create-empty-src-dirs --log-file "$LOG_FILE" --log-level INFO
      ;;
    *)
      echo "Unknown mode '$mode' for '$name'" >&2
      exit 1
      ;;
  esac
done < "$SOURCES"

"$ROOT/bin/refresh.sh"
echo "Log: $LOG_FILE"

