//4
//The "Brain" that manages professional sessions.

const uplorder = require('../core/002-Auth-Uploader-Login.service');

class uplorderidentityservices{
    static async authenticate(email,password,ip){
        const chef = await uplorder.findone({email}).select('+password');
        if(!chef) throw new error("Pro-Access Denied: Invalid Credentials");

        const ismtch = await bycrypt.copmpare(password,chef.password);
        if(!ismatch){
            chef.securitymetadat.audittrail.push({action:'failed_pro_login',timestamp:new Date()})
            await chef.save();
            throw new error("pro access denied:invalid credentials");
        }
        chef.securitymetadata.lastloginip = ip;
        chef.securitymetadata.audittrail.push({ action: 'successful_pro_login',timestamp:new Date()});
        await chef.save();
        return chef;

    }

}
    module.exports = uplorderidentityservice;