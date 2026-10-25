const admincontroller = require('./core/116-Nexus-Admin-Dashboard.controller');
const adminroutes = require('./116-Nexus-Admin-Dashboard.routes');
const adminservice = require('./core/116-Nexus-Admin-Dashboard.service');

module.exports = {
    controller: admincontroller,
    routes: adminroutes,
    service: adminservice
}