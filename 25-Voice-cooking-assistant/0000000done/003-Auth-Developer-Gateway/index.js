export * from './data/003-Auth-Developer-Gateway.types';
export * from './core/003-Auth-Developer-Gateway.identity.service.ts';
export * from './ui/003-Auth-Developer-Gateway.portal.ui.tsx';
const developerRoutes = require('./003-Auth-Developer-Gateway.routes');
const developerMiddleware = require('./core/003-Auth-Developer-Gateway.middleware');

module.exports = {
    developerRoutes,
    developerMiddleware // Exported so other blocks can use it for 'Admin Only' routes
};