#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACK="${1:-$ROOT/config/content-pack-official.tsv}"
LOG_DIR="$ROOT/logs"
LOG_FILE="$LOG_DIR/content-download-$(date -u +%Y%m%dT%H%M%SZ).log"
SOURCES_MD="$ROOT/99_Indexes_and_Checksums/OFFICIAL_SOURCES.md"

mkdir -p "$LOG_DIR"

if [[ ! -f "$PACK" ]]; then
  echo "Missing content pack: $PACK" >&2
  exit 1
fi

{
  echo "# Official Content Sources"
  echo
  echo "Generated: $(date -u +%FT%TZ)"
  echo
  echo "| Category | File | Source | URL |"
  echo "|---|---|---|---|"
} > "$SOURCES_MD"

failed=0
failures=()

while IFS=$'\t' read -r enabled category filename url source; do
  [[ -z "${enabled:-}" || "${enabled:0:1}" == "#" ]] && continue
  [[ "$enabled" != "yes" ]] && continue

  dest_dir="$ROOT/$category"
  dest="$dest_dir/$filename"
  tmp="$dest.tmp"
  mkdir -p "$dest_dir"

  echo "Downloading $source -> $dest" | tee -a "$LOG_FILE"
  if curl -fL --retry 3 --connect-timeout 15 --max-time 180 \
    -A "PrepperDisk/1.0" \
    -o "$tmp" "$url" 2>&1 | tee -a "$LOG_FILE"; then
    mv "$tmp" "$dest"
    echo "| \`$category\` | \`$filename\` | $source | <$url> |" >> "$SOURCES_MD"
  else
    rm -f "$tmp"
    failed=$((failed + 1))
    failures+=("$source | $url")
    echo "FAILED: $source <$url>" | tee -a "$LOG_FILE"
  fi
done < "$PACK"

if (( failed > 0 )); then
  {
    echo
    echo "## Failed Downloads"
    echo
    for failure in "${failures[@]}"; do
      echo "- $failure"
    done
  } >> "$SOURCES_MD"
fi

"$ROOT/bin/refresh.sh"
if (( failed > 0 )); then
  echo "Downloaded official content pack with $failed failure(s)."
else
  echo "Downloaded official content pack."
fi
echo "Log: $LOG_FILE"
echo "Sources: $SOURCES_MD"
