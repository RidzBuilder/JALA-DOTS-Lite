# Integration Audit — 2026-10-09

**Project:** Jala Dots Lite v.1  
**Repository:** `RidzBuilder/JALA-DOTS-Lite`  
**Audit type:** Read-only integration and environment discovery  
**Scope:** Initial prototype feasibility from iPad Air M2, cloud-first, free-tier-first  
**Resource creation:** None during this audit

## Executive result

The GitHub repository is available and its initial documentation has been committed and read back successfully. Existing n8n, Notion, Vercel, and Supabase integrations are accessible through connected tools. This does not mean every service is ready for Jala Dots Lite. The existing n8n control-plane workflow has a known failed execution and is inactive, so it must not be treated as a validated production path.

**Phase 0:** PASS for repository existence, initial docs, and read-back verification.  
**Phase 1:** IN PROGRESS. Tool availability is established; runtime cost, quota, privacy, and integration suitability still require evidence.

## Findings

| Component | Observed state | Initial decision |
|---|---|---|
| GitHub | `RidzBuilder/JALA-DOTS-Lite` exists; default branch `main`; public; admin/read/write access available through the connected integration | Adopt as source of truth for code and versioned specifications. Do not commit secrets or private project data. |
| n8n | Connected instance is accessible. Six existing workflows and four named credentials are visible. Project search returned no matching named project. | Candidate for workflow runtime; exact plan/hosting cost and free execution limits are unverified. Do not assume API credentials imply free model usage. |
| Existing n8n control plane | `Para Jala - Control Plane v0.1` exists, is inactive, has 19 nodes, and can be executed. A recent execution (ID `16`) failed with an expression referencing `Evidence Ledger` before that node had executed. | Reuse candidate, not PASS. Inspect and remediate the graph in a separately scoped step; do not publish or activate without validation. |
| Notion | Connected tools available; search for `JALA-DOTS-Lite` returned no results. Basic search/fetch/create operations are available; some advanced query functions require a higher plan. | Optional documentation surface. GitHub remains the canonical source until a specific Notion use case is approved. |
| Vercel | Connected team reports Hobby plan. Existing linked projects include `AOS-UNIVERSE` and `Digital-Marketer`; no Jala Dots Lite project is listed. | Candidate for UI/API hosting. Verify current usage and deployment constraints before creating or deploying a project. |
| Supabase | Organization `POROS UNIVERSE` reports Free plan. One existing project, `Digital Marketer`, is ACTIVE_HEALTHY in `ap-southeast-1`. | Candidate for persistence only if needed. Reuse or create resources only after scope, isolation, capacity, and cost checks. No new project created. |
| AI providers | n8n lists OpenAI, Hugging Face, Firecrawl, and Gmail credentials by name; credential secrets were not accessed. | Credential existence does not prove available credits, free-tier eligibility, or data-policy suitability. Do not call usage-billed AI APIs until pricing/limits are verified and approval is explicit. |

## n8n free-tier interpretation

Official n8n documentation distinguishes the hosted Cloud trial from the indefinitely free self-hosted Community edition:
- n8n Cloud offers a limited free trial (the pricing page currently lists 1,000 executions for the trial); it is not an assumed permanent free runtime.
- Self-hosted Community edition is free software, but it still requires an always-available host if scheduled workflows must run while the iPad is offline.
- The current connected n8n instance's exact hosting model and billing state were not surfaced by the integration audit.

Sources checked on 2026-10-09:
- https://n8n.io/pricing/
- https://docs.n8n.io/get-started/choose-how-to-use-n8n/
- https://docs.n8n.io/deploy/host-n8n/community-edition-features/

## Security and cost notes

1. The repository is public. Keep secrets, private client data, private project records, and sensitive logs out of the repository.
2. The n8n credential list contains an OpenAI API credential. This audit did not use it and did not verify its billing state.
3. The Supabase organization is on the Free plan, but quotas and project-specific usage still need review before relying on it.
4. Vercel Hobby is observed, but deployment/compute limits and current usage must be checked before adding a project.
5. The n8n instance's hosting model and billing/credit boundaries were not established by this audit.
6. No paid resources were created, no workflows were published or activated, and no existing workflow was modified.

## Blocking and follow-up items

- **GAP-ENV-001 — n8n runtime cost and persistence:** Verify hosting model, subscription, execution limits, sleep behavior, and whether the current instance can satisfy the prototype without additional spend.
- **GAP-N8N-001 — Existing control-plane failure:** Diagnose the `Evidence Ledger` unexecuted-node reference in execution `16`; write a test and retest before reuse.
- **GAP-PRIV-001 — Public repository data boundary:** Define an explicit public/private artifact classification before adding project registry data or evidence.
- **GAP-AI-001 — Model billing and data policy:** Identify a suitable model path with known cost/quotas and acceptable data handling; do not infer free usage from connector availability.
- **GAP-PLATFORM-001 — Hosting quotas:** Confirm Vercel and Supabase capacity before choosing them for the golden path.

## Next logical step

Complete the Phase 1 provider/cost/privacy audit and inspect the existing `Para Jala - Control Plane v0.1` workflow as a reuse candidate. Then decide the minimum viable stack and formalize the architecture before implementing new runtime components.
