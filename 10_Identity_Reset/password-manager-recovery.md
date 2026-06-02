# Password Manager Recovery

> DO NOT PUT PLAINTEXT SECRETS HERE. Never place a password manager master password, emergency kit secret key, recovery code, vault export CSV, TOTP seed, seed phrase, API key, SSH private key, or personal ID in this normal Prepper Disk tree or dashboard. Actual secrets belong only inside encrypted vault files.

## Recovery Goal

Restore trusted access to the encrypted password vault, then rotate and repair high-value accounts in a controlled order.

## Before Starting

- Use a trusted device and network.
- Secure primary email and phone number/SIM first.
- Confirm the password manager website/app is official.
- Locate the encrypted vault source defined in `vaults/README.md`.
- Do not create plaintext exports during emergency recovery.

## Recommended Vault Pattern

This kit recommends, but does not create, one of these until Dee chooses the tool:

- Encrypted password manager export.
- KeePassXC `.kdbx` stored as an encrypted vault file.
- Optional `age` or `gpg` encrypted archive for document scans and inventories.
- Offline printed recovery envelope.
- Offsite encrypted copy.

## Recovery Order After Vault Access

1. Primary email.
2. Phone carrier/SIM account.
3. Password manager account itself.
4. Banks, cards, payment apps, and digital wallets.
5. Google, Apple, Microsoft.
6. Government/tax/benefits portals.
7. GitHub, OpenAI, cloud providers, domain registrar, DNS, hosting, CI/CD, package registries.
8. Utilities, insurance, mortgage/rent, and household services.

## What to Rotate First

- Any account with evidence of compromise.
- Any account protected only by the lost/stolen phone.
- Any account with saved card or billing authority.
- Developer accounts with API keys, deploy keys, OAuth apps, or production access.

## Developer Account Notes

- GitHub: rotate personal access tokens, review SSH keys, deploy keys, OAuth apps, signed-in sessions, organization access, and billing.
- OpenAI: review API keys, project/org members, service accounts, billing, and connected apps.
- Cloud/dev: rotate cloud IAM keys, CI/CD secrets, package registry tokens, registrar/DNS credentials, and webhook secrets.

Do not paste any rotated value into this kit. Store new secrets only in the encrypted vault.
