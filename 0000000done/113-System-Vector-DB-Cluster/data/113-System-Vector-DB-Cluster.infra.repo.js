const { nodes } = require('./113-System-Vector-DB-Cluster.schema');

class VectorRepo {
  static add(node) { nodes.push(node); }
  static list() { return nodes; }
}
module.exports = VectorRepo;
