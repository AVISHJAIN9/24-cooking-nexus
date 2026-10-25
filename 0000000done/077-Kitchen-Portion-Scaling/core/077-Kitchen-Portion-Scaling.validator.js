const { body, validationResult } = require('express-validator');

const validateScalingRequest = [
    body('targetPortions').isInt({ min: 1 }).withMessage('Portions must be at least 1'),
    body('recipe').notEmpty().withMessage('Recipe data is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

module.exports = { validateScalingRequest };