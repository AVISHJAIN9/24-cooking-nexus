//This adds a layer of protection against bot spamming (IP-Rate Limiting).

const ratelimits = require('express-rate-limit');

const loginratelimiter = ratelimit({
    windowMs: 15*60*1000,
    max:5,
    message:"Too many login attempts from this IP, please try again after 15 minutes",
    standeardHeaders:true,
    legacyHeaders:false,
});
module.exports= loginratelimiter;