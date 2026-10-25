/**
 * Project Nexus: Feature 074 - Kitchen PDF Export
 * Responsibility: Exporting the Controller and Routes for easy integration.
 */

const PDFController = require('./core/074-Kitchen-PDF-Export.controller');
const PDFRoutes = require('./074-Kitchen-PDF-Export.routes');
const PDFService = require('./core/074-Kitchen-PDF-Export.service');

module.exports = {
    controller: PDFController,
    routes: PDFRoutes,
    service: PDFService // Exported in case other features need to generate PDFs internally
};