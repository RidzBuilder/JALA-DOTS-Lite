# Integration Audit — 2026-10-09

**Project:** Jala Dots Lite v.1  
**Repository:** `RidzBuilder/JALA-DOTS-Lite`  
**Audit type:** Integration/environment discovery with scope and cost-gate update  
**Scope:** Initial prototype feasibility from iPad Air M2, cloud-first, free-tier-first  
**Resource creation:** None during this audit

## Executive result

The GitHub repository is available and its project documentation has been committed and read back successfully. The user confirms the connected n8n instance is **n8n Cloud free trial** and reiterates the target of **Rp0 additional spend**. The trial is temporary evaluation capacity, not evidence of a sustainable free production runtime. A search for an n8n project named `Jala Dots Lite` returned no match; no dedicated n8n project has yet been established.

**Strict scope boundary:** `Para Jala - Control Plane v0.1` belongs to a different project. Per explicit user instruction, it is excluded from Jala Dots Lite and must not be inspected further, executed, modified, reused, connected, imported, published, or activated. Its prior failure is not a Jala Dots Lite gap.

**Phase 0:** PASS for repository existence, initial docs, and read-back verification.  
**Phase 1:** IN PROGRESS. The n8n plan type is now user-confirmed, but trial expiry/quota and sustainable post-trial zero-cost persistence are not verified. Persistent automation remains BLOCKED pending evidence.

## Findings

| Component | Observed state | Initial decision |
|---|---|---|
| GitHub | `RidzBuilder/JALA-DOTS-Lite` exists; default branch `main`; public; admin/read/write access available through the connected integration | Adopt as source of truth for code and versioned specifications. Do not commit secrets or private project data. |
| n8n | User-confirmed n8n Cloud free trial. Search for an n8n project named `Jala Dots Lite` returned no match. Trial quota, expiry date, and post-trial billing details have not been independently verified. | Temporary test candidate only. Do not rely on it as permanent zero-cost runtime or start paid service. Establish a Jala Dots Lite-specific isolated project/workflow only after scope and quota checks. |
| Para Jala workflow | Explicitly identified by the user as a separate project, outside Jala Dots Lite scope. | **EXCLUDED / DO NOT TOUCH OR USE.** No further inspection, execution, modification, reuse, connection, import, publishing, or activation for Jala Dots Lite. Its state is irrelevant to Jala Dots Lite acceptance. |
| Notion | Connected tools available; search for `JALA-DOTS-Lite` returned no results. Basic search/fetch/create operations are available; some advanced query functions require a higher plan. | Optional documentation surface. GitHub remains the canonical source until a specific Notion use case is approved. |
| Vercel | Connected team reports Hobby plan. Existing linked projects include `AOS-UNIVERSE` and `Digital-Marketer`; no Jala Dots Lite project is listed. | Candidate for UI/API hosting. Verify current usage and deployment constraints before creating or deploying a project. |
| Supabase | Organization `POROS UNIVERSE` reports Free plan. One existing project, `Digital Marketer`, is ACTIVE_HEALTHY in `ap-southeast-1`. | Candidate for persistence only if needed. Reuse or create resources only after scope, isolation, capacity, and cost checks. No new project created. |
| AI providers | n8n lists OpenAI, Hugging Face, Firecrawl, and Gmail credentials by name; credential secrets were not accessed. | Credential existence does not prove available credits, free-tier eligibility, or data-policy suitability. Do not call usage-billed AI APIs until pricing/limits are verified and approval is explicit. |

## n8n Cloud free-trial assessment (GAP-ENV-001)

The user has confirmed the instance type: **n8n Cloud free trial**. This closes the ambiguity about the hosting category, but does not close the cost/persistence gap:
- The trial is limited and must not be treated as an indefinite free runtime.
- Exact trial expiry, remaining executions, and post-trial account behavior are not independently visible through the connected n8n tools used in this audit.
- Therefore, a continuously available production/scheduled workflow cannot currently be certified as Rp0 after trial expiry.
- Do not subscribe, upgrade, enable paid usage, or assume a charge-free conversion.
- Use the trial only for bounded, non-sensitive, cost-checked evaluation. Keep the golden-path design portable and avoid building a critical dependency on trial-only execution.
- A self-hosted Community Edition is not automatically Rp0 end-to-end: compute/hosting, persistence, network exposure, and maintenance would still need a verified zero-cost solution.

Official sources checked on 2026-10-09:
- https://n8n.io/pricing/
- https://docs.n8n.io/get-started/choose-how-to-use-n8n/
- https://docs.n8n.io/deploy/host-n8n/community-edition-features/

## Security and cost notes

1. The repository is public. Keep secrets, private client data, private project records, and sensitive logs out of the repository.
2. The n8n credential list contains an OpenAI API credential. This audit did not use it and did not verify its billing state.
3. The Supabase organization is on the Free plan, but quotas and project-specific usage still need review before relying on it.
4. Vercel Hobby is observed, but deployment/compute limits and current usage must be checked before adding a project.
5. The hosting category is now user-confirmed as n8n Cloud free trial; remaining execution quota, expiry, and post-trial billing state remain unverified.
6. No paid resources were created, no workflows were published or activated, and no existing workflow was modified.

## Blocking and follow-up items

- **GAP-ENV-001 — n8n runtime cost and persistence:** PARTIALLY RESOLVED. Instance type confirmed as Cloud free trial; sustainable post-trial Rp0 persistence is NOT VERIFIED, so persistent automation remains BLOCKED. Required evidence: trial expiry/remaining quota and a sustainable no-additional-cost runtime decision.
- **GAP-SCOPE-001 — Project separation:** CLOSED by explicit user decision. Para Jala workflow is excluded and must not be touched or used for Jala Dots Lite.
- **GAP-PRIV-001 — Public repository data boundary:** Define an explicit public/private artifact classification before adding project registry data or evidence.
- **GAP-AI-001 — Model billing and data policy:** Identify a suitable model path with known cost/quotas and acceptable data handling; do not infer free usage from connector availability.
- **GAP-PLATFORM-001 — Hosting quotas:** Confirm Vercel and Supabase capacity before choosing them for the golden path.

## Next logical step

Continue Phase 1 without touching the Para Jala workflow: verify remaining n8n trial quota/expiry using user-visible account settings if available, complete cost/privacy checks for the minimum stack, and determine whether the first golden path should be manual-first while persistent automation remains blocked. Then formalize the Jala Dots Lite-specific architecture and create only isolated project resources.
