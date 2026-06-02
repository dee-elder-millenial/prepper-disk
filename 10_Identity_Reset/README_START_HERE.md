# Identity Reset Kit

> DO NOT PUT PLAINTEXT SECRETS HERE. Do not store passwords, tokens, API keys, SSH private keys, seed phrases, recovery codes, personal IDs, or other secrets in this normal Prepper Disk tree or in the dashboard. Actual secrets belong only inside encrypted vault files.

This add-on is a safe, plaintext recovery guide for identity, account, device, and document disruption. It is meant to answer: "What do I do first, and where are the encrypted recovery materials supposed to be?"

## Priority Recovery Order

1. Physical safety: get people safe, call emergency services, secure housing, and preserve evidence.
2. Email and phone: regain the primary email account and phone number/SIM because they unlock most other recovery flows.
3. Password manager: restore the encrypted vault or password manager access.
4. Banking: freeze or replace cards, secure bank logins, and monitor transactions.
5. Identity documents: replace IDs, passport, Social Security card, birth certificate, vehicle title, and similar records.
6. Cloud/dev accounts: secure Google, Apple, Microsoft, GitHub, OpenAI, hosting, cloud, registrar, and developer accounts.
7. Utilities/insurance: restore utility portals, insurance claims, mortgage/rent portals, and household services.

## What Lives Here

- Plaintext runbooks and checklists.
- Blank CSV templates for inventory and tracking.
- Notes about where encrypted vaults should live.
- Printable instructions that do not reveal secrets.

## What Must Never Live Here

- Passwords, passphrases, PINs, or password manager master passwords.
- MFA recovery codes, TOTP seeds, passkeys, hardware-key PINs, or backup codes.
- API keys, OAuth tokens, SSH private keys, cloud credentials, crypto wallet seed phrases, or private keys.
- Images or scans of IDs, passports, Social Security cards, tax IDs, or account statements unless stored inside an encrypted vault.

## Recommended Vault Pattern

Choose the tool later based on Dee's preference. Until then, this kit only documents the pattern:

1. Encrypted password manager export or KeePassXC `.kdbx`.
2. Optional `age` or `gpg` encrypted archives for critical document scans and inventories.
3. Offline printed recovery envelope with non-secret instructions and sealed secret material only if Dee intentionally prepares it.
4. Offsite copy of encrypted vault files, such as a trusted physical location or offline drive.

Keep actual vault creation as a future task until Dee provides the tool choice.

## Key References

- FTC IdentityTheft.gov: recovery plans after identity theft.
- Ready.gov financial preparedness: emergency financial documents and planning.

## Start Here During an Incident

1. Open `identity-reset-runbook.md`.
2. Pick the closest incident checklist:
   - `lost-wallet-checklist.md`
   - `phone-stolen-checklist.md`
   - `house-fire-digital-recovery.md`
3. Use `credit-freeze-and-fraud-alerts.md` if identity exposure is possible.
4. Use `password-manager-recovery.md` only after the primary email/phone path is stable.
5. Fill trackers in `templates/` with non-secret status notes only.
