'use strict';

/**
 * Jala Dots Lite v0.1 deterministic Golden Path.
 * In-memory reference implementation only: no network, credentials, filesystem,
 * external API, persistence, or side effects. Synthetic test data only.
 */

const STATES = Object.freeze({
  DRAFT: 'DRAFT', VALIDATED: 'VALIDATED', APPROVAL_REQUIRED: 'APPROVAL_REQUIRED',
  APPROVED: 'APPROVED', RUNNING: 'RUNNING', SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED', BLOCKED: 'BLOCKED', EVIDENCE_CAPTURED: 'EVIDENCE_CAPTURED',
  REMEDIATION_REQUIRED: 'REMEDIATION_REQUIRED', RETEST_READY: 'RETEST_READY', CLOSED: 'CLOSED',
});
const REQUIRED_FIELDS = ['taskId', 'projectId', 'idempotencyKey', 'title', 'intent'];
const MAX_FIELD_LENGTH = 2000;

function taskFingerprint(task) {
  return JSON.stringify({
    projectId: task.projectId, idempotencyKey: task.idempotencyKey,
    title: task.title.trim(), intent: task.intent.trim(),
    requiresApproval: task.requiresApproval === true, approval: task.approval || null,
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
  if (task.requiresApproval === true && task.approval !== 'APPROVED') {
    return { ok: false, code: 'APPROVAL_REQUIRED', reason: 'Explicit approval is required before execution.' };
  }
  return { ok: true, code: 'VALIDATION_PASSED', reason: 'Task and project scope validated.' };
}

function createGoldenPath(registry = ['synthetic-project-001']) {
  const registeredProjectIds = new Set(registry);
  const idempotency = new Map();

  function submit(task) {
    const validation = validateTask(task, registeredProjectIds);
    if (!validation.ok) {
      const blocked = validation.code === 'UNKNOWN_PROJECT' || validation.code === 'APPROVAL_REQUIRED';
      return {
        taskId: task && typeof task.taskId === 'string' ? task.taskId : null,
        projectId: task && typeof task.projectId === 'string' ? task.projectId : null,
        status: blocked ? STATES.BLOCKED : STATES.FAILED,
        failureCode: validation.code,
        reason: validation.reason,
        remediation: {
          status: 'REMEDIATION_REQUIRED',
          action: validation.code === 'UNKNOWN_PROJECT'
            ? 'Register and verify the intended project before retrying.'
            : validation.code === 'APPROVAL_REQUIRED'
              ? 'Obtain an explicit approval scoped to this task and action before retrying.'
              : validation.code === 'INPUT_TOO_LARGE'
                ? 'Reduce oversized fields to 2000 characters or fewer, then retest.'
                : 'Supply all required fields with valid synthetic values, then retest.',
          retestCriteria: 'Resubmit only after the stated prerequisite is satisfied.',
        },
        evidence: { captured: true, type: 'validation-result', syntheticOnly: true },
      };
    }

    const uniqueKey = task.projectId + ':' + task.idempotencyKey;
    if (idempotency.has(uniqueKey)) {
      const prior = idempotency.get(uniqueKey);
      if (prior.fingerprint !== taskFingerprint(task)) {
        return {
          taskId: task.taskId, projectId: task.projectId, status: STATES.BLOCKED,
          failureCode: 'IDEMPOTENCY_KEY_CONFLICT',
          reason: 'This project/idempotency key is already bound to a different logical request.',
          remediation: {
            status: 'REMEDIATION_REQUIRED',
            action: 'Reuse the original request payload or issue a new idempotency key for a materially different request.',
            retestCriteria: 'Retry with a matching payload or a new unique key.',
          },
          evidence: { captured: true, type: 'validation-result', syntheticOnly: true },
        };
      }
      return { ...prior.run, duplicate: true, originalTaskId: prior.run.taskId };
    }

    const run = {
      taskId: task.taskId, projectId: task.projectId, status: STATES.SUCCEEDED,
      stageTrace: [STATES.DRAFT, STATES.VALIDATED, STATES.APPROVED, STATES.RUNNING,
        STATES.SUCCEEDED, STATES.EVIDENCE_CAPTURED, STATES.CLOSED],
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
    idempotency.set(uniqueKey, { fingerprint: taskFingerprint(task), run });
    return run;
  }
  return { submit };
}
module.exports = { STATES, validateTask, createGoldenPath };
