const express = require('express');
const router = express.Router();
const controller = require('./core/74-Kitchen-PDF-Export.controller');

router.get('/download/:recipeId', controller.generateDownload);

module.export = routes;