# Decision Log — Jala Dots Lite v.1

Use this file to record material decisions. New entries should include date, context, decision, alternatives, consequences, and status.

## D-001 — iPad-only primary development device

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** The available device is an iPad Air M2.
- **Decision:** The development and control workflow must be feasible from a browser on the iPad. Persistent execution must use a suitable external runtime rather than depending on iPadOS to host a server continuously.
- **Consequences:** Prefer browser-based configuration, GitHub-hosted source, and remote/cloud execution. Verify every service's access and quota.

## D-002 — Free-tier-first prototype

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** Prototype development should avoid additional costs.
- **Decision:** Target Rp0 additional spend. Do not create paid resources or approve usage-based costs without explicit user approval.
- **Consequences:** Free-tier limits, sleep behavior, quotas, and provider data policies are acceptance factors. Zero cost and 24/7 uptime are targets/constraints to evaluate, not guarantees.

## D-003 — Cloud-first execution

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** The iPad is the only development device and cannot be assumed to run persistent background workloads.
- **Decision:** Use an external execution runtime if the workflow requires scheduling or persistent processing.
- **Consequences:** Runtime selection is deferred until Phase 1 integration and cost audit.

## D-004 — Evidence-first completion

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Decision:** No task or phase is PASS without evidence tied to explicit acceptance criteria. FAIL and BLOCKED states must generate a remediation path and retest conditions.

## D-005 — Project isolation and approval gates

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Decision:** Separate project contexts and permissions. Require explicit approval for destructive operations, production deployments, external communications, and other high-impact actions.

## D-006 — Candidate tools are not mandatory dependencies

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** Multiple plugins and services may be available, but account connectivity and free-tier eligibility have not all been verified.
- **Decision:** GitHub, Notion, n8n, Supabase, Vercel, and AI providers are candidates until audited. Select the minimum viable stack from evidence.
- **Consequences:** No service is considered connected or production-ready merely because an integration tool exists.


## D-007 — Strict exclusion of Para Jala workflow from Jala Dots Lite

- **Date:** 2026-10-09
- **Status:** ACCEPTED / LOCKED
- **Context:** The user clarified that `Para Jala - Control Plane v0.1` belongs to a different project and is not part of Jala Dots Lite v.1.
- **Decision:** Do not open for further inspection, execute, modify, reuse, connect, import, publish, activate, or otherwise use the Para Jala workflow as part of Jala Dots Lite. Its prior failure is not a Jala Dots Lite blocker and must not be used to infer Jala Dots Lite runtime behavior.
- **Consequences:** Jala Dots Lite must have its own isolated workflow/project and independent evidence. Any future cross-project reuse requires a new explicit user decision; until then, strict separation applies.

## D-008 — n8n Cloud free trial is temporary, not the zero-cost production baseline

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** The user confirmed that the connected n8n instance is n8n Cloud free trial and set a target of Rp0 additional spend.
- **Decision:** Treat n8n Cloud trial as temporary evaluation capacity only. Do not depend on it for persistent production/scheduled execution unless the remaining trial quota, expiry, and post-trial billing behavior are explicitly verified and the path remains Rp0. Do not start paid subscription or paid usage.
- **Consequences:** GAP-ENV-001 can be resolved only as a cost/persistence decision, not by assuming the trial is permanent. Design the initial golden path so it can be tested manually or through a verified no-additional-cost route; keep persistent automation BLOCKED until a sustainable zero-cost runtime is evidenced.


## D-009 — Public repository data classification

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** RidzBuilder/JALA-DOTS-Lite is public; future project registry data and execution evidence could expose private information.
- **Decision:** Apply docs/DATA-CLASSIFICATION-AND-PUBLIC-REPO-BOUNDARY.md. Only PUBLIC-class artifacts may be committed. Use synthetic data for the first Golden Path; never commit secrets, real private project records, raw sensitive logs, or confidential client material.
- **Consequences:** The public repository is suitable for specifications and synthetic tests, not a default store for live operational records. A private evidence store is not yet selected or implemented.

## D-010 — External AI/API billing and data policy gate

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** Connected credentials do not prove free quota, billing eligibility, or acceptable data handling.
- **Decision:** No model-provider or usage-billed API calls are allowed in the initial Golden Path unless the exact route has verified no-additional-cost capacity and data-use/retention terms, and the user has explicitly approved its use. Prefer deterministic synthetic test processing until then.
- **Consequences:** GAP-AI-001 remains open for AI-powered features; initial functional validation can proceed without external model calls.

## D-011 — Runtime-independent deterministic Golden Path first

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** n8n trial persistence and account-specific limits remain unverified; public GitHub is not approved for live evidence; provider billing/data terms are not verified.
- **Decision:** The first Golden Path must use synthetic inputs and deterministic processing, without external model/API calls, credentials, outbound communications, or production side effects.
- **Consequences:** Contract-level implementation and tests can proceed without assuming a persistent runtime. Passing these tests does not establish hosting, scheduling, or AI capability.

## D-012 — Runtime-independent specification may proceed while environment gates remain open

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** Phase 1 has unresolved account-specific cost/persistence gates, while the core task/state/evidence contract can be specified without creating resources.
- **Decision:** Draft Phase 2 specification work may proceed in parallel, but must remain DRAFT pending review. Runtime selection, persistent automation, cloud resource creation, and production work remain blocked until their respective gates pass.
- **Consequences:** This avoids idle progress without weakening evidence or cost controls. No implementation or production readiness is implied by the draft.

## D-013 — n8n dashboard screenshot evidence captured

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** The user supplied a screenshot of the n8n Cloud dashboard showing 14 days left, 0/1000 executions, and $1.99 Gateway credits remaining.
- **Decision:** Record these values as screenshot-verified at capture time only. Do not infer exact expiry date, post-trial billing behavior, persistent Rp0 runtime, or unlimited free AI usage from the screenshot.
- **Consequences:** GAP-ENV-001 remains partially resolved and persistent automation remains blocked.

## D-014 — Commit deterministic in-memory Golden Path before selecting runtime

- **Date:** 2026-10-09
- **Status:** ACCEPTED
- **Context:** Account-specific runtime cost and persistence are not verified; the first functional path can be expressed without external services.
- **Decision:** Commit a small deterministic in-memory reference implementation and synthetic Node built-in tests. No network, credentials, durable storage, or external side effects are allowed in this reference.
- **Consequences:** Code and test definitions are now available for execution/review. The tests are not considered PASS until the test command is actually run and its output is reviewed. This implementation is not production-ready.

## D-015 — Six deterministic Golden Path tests passed in isolated local run

- **Date:** 2026-10-09
- **Status:** ACCEPTED WITH SCOPE LIMITATION
- **Context:** Source and test files were read back from GitHub and reproduced into a temporary isolated directory. A fresh git clone was unavailable because DNS/network access to github.com failed in the execution environment.
- **Decision:** Record the six local test cases as PASS for the tested source content only. Preserve the limitation that this is not fresh-checkout CI, integration, or production evidence.
- **Consequences:** The narrow deterministic test-run gate is satisfied for the six defined cases. Phase 5 remains partially complete; runtime, privacy enforcement, durable storage, authenticated approvals, and production gates remain open. See [Golden Path Validation Report](GOLDEN-PATH-VALIDATION-REPORT-2026-10-09.md).

