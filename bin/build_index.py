#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE_DATA = ROOT / "site" / "data"
SITE_FILES = ROOT / "site" / "files"
CHECKSUM_DIR = ROOT / "99_Indexes_and_Checksums"
EXCLUDED_DIRS = {"site", "bin", "logs", ".git"}


def should_skip(path: Path) -> bool:
    rel_parts = path.relative_to(ROOT).parts
    return any(part in EXCLUDED_DIRS for part in rel_parts)


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def load_source_metadata() -> dict[tuple[str, str], dict[str, str]]:
    sources: dict[tuple[str, str], dict[str, str]] = {}
    for pack in sorted((ROOT / "config").glob("content-pack-*.tsv")):
        with pack.open("r", encoding="utf-8") as f:
            reader = csv.DictReader(f, delimiter="\t")
            for row in reader:
                if row.get("enabled") != "yes":
                    continue
                category = row.get("category", "")
                filename = row.get("filename", "")
                if not category or not filename:
                    continue
                sources[(category, filename)] = {
                    "source": row.get("source", ""),
                    "source_url": row.get("url", ""),
                }
    return sources


def category_for(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if len(rel.parts) == 1:
        return "_root"
    return rel.parts[0] if rel.parts else "_root"


def reset_site_file_links() -> None:
    if SITE_FILES.exists() or SITE_FILES.is_symlink():
        for path in sorted(SITE_FILES.rglob("*"), reverse=True):
            if path.is_symlink() or path.is_file():
                path.unlink()
            elif path.is_dir():
                path.rmdir()
    SITE_FILES.mkdir(parents=True, exist_ok=True)


def link_site_file(source: Path, rel: str) -> str:
    web_path = SITE_FILES / rel
    web_path.parent.mkdir(parents=True, exist_ok=True)
    if web_path.exists() or web_path.is_symlink():
        web_path.unlink()
    web_path.symlink_to(source)
    return f"files/{rel}"


def main() -> None:
    SITE_DATA.mkdir(parents=True, exist_ok=True)
    CHECKSUM_DIR.mkdir(parents=True, exist_ok=True)
    reset_site_file_links()

    files = []
    categories: dict[str, dict[str, int]] = {}
    source_metadata = load_source_metadata()

    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or should_skip(path):
            continue
        rel = path.relative_to(ROOT).as_posix()
        stat = path.stat()
        digest = sha256_file(path)
        category = category_for(path)
        metadata = source_metadata.get((category, path.name), {})
        categories.setdefault(category, {"files": 0, "bytes": 0})
        categories[category]["files"] += 1
        categories[category]["bytes"] += stat.st_size
        files.append(
            {
                "path": rel,
                "name": path.name,
                "category": category,
                "size": stat.st_size,
                "modified": datetime.fromtimestamp(stat.st_mtime, timezone.utc).isoformat(),
                "sha256": digest,
                "url": link_site_file(path, rel),
                **metadata,
            }
        )

    generated_at = datetime.now(timezone.utc).isoformat()
    summary = {
        "generated_at": generated_at,
        "root": str(ROOT),
        "file_count": len(files),
        "total_bytes": sum(item["size"] for item in files),
        "categories": categories,
        "files": files,
    }

    (SITE_DATA / "index.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (CHECKSUM_DIR / "prepper-index.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    with (CHECKSUM_DIR / "SHA256SUMS").open("w", encoding="utf-8") as f:
        for item in files:
            f.write(f"{item['sha256']}  {item['path']}\n")

    with (CHECKSUM_DIR / "file-index.csv").open("w", newline="", encoding="utf-8") as f:
        fieldnames = [
            "path",
            "name",
            "category",
            "size",
            "modified",
            "sha256",
            "url",
            "source",
            "source_url",
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(files)

    print(f"Indexed {len(files)} files under {ROOT}")
    print(f"Wrote {SITE_DATA / 'index.json'}")
    print(f"Wrote {CHECKSUM_DIR / 'SHA256SUMS'}")


if __name__ == "__main__":
    main()
