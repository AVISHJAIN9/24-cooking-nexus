const EdgeRepo = require('../data/112-System-Edge-Function-Router.infra.repo');

class EdgeOrchestrator {
  static async invoke(fnName, payload) {
    // find matching route
    const route = EdgeRepo.list().find(r => r.fn.name === fnName);
    if (!route) throw new Error('ROUTE_NOT_FOUND');
    // call the function with payload
    return await route.fn(payload);
  }

  static registerFunction(fn) {
    EdgeRepo.register(fn);
  }
}

module.exports = EdgeOrchestrator;
