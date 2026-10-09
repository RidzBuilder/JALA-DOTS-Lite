# GAP-ENV-001 — n8n Runtime Cost and Persistence

- **Project:** Jala Dots Lite v.1
- **Gap ID:** GAP-ENV-001
- **Assessment date:** 2026-10-09
- **Status:** PARTIALLY RESOLVED / BLOCKED for persistent automation
- **Canonical project repository:** https://github.com/RidzBuilder/JALA-DOTS-Lite

## 1. User-confirmed fact

The connected n8n instance is **n8n Cloud free trial**. The cost target is **Rp0 additional spend**.

## 2. Evidence available

- The user explicitly identified the n8n plan as a Cloud free trial.
- A read-only n8n project search for `Jala Dots Lite` returned no matching project (0 results).
- The connected n8n tools do not expose authoritative trial expiry, remaining executions, payment method state, or post-trial billing state in the audit performed.
- No workflow was created, executed, modified, published, or activated as part of closing this gap.
- The separate `Para Jala - Control Plane v0.1` workflow is explicitly out of scope and must not be touched or used.

## 3. Finding

The instance category is known, but a sustainable Rp0 runtime is **not proven**. A Cloud free trial is temporary evaluation capacity and cannot be accepted as the permanent production/scheduled runtime without account-specific quota and expiry evidence. Do not infer that post-trial usage remains free.

## 4. Decision

1. Do not upgrade, subscribe, enable paid usage, or authorize any charge.
2. Do not use the n8n trial as a production dependency.
3. Keep persistent/scheduled automation **BLOCKED** until the remaining trial quota, expiry, and billing behavior are verified and a sustainable zero-additional-cost path is evidenced.
4. Prefer a manual-first golden path for early functional validation, using synthetic/non-sensitive data and existing tools, without triggering billable APIs.
5. If n8n is later used for Jala Dots Lite, create a dedicated Jala Dots Lite workflow in an isolated project/scope. Do not import, link, reuse, or edit any Para Jala workflow.
6. Any alternative runtime must be assessed for total cost, quotas, persistence, secrets handling, privacy, and iPad-browser operability before adoption.

## 5. Required closure evidence

- [ ] Account-visible trial expiry date captured.
- [ ] Account-visible remaining execution quota captured.
- [ ] Billing/payment behavior after trial expiry checked without initiating a purchase or upgrade.
- [ ] Candidate zero-cost runtime and limits documented.
- [ ] A bounded, non-sensitive Jala Dots Lite test demonstrates the chosen route without additional charges.
- [ ] Evidence is read back from the canonical repository.

## 6. Closure criteria

GAP-ENV-001 may be marked **PASS/CLOSED** only when all required evidence supports the Rp0 target for the intended execution pattern. Until then, the gap remains **PARTIALLY RESOLVED / BLOCKED**.

## 7. Audit integrity

This record distinguishes user-confirmed facts from facts not visible to connected tools. It does not claim that trial expiry, remaining quota, payment state, or permanent zero-cost execution has been verified.
