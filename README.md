# Jala Dots Lite v.1

**Repository:** `RidzBuilder/JALA-DOTS-Lite`  
**Project status:** Foundation baseline — in progress  
**Primary constraint:** iPad Air M2-only development, cloud-first execution, free-tier-first prototype.

## Purpose

Jala Dots Lite is a lightweight, reusable R&D operations system intended to coordinate research, project documentation, workflow execution, verification, evidence capture, and remediation across multiple R&D projects.

It is inspired by the operational goal of persistent, tool-using work orchestration. It is **not** a claim of parity with any proprietary product.

## Operating principles

1. **Free-tier-first:** Target zero additional spend during prototype development. Verify each provider's current quotas, restrictions, sleep behavior, and data policies before adoption.
2. **iPad-only authoring and control:** The iPad Air M2 is the primary user device. Use browser-accessible tools and remote/cloud execution where needed.
3. **Cloud-first execution:** Do not rely on iPadOS to host persistent daemons or continuously running workloads.
4. **Evidence-first:** A task is not PASS merely because an agent says it completed. Record verifiable outputs against acceptance criteria.
5. **Human approval:** Require explicit approval for production deployments, destructive actions, external communications, and other high-impact operations.
6. **Project isolation:** Keep project-specific context, configuration, secrets, and evidence separated.
7. **Documented decisions:** Record architecture decisions and changes in the repository before treating them as canonical.
8. **Fail safely:** FAIL or BLOCKED results must create a diagnosis, remediation action, owner/next step, and retest condition.

## Initial scope

- Project registry and project-specific operating profiles
- Research and architecture workflow
- Reusable workflow orchestration
- Task state, evidence, and audit records
- GAP detection and remediation loop
- Scheduled summaries and checks where free-tier limits permit

## Out of scope for the initial prototype

- Unsupervised production changes
- Guaranteed 24/7 uptime on free services
- Assuming every integration is connected or authenticated
- Sending confidential project data to third-party AI services without an explicit data-policy review
- Building multiple specialized agents before the first end-to-end workflow is validated

## Initial architecture direction

ChatGPT is the central planning and supervision interface. A separately hosted workflow runtime may perform scheduled or persistent execution. GitHub is the source of truth for code and versioned specifications. Notion and other services are optional until their value and access are verified.

n8n, GitHub, Notion, Supabase, Vercel, and AI model providers are candidates—not pre-approved mandatory dependencies.

## Current phase

**Phase 0 — Repository baseline: PASS. Phase 1 — Environment and integration audit: IN PROGRESS / BLOCKED on account-specific n8n trial evidence.** The user confirmed n8n Cloud free trial; official documentation states a 14-day trial with a 1,000-execution limit, but this account's expiry and remaining quota are not visible through connected tools. Vercel Hobby and Supabase Free have conditional usage/eligibility constraints. No production runtime is selected and no paid dependency is approved. See [Integration Audit](docs/INTEGRATION-AUDIT-2026-10-09.md), [GAP-ENV-001 Resolution](docs/GAP-ENV-001-RESOLUTION.md), [Fundamental Specification v0.1](docs/FUNDAMENTAL-SPECIFICATION-v0.1.md), and [Architecture Decision Record v0.1](docs/ARCHITECTURE-DECISION-RECORD-v0.1.md). The specification and ADR are drafts pending review. A deterministic, in-memory Golden Path reference and Node built-in test suite have been committed. After remediation, 10 tests passed in an isolated Node.js v22.16.0 run; this is not fresh-checkout CI or production validation. Phase 07–12 review found remaining evidence, privacy-enforcement, authenticated-approval, durable-state, and runtime blockers. No persistent runtime is approved.

See:
- [Project Charter](docs/PROJECT-CHARTER.md)
- [Execution Plan](docs/EXECUTION-PLAN.md)
- [Decision Log](docs/DECISION-LOG.md)
- [GAP-ENV-001 Resolution](docs/GAP-ENV-001-RESOLUTION.md)
- [Data Classification and Public Repository Boundary](docs/DATA-CLASSIFICATION-AND-PUBLIC-REPO-BOUNDARY.md)
- [Golden Path Implementation Notes](docs/GOLDEN-PATH-IMPLEMENTATION.md)
- [Golden Path Validation Report](docs/GOLDEN-PATH-VALIDATION-REPORT-2026-10-09.md)
- [Phase 07–12 Execution Report](docs/PHASE-07-12-EXECUTION-REPORT-2026-10-09.md)
- [Deterministic Golden Path source](src/golden-path.js)
- [Golden Path tests](test/golden-path.test.js)
