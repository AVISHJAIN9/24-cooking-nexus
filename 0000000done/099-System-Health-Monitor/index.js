const HealthController = require('./core/099-System-Health-Monitor.controller');
const HealthRoutes = require('./099-System-Health-Monitor.routes');
const HealthService = require('./core/099-System-Health-Monitor.service');

module.exports = {
    controller: HealthController,
    routes: HealthRoutes,
    service: HealthService
};