# Prepper Disk

This is Dee's local-first archive for files, references, tools, maps, and notes that should remain usable even when cloud services or internet access are unavailable.

## First Principles

- Keep important files local on `your local server`.
- Prefer plain files: PDF, TXT, CSV, JSON, ZIP, images, and offline installers.
- Keep Google Drive syncs as copies, not the only source.
- Generate indexes and checksums after major changes.
- Make the archive useful from the LAN without needing an external service.

## Local Paths

- Main archive: `/srv/cloud-mirror/PrepperDisk`
- Web dashboard: `/srv/cloud-mirror/PrepperDisk/site`
- Index and checksums: `/srv/cloud-mirror/PrepperDisk/99_Indexes_and_Checksums`

## LAN Access

- Web dashboard: `http://your-server.local:8088/`
- Network drive, once SMB is configured: `smb://your-server.local/cloud-mirror`

## Suggested Refresh Routine

1. Copy or sync new files into the category folders.
2. Run:

   ```bash
   /srv/cloud-mirror/PrepperDisk/bin/build_index.py
   ```

3. Open the dashboard and confirm the counts/checksums updated.

Optional Google Drive source syncs are controlled by:

```text
/srv/cloud-mirror/PrepperDisk/config/sync-sources.tsv
```

Sources are disabled by default until you change `no` to `yes`.

Official downloaded reference sources are tracked here:

```text
/srv/cloud-mirror/PrepperDisk/99_Indexes_and_Checksums/OFFICIAL_SOURCES.md
```

## Categories

- `01_Identity_and_Records`: IDs, household records, legal docs.
- `02_Financial`: account exports, tax docs, insurance, inventories.
- `03_Medical`: medical records, medications, first aid references.
- `04_Home_and_Vehicle`: home systems, manuals, vehicle records.
- `05_Maps`: offline maps, evacuation routes, local references.
- `06_Reference_Library`: books, PDFs, Kiwix/ZIM references.
- `07_Tools_and_Software`: installers, scripts, boot media notes.
- `08_Family_and_Contacts`: contacts, plans, emergency notes.
- `09_Backups_and_Exports`: Google Drive exports and other backups.
- `10_Identity_Reset`: safe identity/account recovery runbooks and encrypted-vault placeholders. Do not store plaintext secrets here.
