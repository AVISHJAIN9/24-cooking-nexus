// Basic smoke tests for TimerEngine and Repo
const assert = require('assert');
const TimerEngine = require('../core/timer.engine');
const Repo = require('../data/timer.repo');

const run = async () => {
  await Repo.clearAll();
  const t = await TimerEngine.createTimer({ label: 'Test', durationMs: 2000, userId: 'tester' });
  assert(t.id, 'timer id should exist');
  const fetched = await TimerEngine.getTimer(t.id);
  assert(fetched && fetched.label === 'Test');
  await TimerEngine.stopTimer(t.id);
  const stopped = await TimerEngine.getTimer(t.id);
  assert(stopped.status === 'STOPPED');
  console.log('Timer tests passed');
};

if (require.main === module) run().catch(e => { console.error(e); process.exit(1); });
