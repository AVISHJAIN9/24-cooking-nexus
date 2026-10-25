export * from './data/119-Nexus-Compliance-GDPR.types';
export * from './core/119-Nexus-Compliance-GDPR.nexus.core.ts';
export * from './ui/119-Nexus-Compliance-GDPR.nexus.ui.tsx';
const ComplianceService = require('./core/119-Nexus-Compliance-GDPR.service');
const ComplianceRoutes = require('./119-Nexus-Compliance-GDPR.routes');

module.exports = {
    service: ComplianceService,
    routes: ComplianceRoutes
};