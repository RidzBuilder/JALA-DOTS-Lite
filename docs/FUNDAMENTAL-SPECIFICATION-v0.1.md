# Fundamental Specification v0.1 — Jala Dots Lite

- **Status:** DRAFT FOR REVIEW — deterministic reference tests partially validated
- **Date:** 2026-10-09
- **Repository:** `RidzBuilder/JALA-DOTS-Lite`
- **Cost target:** Rp0 additional spend
- **Primary control device:** iPad Air M2, browser-based
- **Data profile:** synthetic/public test data only for initial Golden Path
- **Runtime status:** persistent automation BLOCKED pending GAP-ENV-001 evidence

## 1. Purpose

Define the minimum interoperable contract for Jala Dots Lite (JDL): project-scoped task intake, validation, controlled execution, evidence capture, remediation, retest, and closure. This specification is runtime-neutral and does not imply that an implementation already exists.

## 2. Normative principles

1. **Evidence over assertion:** a state is PASS/SUCCEEDED only when its acceptance criteria have attached, reviewable evidence.
2. **Fail closed:** missing scope, approval, required inputs, or evidence produces BLOCKED; invalid input or failed criteria produces FAILED.
3. **Human authority:** approval must be explicit, scoped to a specific action and target, and recorded before a gated action starts.
4. **Project isolation:** every task, run, configuration, approval, and evidence item belongs to exactly one project. Cross-project access is denied by default.
5. **Idempotency:** retrying the same logical request with the same idempotency key must not create a second logical side effect.
6. **Least privilege:** connectors and runtimes receive only the access required for the approved action.
7. **Cost guard:** no paid/usage-billed operation unless the route, remaining quota, price exposure, and data terms are verified and explicitly approved. Current initial Golden Path uses deterministic processing only.
8. **Data minimization:** public repository contains only PUBLIC material and synthetic fixtures; never store secrets or real sensitive operational records there.
9. **Portable execution:** specification and test cases must not depend on a temporary trial service.
10. **No silent completion:** every terminal result includes a reason, timestamp, and evidence or a documented evidence gap.

## 3. Scope and non-goals

### In scope
- Project registry and per-project policy.
- Task/run lifecycle and approvals.
- Deterministic validation and bounded test actions.
- Evidence, provenance, remediation, retest, and audit history.
- Explicit project isolation and cost/data gates.

### Out of scope for v0.1
- Production deployment or unsupervised changes.
- Guaranteed 24/7 execution using free plans.
- External AI/model API calls.
- Real client/health/financial/private records.
- Multi-agent execution before one Golden Path passes.
- Creating cloud resources before account quotas, scope, and zero-cost eligibility are verified.
- Any use of the separate `Para Jala - Control Plane v0.1` workflow. It is strictly excluded.

## 4. Core entities

### Project
Required fields:
- `project_id`: immutable opaque identifier.
- `display_name`: human-readable name.
- `status`: `ACTIVE | PAUSED | ARCHIVED`.
- `data_classification`: highest allowed class for the selected runtime.
- `allowed_connectors`: explicit allowlist; empty by default.
- `cost_policy`: default `NO_ADDITIONAL_SPEND`.
- `approval_policy`: actions requiring human approval.
- `created_at`, `updated_at`.

### Task
Required fields:
- `task_id`: immutable opaque identifier.
- `project_id`: required project foreign key.
- `request_id`: stable client/request identifier.
- `idempotency_key`: required for actions with side effects.
- `title`, `intent`, `input_ref` (or sanitized inline synthetic input).
- `status`, `created_at`, `updated_at`.
- `risk_level`: `LOW | MEDIUM | HIGH`.
- `approval_required`: boolean derived from policy, not caller assertion.

### Run
- `run_id`, `task_id`, `project_id`, `attempt`.
- `status`, `started_at`, `finished_at`.
- `runtime_id` and `runtime_version`, when applicable.
- `result_summary`, `failure_code`, `cost_class`.

### Approval
- `approval_id`, `project_id`, `task_id`, `action_digest`, `target_ref`.
- `decision: APPROVED | REJECTED`.
- `approved_by`, `decided_at`, `expires_at`, `reason`.
- Approval is valid only for the exact action digest, target, project, and validity window. Any material action change invalidates the approval.

### Evidence
- `evidence_id`, `project_id`, `task_id`, optional `run_id`.
- `evidence_type`, `uri_or_content_hash`, `captured_at`, `captured_by`.
- `source`, `integrity_hash` where feasible, `classification`, `redaction_status`.
- Evidence in public Git must be PUBLIC and synthetic. Sensitive evidence requires an approved private store; none is selected in v0.1.

### Remediation
- `remediation_id`, `project_id`, `task_id`, `run_id`.
- `gap_id`, `diagnosis`, `action`, `owner_or_next_actor`.
- `retest_criteria`, `status`, `created_at`, `closed_at`.
- Remediation closure requires a retest result and linked evidence.

## 5. Task state machine

Canonical path:

`DRAFT → VALIDATED → APPROVAL_REQUIRED → APPROVED → RUNNING → SUCCEEDED | FAILED | BLOCKED`

After execution:
- `SUCCEEDED → EVIDENCE_CAPTURED → CLOSED`
- `FAILED → REMEDIATION_REQUIRED → RETEST_READY → RUNNING`
- `BLOCKED → REMEDIATION_REQUIRED` after the blocking prerequisite is identified.
- `REJECTED` approval ends the attempted action without execution; task remains `BLOCKED` or is closed as rejected with evidence.
- `CLOSED` is terminal for that task revision. A materially changed request creates a new revision/task and a new idempotency key.

State-transition rules:
- No transition directly from `DRAFT` to `RUNNING`.
- `VALIDATED` requires schema, project, data-classification, cost, and connector-policy checks.
- `APPROVAL_REQUIRED` cannot be bypassed by task payload.
- `RUNNING` requires approved scope and an available runtime within verified cost limits.
- `SUCCEEDED` requires all acceptance criteria to pass.
- `FAILED` requires failure code and remediation record.
- `BLOCKED` requires a blocking reason and an actionable next step.
- `CLOSED` requires evidence review and no unresolved required gate.

## 6. Execution gate order

1. **Identity/scope gate:** resolve exactly one registered project; reject unknown project IDs.
2. **Input gate:** validate required fields and reject malformed or oversized input.
3. **Classification gate:** ensure input and output fit the approved data boundary.
4. **Connector gate:** deny connectors not on the project's allowlist.
5. **Cost gate:** deny uncertain, paid, or usage-billed routes without verified zero-cost eligibility and explicit approval.
6. **Approval gate:** require human approval for production, destructive, external communication, credential changes, or other high-impact actions.
7. **Execution gate:** run only a bounded action in the approved scope.
8. **Evidence gate:** record input digest, action/version, output, timestamps, result, and redaction check.
9. **Acceptance gate:** evaluate explicit pass/fail assertions.
10. **Remediation/retest gate:** failed or blocked tasks receive a remediation item and a concrete retest condition.
11. **Closure gate:** close only after evidence and acceptance review.

Any unmet gate returns BLOCKED and must not execute the dependent action.

## 7. Project isolation contract

- Every resource carries `project_id`; project context must not be inferred from display names.
- Each run must re-check task/project ownership before execution and evidence write.
- Connector credentials are not shared implicitly between projects.
- Evidence queries are scoped by project and deny by default.
- Cross-project transfer is prohibited unless a new explicit user decision defines the exact source, destination, fields, purpose, and approval.
- The unrelated `Para Jala - Control Plane v0.1` workflow is excluded and must not be inspected, executed, modified, reused, connected, imported, published, or activated for JDL.

## 8. Idempotency and retry

- The logical uniqueness key is `(project_id, idempotency_key)`.
- Duplicate submissions return the existing task/run reference and do not repeat side effects.
- Each execution attempt increments `attempt` while preserving the parent task and prior evidence.
- A retry is permitted only after the failure/blocked cause is diagnosed and its retest criteria are satisfied.
- External side effects are prohibited in the initial Golden Path.

## 9. Evidence and audit requirements

Each run's evidence bundle should contain:
1. Task and project identifiers (synthetic in the public test path).
2. Input/schema validation result.
3. Gate decisions and policy version.
4. Action identifier and implementation/version.
5. Start/end timestamp and attempt number.
6. Output digest and sanitized summary.
7. Acceptance assertion results.
8. Failure/remediation/retest linkage, if applicable.
9. Confirmation that no secret or private data was emitted.

Do not claim cryptographic provenance unless a hash was actually computed and verified. Missing evidence must be labelled MISSING, not inferred.

## 10. Initial deterministic Golden Path

The first Golden Path is a design/test target, not yet implemented:
1. Submit a synthetic task for a registered synthetic project.
2. Validate required fields and project scope.
3. Compute a deterministic result (no network call, model, credential, or external side effect).
4. Record a synthetic run result and acceptance assertions.
5. Exercise success, invalid-input failure, duplicate request, and approval-blocked paths.
6. Create remediation and retest records for failure/blocked cases.
7. Review evidence and produce a report.

No n8n workflow or cloud resource is required to approve this specification. Persistent scheduling remains blocked until a sustainable Rp0 runtime is evidenced.

## 11. Acceptance criteria for v0.1 implementation

- AC-01: valid synthetic task advances only through allowed transitions.
- AC-02: unknown project is blocked before execution.
- AC-03: malformed required input is rejected with a stable failure code.
- AC-04: duplicate idempotency key returns the original logical task/run without repeating the action.
- AC-05: a policy-gated action cannot execute without a valid approval.
- AC-06: an approval for a different target/action digest is rejected.
- AC-07: failed/blocked tasks include diagnosis, next action, owner/next actor, and retest criteria.
- AC-08: closure is denied while required evidence or required gates are missing.
- AC-09: cross-project reads/writes are denied by default.
- AC-10: test fixture and output contain synthetic data only; no secret or real private data.
- AC-11: deterministic Golden Path makes no external network/API calls and incurs no usage cost.
- AC-12: evidence and test outputs are actually produced and reviewed before any PASS is recorded.

## 12. Known gaps and status

| Gap | Status | Exit evidence required |
|---|---|---|
| GAP-ENV-001 runtime cost/persistence | BLOCKED | Account-specific trial expiry/remaining quota plus sustainable Rp0 runtime evidence |
| GAP-PRIV-001 public/private evidence boundary | POLICY DOCUMENTED; IMPLEMENTATION OPEN | Enforcement test and an approved private evidence strategy before live data |
| GAP-AI-001 AI provider cost/data policy | BLOCKED for AI runtime | Provider-specific cost/quota/data terms and explicit user approval |
| GAP-PLATFORM-001 hosting suitability | PARTIALLY AUDITED | Current usage/quota and intended-use eligibility verified |
| Golden Path implementation | PARTIAL REFERENCE IMPLEMENTATION; 10 ISOLATED TESTS PASS | Fresh-clone CI; enforced state machine; secure approval; durable idempotency; evidence integrity; privacy enforcement; runtime proof |

## 13. Change control

Material changes to state definitions, approval gates, data classes, runtime, or cost policy require:
- a decision-log entry,
- a specification version update,
- updated acceptance tests,
- a retest with evidence.

This document is a draft baseline. No production-readiness claim is made.

## Validation addendum — 2026-10-09

The six deterministic tests listed in the acceptance plan passed in an isolated Node.js v22.16.0 run using source and test content read back from GitHub. See [Golden Path Validation Report](GOLDEN-PATH-VALIDATION-REPORT-2026-10-09.md).

This result validates only the six reference cases. It does not establish a production-enforced state machine, authenticated human approvals, durable idempotency, cryptographic evidence integrity, persistent storage, cross-service project isolation, hosting suitability, or zero-cost persistent runtime. This specification remains DRAFT FOR REVIEW and is not locked.



## Phase 07–12 review addendum — 2026-10-09

The reference implementation was remediated to reject required fields longer than 2,000 characters and block a conflicting logical request that reuses a project-scoped idempotency key. Ten synthetic Node.js tests passed in an isolated Node.js v22.16.0 run after the remediation was corrected. See [Phase 07–12 Execution Report](PHASE-07-12-EXECUTION-REPORT-2026-10-09.md).

This does not satisfy AC-05/AC-06 as a secure approval mechanism: approval remains caller-controlled and is not bound to an authenticated actor, action digest, target, or expiry. State transitions are still represented as output trace rather than persistently enforced. Idempotency remains process-local; evidence integrity and private storage are not implemented. Therefore this specification remains **DRAFT FOR REVIEW — NOT LOCKED**.


## Phase 13–18 review addendum — 2026-10-10

The current deterministic reference was re-read from GitHub, reproduced locally byte-for-byte by matching Git blob IDs, and tested with Node.js v22.16.0: 10 passed, 0 failed. A GitHub Actions regression workflow has been added, but its run status is not verified; the GitHub commit-status endpoint returned no statuses and direct fresh-checkout access was blocked by DNS resolution. See [Phase 13–18 Execution Report](PHASE-13-18-EXECUTION-REPORT-2026-10-10.md).

The review confirms that the implementation still does not satisfy the complete normative contract for authenticated approval bound to action/target, enforced state transitions, durable idempotency, independently verifiable evidence, automated privacy enforcement, or cross-service isolation. Therefore **Fundamental Specification v0.1 remains DRAFT FOR REVIEW — NOT LOCKED**. Persistent runtime remains **BLOCKED / NO-GO** pending evidence for sustainable Rp0 operation, persistence, and security controls.
