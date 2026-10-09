'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createGoldenPath, STATES } = require('../src/golden-path');

const validTask = (overrides = {}) => ({
  taskId: 'synthetic-task-001',
  projectId: 'synthetic-project-001',
  idempotencyKey: 'synthetic-key-001',
  title: 'Synthetic deterministic task',
  intent: '  check fixture  ',
  ...overrides,
});

test('valid synthetic task completes deterministic Golden Path with evidence', () => {
  const engine = createGoldenPath();
  const result = engine.submit(validTask());
  assert.equal(result.status, STATES.SUCCEEDED);
  assert.equal(result.result.normalizedIntent, 'check fixture');
  assert.equal(result.evidence.syntheticOnly, true);
  assert.equal(result.evidence.externalCalls, 0);
  assert.equal(result.evidence.sideEffects, 0);
  assert.deepEqual(result.stageTrace, [
    STATES.DRAFT, STATES.VALIDATED, STATES.APPROVED, STATES.RUNNING,
    STATES.SUCCEEDED, STATES.EVIDENCE_CAPTURED, STATES.CLOSED,
  ]);
});

test('unknown project is blocked before execution and includes remediation', () => {
  const result = createGoldenPath().submit(validTask({ projectId: 'unknown-project' }));
  assert.equal(result.status, STATES.BLOCKED);
  assert.equal(result.failureCode, 'UNKNOWN_PROJECT');
  assert.match(result.remediation.action, /Register and verify/);
});

test('missing required input fails closed with remediation', () => {
  const result = createGoldenPath().submit(validTask({ intent: ' ' }));
  assert.equal(result.status, STATES.FAILED);
  assert.equal(result.failureCode, 'REQUIRED_FIELD_MISSING');
  assert.equal(result.remediation.status, 'REMEDIATION_REQUIRED');
});

test('approval-required task is blocked before execution', () => {
  const result = createGoldenPath().submit(validTask({ requiresApproval: true }));
  assert.equal(result.status, STATES.BLOCKED);
  assert.equal(result.failureCode, 'APPROVAL_REQUIRED');
  assert.equal(result.evidence.captured, true);
});

test('duplicate idempotency key returns the original logical result', () => {
  const engine = createGoldenPath();
  const first = engine.submit(validTask());
  const second = engine.submit(validTask({ taskId: 'synthetic-task-duplicate' }));
  assert.equal(first.status, STATES.SUCCEEDED);
  assert.equal(second.duplicate, true);
  assert.equal(second.originalTaskId, 'synthetic-task-001');
  assert.equal(second.result.output, first.result.output);
});

test('idempotency is scoped to project', () => {
  const engine = createGoldenPath(['synthetic-project-001', 'synthetic-project-002']);
  engine.submit(validTask());
  const second = engine.submit(validTask({
    taskId: 'synthetic-task-002',
    projectId: 'synthetic-project-002',
  }));
  assert.equal(second.duplicate, false);
  assert.equal(second.projectId, 'synthetic-project-002');
});
