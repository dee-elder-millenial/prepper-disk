# Phone Stolen Checklist

> DO NOT PUT PLAINTEXT SECRETS HERE. Do not record device passcodes, account passwords, MFA backup codes, TOTP seeds, SIM PINs, Apple/Google recovery codes, or personal IDs in this normal Prepper Disk tree. Actual secrets belong only inside encrypted vault files.

## First Hour

- Get to a safe place and report theft if needed.
- From a trusted device, mark the phone lost and attempt remote lock:
  - Apple: Find My, Apple Account devices, iCloud.
  - Google: Find My Device, Google Account devices.
  - Microsoft if connected: Microsoft account devices.
- Contact the phone carrier/SIM provider to suspend service, block the SIM/eSIM, and prevent number porting.
- Preserve the phone number if possible because it is needed for account recovery.

## Account Protection

- Primary email: review sessions, recovery methods, forwarding rules, filters, app passwords, and security alerts.
- Google: sign out stolen device, remove unknown devices, review passkeys, OAuth apps, and recovery phone/email.
- Apple: remove the stolen device only after preserving recovery path; review trusted devices and phone numbers.
- Microsoft: sign out stolen device, check authenticator methods, aliases, forwarding, and OneDrive sharing.
- Password manager: revoke device sessions and require reauthentication if supported.
- Banking/cards: remove the stolen phone from banking trusted devices and digital wallets.

## MFA and Hardware Keys

- If the phone held authenticator apps, rebuild MFA from encrypted vault material or account recovery paths.
- Use `hardware-key-and-mfa-inventory-template.md` to identify which accounts used phone MFA, hardware keys, passkeys, or backup methods.
- Do not write TOTP seeds or recovery codes in that template.

## Developer and Cloud Accounts

- GitHub: revoke mobile sessions, review SSH keys, PATs, OAuth apps, and organization access.
- OpenAI: review sessions if available, API keys, organization/project members, billing, and connected apps.
- Cloud/dev accounts: review AWS, Azure, Google Cloud, Cloudflare, domain registrar, CI/CD, and package registry access.

## Closeout

- Activate replacement SIM/eSIM on a trusted phone.
- Restore MFA carefully, starting with primary email, password manager, banking, and cloud/dev accounts.
- Update the encrypted vault after recovery. Do not export plaintext secrets into this kit.
