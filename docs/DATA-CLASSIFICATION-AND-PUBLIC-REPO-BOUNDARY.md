# Data Classification and Public Repository Boundary — Jala Dots Lite v.1

- **Version:** 0.1
- **Status:** ACCEPTED BASELINE POLICY
- **Date:** 2026-10-09
- **Canonical repository:** https://github.com/RidzBuilder/JALA-DOTS-Lite
- **Repository visibility:** Public

## 1. Purpose

Define what may be committed to the public repository before Jala Dots Lite stores real project registry entries, execution records, evidence, or provider outputs.

## 2. Data classes

### PUBLIC — allowed in this repository

- Architecture and functional specifications.
- Synthetic test fixtures and fabricated example projects.
- Non-sensitive schemas, test plans, acceptance criteria, and generic remediation templates.
- Redacted evidence that has been reviewed for accidental disclosure.
- Decisions and audit records that do not reveal credentials, personal data, confidential client material, private URLs, or operational security details.

### INTERNAL — do not commit by default

- Real project registry records and private project metadata.
- Internal task descriptions, workflow inputs/outputs, execution logs, and raw evidence.
- Private repository URLs, internal endpoint names, environment details that materially increase attack surface, and account usage screenshots.
- User/client documents or data not explicitly approved for public release.

Keep these in a private, access-controlled location. The current repository does not provide that location by itself; do not assume a private storage backend is available until separately verified.

### SECRET — never commit

- API keys, access tokens, passwords, session cookies, OAuth refresh tokens, private keys, recovery codes, database connection strings containing credentials, and webhook secrets.
- Unredacted credential exports, .env files, or screenshots showing secret values.

If a secret is accidentally committed, treat it as compromised: revoke/rotate it first, then remove it from the repository history as appropriate. Deleting the latest file alone does not guarantee that the secret is no longer present in Git history.

### SENSITIVE — prohibited in the initial prototype unless separately approved

- Personal, health, financial, authentication, confidential client, or other regulated/restricted information.
- Raw prompts/outputs containing sensitive data.
- Evidence that indirectly identifies a person or reveals confidential project details.

Use synthetic/non-sensitive data for initial validation.

## 3. Operational controls

1. Review every file before committing to the public repository.
2. Prefer synthetic fixtures over real project data.
3. Redact logs, screenshots, payloads, identifiers, and URLs where needed.
4. Keep credentials in provider-managed secret stores; never place secret values in prompts, docs, issues, or logs.
5. Do not send confidential project content to third-party AI/model APIs until billing, retention, training/data-use terms, and access controls have been reviewed and explicitly approved.
6. Do not connect Jala Dots Lite to another project's workflow, data table, credential, database, or storage without a separately recorded decision and isolation test.
7. Record only the minimum evidence needed to prove a test result.

## 4. Initial golden-path data policy

- Project name: synthetic, e.g. SAMPLE-PROJECT-001.
- Task payload: fabricated, non-sensitive test instruction.
- Output: deterministic sample text or local specification artifact.
- Credentials: none required for the first test.
- External model/API calls: disabled unless a zero-cost and data-policy route is verified.
- Production actions: disabled; approval gate must return BLOCKED for unapproved actions.

## 5. Acceptance checks

- [ ] No real client/project records are included in test fixtures.
- [ ] No secrets or credential values are present in files or test logs.
- [ ] Every stored artifact is classified PUBLIC, INTERNAL, SECRET, or SENSITIVE.
- [ ] Public repository commits contain only PUBLIC-class data.
- [ ] A simulated unapproved/secret-bearing payload is rejected or redacted before persistence.

## 6. Current limitations

This document defines policy; it does not claim that automated secret scanning, a private evidence store, or enforcement controls have already been implemented. Those require separate implementation and tests.
