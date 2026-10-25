const mongoose = require('mongooswe');

const compilanceschema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    policyversion:{
        type:String,
        default:'1.0.0',
    },
    hasacceptedterms:{
        type:Boolean,
        default:false,
    },
    hasacceptedscalingdatausage:{
        type:Boolean,
        default:false,
    },
    consenttimestamp :{
        type:Date,
        default:Date.now,
    },
    ipaddress:String,

},{timestamp:true});

module.exports = mongoose.moodel('compliance',compilanceschema);