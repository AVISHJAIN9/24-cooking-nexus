const { keys } = require('../data/118-Nexus-Public-API-Gateway.schema');
class APIGateway{static registerKey(k){keys.push(k);}static listKeys(){return keys;}}module.exports=APIGateway;