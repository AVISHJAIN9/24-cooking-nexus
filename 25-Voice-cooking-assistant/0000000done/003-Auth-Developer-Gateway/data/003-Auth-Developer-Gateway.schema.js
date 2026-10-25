// 2A unique schema that stores encrypted "Access Keys" rather than simple passwords.
const mongoose = require('mongoose');
const devlopergatewayschema = new mongoose.Schema({
    devid : {
        type:String,
        unique:true,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    securitykey:{
        type:String,
        required:true,
        select:false
    },
    clearancelevel:{
        type:String,
        enum:['level_9_god','level_5_debug','level_1_view'],
        default:'level_1_view',
    },
    authorizedenviorment:{
        macaddress:{
            type:String,
            required:true,
        },
        staticip:{
            type:String,  
        },
        lastuseddevice:String
    },
    actionHistory: [{
        command: String,
        impact: String, // e.g., "Wiped AI Cache"
        timestamp: { type: Date, default: Date.now }
    }]
},
{
    timestamp:true
}

);
module.exports = mongoose.model('devlopersgateway', devlopergatewayschema);
