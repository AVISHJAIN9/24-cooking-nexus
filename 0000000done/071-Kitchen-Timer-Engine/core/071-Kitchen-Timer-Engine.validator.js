const {body,validateresult} = require('express-valiodator');

const validatetimerequest = [
    body('baseminutes').isnumeric().withmessage('base time must be a number '),
    body('factor').isnumeric().withmessage('scaling factor must be a number'),
    body('mode'.isin['thermal','fixed','linear']).withmessage('invalid scaling mode'),
    (req,res,next)=>{
        const erro = validateresult(req);
        if(!error.isempty()) return res.status(400).json({error:error.array()});
        next();
    }
];
module.exports = {validatetimerequest};