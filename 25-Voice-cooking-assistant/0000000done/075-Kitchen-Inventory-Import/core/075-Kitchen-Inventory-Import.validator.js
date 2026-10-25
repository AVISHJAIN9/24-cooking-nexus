//Sanitizes incoming CSV or JSON inventory data.
const {body,validateresult} = require('express-validater');

const validateimport = [
    body('ingredientname').notempty().withmessage('ingrediant name is required'),
    body('quantity').isnumeric().withmessage('quantity must be a number'),
    body('unit').notempty().withmessage('unit is required').isIn(['kg','g','ltr','ml','pcs']).withmessage('invalid unit'),
    body("expiredate").isiso8601().withmessage('Valid expiry date is required'),
    (req,res,next) => { 
        const error = validateresult(req);
        if(!error.isempty()) return res.status(400).json({error:error.array()});
        next();
    }
];