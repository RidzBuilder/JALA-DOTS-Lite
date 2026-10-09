# Project Charter — Jala Dots Lite v.1

- **Repository:** `RidzBuilder/JALA-DOTS-Lite`
- **Product name:** Jala Dots Lite v.1
- **Status:** Draft baseline; subject to validation and versioned decisions
- **Primary device:** iPad Air M2
- **Prototype cost target:** Rp0 additional spend
- **Execution approach:** Cloud-first, free-tier-first
- **Code/specification source of truth:** This GitHub repository

## 1. Problem statement

R&D work spans multiple projects, tools, repositories, documents, and validation processes. Repeating project intake, planning, research, tracking, testing, evidence capture, and remediation manually creates avoidable overhead and inconsistent records.

Jala Dots Lite aims to provide a reusable operating layer for coordinating these activities while keeping each project's context and permissions isolated.

## 2. Objectives

1. Register and track multiple R&D projects through a common schema.
2. Reuse a controlled workflow for intake, planning, execution, verification, and documentation.
3. Record decisions, execution status, evidence, blockers, and remediation.
4. Support scheduled checks and reports when provider limits permit.
5. Remain operable from an iPad through browser-accessible interfaces.
6. Minimize additional costs during prototype development.

## 3. Non-goals

- Guaranteed zero cost under every usage pattern or future provider policy.
- Guaranteed continuous uptime from free hosting.
- Full autonomy for high-impact or destructive operations.
- Treating an AI-generated claim as sufficient evidence of completion.
- Coupling the core system to one AI provider or workflow platform.

## 4. Constraints

### Device
All routine authoring, configuration, and project control must be feasible through the iPad Air M2 and a browser. Any local development dependency must be reviewed for iPadOS compatibility.

### Cost
Do not activate paid services, purchase infrastructure, or incur usage-based charges without explicit user approval. Free-tier quotas and policies must be verified before selection.

### Privacy and security
- Never commit API keys, tokens, passwords, or private credentials.
- Use least-privilege access and separate credentials by project/environment where feasible.
- Review data retention and model-provider data-use terms before sending project content.
- Use synthetic or non-sensitive data for initial testing.
- Require approval for destructive operations and production-impacting actions.

### Evidence and integrity
Every workflow must define inputs, expected outputs, acceptance criteria, evidence, and failure handling. Unknown states must remain UNKNOWN or BLOCKED; do not infer PASS.

## 5. Prototype success criteria

The initial prototype is successful only when it can:
1. Register at least one test project.
2. Accept a task through a documented intake path.
3. execute a controlled workflow end-to-end in an available environment.
4. Record run status and output evidence.
5. Produce a remediation item for a simulated failure.
6. Retest and record the outcome.
7. Operate without an unapproved paid dependency.
8. Be controlled from the iPad browser.

These criteria are targets, not claims that implementation or testing has already occurred.

## 6. Governance

- Record material decisions in `docs/DECISION-LOG.md`.
- Update the execution plan when phase gates or dependencies change.
- A phase is not complete until its exit criteria are evidenced.
- Changes to scope, cost constraints, privacy posture, or approval boundaries require explicit review.
