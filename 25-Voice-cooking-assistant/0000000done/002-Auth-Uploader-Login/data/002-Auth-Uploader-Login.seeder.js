// 2 This allows you to test the professional dashboard immediately.

const uplorder = require('../core/002-Auth-Uploader-Login.service');
const bcrypt = require('bcryptjs');

const seeduplorder = async()=>{
    const hassedpassword = await bcrypt.hash('uploaderpassword',10);
    const testchef = {
        nexusid:'chef_v1_001',
        chefname:'chef gorden',
        email :'pro@nexus.com',
        password:'hashedpassword',
        role:'verified-chef',
        verificationstatus:{
            isverified:true,
            certification:new Date()
        }
    };
    await uplorder.deletemany({email:testchef.email});
    await uplorder.create(testchef);
    console.log("pro chef seeded");
}
module.exports = seeduplorder;
