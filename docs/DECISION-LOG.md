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


## D-007 — Reuse existing Para Jala control plane only after remediation

- **Date:** 2026-10-09
- **Status:** DEFERRED / BLOCKED
- **Context:** The connected n8n instance contains `Para Jala - Control Plane v0.1`, currently inactive. A recent run failed because `Validation State` referenced `Evidence Ledger` even though that node had not executed.
- **Decision:** Treat the existing workflow as a reuse candidate, not as a validated runtime. Do not activate or publish it until the graph issue is diagnosed, a controlled test passes, and the result is documented.
- **Consequences:** Avoid creating a duplicate control plane before evaluating whether the existing workflow can safely meet the Jala Dots Lite requirements.
