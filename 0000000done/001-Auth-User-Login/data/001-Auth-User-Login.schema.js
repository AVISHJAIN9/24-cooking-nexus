const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    nexusid:{
        type:String,
        unique:true,
        required:true,
    },
    fullname:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['home-cook','verified-chef','admin'],
            default:'home-cook',
        },
        uipreferences:{
            theme:{
                type:String,
                default:'dark',
            },
            //In an industrial-level application like Project Nexus, sentimentMode is not just a UI toggle; it is a Cognitive UI controller that allows the backend to influence the user experience based on emotional or contextual data
            sentimentmode:{
                type:Boolean,
                default:true,
            }
        },

        securitymetadata:{
            lastloginip:String,
            devicefingerprint:String,
            failedattempt:{
                type:Number,
                default:0
            },
            audittrial:[{
                action:String,
                select:false
            }]
        },
        createdat:{
            type:Date,
            default:Date.now,
        }
    }
});

module.export = mongoose.model('user',userschema);
