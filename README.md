# Prepper Disk

Prepper Disk is a local-first preparedness archive dashboard for documents, references, tools, maps, and recovery runbooks that should remain usable when cloud services or internet access are unavailable.

This public repository contains the app, scripts, templates, and safe plaintext runbooks only. It intentionally excludes personal records, downloaded document packs, generated dashboard data, logs, and encrypted vault files.

## What It Includes

- Static LAN dashboard source under `site/`.
- Indexing, status, content-download, and optional sync helper scripts under `bin/`.
- Content-pack and sync-source configuration templates under `config/`.
- Safe Identity Reset Kit runbooks and blank templates under `10_Identity_Reset/`.
- Public source notes and category README files.

## What It Must Never Include

Do not commit personal records, password-manager exports, passwords, recovery codes, tokens, API keys, SSH private keys, crypto seed phrases, identity document scans, medical records, financial records, or encrypted vault files.

The Identity Reset Kit documents a vault pattern. Actual secrets belong in encrypted vault files outside Git.

## Basic Usage

Place this repository on your local server or external drive, then run:

```bash
bin/refresh.sh
```

Serve the `site/` directory on your LAN with any static file server. For example:

```bash
cd site
python3 -m http.server 8088 --bind 0.0.0.0
```

Then open the dashboard from a browser on your local network.

## License

MIT. See `LICENSE`.
