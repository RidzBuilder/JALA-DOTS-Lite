# Architecture Decision Record v0.1 — Jala Dots Lite

- **Status:** PROPOSED, pending user review
- **Date:** 2026-10-09
- **Decision scope:** Architecture direction only; no cloud resource creation or runtime selection approved.

## ADR-001 — Keep the first Golden Path deterministic and manual-first

**Context:** The available n8n instance is a temporary Cloud free trial. Account-specific expiry, remaining quota, and post-trial billing behavior are not verified. The public repository is not a safe store for live operational evidence. Provider credentials do not prove free quota or acceptable data handling.

**Decision:** The first Golden Path shall use synthetic inputs and deterministic processing without external model/API calls, credentials, outbound messages, production changes, or persistent scheduling. Implement and test the contract before choosing a runtime.

**Consequences:**
- Can validate state, gates, idempotency, remediation, and evidence without consuming model/API credits.
- Does not prove persistent execution, production deployment, or AI-powered functionality.
- A successful local/deterministic test must not be represented as runtime/hosting validation.

## ADR-002 — Do not select a persistent runtime until cost and isolation gates pass

**Context:** n8n Cloud trial is temporary. Vercel Hobby and Supabase Free have eligibility, quota, and/or pause constraints; current account usage and JDL suitability are not fully verified. The existing Supabase project belongs to another project.

**Decision:** No persistent runtime is selected in v0.1. Do not create a JDL cloud project, database, workflow, or deployment until its isolation, cost, quota, data handling, and ownership have been verified.

**Consequences:** Persistent automation remains BLOCKED under GAP-ENV-001/GAP-PLATFORM-001. Continue with specifications and synthetic deterministic validation that do not depend on these services.

## ADR-003 — GitHub public repository is specification/source control, not live evidence storage

**Decision:** Commit only public documentation, code intended for public release, and synthetic test fixtures. Do not commit secrets, credentials, private project data, raw sensitive execution logs, or customer records.

**Consequences:** A private evidence store and enforcement mechanism remain open requirements before any live-data workflow.

## ADR-004 — Enforce explicit project boundaries

**Decision:** Every task/run/evidence record must be scoped to one immutable project identifier. Unknown or mismatched project scope fails closed. The separate workflow `Para Jala - Control Plane v0.1` is excluded from Jala Dots Lite and must not be inspected, executed, modified, reused, connected, imported, published, or activated.

**Consequences:** JDL requires independent project/workflow evidence; no state or behavior can be inferred from the excluded workflow.

## Decision gate before implementation

Implementation may proceed only as public, synthetic, deterministic test code/docs. Any use of external services, credentials, private records, paid/usage-billed APIs, deployment, destructive operations, or persistent scheduling requires a separate gate and evidence. The user target remains Rp0 additional spend.
