import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const moduleUrl = new URL('../dist/core/decorators/rate-limit.decorator.js', import.meta.url);
const taskUrl = new URL('../dist/core/task.js', import.meta.url);
const result = spawnSync(process.execPath, [
  '--input-type=module',
  '-e',
  `await import(${JSON.stringify(moduleUrl.href)});
   const { TaskManager } = await import(${JSON.stringify(taskUrl.href)});
   new TaskManager({ logger: {} });`,
], { encoding: 'utf8', timeout: 5000 });

assert.ifError(result.error);
assert.equal(result.status, 0, result.stderr);
console.log('Rate-limit and task housekeeping do not keep an idle Node process alive.');
