# Hardware Key and MFA Inventory Template

> DO NOT PUT PLAINTEXT SECRETS HERE. This template is for non-secret inventory only. Do not record TOTP seeds, backup codes, passkeys, hardware-key PINs, passwords, seed phrases, API keys, SSH private keys, or personal IDs. Actual secrets belong only inside encrypted vault files.

Copy this structure into a private note or spreadsheet only if it stays non-secret. For sensitive recovery values, use an encrypted vault file.

| Account | Category | MFA type | Primary device/key label | Backup method exists? | Recovery owner | Last checked | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Primary email | Email | Hardware key / authenticator / passkey / SMS | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No codes here |
| Phone carrier/SIM | Phone | PIN / app / SMS / passkey | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No PIN here |
| Password manager | Vault | Hardware key / recovery contact / emergency kit | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No secret key here |
| Bank/card issuer | Banking | App / SMS / hardware key | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No account numbers |
| Google | Cloud/email | Passkey / hardware key / authenticator | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No backup codes |
| Apple | Device/cloud | Trusted device / recovery contact / key | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No recovery key |
| Microsoft | Email/cloud | Authenticator / passkey / hardware key | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No backup codes |
| GitHub | Developer | Hardware key / passkey / authenticator | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No tokens |
| OpenAI | Developer | Authenticator / SSO / passkey if used | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No API keys |
| Cloud provider | Developer | Hardware key / SSO / authenticator | Non-secret label only | Yes/No | Dee | YYYY-MM-DD | No IAM keys |

## Hardware Key Labels

Use physical labels that reveal nothing sensitive, such as:

- `Key A - daily`.
- `Key B - offsite`.
- `Key C - envelope`.

Do not write hardware-key PINs or recovery codes here.
