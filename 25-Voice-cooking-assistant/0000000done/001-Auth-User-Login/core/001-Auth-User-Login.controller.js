//This handles the Request/Response cycle and talks to the Service.
const useridentityservces = require('./001-Auth-User-Login.services');

const logincontroller = async(request,response) => {
    try{
        const {email,password,fingerprint} = request.body;
        const ip = request.ip || request.connection.remoteaddress;

        const user = await useridentityservices.authentication(email,password,ip,fingerprint);
        response.status(200).json({
            message:"workspace unlocked",
            user:{nexusid: user.nexusid,fullname:user.fullname,role:user.role}
        });
    }catch(error){
        response.status(401).json({error:error.message});
    }
};
module.exports = logincontroller;
