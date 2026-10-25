const { policies } = require('./114-System-Auto-Scaling-Policy.schema');
class PolicyRepo{static add(p){policies.push(p);}static list(){return policies;}}module.exports=PolicyRepo;