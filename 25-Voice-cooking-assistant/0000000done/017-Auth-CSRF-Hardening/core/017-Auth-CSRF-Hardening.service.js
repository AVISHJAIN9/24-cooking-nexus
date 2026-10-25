const crypto = require('crypto');

class csrfservices{
    static geenratesecreattoken()
{
    return crypto.randomBytes(32).toString('hex');
}
static verify(recivedtoken ,storedtoken){
    if(!recivedtoken || !isstoredtoken) return false;
    return recivedtoken === storedtoken;
}
}
module.export = csrfservices;

