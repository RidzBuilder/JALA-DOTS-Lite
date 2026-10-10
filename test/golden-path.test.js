'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createGoldenPath, STATES, isTransitionAllowed } = require('../src/golden-path');

const validTask = (overrides = {}) => ({
  taskId: 'synthetic-task-001',
  projectId: 'synthetic-project-001',
  idempotencyKey: 'synthetic-key-001',
  title: 'Synthetic deterministic task',
  intent: '  check fixture  ',
  ...overrides,
});

test('valid synthetic task completes deterministic Golden Path with evidence', () => {
  const result = createGoldenPath().submit(validTask());
  assert.equal(result.status, STATES.CLOSED);
  assert.equal(result.result.normalizedIntent, 'check fixture');
  assert.equal(result.evidence.syntheticOnly, true);
  assert.equal(result.evidence.externalCalls, 0);
  assert.equal(result.evidence.sideEffects, 0);
  assert.deepEqual(result.stageTrace, [STATES.DRAFT, STATES.VALIDATED, STATES.APPROVED,
    STATES.RUNNING, STATES.SUCCEEDED, STATES.EVIDENCE_CAPTURED, STATES.CLOSED]);
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

test('approval-required task blocks even when payload self-asserts APPROVED', () => {
  const result = createGoldenPath().submit(validTask({ requiresApproval: true, approval: 'APPROVED' }));
  assert.equal(result.status, STATES.BLOCKED);
  assert.equal(result.failureCode, 'APPROVAL_REQUIRED');
  assert.equal(result.evidence.captured, true);
});

test('approval record must match exact action and target', () => {
  const engine = createGoldenPath();
  const task = validTask({ requiresApproval: true, action: 'publish', target: 'synthetic-target-A' });
  assert.deepEqual(engine.recordApproval(task, {
    approvedBy: 'synthetic-reviewer', action: 'publish', target: 'synthetic-target-B',
  }), { ok: false, code: 'APPROVAL_SCOPE_MISMATCH' });
  assert.equal(engine.submit(task).failureCode, 'APPROVAL_REQUIRED');
});

test('exact separately recorded approval permits synthetic task; identical retry returns original result', () => {
  const engine = createGoldenPath();
  const task = validTask({ requiresApproval: true, action: 'review', target: 'fixture-A' });
  assert.equal(engine.recordApproval(task, {
    approvedBy: 'synthetic-reviewer', action: 'review', target: 'fixture-A',
  }).ok, true);
  const first = engine.submit(task);
  assert.equal(first.status, STATES.CLOSED);
  assert.equal(first.evidence.sideEffects, 0);
  const second = engine.submit({ ...task, taskId: 'synthetic-task-replay' });
  assert.equal(second.duplicate, true);
  assert.equal(second.originalTaskId, 'synthetic-task-001');
});

test('approval cannot be replayed for changed request or target', () => {
  const engine = createGoldenPath();
  const task = validTask({ requiresApproval: true, action: 'review', target: 'fixture-A' });
  engine.recordApproval(task, { approvedBy: 'synthetic-reviewer', action: 'review', target: 'fixture-A' });
  const changed = engine.submit({ ...task, target: 'fixture-B' });
  assert.equal(changed.status, STATES.BLOCKED);
  assert.equal(changed.failureCode, 'APPROVAL_REQUIRED');
});

test('duplicate idempotency key returns the original logical result', () => {
  const engine = createGoldenPath();
  const first = engine.submit(validTask());
  const second = engine.submit(validTask({ taskId: 'synthetic-task-duplicate' }));
  assert.equal(first.status, STATES.CLOSED);
  assert.equal(second.duplicate, true);
  assert.equal(second.originalTaskId, 'synthetic-task-001');
  assert.equal(second.result.output, first.result.output);
});

test('idempotency is scoped to project', () => {
  const engine = createGoldenPath(['synthetic-project-001', 'synthetic-project-002']);
  engine.submit(validTask());
  const second = engine.submit(validTask({ taskId: 'synthetic-task-002', projectId: 'synthetic-project-002' }));
  assert.equal(second.duplicate, false);
  assert.equal(second.projectId, 'synthetic-project-002');
});

test('non-object task fails closed without throwing', () => {
  const result = createGoldenPath().submit(null);
  assert.equal(result.status, STATES.FAILED);
  assert.equal(result.failureCode, 'INVALID_TASK_SHAPE');
  assert.equal(result.remediation.status, 'REMEDIATION_REQUIRED');
});

test('oversized input fails closed with actionable remediation', () => {
  const result = createGoldenPath().submit(validTask({ intent: 'x'.repeat(2001) }));
  assert.equal(result.status, STATES.FAILED);
  assert.equal(result.failureCode, 'INPUT_TOO_LARGE');
  assert.match(result.remediation.action, /2000 characters/);
});

test('same idempotency key with changed logical request is blocked', () => {
  const engine = createGoldenPath();
  const first = engine.submit(validTask());
  const second = engine.submit(validTask({ intent: 'different intent' }));
  assert.equal(first.status, STATES.CLOSED);
  assert.equal(second.status, STATES.BLOCKED);
  assert.equal(second.failureCode, 'IDEMPOTENCY_KEY_CONFLICT');
  assert.equal(second.evidence.captured, true);
});

test('same idempotency key and same logical request is a duplicate', () => {
  const engine = createGoldenPath();
  engine.submit(validTask());
  const second = engine.submit(validTask());
  assert.equal(second.duplicate, true);
  assert.equal(second.originalTaskId, 'synthetic-task-001');
});

test('state transition graph rejects skips, reversals, and terminal mutation', () => {
  assert.equal(isTransitionAllowed('DRAFT', 'RUNNING'), false);
  assert.equal(isTransitionAllowed('CLOSED', 'RUNNING'), false);
  assert.equal(isTransitionAllowed('SUCCEEDED', 'DRAFT'), false);
  assert.equal(isTransitionAllowed('DRAFT', 'VALIDATED'), true);
  assert.equal(isTransitionAllowed('RUNNING', 'SUCCEEDED'), true);
});
