# Golden Path Validation Report — 2026-10-09

- **Project:** Jala Dots Lite v.1
- **Source of test inputs:** GitHub read-back of `src/golden-path.js` and `test/golden-path.test.js` at the checkpoint reviewed for this validation.
- **Runtime:** Node.js v22.16.0
- **Command:** `node --test test/golden-path.test.js`
- **Result:** 6 passed, 0 failed, 0 skipped.
- **Execution boundary:** Ran in a temporary isolated local directory using the source and test content read from GitHub. The GitHub repository could not be cloned in this execution environment because DNS/network access to github.com was unavailable; therefore this report validates the read-back source content reproduced into the isolated test directory, not a live CI run against a fresh clone.
- **External calls / credentials / production side effects:** None used by the deterministic code path or tests.
- **Data:** Synthetic fixture values only.

## Test results

| Test | Result | Evidence |
|---|---|---|
| Valid synthetic task completes with evidence | PASS | Node test output: subtest 1 `ok` |
| Unknown project is blocked and remediation is provided | PASS | Node test output: subtest 2 `ok` |
| Missing required input fails with remediation | PASS | Node test output: subtest 3 `ok` |
| Approval-required task is blocked | PASS | Node test output: subtest 4 `ok` |
| Duplicate idempotency key returns original logical result | PASS | Node test output: subtest 5 `ok` |
| Idempotency is scoped to project | PASS | Node test output: subtest 6 `ok` |

## Limitations and unresolved findings

1. This is an in-memory reference implementation, not production runtime code.
2. Idempotency is process-local and not durable across restarts or multiple workers.
3. Approval is modeled as a test flag, not authenticated human approval or a security boundary.
4. The state trace is emitted as a result array; it is not a persistent, independently enforced state machine.
5. Evidence fields are descriptive metadata; cryptographic integrity, immutable storage, and independent provenance are not implemented.
6. The test suite does not prove authentication, authorization, real project isolation across services, private evidence storage, scheduling, deployment, or cost/persistence after the n8n trial.
7. Phase 2 specification remains DRAFT pending review; these test results do not automatically lock the specification.

## Decision

The six defined deterministic contract tests **PASS in the isolated local test run**. This closes only the narrow test-run requirement for these six reference cases. It does not close GAP-ENV-001, GAP-PRIV-001, GAP-AI-001, GAP-PLATFORM-001, or production-readiness gates.


## Superseding remediation retest — 2026-10-09

The earlier six-test result above is historical and has been superseded by the Phase 07–12 remediation run. The deterministic reference and test suite were extended to cover non-object input, oversized fields, conflicting payloads under the same idempotency key, and same-payload duplicate retries. An intermediate remediation test run returned 9 passed / 1 failed; the logical fingerprint was corrected to exclude the per-submission `taskId`, after which the retest returned **10 passed, 0 failed, 0 skipped** on Node.js v22.16.0. The run was performed in an isolated local directory and is not a fresh-clone CI run. See [Phase 07–12 Execution Report](PHASE-07-12-EXECUTION-REPORT-2026-10-09.md).

The test result applies only to the deterministic in-memory reference. Approval authentication, enforced state transitions, durable idempotency, cryptographic/immutable evidence, privacy enforcement, cross-service isolation, and persistent zero-cost runtime remain unverified or blocked.
