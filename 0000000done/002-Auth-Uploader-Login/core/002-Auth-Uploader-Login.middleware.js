//8
//tyhe guard 
const ratelimit = require('express-rate-limit');

const uplorderratelimiter = ratelimit({
    windowms: 15*60*1000,
    max : 3,
    messsage : "Too many login attempts from this IP, please try again after 15 minutes",
    standardHeaders:true,
    legacyHeaders:false,
});

module.exports = uplorderratelimiter;


