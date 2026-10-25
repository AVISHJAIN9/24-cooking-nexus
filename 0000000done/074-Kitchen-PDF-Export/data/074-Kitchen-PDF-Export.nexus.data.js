const pdfcontroller = require('./core/74-Kitchen-PDF-Export.controller');
const pdfroutes = require('./74-Kitchen-PDF-Export.routes');
const pdfservice = require('./core/74-Kitchen-PDF-Export.service');

module.exports = {
    controller:pdfcontroller,
    routes:pdfroutes,
};
