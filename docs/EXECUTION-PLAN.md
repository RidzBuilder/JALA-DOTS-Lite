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

- **Phase 0 — Repository Baseline: PASS.** Repository metadata and baseline docs were verified through GitHub read-back.
- **Phase 1 — Environment and Integration Audit: IN PROGRESS / BLOCKED.** See [Integration Audit](INTEGRATION-AUDIT-2026-10-09.md). n8n Cloud free-trial account expiry, remaining quota, and sustainable post-trial Rp0 persistence are not verified. Current Vercel/Supabase usage and project suitability are also not fully verified. Persistent automation and AI-provider-dependent execution remain BLOCKED.
- **Phase 2 — Fundamental Specification: DRAFT CREATED / REVIEW PENDING.** Added [Fundamental Specification v0.1](FUNDAMENTAL-SPECIFICATION-v0.1.md) and [Architecture Decision Record v0.1](ARCHITECTURE-DECISION-RECORD-v0.1.md). These define the contract and proposed architecture; they are not an implemented or tested system and are not yet user-approved/locked.
- **Parallel-work boundary:** Phase 2's runtime-independent specification work is permitted while Phase 1 account-specific blockers remain open. Phase 3 runtime selection, cloud resource creation, persistent automation, and production work remain gated.
- **Scope lock:** `Para Jala - Control Plane v0.1` is a separate project and is strictly excluded; do not inspect, execute, modify, reuse, connect, import, publish, or activate it for Jala Dots Lite v.1.
- **GAP-ENV-001:** PARTIALLY RESOLVED; trial type known, but post-trial zero-cost persistence is not proven. Persistent automation stays BLOCKED.
- **n8n project discovery:** Latest search for `Jala Dots Lite` returned zero projects. No workflow or cloud resource was created.
- **Resource/action boundary:** No new cloud resources were created. No workflow was modified, published, or activated. No external AI/API calls were made.
