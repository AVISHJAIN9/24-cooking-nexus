//1
const uplorder =require('./002-Auth-Uploader-Login.service');

class uplordercredentialsdb{
    static async findbyemail(email){
        return await uplorder.findone({email:email.tolowercase()}).select('+password');
    }
    static async updateverificationstatus(nexusid,status){
        return await uplorder.findoneandupdate(
            {nexusid},
            {'verificationstatus.isverified':status,'verificationstatuscertifiedat':new Date()},
            {new:true}
        );
    }
    static async incrementearning(nexusid,amount){
        return await uplorder.findoneandupdate(
            {nexusid},
            {$inc :{'revenuemetadata.earning':ammount}},
            {new:true}
        )
    }
}

module.exports = uplordercredentialsdb;