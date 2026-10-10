'use strict';

/**
 * Jala Dots Lite v0.1 deterministic Golden Path.
 * In-memory reference only: no network, credentials, filesystem, external API,
 * persistence, or side effects. Synthetic test data only.
 *
 * recordApproval() models a trusted host boundary; it does NOT authenticate
 * the approver. A real runtime must protect that method behind verified identity
 * and policy checks before this implementation can authorize real side effects.
 */
const STATES = Object.freeze({
  DRAFT: 'DRAFT', VALIDATED: 'VALIDATED', APPROVAL_REQUIRED: 'APPROVAL_REQUIRED',
  APPROVED: 'APPROVED', RUNNING: 'RUNNING', SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED', BLOCKED: 'BLOCKED', EVIDENCE_CAPTURED: 'EVIDENCE_CAPTURED',
  REMEDIATION_REQUIRED: 'REMEDIATION_REQUIRED', RETEST_READY: 'RETEST_READY', CLOSED: 'CLOSED',
});
const REQUIRED_FIELDS = ['taskId', 'projectId', 'idempotencyKey', 'title', 'intent'];
const MAX_FIELD_LENGTH = 2000;
const ALLOWED_TRANSITIONS = Object.freeze({
  DRAFT: ['VALIDATED', 'FAILED', 'BLOCKED'],
  VALIDATED: ['APPROVAL_REQUIRED', 'APPROVED', 'BLOCKED', 'FAILED'],
  APPROVAL_REQUIRED: ['APPROVED', 'BLOCKED'],
  APPROVED: ['RUNNING', 'BLOCKED'],
  RUNNING: ['SUCCEEDED', 'FAILED', 'BLOCKED'],
  SUCCEEDED: ['EVIDENCE_CAPTURED'],
  FAILED: ['REMEDIATION_REQUIRED'],
  BLOCKED: ['REMEDIATION_REQUIRED'],
  EVIDENCE_CAPTURED: ['CLOSED'],
  REMEDIATION_REQUIRED: ['RETEST_READY', 'CLOSED'],
  RETEST_READY: ['DRAFT', 'CLOSED'],
  CLOSED: [],
});

function isTransitionAllowed(from, to) {
  return Object.prototype.hasOwnProperty.call(ALLOWED_TRANSITIONS, from) &&
    ALLOWED_TRANSITIONS[from].includes(to);
}

function taskFingerprint(task) {
  return JSON.stringify({
    projectId: task.projectId, idempotencyKey: task.idempotencyKey,
    title: task.title.trim(), intent: task.intent.trim(),
    requiresApproval: task.requiresApproval === true,
    action: typeof task.action === 'string' ? task.action.trim() : 'DETERMINISTIC_ECHO',
    target: typeof task.target === 'string' ? task.target.trim() : 'synthetic-output',
  });
}

function validateTask(task, registeredProjectIds) {
  if (!task || typeof task !== 'object' || Array.isArray(task)) {
    return { ok: false, code: 'INVALID_TASK_SHAPE', reason: 'Task must be an object.' };
  }
  const missing = REQUIRED_FIELDS.filter((key) =>
    typeof task[key] !== 'string' || task[key].trim().length === 0
  );
  if (missing.length) {
    return { ok: false, code: 'REQUIRED_FIELD_MISSING', reason: 'Required fields are missing or blank.', fields: missing };
  }
  const oversized = REQUIRED_FIELDS.filter((key) => task[key].length > MAX_FIELD_LENGTH);
  if (oversized.length) {
    return { ok: false, code: 'INPUT_TOO_LARGE', reason: 'One or more fields exceed the reference implementation limit.', fields: oversized };
  }
  if (!registeredProjectIds.has(task.projectId)) {
    return { ok: false, code: 'UNKNOWN_PROJECT', reason: 'Project is not registered.' };
  }
  return { ok: true, code: 'VALIDATION_PASSED', reason: 'Task and project scope validated.' };
}

function createGoldenPath(registry = ['synthetic-project-001']) {
  const registeredProjectIds = new Set(registry);
  const idempotency = new Map();
  const approvals = new Map();

  function recordApproval(task, approval) {
    const validation = validateTask(task, registeredProjectIds);
    if (!validation.ok) return { ok: false, code: validation.code };
    if (!approval || typeof approval !== 'object' ||
        typeof approval.approvedBy !== 'string' || !approval.approvedBy.trim() ||
        typeof approval.action !== 'string' || !approval.action.trim() ||
        typeof approval.target !== 'string' || !approval.target.trim()) {
      return { ok: false, code: 'INVALID_APPROVAL_RECORD' };
    }
    const expectedAction = typeof task.action === 'string' ? task.action.trim() : 'DETERMINISTIC_ECHO';
    const expectedTarget = typeof task.target === 'string' ? task.target.trim() : 'synthetic-output';
    if (approval.action.trim() !== expectedAction || approval.target.trim() !== expectedTarget) {
      return { ok: false, code: 'APPROVAL_SCOPE_MISMATCH' };
    }
    const key = task.projectId + ':' + task.idempotencyKey;
    approvals.set(key, {
      fingerprint: taskFingerprint(task),
      approvedBy: approval.approvedBy.trim(),
      action: expectedAction,
      target: expectedTarget,
      consumed: false,
    });
    return { ok: true, code: 'APPROVAL_RECORDED', note: 'Trusted host must authenticate approvedBy; this reference does not.' };
  }

  function fail(task, code, reason, status, action) {
    const safeTask = task && typeof task === 'object' ? task : {};
    return {
      taskId: typeof safeTask.taskId === 'string' ? safeTask.taskId : null,
      projectId: typeof safeTask.projectId === 'string' ? safeTask.projectId : null,
      status, failureCode: code, reason,
      remediation: {
        status: 'REMEDIATION_REQUIRED',
        action,
        retestCriteria: 'Retry only after the stated prerequisite is satisfied.',
      },
      evidence: { captured: true, type: 'validation-result', syntheticOnly: true },
    };
  }

  function submit(task) {
    const validation = validateTask(task, registeredProjectIds);
    if (!validation.ok) {
      const blocked = validation.code === 'UNKNOWN_PROJECT';
      return fail(task, validation.code, validation.reason,
        blocked ? STATES.BLOCKED : STATES.FAILED,
        validation.code === 'UNKNOWN_PROJECT'
          ? 'Register and verify the intended project before retrying.'
          : validation.code === 'INPUT_TOO_LARGE'
            ? 'Reduce oversized fields to 2000 characters or fewer, then retest.'
            : 'Supply all required fields with valid synthetic values, then retest.');
    }

    const uniqueKey = task.projectId + ':' + task.idempotencyKey;
    const fingerprint = taskFingerprint(task);
    if (idempotency.has(uniqueKey)) {
      const prior = idempotency.get(uniqueKey);
      if (prior.fingerprint !== fingerprint) {
        return fail(task, 'IDEMPOTENCY_KEY_CONFLICT',
          'This project/idempotency key is already bound to a different logical request.',
          STATES.BLOCKED,
          'Reuse the original request payload or issue a new idempotency key for a materially different request.');
      }
      return { ...prior.run, duplicate: true, originalTaskId: prior.run.taskId };
    }

    const requiresApproval = task.requiresApproval === true;
    if (requiresApproval) {
      const approval = approvals.get(uniqueKey);
      const expectedAction = typeof task.action === 'string' ? task.action.trim() : 'DETERMINISTIC_ECHO';
      const expectedTarget = typeof task.target === 'string' ? task.target.trim() : 'synthetic-output';
      if (!approval || approval.consumed || approval.fingerprint !== fingerprint ||
          approval.action !== expectedAction || approval.target !== expectedTarget) {
        return fail(task, 'APPROVAL_REQUIRED',
          'No unused approval record matches this exact project, request, action, and target.',
          STATES.BLOCKED,
          'Obtain a separately recorded approval through a trusted host boundary, bound to this exact request/action/target, then retest.');
      }
      approval.consumed = true;
    }

    const stageTrace = [];
    let state = STATES.DRAFT;
    stageTrace.push(state);
    function transition(next) {
      if (!isTransitionAllowed(state, next)) {
        throw new Error('Invalid state transition: ' + state + ' -> ' + next);
      }
      state = next;
      stageTrace.push(state);
    }

    transition(STATES.VALIDATED);
    transition(STATES.APPROVED);
    transition(STATES.RUNNING);
    transition(STATES.SUCCEEDED);
    transition(STATES.EVIDENCE_CAPTURED);
    transition(STATES.CLOSED);

    const run = {
      taskId: task.taskId, projectId: task.projectId, status: state, stageTrace,
      result: {
        operation: 'DETERMINISTIC_ECHO',
        normalizedIntent: task.intent.trim(),
        output: 'synthetic-result:' + task.intent.trim(),
      },
      acceptance: { passed: true, criteria: ['scope-valid', 'required-fields-valid', 'deterministic-output-created'] },
      evidence: {
        captured: true, type: 'synthetic-golden-path-result', syntheticOnly: true,
        externalCalls: 0, sideEffects: 0,
      },
      duplicate: false,
    };
    idempotency.set(uniqueKey, { fingerprint, run });
    return run;
  }
  return { submit, recordApproval };
}
module.exports = { STATES, validateTask, createGoldenPath, isTransitionAllowed };
