const VectorRepo = require('../data/113-System-Vector-DB-Cluster.infra.repo');

class VectorCluster {
  static registerNode(info) { VectorRepo.add({ ...info, registered: Date.now() }); }
  static getStatus() { return VectorRepo.list(); }
}
module.exports = VectorCluster;
