const { routes } = require('./112-System-Edge-Function-Router.schema');

class EdgeRepo {
  static register(fn) {
    routes.push({ fn, registeredAt: Date.now() });
  }

  static list() {
    return routes;
  }
}

module.exports = EdgeRepo;
