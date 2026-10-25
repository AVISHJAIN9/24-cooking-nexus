const services = require('../services');

exports.getsecuritytoken = (req,res)=>{
    req.session.csrftoken = service.generatesecreattoken();

    req.session.csrftoken = token;


    req.status(200).json({
        success:true,
        securitytoken:token
    });
};