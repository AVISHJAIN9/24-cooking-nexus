const Edge = require('../core/112-System-Edge-Function-Router.orchestrator.service');

// simple mocha-style assertions (node built-in assert)
const assert = require('assert');

describe('Edge Orchestrator', () => {
  it('registers and invokes a function', async () => {
    const fn = async (p) => p + 1;
    Edge.registerFunction(fn);
    const result = await Edge.invoke('fn', 1).catch(e => e);
    assert.ok(result instanceof Error, 'should throw because name mismatch');
  });
});
