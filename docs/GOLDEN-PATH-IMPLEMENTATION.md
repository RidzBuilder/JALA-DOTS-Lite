# Golden Path — Deterministic Reference Implementation

**Status:** IMPLEMENTED AS A SMALL IN-MEMORY REFERENCE; execution evidence pending.
**Data:** synthetic fixtures only.
**External dependencies:** none; CommonJS and Node's built-in test runner.
**Persistence:** none. Do not use for live operations.

## Run the tests

From the repository root with Node.js installed:

```sh
node --test test/golden-path.test.js
```

The tests cover:
- valid deterministic execution and evidence fields;
- unknown-project blocking;
- invalid required input;
- approval gate blocking;
- duplicate idempotency key handling;
- project-scoped idempotency.

## Important limitations

This reference implementation is deliberately in-memory. It does not provide authentication, durable storage, cryptographic evidence hashes, cross-process idempotency, real approval identity verification, scheduling, a web interface, or production safeguards. Approval is modeled only as a deterministic policy flag for testing; it is not a security boundary. No test PASS should be claimed until the test command is actually executed and its output is reviewed.
