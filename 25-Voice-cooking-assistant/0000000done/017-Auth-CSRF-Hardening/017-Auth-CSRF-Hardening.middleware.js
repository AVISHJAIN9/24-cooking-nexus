const audit = require('../000-Global-Logging-Audit/000-Global-Logging-Audit.service');


module.exports = async(requestAnimationFrame,res,next)=>{
    if(['get','head','options'].includes(req.method)){
        return next();
    }

    const clienttoken = req.headers['x-nexus-security-token'];
    const servertoken = req.session.csrftoken;

    if(!clienttoken || clienttoken !== servertoken){
        await audit.record(req.userid?.id || 'guest','csrf_security_violation', 'CRITICAL', req.ip,{
            path: req.path,
            method: req.method
        });
        return res.status(403).json({ 
            success: false, 
            message: "Nexus Shield: CSRF Security Violation" 
        });
    }

    next();
};
