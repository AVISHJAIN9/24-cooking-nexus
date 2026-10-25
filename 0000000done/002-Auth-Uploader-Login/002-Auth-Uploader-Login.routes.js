//9
// the gateway 
const express = require('express');
const Router = express.Router();

const uploadcontroller = require('./core/002-Auth-Uploader-Login.controller');
const uploadvalidator = require('./core/002-Auth-Uploader-Login.validator');
const uploadratelimiter = require('./core/002-Auth-Uploader-Login.middleware');

Router.post('/pre/login',loginratelimiter,uplordervalidater,controller);

module.exports = Router;