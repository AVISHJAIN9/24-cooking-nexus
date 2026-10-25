const Service = require('./core/009-Auth-Data-Masking.service');

module.exports = (req, res, next) => {
    const originalJson = res.json;

    // Overriding the res.json method to automatically mask data
    res.json = function (data) {
        if (data && data.user) {
            if (data.user.email) data.user.email = Service.maskEmail(data.user.email);
            if (data.user.phone) data.user.phone = Service.maskString(data.user.phone, 4);
        }
        return originalJson.call(this, data);
    };
    next();
};