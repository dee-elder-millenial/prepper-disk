# Identity Reset Runbook

> DO NOT PUT PLAINTEXT SECRETS HERE. This runbook may mention accounts and recovery paths, but actual passwords, MFA recovery codes, API keys, SSH private keys, seed phrases, personal IDs, and sensitive documents belong only inside encrypted vault files.

Use this when identity, devices, accounts, or documents are disrupted and you need a calm recovery order.

## Priority Recovery Order

1. Physical safety: people first, then shelter, medical needs, police/fire report numbers, and evidence preservation.
2. Email and phone: restore control of the primary email and phone carrier/SIM.
3. Password manager: recover encrypted password vault access.
4. Banking: secure banks, cards, payment apps, and credit monitoring.
5. Identity documents: replace government IDs and core records.
6. Cloud/dev accounts: secure Google, Apple, Microsoft, GitHub, OpenAI, cloud, registrar, DNS, and hosting accounts.
7. Utilities/insurance: restore insurance, utilities, mortgage/rent, vehicle, and household service portals.

## Immediate Triage

- Get to a safe place before account work.
- If theft, fire, break-in, or assault is involved, document the event and get official report numbers.
- Use a trusted device and network for recovery work.
- Do not sign in from a suspected compromised device.
- Keep notes in `templates/document-replacement-tracker.csv` or paper using status-only information.

## Email and Phone

Primary email and phone are the control plane for most resets.

- Primary email: check account recovery options, recent sessions, forwarding rules, filters, app passwords, delegated access, and recovery email/phone.
- Phone carrier/SIM: report theft or loss, suspend the stolen SIM, move the number to a replacement SIM/eSIM, add or confirm account PIN/security lock, and check for unauthorized port-out attempts.
- Google: secure Gmail, Google Account recovery, active sessions, passkeys, recovery phone/email, OAuth app access, Drive sharing, and Google Voice if used.
- Apple: secure Apple Account, trusted phone numbers, devices, Find My, iCloud Keychain, and recovery contact/key settings.
- Microsoft: secure Outlook/Hotmail, Microsoft Account recovery, authenticator settings, devices, aliases, forwarding, and OneDrive sharing.

## Password Manager

- Restore the password manager only from official app/site paths.
- Use the encrypted vault source defined in `vaults/README.md`.
- Do not export passwords to plaintext CSV in this tree.
- After access returns, rotate passwords for primary email, carrier, banking, cloud/dev, and high-value accounts first.

## Banking and Cards

- Call banks and card issuers from known-good numbers on card backs, statements, or official websites.
- Freeze or replace missing cards.
- Review recent transactions.
- Update autopay once replacements arrive.
- Secure payment apps and digital wallets.

## Identity Documents

- Government IDs: driver's license/state ID, passport, Social Security card, birth certificate, vehicle registration/title, immigration/work documents if applicable.
- Store scans only inside encrypted vaults.
- Use `templates/document-replacement-tracker.csv` for agency, status, appointment date, and case number notes.

## Cloud and Developer Accounts

- GitHub: review SSH keys, deploy keys, personal access tokens, OAuth apps, signed-in sessions, recovery email, organizations, and billing.
- OpenAI: review account email, organization/project access, API keys, service accounts, team members, billing, and connected apps.
- Cloud/dev accounts: AWS, Azure, Google Cloud, Cloudflare, domain registrar, DNS, hosting, CI/CD, package registries, and monitoring accounts.
- Revoke unknown sessions, rotate tokens, and remove unused keys. Never paste keys into this kit.

## Credit and Identity Theft

- Use FTC IdentityTheft.gov to create an identity theft recovery plan if personal information was misused.
- Consider fraud alerts or credit freezes with the major credit bureaus.
- See `credit-freeze-and-fraud-alerts.md`.
- Ready.gov financial preparedness is a reference for emergency financial documents and household planning.

## Closeout

- Confirm every high-priority account has a new password and working MFA.
- Confirm recovery email/phone values are correct.
- Confirm encrypted vault backups exist in the intended locations.
- Print updated non-secret instructions for the emergency envelope.
