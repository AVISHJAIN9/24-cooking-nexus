// Basic smoke test for the dashboard service
const assert = require('assert');
const Service = require('../core/051-Member-Personalized-Dashboard.service');

async function run() {
  try {
    // Service expects a userId. Use a mocked id; repo methods may return empty arrays.
    const result = await Service.getDashboardForUser('000000000000000000000000');
    assert(result && result.profile !== undefined, 'Expected profile key');
    console.log('Dashboard smoke test passed');
  } catch (err) {
    console.error('Dashboard smoke test failed', err);
    process.exitCode = 1;
  }
}

if (require.main === module) run();
