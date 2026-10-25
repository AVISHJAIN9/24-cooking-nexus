// 3 
// Using your "DRY" factory logic for the professional shield


const { body ,validateresult } = require('express-valiudator');

const validate =(req,res,next)=>{
    const error = validateresult(req);
    if(error.isempty()) return next();
    return res.status(422).json({error:error.array().map(arr => ({[error.path]:error.msg}))})
};

const prologinrules = () => [
    body('email').isemail().withmessage('invalid pro-chef email').normalizeemail(),
    body('password').isLength({min:8}).withmessage('security key must be 8+ chars')
];
module.exports = { uploadervalidator : [prologinrules(),validate]};

