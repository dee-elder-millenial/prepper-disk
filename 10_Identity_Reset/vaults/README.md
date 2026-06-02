# Vaults

> DO NOT PUT PLAINTEXT SECRETS HERE. This folder is only a placeholder for encrypted vault files. Do not store passwords, tokens, API keys, SSH private keys, seed phrases, recovery codes, personal IDs, or unencrypted document scans in this folder or anywhere else in the normal Prepper Disk tree.

## Intended Use

Encrypted vault files may eventually live here after Dee chooses the tool and storage pattern. Until then, this folder should contain documentation only.

Recommended pattern:

- Encrypted password manager export or KeePassXC `.kdbx`.
- Optional `age` or `gpg` encrypted archives for sensitive document scans and inventories.
- Offline printed recovery envelope with non-secret instructions and any secret material sealed by Dee's explicit choice.
- Offsite encrypted copy.

## Safety Boundary

- Plaintext templates can reference "vault location hint" but must not reveal secrets.
- Dashboard indexing can expose filenames and metadata, so use neutral filenames for encrypted vaults.
- Do not create actual vaults until Dee provides the password manager/encryption tool choice.
