const ScalingService = require('./core/077-Kitchen-Portion-Scaling.service');
const ScalingController = require('./core/077-Kitchen-Portion-Scaling.controller');
const ScalingRoutes = require('./077-Kitchen-Portion-Scaling.routes');

/**
 * Project Nexus: Feature 077 - Public API
 */
module.exports = {
    service: ScalingService,
    controller: ScalingController,
    routes: ScalingRoutes
};