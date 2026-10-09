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
- **Phase 4 — Golden Path MVP: REFERENCE IMPLEMENTATION; 10 ISOLATED TESTS PASS, LIMITED SCOPE.** The reference now enforces a 2,000-character required-field limit and blocks conflicting logical payloads sharing an idempotency key. Ten tests passed in an isolated Node.js v22.16.0 run after remediation; this is not a fresh-clone CI run or production validation. See [Phase 07–12 Execution Report](PHASE-07-12-EXECUTION-REPORT-2026-10-09.md).
- **Phase 5 — Validation and Evidence: PARTIAL / BLOCKED.** Ten local reference tests pass, including four added edge cases. Automated secret scanning, independently verifiable evidence integrity, private evidence storage, fresh-clone CI, and cross-service isolation are not verified. See [Phase 07–12 Execution Report](PHASE-07-12-EXECUTION-REPORT-2026-10-09.md).
- **Phase 6 — Multi-Project Expansion: NOT STARTED.** Do not add more projects/agents before the first Golden Path tests pass.
- **Scope lock:** `Para Jala - Control Plane v0.1` remains strictly excluded and must not be inspected, executed, modified, reused, connected, imported, published, or activated for Jala Dots Lite v.1.
- **Cost and safety boundary:** no new cloud resources, no external AI/API calls, no workflow creation/execution/publishing/activation, no paid usage, and no production deployment occurred during this work.


## Phase 07–12 checkpoint (2026-10-09)

The ordered Phase 07–12 review was performed. Phase 07 is partial pending a verified clean checkout and full commit/tree ancestry review. Phase 08 findings were documented; Phase 09 remediation and a 10-test isolated retest passed for the reference code. Phase 10 remains partial, Phase 11 specification remains DRAFT / NOT LOCKED, and Phase 12 persistent runtime remains BLOCKED by cost/persistence evidence. Full record: [Phase 07–12 Execution Report](PHASE-07-12-EXECUTION-REPORT-2026-10-09.md).
