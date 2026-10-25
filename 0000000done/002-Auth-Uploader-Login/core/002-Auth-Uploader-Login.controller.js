//7
const uplorderidentityservice = require('./002-Auth-Uploader-Login.service');

const logincontroller = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const ip = req.ip;
        const chef = await uplorderidentityservices.authentication(email,password,ip);
        res.status(200).json({
            message:"pro shop work space unlocked",
            chef :{name:chef.chefname,verification:chef.verificationstatus.isverified,earning:chef.revenuemetadata.totleearning}
        });
    }catch(error){
        res.status(401).json({error:error.message});
    }
};
module.exports = logincontroller;