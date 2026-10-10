# Execution Plan — Jala Dots Lite v.1

## Execution rule

Proceed in order. Each phase produces evidence and has an explicit exit gate. If a blocking gap remains open, stop dependent work and document the remediation path.

## Phase 0 — Repository Baseline

**Goal:** Establish a canonical, inspectable starting point.

Tasks:
- [x] Locate and inspect repository metadata through the connected GitHub integration.
- [x] Confirm repository name, owner, default branch, visibility, and initial empty state.
- [x] Add initial project documentation.
- [x] Verify the committed files from GitHub after writes.
- [x] Capture baseline commit SHA and confirm root tree.

Exit gate: **PASS** — repository files are readable from GitHub and a baseline commit is recorded.

## Phase 1 — Environment and Integration Audit

**Goal:** Identify which tools are connected, usable, and suitable for a zero-additional-cost prototype.

Audit:
- GitHub permissions and repository operations
- Notion access and available documentation functions
- n8n account/instance availability, execution limits, and hosting model
- Vercel plan and project access
- Supabase organization, plan, and existing projects (do not create resources without cost verification and approval)
- Available AI providers, free quotas, data-use policies, and credentials
- Browser-based development path from iPad

For each integration record:
- Status: VERIFIED / UNVERIFIED / BLOCKED / NOT REQUIRED
- Evidence and timestamp
- Plan and quota constraints
- Data/privacy considerations
- Required user action
- Decision: adopt / defer / reject

Exit gate: minimum viable stack selected based on evidence, not assumptions.

## Phase 2 — Fundamental Specification

Deliver:
- System context and scope
- Functional requirements and non-functional requirements
- Project registry schema
- Workflow lifecycle and state model
- Approval policy
- Evidence model
- Remediation and retest model
- Security and project-isolation model
- Acceptance criteria and traceability

Exit gate: specification reviewed and material decisions logged.

## Phase 3 — Prototype Architecture

Select the minimum viable components for:
- Intake and task orchestration
- Persistent state
- Evidence storage
- Notifications/reporting (optional)
- Model/provider abstraction (only if needed)

Exit gate: component selection is supported by integration and cost evidence; no unapproved paid dependency.

## Phase 4 — Golden Path MVP

Build one controlled end-to-end workflow:
1. Accept a test task.
2. Validate required fields and project scope.
3. Create a run record.
4. Execute a bounded action.
5. capture output and execution evidence.
6. evaluate acceptance criteria.
7. on failure, create a remediation item.
8. retest and record the final state.
9. publish a concise report.

Exit gate: the full path passes using synthetic/non-sensitive test data.

## Phase 5 — Validation and Evidence

- Test expected-success, expected-failure, duplicate/retry, and blocked-approval paths.
- Verify evidence links and state transitions.
- Check that no secret is exposed in logs or repository.
- Record limitations, failures, and residual risks.

Exit gate: evidence bundle and test results are recorded; unresolved blockers remain explicitly open.

## Phase 6 — Multi-Project Expansion

- Register projects independently.
- Apply per-project configuration and permissions.
- Test isolation and routing.
- Add schedules and reporting only after manual execution is reliable.

Exit gate: at least two synthetic/test project profiles operate without cross-project data leakage.

## Current status

- **Phase 0 — Repository Baseline: PASS.** Repository and baseline documents are readable from GitHub.
- **Phase 1 — Environment and Integration Audit: IN PROGRESS / BLOCKED for persistent runtime.** User screenshot verified 14 days remaining and 0/1000 executions at capture time. Exact expiry date, post-trial billing behavior, and sustainable Rp0 runtime remain unverified. See [Integration Audit](INTEGRATION-AUDIT-2026-10-09.md).
- **Phase 2 — Fundamental Specification: DRAFT FOR REVIEW.** [Fundamental Specification v0.1](FUNDAMENTAL-SPECIFICATION-v0.1.md) and [ADR v0.1](ARCHITECTURE-DECISION-RECORD-v0.1.md) exist. They are not locked/final; review and approval remain required before treating them as canonical implementation contracts.
- **Phase 3 — Prototype Architecture: NOT SELECTED.** No runtime or new cloud resource approved.
- **Phase 4 — Golden Path MVP: REFERENCE IMPLEMENTATION; Phase 14 controls added; CI retest step passed, scope-limited.** The reference enforces a 2,000-character required-field limit, conflicting-idempotency detection, a separately recorded approval bound to request/action/target, and an explicit allowed-transition graph. Self-asserted payload approval is ignored. GitHub Actions run [#38067789229](https://github.com/RidzBuilder/JALA-DOTS-Lite/actions/runs/38067789229) reports the deterministic test step successful; overall workflow finalization was pending at last read. No updated local run is claimed. See [Phase 13–18 Execution Report](PHASE-13-18-EXECUTION-REPORT-2026-10-10.md).
- **Phase 5 — Validation and Evidence: PARTIAL / BLOCKED.** The updated GitHub Actions deterministic test step passed with 14 defined test cases, including approval spoofing/scope and state-transition checks. Trusted identity verification, durable evidence/idempotency, automated secret scanning, private evidence storage, and cross-service isolation remain unverified. See [Phase 13–18 Execution Report](PHASE-13-18-EXECUTION-REPORT-2026-10-10.md).
- **Phase 6 — Multi-Project Expansion: NOT STARTED.** Do not add more projects/agents before the first Golden Path tests pass.
- **Scope lock:** `Para Jala - Control Plane v0.1` remains strictly excluded and must not be inspected, executed, modified, reused, connected, imported, published, or activated for Jala Dots Lite v.1.
- **Cost and safety boundary:** no new cloud resources, no external AI/API calls, no workflow creation/execution/publishing/activation, no paid usage, and no production deployment occurred during this work.


## Phase 07–12 checkpoint (2026-10-09)

The ordered Phase 07–12 review was performed. Phase 07 is partial pending a verified clean checkout and full commit/tree ancestry review. Phase 08 findings were documented; Phase 09 remediation and a 10-test isolated retest passed for the reference code. Phase 10 remains partial, Phase 11 specification remains DRAFT / NOT LOCKED, and Phase 12 persistent runtime remains BLOCKED by cost/persistence evidence. Full record: [Phase 07–12 Execution Report](PHASE-07-12-EXECUTION-REPORT-2026-10-09.md).


## Phase 13–18 checkpoint (2026-10-10)

- **Phase 13 — Checkpoint/integrity: PASS (GitHub API + CI evidence; local clone limitation recorded).** GitHub API verified `main` head `9d7b4be5208478db48ed465c77439271544051da`, 60 consecutive first-parent commits with all parent links resolving, root commit `24dfd701fde8a5633f5a83087293b022c3c89faa`, and a non-truncated 21-entry current tree. Current source/test/workflow blob IDs match the CI-tested commit `101fddc41a6db37c2baa91ad18a8cc22a4b37129`; CI checkout passed. Direct local clone is still unavailable in this environment and is not claimed.
- **Phase 14 — Golden Path hardening: PARTIAL.** Input-size and idempotency conflict checks remain. Self-asserted approval is rejected; in-memory approval records are bound to request/action/target and consumed on first execution. An explicit transition allowlist guards the run trace. Trusted identity verification, expiry/policy enforcement, durable idempotency, and cryptographic evidence remain open. Updated GitHub Actions test step passed; overall workflow finalization was pending at last read.
- **Phase 15 — Evidence/privacy/isolation: PARTIAL / BLOCKED.** A limited regex secret-pattern scan of exact source/test bytes returned no matches; this is not full secret scanning or proof of isolation. Private evidence storage and independent provenance are not implemented.
- **Phase 16 — Regression/CI: PASS (scope-limited).** Local Node.js v22.16.0 run produced 10 passed, 0 failed; GitHub Actions run [#38017180138](https://github.com/RidzBuilder/JALA-DOTS-Lite/actions/runs/38017180138) on commit `101fddc41a6db37c2baa91ad18a8cc22a4b37129` concluded `success`, including checkout, Node setup, and test steps. This is not production/security conformance evidence. See [Phase 13–18 Execution Report](PHASE-13-18-EXECUTION-REPORT-2026-10-10.md).
- **Phase 17 — Specification: DRAFT / NOT LOCKED.** Current implementation does not meet the full secure approval, state-machine, durable evidence, and isolation contract.
- **Phase 18 — Runtime: BLOCKED / NO-GO.** Sustainable Rp0 persistence, account-specific post-trial behavior, and privacy/security gates remain unverified. No runtime/resource was created.
