const Cluster = require('../core/113-System-Vector-DB-Cluster.orchestrator.service');
const assert = require('assert');
describe('Vector Cluster',()=>{it('registers node',()=>{Cluster.registerNode({name:'n1',status:'UP'}); const list=Cluster.getStatus(); assert.ok(list.length===1);});});