//This handles the heavy lifting: hashing, password comparison, and updating security metadata.

const user = require('../data/001-Auth-User-Login.credentials.db');
const bycrypt = require('bcryptjs');

class useridentityservices{
    static async authentication(email,password,ip,fingerprint){
        if(!user) throw new error("security alert credential mismatch ")

        if(user.securitymetadata.failedattempt>=5){
            throw new Error("account locked due to multiple failed attempts")
        }
        const ismatch = await bycrypt.compare(password, user.password);
        if(!ismatch){
            user.security.metadata.failedattempt+=1;
            user.securitymetadata.audittrail.push({action:'failed_login',timestamp:new Date()});
            await user.save();
            throw new Error("security alert credential mismatch")
        }

        //if success reset 
        user.securitymetadata.failedattempt = 0;
        user.securitymetadata.lastloginip = ip;
        user.securitymetadata.devicefingerprint = fingerprint;
        user.securitymetadata.audittrail.push({action:'successful_login',timestamp:new Date()});
        await user.save();

        return user;
    }
}

module.exports = useridentityservices;